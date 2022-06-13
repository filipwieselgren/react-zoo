import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { ShowAnimals } from "./components/mainpageComponents/ShowAnimals";
import { NotFound } from "./components/notfound/NotFound";
import { SingleAnimal } from "./components/singleanimalComponents/SingleAnimal";
import Store from "./redux/Store";
import { LogoWrapper, NavWrapper } from "./styleComponents/AnimalsWrappers";
import { LogoImg } from "./styleComponents/Images";
import logo from "./images/feed-animals.png";

function App() {
  return (
    <Provider store={Store}>
      <NavWrapper>
        <LogoWrapper>
          <LogoImg src={logo} alt="logo"></LogoImg>
        </LogoWrapper>
      </NavWrapper>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ShowAnimals />}></Route>
          <Route path="/animal/:id" element={<SingleAnimal />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
