import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimals } from "../../models/IAnimals";
import {
  AnimalNameWrapper,
  AnimalsImgWrapper,
  AnimalWrapper,
  BirthMedHeaderWrappper,
  BirthMedTxtWrappper,
  BirthMedWrapper,
  MainWrapper,
  ShortInfoWrapper,
} from "../../styleComponents/AnimalsWrappers";
import { AnimalsImg } from "../../styleComponents/Images";
import {
  BirthHeader,
  Birthtxt,
  Line,
  MedHeader,
  Medtxt,
  Name,
} from "../../styleComponents/Text";
import { AboutBtn } from "./AboutBtn";

export const ShowAnimals = () => {
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [isFed, setIsFed] = useState<boolean>(false);

  const APIURL = "https://animals.azurewebsites.net/api/animals";

  useEffect(() => {
    axios
      .get<IAnimals[]>(APIURL)
      .then((data) => {
        if (animals.length === 0) {
          setAnimals(data.data);
          localStorage.setItem("animals", JSON.stringify(data.data));
        } else {
          setAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  let time = new Date().getTime();

  const allAnimals = animals.map((a) => {
    return (
      <AnimalWrapper to={"/animal/" + a.id} key={a.id}>
        <AnimalNameWrapper>
          <Name>
            {a.name}
            <Line>|</Line>
            <span> {`Was fed ${+time - +a.lastFed} hours ago`}</span>
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
