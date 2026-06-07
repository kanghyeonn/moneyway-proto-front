import { useCallback, useEffect, useRef, useState } from "react";

import {
  emptyFlowDatasets,
  fetchFlowLeadershipData,
  type FlowLeadershipData,
} from "@/api/flow";

type FlowLeadershipState = FlowLeadershipData & {
  error: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
};

export function useFlowLeadershipData(date?: Date) {
  const [state, setState] = useState<FlowLeadershipState>({
    datasets: emptyFlowDatasets,
    error: null,
    isLoading: true,
    isRefreshing: false,
  });

  const controllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(
    (refreshing: boolean) => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setState((current) => ({
        ...current,
        error: null,
        isLoading: !refreshing,
        isRefreshing: refreshing,
      }));

      fetchFlowLeadershipData({
        date,
        signal: controller.signal,
      })
        .then((data) => {
          if (controller.signal.aborted) {
            return;
          }

          setState({
            ...data,
            error: null,
            isLoading: false,
            isRefreshing: false,
          });
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) {
            return;
          }

          setState((current) => ({
            ...current,
            error: error instanceof Error ? error.message : "Flow API request failed",
            isLoading: false,
            isRefreshing: false,
          }));
        });
    },
    [date],
  );

  useEffect(() => {
    loadData(false);

    return () => {
      controllerRef.current?.abort();
    };
  }, [loadData]);

  const refetch = useCallback(() => {
    loadData(true);
  }, [loadData]);

  return {
    ...state,
    refetch,
  };
}
