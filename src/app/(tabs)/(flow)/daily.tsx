import { useState } from "react";

import { FlowRankingPage } from "@/components/flow/FlowRankingPage";
import { useFlowLeadershipData } from "@/components/flow/useFlowLeadershipData";

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

const formatDateLabel = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekDay = dayLabels[date.getDay()];

  return `${year}.${month}.${day} (${weekDay})`;
};

const moveDate = (date: Date, amount: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + amount);
  return nextDate;
};

export default function DailyFlowScreen() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const {
    datasets,
    error,
    isLoading,
    isRefreshing,
    refetch,
  } = useFlowLeadershipData(selectedDate);

  return (
    <FlowRankingPage
      period="daily"
      selectorPrefix="일자별"
      summaryPrefix="당일"
      rankingPrefix="당일 기준"
      datasets={datasets}
      error={error}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      onRefresh={refetch}
      dateSelector={{
        dateLabel: formatDateLabel(selectedDate),
        onPreviousDate: () => setSelectedDate((date) => moveDate(date, -1)),
        onNextDate: () => setSelectedDate((date) => moveDate(date, 1)),
      }}
    />
  );
}
