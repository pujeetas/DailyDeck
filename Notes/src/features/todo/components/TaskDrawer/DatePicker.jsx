import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
import "./datePickerStyle.css";

export default function DateInput({ label = "Due Date", value, onChange }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-xs text-zinc-400">{label}</label>

      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(date?.toISOString() || undefined)}
        suffixIcon={<CalendarOutlined className="text-zinc-400" />}
        rootClassName="dark-antd-date"
        getPopupContainer={(trigger) => trigger?.parentElement || document.body}
        format="YYYY-MM-DD"
      />
    </div>
  );
}
