import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    err,
  } = useQuery({
    queryKey: ["booking", bookingId],

    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isLoading };
}
