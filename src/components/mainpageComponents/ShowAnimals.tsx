import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimals } from "../../models/IAnimals";
import logo from "../../images/feed-animals.png";
import {
  AnimalNameWrapper,
  AnimalsImgWrapper,
  AnimalWrapper,
  BirthMedHeaderWrappper,
  BirthMedTxtWrappper,
  BirthMedWrapper,
  LogoWrapper,
  MainWrapper,
  NavWrapper,
  ShortInfoWrapper,
} from "../../styleComponents/AnimalsWrappers";
import { AnimalsImg, LogoImg } from "../../styleComponents/Images";
import {
  BirthHeader,
  Birthtxt,
  Line,
  MedHeader,
  Medtxt,
  Name,
  ShortInfo,
} from "../../styleComponents/Text";
import { AboutBtn } from "./AboutBtn";

export const ShowAnimals = () => {
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [isFed, setIsFed] = useState<boolean>(false);

  const APIURL = "https://animals.azurewebsites.net/api/animals";

  useEffect(() => {
    let local: IAnimals[] = JSON.parse(localStorage.getItem("animals") || "[]");

    if (local.length === 0) {
      axios.get<IAnimals[]>(APIURL).then((data) => {
        setAnimals(data.data);
        localStorage.setItem("animals", JSON.stringify(data.data));
      });
    } else {
      setAnimals(local);
    }
  }, []);

  console.log(animals);

  const allAnimals = animals.map((a) => {
    return (
      <AnimalWrapper to={"/animal/" + a.id} key={a.id}>
        <AnimalNameWrapper>
          <Name>
            {a.name}
            {/* <Line>|</Line> */}

            {}
            {/* <span>Behöver matas: Ja</span> */}
          </Name>
        </AnimalNameWrapper>
        <AnimalsImgWrapper>
          <AnimalsImg animalimg={a.imageUrl}></AnimalsImg>
        </AnimalsImgWrapper>
        <ShortInfoWrapper>
          <BirthMedWrapper>
            <BirthMedHeaderWrappper>
              <BirthHeader>Födelseår</BirthHeader>
              <MedHeader>Medicin </MedHeader>
            </BirthMedHeaderWrappper>
            <BirthMedTxtWrappper>
              <Birthtxt>{a.yearOfBirth}</Birthtxt>
              <Medtxt>{a.medicine}</Medtxt>
            </BirthMedTxtWrappper>
          </BirthMedWrapper>
          <AboutBtn animal={a}></AboutBtn>
        </ShortInfoWrapper>
      </AnimalWrapper>
    );
  });

  return (
    <>
      <MainWrapper>{allAnimals} </MainWrapper>
    </>
  );
};
