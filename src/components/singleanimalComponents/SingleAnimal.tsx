import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ISingleAnimal } from "../../models/ISingleAnimal";
import { animalSlice, isFed } from "../../redux/features/animalSlice";
import { IState } from "../../redux/features/IState";
import {
  FeedBtnWrapper,
  ShortInfoWrapper,
  SingleAnimaInfolWrapper,
  SingleAnimalsImgWrapper,
  SingleAnimalWrapper,
} from "../../styleComponents/AnimalsWrappers";
import { FeedBtn } from "../../styleComponents/Buttons";
import { SingleAnimalImg } from "../../styleComponents/Images";

export const SingleAnimal = () => {
  const [singleAnimals, setSingleAnimals] = useState<ISingleAnimal[]>([]);
  const [gotFed, setGotFed] = useState<boolean>(false);

  let params = useParams();

  const aAnimal = useSelector((state: IState) => state.animal.value);

  const dispatch = useDispatch();

  useEffect(() => {
    setSingleAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));
  }, []);

  const timeMilliseconds = singleAnimals.filter((s) => {
    return s.id === Number(params.id);
  });

  const time = timeMilliseconds.map((tm) => {
    return +new Date() - Date.parse(tm.lastFed);
  });

  const countHours = +time / 3600000;

  console.log(countHours);

  useEffect(() => {
    if (countHours >= 3) {
      setGotFed(true);
    }
  }, []);

  // Flytta till ShowAnimals
  const feed = (sa: ISingleAnimal, name: string, feedTime: string) => {
    if (sa.isFed === false) {
      sa.isFed = true;
      sa.lastFed = new Date().toString();
      localStorage.setItem("animals", JSON.stringify(singleAnimals));
    } else {
      alert(`${name} is fed!`);
    }
  };

  let gotFood = <></>;

  if (gotFed) {
    gotFood = <div>Matad</div>;
  }

  const showSingleAnimal = singleAnimals.map((sa) => {
    if (sa.id === Number(params.id)) {
      return (
        <div key={sa.id}>
          <div>{sa.name}</div>
          <SingleAnimalsImgWrapper>
            <SingleAnimalImg animalimg={sa.imageUrl}></SingleAnimalImg>
          </SingleAnimalsImgWrapper>
          <ShortInfoWrapper>
            <FeedBtnWrapper>
              <FeedBtn
                onClick={() => {
                  feed(sa, sa.name, sa.lastFed);
                }}
                // onClick={() => {
                //   dispatch(isFed());
                // }}
              >
                Mata {sa.name}
              </FeedBtn>
            </FeedBtnWrapper>
            <div>
              Last time {sa.name} was fed:
              <div>{sa.lastFed.slice(0, 25)}</div>
            </div>

            {gotFood}
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
