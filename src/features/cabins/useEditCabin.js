import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEdtiCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("The cabin was successfully edited");
      queryClient.invalidateQueries({ queryKey: "[cabins]" });
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { editCabin, isEditing };
}
