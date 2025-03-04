import { styled, css } from "styled-components";
function FormRow({ children, label }) {
  const FormRow = styled.div`
    margin-bottom: 2rem;
    padding: 1.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }
    display: grid;
    grid-template-columns: 1fr 300px 1fr;
  `;
  return (
    <FormRow>
      {label}
      {children}
    </FormRow>
  );
}

export default FormRow;
