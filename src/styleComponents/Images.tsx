import styled from "styled-components";
interface IAnimalStyledImg {
  animalimg: string;
}

export const AnimalsImg = styled.img`
  background-image: url(${(props: IAnimalStyledImg) => props.animalimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 96%;
  height: 100%;
  border-radius: 2px;
`;

export const SingleAnimalImg = styled.img`
  background-image: url(${(props: IAnimalStyledImg) => props.animalimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 96%;
  height: 100%;
  border-radius: 2px;
`;

export const LogoImg = styled.img`
  width: 100%;
`;
