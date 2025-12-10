import dayjs from "dayjs";

export const filterLogic = (activeFilter, detailsList) => {
  if (!activeFilter) return detailsList;

  if (
    typeof activeFilter === "string" &&
    activeFilter.trim().toLowerCase() === "today"
  ) {
    const filtered = detailsList.filter((task) => {
      if (!task || !task.dueDate) return false;
      return dayjs(task.dueDate).isSame(dayjs(), "day");
    });
    return filtered;
  }

  if (
    typeof activeFilter === "string" &&
    activeFilter.trim().toLowerCase() === "high priority"
  ) {
    return detailsList.filter((f) => f.priority === "high");
  }

  if (
    typeof activeFilter === "string" &&
    activeFilter.trim().toLowerCase() === "overdue"
  ) {
    return detailsList.filter(
      (f) => dayjs(f.dueDate).isBefore(dayjs(), "day") && f.status !== "done"
    );
  }

  return detailsList;
};
