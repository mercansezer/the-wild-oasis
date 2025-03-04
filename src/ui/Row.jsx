import { styled, css } from "styled-components";

const Row = styled.div`
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  display: flex;
`;

//BU ŞEKİLDE DEFAULT PROPS VEREBİLİRİZ, BU REACTIN COMPONENTINE DEFAULT PROPS VERME ÖZELLİĞİDİR.
Row.defaultProps = {
  type: "vertical",
};
export default Row;
