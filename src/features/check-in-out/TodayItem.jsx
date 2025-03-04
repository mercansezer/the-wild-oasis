import styled from "styled-components";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";

import { useCheckOut } from "./useCheckOut";
import { useNavigate } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  const { checkOut, isCheckinOut } = useCheckOut();
  const navigate = useNavigate();
  const {
    id,
    guests: { fullName, countryFlag, country },
    numNights,
    status,
  } = activity;

  const currentStatus = status === "checked-in" ? "DEPARTING" : "ARRIVING";
  return (
    <StyledTodayItem>
      <Tag type={currentStatus === "DEPARTING" ? "blue" : "green"}>
        {currentStatus}
      </Tag>
      <Flag src={countryFlag} alt={`Flag of ${country}`} />
      <Guest>{fullName}</Guest>
      <p>{numNights} nights</p>
      {currentStatus === "DEPARTING" ? (
        <Button
          variation="primary"
          size="small"
          disabled={isCheckinOut}
          onClick={() =>
            checkOut({ obj: { status: "checked-out" }, bookingId: id })
          }
        >
          CHECK OUT
        </Button>
      ) : (
        <Button
          variation="primary"
          size="small"
          onClick={() => navigate(`/checkin/${id}`)}
        >
          CHECK IN
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
