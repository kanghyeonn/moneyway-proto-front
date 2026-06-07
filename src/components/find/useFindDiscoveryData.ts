import { useCallback, useEffect, useRef, useState } from "react";

import {
  emptyFindDiscoveryData,
  fetchFindDiscoveryData,
  type FindDiscoveryData,
  type FindRankingType,
} from "@/api/find";

type FindDiscoveryState = FindDiscoveryData & {
  error: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
};

export function useFindDiscoveryData(rankingType: FindRankingType) {
  const [state, setState] = useState<FindDiscoveryState>({
    ...emptyFindDiscoveryData,
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

      fetchFindDiscoveryData({
        rankingType,
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
            error:
              error instanceof Error
                ? error.message
                : "Discovery API request failed",
            isLoading: false,
            isRefreshing: false,
          }));
        });
    },
    [rankingType],
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
