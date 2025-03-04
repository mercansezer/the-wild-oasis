import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("The settings was successfully updated.");
      queryClient.invalidateQueries({ queryKey: "[settings]" });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { mutate, isUpdating };
}
