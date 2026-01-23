import TaskDrawer from "@/features/todo/components/TaskDrawer/TaskDrawer";
import useTodoStore from "@/features/todo/store/useTodoStore";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/todo/store/useTodoStore");

describe("Task Drawer", () => {
  let mockClose;
  let mockSetTaskForm;
  let mockTaskForm;
  beforeEach(() => {
    useTodoStore.mockReturnValue({
      getGitDetails: vi.fn(),
      loading: false,
      createTodo: vi.fn(),
    });

    mockClose = vi.fn();
    mockSetTaskForm = vi.fn();
    mockTaskForm = {
      title: "",
      description: "",
      status: "backlog",
      priority: "",
      subTask: [],
      tech: "",
      issueId: "",
      focused: false,
      gitURL: "",
    };

    render(
      <TaskDrawer
        open={true}
        onClose={mockClose}
        taskForm={mockTaskForm}
        setTaskForm={mockSetTaskForm}
        mode="add"
      />,
    );
  });
  it("should fill title input", () => {
    const titleInput = screen.getByPlaceholderText(
      "Implement auth flow, fix API bug...",
    );
    expect(titleInput).toBeInTheDocument();
  });
  it("should fill issue Id input", () => {
    const issueIDInput = screen.getByPlaceholderText("GH-123, JIRA-456");
    expect(issueIDInput).toBeInTheDocument();
  });

  it("allowes user to type in title field", async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText(
      "Implement auth flow, fix API bug...",
    );

    await user.type(titleInput, "Bug resolve");

    expect(mockSetTaskForm).toHaveBeenCalled();
  });

  it("allowes user to type in Issue Id field", async () => {
    const user = userEvent.setup();

    const issueId = screen.getByPlaceholderText("GH-123, JIRA-456");

    await user.type(issueId, "JIRA-123");

    expect(mockSetTaskForm).toHaveBeenCalled();
  });

  //test save button
  it("clicking Create Task button closes drawer", async () => {
    const user = userEvent.setup();

    const saveButton = screen.getByRole("button", { name: /Create Task/i });

    const titleInput = screen.getByPlaceholderText(
      "Implement auth flow, fix API bug...",
    );

    await user.type(titleInput, "Fix Bug");

    await user.click(saveButton);

    expect(mockClose).toHaveBeenCalled();
  });

  //test git integration
  it("calls setTaskForm when typing Git URL", async () => {
    const user = userEvent.setup();

    const gitLinkInput = screen.getByPlaceholderText("https://github.com...");

    await user.type(gitLinkInput, "https://github.com/pujeetas/Theme/issues/1");

    expect(mockSetTaskForm).toHaveBeenCalled();
  });
});
