import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import apiClient from "~/lib/apiClient";

export default function useUserAirdropClaims() {
  const PAGE_SIZE = 5;

  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors.length == 0 ? undefined : cursors[cursors.length - 1];

  const [address, setAddress] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setAddress(query);
    setCursors([]);
  }, [query]);

  const { data: claims = [] } = useQuery(
    ["claims", { address, cursor }],
    () => apiClient.getClaims(address, cursor, PAGE_SIZE),
    { keepPreviousData: true }
  );
  const handleNext = () => {
    setCursors((cursors) => {
      const next = [...cursors, claims[claims.length - 1].address];
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
    claims,
    pageNumber: cursors.length,
    pageSize: PAGE_SIZE,
    isFirstPage: cursors.length == 0,
    isLastPage: claims.length < PAGE_SIZE,
    handleNext,
    handlePrev,
  };
}
