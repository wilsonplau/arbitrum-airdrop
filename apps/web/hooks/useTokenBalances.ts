import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import graphQLClient from "~/lib/graphQLClient";

export default function useTokenBalances() {
  const PAGE_SIZE = 5;

  const [page, setPage] = useState<number>(0);

  const [address, setAddress] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setAddress(query);
    setPage(0);
  }, [query]);

  const { data } = useQuery(
    ["token", "balances", { address, page }],
    () => graphQLClient.getTokenBalances(address, page * PAGE_SIZE, PAGE_SIZE),
    { keepPreviousData: true }
  );
  const balances = data || [];

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));

  return {
    query,
    setQuery,
    balances,
    pageNumber: page,
    pageSize: PAGE_SIZE,
    isFirstPage: page == 0,
    isLastPage: balances && balances.length < PAGE_SIZE,
    handleNext,
    handlePrev,
  };
}
