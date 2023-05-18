import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import graphQLClient from "~/lib/graphQLClient";

export default function useAirdropClaims() {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState<number>(0);
  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));

  const [address, setAddress] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setAddress(query);
    setPage(0);
  }, [query]);

  const { data } = useQuery(
    ["airdrop", "claims", { address, page }],
    () => graphQLClient.getAirdropClaims(address, page * PAGE_SIZE, PAGE_SIZE),
    { keepPreviousData: true }
  );
  const claims = data || [];

  return {
    query,
    setQuery,
    claims,
    pageNumber: page,
    pageSize: PAGE_SIZE,
    isFirstPage: page == 0,
    isLastPage: claims && claims.length < PAGE_SIZE,
    handleNext,
    handlePrev,
  };
}
