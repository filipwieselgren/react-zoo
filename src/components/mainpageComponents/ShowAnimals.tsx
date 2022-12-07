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
import { FaHeart } from "react-icons/fa";

// let lifes = [<FaHeart />, <FaHeart />, <FaHeart />];

export const ShowAnimals = () => {
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [gotFed, setGotFed] = useState<boolean>(false);
  const [sliceLife, setSliceLife] = useState<boolean>(false);

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

  // const showLifes = lifes.map((l) => {
  //   return <div>{l}</div>;
  // });

  const allAnimals = animals.map((a) => {
    let lifes = [<FaHeart />, <FaHeart />, <FaHeart />];
    const timestamp = new Date(a.lastFed).getTime() - 3600000;

    return (
      <AnimalWrapper to={"/animal/" + a.id} key={a.id}>
        <AnimalNameWrapper>
          <Name>
            <>
              {a.name}

              <Line>|</Line>
              <span>{`Behöver matas: ${
                new Date().getTime() - timestamp < 10800000 ? "Nej" : "Ja"
              }`}</span>
            </>
          </Name>
        </AnimalNameWrapper>
        <AnimalsImgWrapper>
          <div
            className="animalsImg"
            style={{
              backgroundImage: `url(${a.imageUrl}), url(https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg)`,
            }}
          ></div>
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

          {/* <div className="life-wrapper">
            <div className="life">Life:{showLifes} </div>
          </div> */}
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
