import axios from "axios";
import { useEffect, useState } from "react";
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
import { AnimalsImg, LogoImg } from "../../styleComponents/Images";
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

  const allAnimals = animals.map((a) => {
    return (
      <AnimalWrapper to={"/animal/" + a.id} key={a.id}>
        <AnimalNameWrapper>
          <Name>
            {a.name}
            <Line>|</Line>

            {}
            <span>{`Behöver matas: ${a.isFed === false ? "Ja" : "Nej"}`}</span>
          </Name>
        </AnimalNameWrapper>
        <AnimalsImgWrapper>
          <AnimalsImg
            animalimg={a.imageUrl}
            onError={(e) => {
              e.currentTarget.src =
                "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg";
            }}
          ></AnimalsImg>
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
