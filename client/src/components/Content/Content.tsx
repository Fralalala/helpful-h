import classes from "./Content.module.css";
import SwatchView from "./SwatchView/SwatchView";
import { Routes, Route } from "react-router-dom";
import ListView from "./ListView/ListView";

const Content = () => {
  return (
    <div className={classes.base}>
      <Routes>
        <Route caseSensitive path="/color" element={<SwatchView />} />
        <Route caseSensitive path="/" element={<ListView />} />
      </Routes>
    </div>
  );
};

export default Content;
