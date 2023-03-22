import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import apiClient from "~/lib/apiClient";

export default function useTokenBalances() {
  const PAGE_SIZE = 5;

  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors.length == 0 ? undefined : cursors[cursors.length - 1];

  const [address, setAddress] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setAddress(query);
    setCursors([]);
  }, [query]);

  const { data } = useQuery(
    ["token", "balances", { address, cursor }],
    () => apiClient.getTokenBalances(address, cursor, PAGE_SIZE),
    { keepPreviousData: true }
  );
  const balances = data?.balances || [];
  const count = data?.count || 0;

  const handleNext = () => {
    setCursors((cursors) => {
      const next = [...cursors, balances[balances.length - 1].address];
      return next;
    });
  };
  const handlePrev = () => {
    setCursors((cursors) => {
      const prev = [...cursors];
      prev.pop();
      return prev;
    });
  };

  return {
    query,
    setQuery,
    balances,
    count,
    pageNumber: cursors.length,
    pageSize: PAGE_SIZE,
    isFirstPage: cursors.length == 0,
    isLastPage: balances.length < PAGE_SIZE,
    handleNext,
    handlePrev,
  };
}
