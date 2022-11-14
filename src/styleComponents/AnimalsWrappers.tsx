import { Link } from "react-router-dom";
import styled from "styled-components";
import { IAnimals } from "../models/IAnimals";

interface IAnimalStyledImg {
  animalimg: string;
}

export const NavWrapper = styled.nav`
  width: 100vw;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media only screen and (min-width: 768px) {
    height: 30vh;
  }
  @media only screen and (min-width: 1024px) {
    max-height: 40vh;
    min-height: 40vh;
  }
`;

export const LogoWrapper = styled.div`
  width: 80%;

  @media only screen and (min-width: 1024px) {
    width: 50%;
  }
`;

export const AnimalWrapper = styled(Link)`
  width: 40vw;
  border: 0.5px solid #333;
  border-radius: 10px;
  background-color: #f18b27;
  margin: 0.5rem;
  min-height: 50vh;
  max-height: 50vh;
  text-decoration: none;

  @media only screen and (min-width: 1024px) {
    width: 25%;
    max-height: 50vh;
    min-height: 50vh;
  }
`;

export const MainWrapper = styled.main`
  max-height: 90vh;
  width: 100vw;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const AnimalsImgWrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnimalNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5em 0em;
`;
export const SingleAnimalNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0em;
  width: 96%;
`;

export const ShortInfoWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
export const SingleInfoWrapper = styled.div`
  width: 100%;
`;

export const BirthMedWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5em 0em;
`;

export const BirthMedHeaderWrappper = styled.div`
  font-size: 0.5rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  color: #333;
  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;
export const BirthMedTxtWrappper = styled.div`
  font-size: 0.5rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  color: #333;
  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const AboutBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const FeedBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;

export const SingleAnimalWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SingleAnimaInfolWrapper = styled.div`
  width: 80vw;
  border: 0.5px solid #333;
  border-radius: 10px;
  background-color: #f161293b;
  margin: 0.5rem;
  text-decoration: none;

  @media only screen and (min-width: 768px) {
    width: 50vw;
  }
`;

export const SingleAnimalsImgWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
`;
