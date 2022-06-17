import styled from "styled-components";
interface IAnimalStyledImg {
  animalimg: string;
}

export const AnimalsImg = styled.img`
  width: 96%;
  height: 100%;
  border-radius: 2px;
`;

export const SingleAnimalImg = styled.img`
  width: 96%;
  height: 100%;
  border-radius: 2px;

  @media only screen and (min-width: 1024px) {
    width: 50%;
  }
`;

export const LogoImg = styled.img`
  width: 100%;
`;
