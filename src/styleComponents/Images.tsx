import styled from "styled-components";
interface IAnimalStyledImg {
  animalimg: string;
}

export const AnimalsImg = styled.img`
  width: 96%;
  height: 100%;
  border-radius: 5px;
`;

export const SingleAnimalImg = styled.img`
  width: 15em;
  border-radius: 5px;

  @media only screen and (min-width: 768px) {
  }
`;

export const LogoImg = styled.img`
  width: 100%;
`;
