import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import styled from "styled-components";
import { useUpdateUser } from "./useUpdateUser";
import { useForm } from "react-hook-form";

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
  width: 100rem;
  border: none;
  justify-content: flex-end;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { register, handleSubmit, reset } = useForm();
  const { updateUser, isLoading } = useUpdateUser();

  function onSubmit(data) {
    console.log("deneme");
    if (!data.fullName) return;
    const fullName = data.fullName;
    const avatar = data.avatar[0];
    updateUser({ fullName, avatar });
    reset();
  }
  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          placeholder={currentFullName}
          id="fullName"
          {...register("fullName")}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" {...register("avatar")} />
      </FormRow>
      <FormRow>
        <ButtonBox>
          <Button type="reset" variation="secondary" onClick={reset}>
            Cancel
          </Button>
          <Button variation="primary">Update account</Button>
        </ButtonBox>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
