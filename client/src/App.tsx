import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./components/Content/Content";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import { ColorContextProvider } from "./context/ColorContext";

function App() {
  return (
    <div className="App">
      <ColorContextProvider>
        <BrowserRouter>
          <NavBar />

          <div className="content_wrapper">
            <SideBar />
            <Content />
          </div>
        </BrowserRouter>
      </ColorContextProvider>
    </div>
  );
}

export default App;
