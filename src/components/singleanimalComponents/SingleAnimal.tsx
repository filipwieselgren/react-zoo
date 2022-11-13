import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISingleAnimal } from "../../models/ISingleAnimal";
import {
  FeedBtnWrapper,
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
  const [animal, setAnimal] = useState<ISingleAnimal>({
    id: 0,
    imageUrl: "",
    isFed: false,
    lastFed: "",
    latinName: "",
    longDescription: "",
    medicine: "",
    name: "",
    shortDescription: "",
    yearOfBirth: 0,
  });

  let params = useParams();

  useEffect(() => {
    setSingleAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));
  }, []);

  useEffect(() => {
    find();
  });

  const find = () => {
    const findAnimal = singleAnimals.filter((s) => {
      return s.id === Number(params.id);
    });

    for (let i = 0; i < findAnimal.length; i++) {
      setAnimal(findAnimal[i]);
    }
  };

  let interval: NodeJS.Timer;

  const checkTime = () => {
    const findAnimal = singleAnimals.filter((s) => {
      return s.id === Number(params.id);
    });

    const time = findAnimal.map((fa) => {
      const timestamp = new Date(fa.lastFed).getTime() - 3600000;

      return new Date().getTime() - timestamp;
    });

    console.log(time);

    if (time[0] > 10800000) {
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
    if (animal.isFed === true) {
      interval = setInterval(() => {
        checkTime();
      }, 1000);
    }
  });

  const feed = (sa: ISingleAnimal) => {
    if (sa.isFed === false) {
      sa.isFed = true;
      setGotFed(true);
      const todaysDate = new Date();
      const fedAt = new Date(todaysDate);
      fedAt.setHours(fedAt.getHours() + 1);

      sa.lastFed = fedAt.toISOString();
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
            <SingleAnimalImg
              src={sa.imageUrl}
              onError={(e) => {
                e.currentTarget.src =
                  "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg";
              }}
            ></SingleAnimalImg>
          </SingleAnimalsImgWrapper>
          <SingleInfoWrapper>
            <ShortInfo>
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
            </ShortInfo>
          </SingleInfoWrapper>
        </div>
      );
    }
  });

  return (
    <>
      <SingleAnimalWrapper>
        <SingleAnimaInfolWrapper>{showSingleAnimal}</SingleAnimaInfolWrapper>
      </SingleAnimalWrapper>
    </>
  );
};
