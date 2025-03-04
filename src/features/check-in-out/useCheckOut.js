import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export function useCheckOut() {
  const queryClient = useQueryClient();
  
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ obj, bookingId }) => updateBooking(obj, bookingId),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} successfully checked out`);
      
    },
    onError: () => {
      toast.error("There was an error while checking out");
    },
  });

  return { checkOut, isCheckingOut };
}
