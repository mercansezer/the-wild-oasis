import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`The booking was successfully deleted.`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("There was an error while deleting the booking");
    },
  });

  return { mutate, isDeleting };
}
