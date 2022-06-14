import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ISingleAnimal } from "../../models/ISingleAnimal";
import { animalSlice, isFed } from "../../redux/features/animalSlice";
import { IState } from "../../redux/features/IState";
import {
  AnimalNameWrapper,
  FeedBtnWrapper,
  ShortInfoWrapper,
  SingleAnimaInfolWrapper,
  SingleAnimalNameWrapper,
  SingleAnimalsImgWrapper,
  SingleAnimalWrapper,
  SingleInfoWrapper,
} from "../../styleComponents/AnimalsWrappers";
import { BackBtn, FeedBtn } from "../../styleComponents/Buttons";
import { SingleAnimalImg } from "../../styleComponents/Images";
import { ShortInfo } from "../../styleComponents/Text";

export const SingleAnimal = () => {
  const [singleAnimals, setSingleAnimals] = useState<ISingleAnimal[]>([]);
  const [gotFed, setGotFed] = useState<boolean>(false);

  let params = useParams();

  const aAnimal = useSelector((state: IState) => state.animal.value);

  useEffect(() => {
    setSingleAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));
  }, []);

  let interval: NodeJS.Timer;

  const checkTime = () => {
    // console.log("singleAnimal: " + singleAnimals);

    const findAnimal = singleAnimals.filter((s) => {
      return s.id === Number(params.id);
    });

    const time = findAnimal.map((fa) => {
      return +new Date().getTime() - +new Date(fa.lastFed).getTime();
    });

    console.log(time[0]);

    // const countHours = +time[0] / 3600000;

    // 10800000

    if (time[0] >= 10800000) {
      setGotFed(false);
      clearInterval(interval);
      findAnimal.map((fa) => {
        fa.isFed = false;
        storageLocal(singleAnimals);
        setSingleAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));
      });
    }
  };

  useEffect(() => {
    if (gotFed) {
      console.log("setInterval körs");

      interval = setInterval(() => {
        checkTime();
      }, 3000);
    }
  });

  // Flytta till ShowAnimals
  const feed = (sa: ISingleAnimal) => {
    if (sa.isFed === false) {
      sa.isFed = true;
      setGotFed(true);
      sa.lastFed = new Date().toISOString();
      storageLocal(singleAnimals);
    } else {
      alert(`${sa.name} behöver inte matas`);
    }
  };

  const storageLocal = (a: ISingleAnimal[]) => {
    localStorage.setItem("animals", JSON.stringify(a));
  };

  const showSingleAnimal = singleAnimals.map((sa) => {
    if (sa.id === Number(params.id)) {
      return (
        <div key={sa.id}>
          <div className="name-wrapper">
            <SingleAnimalNameWrapper>
              <BackBtn to={"/"}>Tillbaka ↩</BackBtn>
              <div className="single-name">
                <span>{sa.name}</span>
              </div>
            </SingleAnimalNameWrapper>
          </div>
          <SingleAnimalsImgWrapper>
            <SingleAnimalImg animalimg={sa.imageUrl}></SingleAnimalImg>
          </SingleAnimalsImgWrapper>
          <SingleInfoWrapper>
            <ShortInfo>
              <div>
                {sa.name} matades senast:
                <div>
                  {sa.lastFed.split("T")[0]} klockan{" "}
                  {sa.lastFed.split("T")[1].split(".")[0]}
                </div>
              </div>
              <div className="long-description-wrapper">
                <div className="long-description">{sa.longDescription}</div>
              </div>
              <FeedBtnWrapper>
                <FeedBtn
                  onClick={() => {
                    feed(sa);
                  }}
                >
                  {sa.isFed === true
                    ? `${sa.name} är matad`
                    : `Mata ${sa.name}`}
                </FeedBtn>
              </FeedBtnWrapper>
            </ShortInfo>
          </SingleInfoWrapper>
        </div>
      );
    }
  });
  console.log(gotFed);

  return (
    <>
      <SingleAnimalWrapper>
        <SingleAnimaInfolWrapper>{showSingleAnimal}</SingleAnimaInfolWrapper>
      </SingleAnimalWrapper>

      {aAnimal}
    </>
  );
};
