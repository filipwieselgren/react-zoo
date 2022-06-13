import { IAnimals } from "../../models/IAnimals";
import { AboutBtnWrapper } from "../../styleComponents/AnimalsWrappers";
import { StyledAboutBtn } from "../../styleComponents/Buttons";

interface IAnimal {
  animal: IAnimals;
}

export const AboutBtn = (props: IAnimal) => {
  return (
    <>
      <AboutBtnWrapper>
        <StyledAboutBtn>Mer om {props.animal.name}</StyledAboutBtn>
      </AboutBtnWrapper>
    </>
  );
};
