import DrawerHeader from "./DrawerHeader";
import DrawerFooter from "./DrawerFooter";
import DrawerSubtask from "./DrawerSubtask";
import FormTextarea from "./inputs/FormTextarea";
import FormInput from "./inputs/FormInput";
import TwoColumn from "./inputs/TwoColumn";
import DateInput from "./DatePicker";
import FormInputGit from "./inputs/FormInputGit";
import useTodoStore from "../../store/useTodoStore";
import { useState } from "react";

import { ConfigProvider, message, Modal, Select, theme } from "antd";
import { techOptions } from "@/constants/techOptions";

export default function TaskDrawer({
  open,
  onClose,
  taskForm,
  setTaskForm,
  mode = "add",
}) {
  const isEdit = mode === "edit";

  const { getGitDetails, loading } = useTodoStore();

  const [isValuePresent, setIsValuePresent] = useState(false);
  const [pendingURL, setPendingURL] = useState("");

  const handleImport = async (url) => {
    if (taskForm.description || taskForm.title) {
      setPendingURL(url);
      setIsValuePresent(true);
      return;
    }
    await runImport(url);
  };

  const runImport = async (url) => {
    try {
      const issue = await getGitDetails(url);
      console.log(issue);
      if (issue.success === false) {
        message.error(issue.message);
        return;
      }

      setTaskForm((prev) => ({
        ...prev,
        title: issue.title,
        description: issue.body,
        gitURL: url,
      }));
    } catch (error) {
      console.error(error);
      message.error("Unexpected error. Try again.");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-200
      ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Drawer Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed right-0 top-0 h-full w-full max-w-md 
          bg-[#18181B] text-zinc-100
          border-l border-white/10 shadow-2xl shadow-black/40
          transition-transform duration-200 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col`}
      >
        <DrawerHeader isEdit={isEdit} onClose={onClose} />

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <FormInput
            label="Title"
            value={taskForm.title}
            onChange={(e) =>
              setTaskForm({ ...taskForm, title: e.target.value })
            }
            placeholder="Implement auth flow, fix API bug..."
          />
          <FormInput
            label="Issue ID"
            value={taskForm.issueId || ""}
            onChange={(e) =>
              setTaskForm({
                ...taskForm,
                issueId: e.target.value.toUpperCase(),
              })
            }
            placeholder="GH-123, JIRA-456"
          />
          <FormInputGit
            label="Git URL"
            value={taskForm.gitURL || ""}
            onChange={(e) =>
              setTaskForm({
                ...taskForm,
                gitURL: e.target.value,
              })
            }
            loading={loading}
            handleImport={handleImport}
            placeholder="https://github.com..."
          />
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  borderRadius: 8,
                  controlHeight: 40,
                  colorBgContainer: "#0E0E10",
                  colorBorder: "rgba(255,255,255,0.1)",
                  colorText: "#E4E4E7",
                  colorTextPlaceholder: "#6B7280",
                  optionSelectedBg: "#0E0E10",
                  colorBgElevated: "#0E0E10",
                },
              },
            }}
          >
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] mb-1.5 block">
              Tech Stack
            </label>

            <Select
              style={{ width: "100%", marginBottom: 15 }}
              label="Tech Stack"
              mode="tags"
              value={taskForm.tech}
              onChange={(tech) => setTaskForm({ ...taskForm, tech })}
              placeholder="React, Node, Tailwind"
              options={techOptions}
            />

            <TwoColumn>
              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] mb-1.5 block">
                  Status
                </label>

                <Select
                  style={{ width: "100%" }}
                  value={taskForm.status}
                  onChange={(value) =>
                    setTaskForm({ ...taskForm, status: value })
                  }
                  options={[
                    { value: "backlog", label: "Backlog" },
                    { value: "progress", label: "In Progress" },
                    { value: "review", label: "Review" },
                    { value: "done", label: "Done" },
                  ]}
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] mb-1.5 block">
                  Priority
                </label>

                <Select
                  style={{ width: "100%" }}
                  value={taskForm.priority}
                  onChange={(value) =>
                    setTaskForm({ ...taskForm, priority: value })
                  }
                  options={[
                    { value: "", label: "None" },
                    { value: "high", label: "High" },
                    { value: "medium", label: "Medium" },
                    { value: "low", label: "Low" },
                  ]}
                />
              </div>
            </TwoColumn>
          </ConfigProvider>

          <DateInput
            label="Due Date"
            value={taskForm.dueDate}
            onChange={(date) => setTaskForm({ ...taskForm, dueDate: date })}
          />

          <FormTextarea taskForm={taskForm} setTaskForm={setTaskForm} />
          <DrawerSubtask taskForm={taskForm} setTaskForm={setTaskForm} />
        </div>

        {isValuePresent && (
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Modal
              open={isValuePresent}
              title="Override existing data?"
              onOk={() => {
                runImport(pendingURL);
                setIsValuePresent(false);
              }}
              onCancel={() => setIsValuePresent(false)}
              okButtonProps={{ danger: true }}
            >
              This will replace your current title and description.
            </Modal>
          </ConfigProvider>
        )}

        <DrawerFooter
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          isEdit={isEdit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
