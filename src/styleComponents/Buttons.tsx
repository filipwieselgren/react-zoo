import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledAboutBtn = styled.button`
  padding: 0.5em;
  border: none;
  border-radius: 2px;
  background-color: #f2b325;
  box-shadow: 0px 5px 10px #57575796;
  width: 90%;

  & {
    cursor: pointer;
  }

  @media only screen and (min-width: 1024px) {
    padding: 1em;
  }
  @media only screen and (min-width: 1280px) {
    padding: 2em;
    font-size: 1em;
  }
`;

export const FeedBtn = styled.button`
  padding: 0.5em;
  border: none;
  border-radius: 2px;
  background-color: #f2b325;
  box-shadow: 0px 5px 10px #57575796;
  width: 90%;

  & {
    cursor: pointer;
  }
`;
export const BackBtn = styled(Link)`
  padding: 0.5em;
  border: none;
  border-radius: 2px;
  background-color: #f2b325;
  box-shadow: 0px 5px 10px #57575796;
  text-decoration: none;
  color: #333;

  & {
    cursor: pointer;
  }
`;
