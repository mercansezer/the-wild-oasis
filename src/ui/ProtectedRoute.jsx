import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  //useNavigate ile alınan navigate fonksiyonu doğrudan bileşen içinde çağrılırsa, her render sırasında çalışarak React'in render döngüsünü bozabilir ve hata verebilir. Bu yüzden, yönlendirme işlemi yan etki (side effect) olduğu için useEffect içinde veya bir event callback içinde çalıştırılmalıdır. Böylece React'in kontrol mekanizmasına uygun hareket edilir ve beklenmeyen davranışlar engellenir.

  const navigate = useNavigate();
  /************ */
  /************ */
  /************ */
  //1. Load the authenticated user.
  const { isLoading, user, isAuthenticated } = useUser();

  //2. If there is NO authenticated user, redirect to the /login.
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );
  //3. While loading, show a spinner.
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there IS a user, render the app.
  if (isAuthenticated) return <div>{children}</div>;
}

export default ProtectedRoute;
