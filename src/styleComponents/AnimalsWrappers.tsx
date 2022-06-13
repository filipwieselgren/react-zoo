import { Link } from "react-router-dom";
import styled from "styled-components";
import { IAnimals } from "../models/IAnimals";

interface IAnimalStyledImg {
  animalimg: string;
}

export const AnimalWrapper = styled(Link)`
  width: 40vw;
  border: 0.5px solid #333;
  border-radius: 2px;
  background-color: #f18b27;
  margin: 0.5rem;
  height: 33vh;
  text-decoration: none;
`;

export const MainWrapper = styled.main`
  max-height: 90vh;
  width: 100vw;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
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

export const ShortInfoWrapper = styled.div`
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
`;
export const BirthMedTxtWrappper = styled.div`
  font-size: 0.5rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  color: #333;
`;

export const AboutBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SingleAnimalWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SingleAnimaInfolWrapper = styled.div`
  width: 90vw;
  border: 0.5px solid #333;
  border-radius: 2px;
  background-color: #f18b27;
  margin: 0.5rem;
  height: 90vh;
  text-decoration: none;
`;

export const SingleAnimalsImgWrapper = styled.div`
  width: 100%;
  height: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
