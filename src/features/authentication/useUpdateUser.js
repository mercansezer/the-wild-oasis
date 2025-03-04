import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ password = "", fullName = "", avatar = "" }) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("User account successfully updated.");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("There was en error while updating the user.");
    },
  });

  return { updateUser, isLoading };
}
