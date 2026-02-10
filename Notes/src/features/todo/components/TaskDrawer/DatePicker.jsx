import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
import "./datePickerStyle.css";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

export default function DateInput({ label = "Due Date", value, onChange }) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label
        className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
        style={mono}
      >
        {label}
      </label>
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(date?.toISOString() || undefined)}
        suffixIcon={<CalendarOutlined className="text-zinc-600" />}
        rootClassName="dark-antd-date"
        getPopupContainer={(trigger) => trigger?.parentElement || document.body}
        format="YYYY-MM-DD"
      />
    </div>
  );
}
