import { Drawer, Spin, Button, Typography } from "antd";
import { CopyOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Paragraph, Text } = Typography;

const DrawerPanel = ({
  open,
  onClose,
  ragQuery,
  ragResponse,
  ragLoading,
  ragSources,
  setActiveId,
}) => {
  const [copied, setCopied] = useState(false);
  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-lg font-semibold">Ask your notes</span>
        </div>
      }
      placement="right"
      width={450}
      open={open}
      onClose={onClose}
      closeIcon={
        <CloseOutlined className="text-gray-400 hover:text-gray-200" />
      }
      styles={{
        header: {
          borderBottom: "1px solid #2f2f2f",
          padding: "20px 24px",
        },
        body: {
          padding: "24px",
        },
      }}
    >
      <div className="flex flex-col h-full gap-6">
        {/* Question Section */}
        {ragQuery && (
          <div className="bg-linear-to-br from-[#1a1a2e] to-[#16213e] p-4 rounded-xl border border-blue-900/30 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Your Question
              </span>
            </div>
            <div className="text-sm text-gray-100 leading-relaxed">
              {ragQuery}
            </div>
          </div>
        )}

        {/* Answer Section */}
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          {ragLoading ? (
            // Loading State
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="relative">
                <Spin size="large" />
                <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-gray-300 font-medium">
                  Searching your notes…
                </p>
                <p className="text-xs text-gray-500">
                  This may take a few moments
                </p>
              </div>
            </div>
          ) : ragResponse ? (
            // Answer Display
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <Text
                  strong
                  className="text-sm text-green-300 uppercase tracking-wider"
                >
                  Answer
                </Text>
              </div>

              <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2f2f2f] shadow-lg">
                <Paragraph className="text-[15px] text-gray-200 leading-relaxed whitespace-pre-wrap mb-0">
                  {ragResponse}
                </Paragraph>
              </div>
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-[15px] mb-2">
                Ask a question to search your notes
              </p>
              <p className="text-xs text-gray-600">
                Type{" "}
                <code className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded font-mono">
                  /ask
                </code>{" "}
                in your note
              </p>
            </div>
          )}
        </div>

        {/* Sources Section */}
        {ragSources?.length > 0 && !ragLoading && (
          <div className="pt-4 border-t border-[#2f2f2f]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
              <Text
                type="secondary"
                className="text-xs font-semibold text-purple-300 uppercase tracking-wider"
              >
                Sources ({ragSources.length})
              </Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {ragSources.map((source, index) => (
                <button
                  key={source.id}
                  onClick={() => setActiveId?.(source.id)}
                  className="group px-3 py-2 text-xs rounded-lg bg-gradient-to-br from-[#1f1f1f] to-[#1a1a1a] 
                  border border-[#2f2f2f] text-gray-300 
                  hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10
                  transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-purple-400 group-hover:bg-blue-400 transition-colors"></span>
                    {source.title || "Untitled"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {ragResponse && !ragLoading && (
          <div className="flex gap-2 pt-4 border-t border-[#2f2f2f]">
            <Button
              aria-label="Copy answer"
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={async () => {
                await navigator.clipboard.writeText(ragResponse);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className={`flex-1 h-10 ${
                copied
                  ? "bg-green-600 hover:bg-green-700 border-green-600"
                  : "bg-blue-600 hover:bg-blue-700 border-blue-600"
              } text-white font-medium transition-all duration-200`}
              type="primary"
            >
              {copied ? " Copied!" : "Copy Answer"}
            </Button>
            <Button
              onClick={onClose}
              className="h-10 px-6 border-[#3f3f3f] hover:border-gray-500 text-gray-300 hover:text-gray-100"
            >
              Close
            </Button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f3f;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f4f4f;
        }
      `}</style>
    </Drawer>
  );
};

export default DrawerPanel;
