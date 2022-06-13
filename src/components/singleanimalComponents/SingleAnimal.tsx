import axios from "axios";
import { setAutoFreeze } from "immer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IAnimals } from "../../models/IAnimals";
import { ISingleAnimal } from "../../models/ISingleAnimal";
import { animalSlice, isFed } from "../../redux/features/animalSlice";
import { IState } from "../../redux/features/IState";
import {
  SingleAnimaInfolWrapper,
  SingleAnimalsImgWrapper,
  SingleAnimalWrapper,
} from "../../styleComponents/AnimalsWrappers";
import { FeedBtn } from "../../styleComponents/Buttons";
import { SingleAnimalImg } from "../../styleComponents/Images";

export const SingleAnimal = () => {
  const [singleAnimals, setSingleAnimals] = useState<ISingleAnimal[]>([]);

  let params = useParams();

  useEffect(() => {
    setSingleAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));
  }, []);

  const aAnimal = useSelector((state: IState) => state.animal.value);

  const dispatch = useDispatch();

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

  const showSingleAnimal = singleAnimals.map((sa) => {
    if (sa.id === Number(params.id)) {
      return (
        <>
          <div key={sa.id}>
            <div>{sa.name}</div>
            <SingleAnimalsImgWrapper>
              <SingleAnimalImg animalimg={sa.imageUrl}></SingleAnimalImg>
            </SingleAnimalsImgWrapper>
            <FeedBtn
              // onClick={() => {
              //   feed(sa, sa.name, sa.lastFed);
              // }}
              onClick={() => {
                dispatch(isFed());
              }}
            >
              Mata {sa.name}
            </FeedBtn>
          </div>
        </>
      );
    }
  });

  return (
    <>
      <SingleAnimalWrapper>
        <SingleAnimaInfolWrapper>{showSingleAnimal}</SingleAnimaInfolWrapper>
      </SingleAnimalWrapper>
      <button
        onClick={() => {
          dispatch(isFed);
        }}
      >
        Mata test
      </button>
      {aAnimal}
    </>
  );
};
