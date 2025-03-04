import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  //SERVER SIDE FILTERING
  //SERVER SIDE FILTERING
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue }; //BİRDEN FAZLAZ SORGU İÇİN BURAYA BİR ARRAY KOYABİLİRSİN, O BUARRAYI apiBookings.js'de dönebilirsin. CHATGBT YARDIM EDER.
  //SERVER SIDE FILTERING
  //SERVER SIDE FILTERING
  //{ field: "totalPrice", value: 5000, method: "gte" }

  //SORTING
  //SORTING
  //SORTING
  const sortBy = searchParams.get("sortBy");

  //PAGINATION
  //PAGINATION
  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //QUERY
  //QUERY
  //QUERY
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCHING WITH REACTQUERY
  //PRE-FETCHING WITH REACTQUERY
  //PRE-FETCHING WITH REACTQUERY

  const queryClient = useQueryClient();
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  //prev kısmında da loading spinner görmesin, önceden verimiz hazır olsun diye bunu da ekledik.
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  return { bookings, isLoading, error, count };
}
