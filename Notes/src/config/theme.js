import { ConfigProvider, theme } from "antd";

export const mono = { fontFamily: "'JetBrains Mono', monospace" };
export const serif = { fontFamily: "'Newsreader', Georgia, serif" };
export const inputClasses =
  "w-full pl-10 pr-4 py-3 border border-zinc-800 text-[14px] text-white placeholder:text-zinc-600 bg-[#0e0e0c] outline-none transition-all duration-200 focus:border-amber-500/50 focus:bg-[#111110]";

export const AntdDarkProvider = ({ children }) => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorBgElevated: "#262626",
        colorBgContainer: "#262626",
        colorText: "#e5e7eb",
        colorTextSecondary: "#9ca3af",
        colorBorder: "#2f2f2f",
        colorSplit: "#2f2f2f",
        borderRadiusLG: 8,
      },
      components: {
        Drawer: {
          headerBg: "#262626",
          bodyBg: "#262626",
          footerBg: "#262626",
        },
        Input: {
          colorBgContainer: "#1f1f1f",
          colorBorder: "#333333",
          colorText: "#e5e7eb",
          colorTextPlaceholder: "#6b7280",
        },
        Button: {
          colorPrimary: "#3b82f6",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);
