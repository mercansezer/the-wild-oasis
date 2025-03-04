import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";

import { useSignup } from "./useSignup";

const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
  width: 100rem;
  border: none;
  justify-content: flex-end;
`;
const Error = styled.span`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  font-size: 1.5rem;
  color: var(--color-red-700);
`;
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { signup, isLoading } = useSignup();

  const { errors } = formState;

  function onSubmit(data) {
    const { fullName, password, email } = data;

    signup(
      { fullName, password, email },
      {
        onSettled: () => reset(),
      }
    );
  }
  function onError(error) {}
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={""}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
        {errors?.fullName?.message && (
          <Error>{errors?.fullName?.message}</Error>
        )}
      </FormRow>

      <FormRow label="Email address" error={""}>
        <Input
          type="email"
          disabled={isLoading}
          id="email"
          {...register("email", {
            required: "This field is required",

            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        {errors?.email?.message && <Error>{errors?.email?.message}</Error>}
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={""}>
        <Input
          type="password"
          disabled={isLoading}
          id="password"
          autoComplete="new-password"
          {...register("password", {
            required: "This field is required",
            validate: (value) => {
              return (
                +value.length >= 8 || "Password needs a minimum of 8 characters"
              );
            },
          })}
        />
        {errors?.password?.message && (
          <Error>{errors?.password?.message}</Error>
        )}
      </FormRow>

      <FormRow label="Repeat password" error={""}>
        <Input
          type="password"
          disabled={isLoading}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => {
              return (
                value === getValues().password || "Passwords need to match"
              );
            },
          })}
        />
        {errors?.passwordConfirm?.message && (
          <Error>{errors?.passwordConfirm?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <ButtonBox>
          <Button variation="secondary" type="reset" onClick={reset}>
            Cancel
          </Button>
          <Button variation="primary" disabled={isLoading}>
            Create new user
          </Button>
        </ButtonBox>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
