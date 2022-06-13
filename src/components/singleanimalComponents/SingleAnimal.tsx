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
} from "../../styleComponents/AnimalsWrappers";
import { BackBtn, FeedBtn } from "../../styleComponents/Buttons";
import { SingleAnimalImg } from "../../styleComponents/Images";

export const SingleAnimal = () => {
  const [singleAnimals, setSingleAnimals] = useState<ISingleAnimal[]>([]);
  const [gotFed, setGotFed] = useState<boolean>(false);

  let params = useParams();

  const aAnimal = useSelector((state: IState) => state.animal.value);

  useEffect(() => {
    setSingleAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));
  }, []);

  const checkTime = () => {
    const timeMilliseconds = singleAnimals.filter((s) => {
      return s.id === Number(params.id);
    });

    const time = timeMilliseconds.map((tm) => {
      return +new Date() - Date.parse(tm.lastFed);
    });

    const countHours = +time / 3600000;

    // 10800000

    if (countHours >= 3) {
      timeMilliseconds.map((tm) => {
        tm.isFed = false;
        storageLocal(singleAnimals);
        setSingleAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));

        console.log(tm.isFed);
      });
    }

    console.log(+time);
  };

  useEffect(() => {
    setInterval(() => {
      checkTime();
    }, 1000);
  }, []);

  // Flytta till ShowAnimals
  const feed = (sa: ISingleAnimal) => {
    if (sa.isFed === false) {
      sa.isFed = true;
      setGotFed(true);
      sa.lastFed = new Date().toString();
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
          <ShortInfoWrapper>
            <div>
              {sa.name} matades senast:
              <div>{sa.lastFed.slice(0, 25)}</div>
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
                {sa.isFed === true ? `${sa.name} är matad` : `Mata ${sa.name}`}
              </FeedBtn>
            </FeedBtnWrapper>
          </ShortInfoWrapper>
        </div>
      );
    }
  });

  return (
    <>
      <SingleAnimalWrapper>
        <SingleAnimaInfolWrapper>{showSingleAnimal}</SingleAnimaInfolWrapper>
      </SingleAnimalWrapper>

      {aAnimal}
    </>
  );
};
