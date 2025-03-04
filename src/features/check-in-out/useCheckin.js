import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(
        {
          status: "checked-in",
          isPaid: true,
          ...breakfast,
        },
        bookingId
      ),
    onSuccess: (data) => {
      //onSuccess, mutate fonksiyondan yani burada updateBookings'den return edilen dataya erişim sağlayabilir.
      toast.success(`Booking #${data.id} successfully checked in`);
      //   queryClient.invalidateQueries({
      //     queryKey: ["booking", bookingId],
      //   });

      queryClient.invalidateQueries({ active: true }); //And previously what we did here was to pass in the Query key, but we can also do it in another way, which is simply to say, active true. And so this will then invalidate all the queries that are currently active on the page. So, this is a bit easier, because then we don't have to remember any Query keys.

      navigate("/dashboard");
    },
    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { checkin, isCheckIn };
}
