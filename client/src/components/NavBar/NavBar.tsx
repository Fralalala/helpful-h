import classes from "./NavBar.module.css";
import hh_logo from "../../assets/hh_logo.svg";
import { useLocation } from "react-router-dom";
import { ChangeEvent, useContext } from "react";
import {
  ColorContext,
  ColorContextInterface,
} from "../../context/ColorContext";

const NavBar = () => {
  const { setFilteredData, data, input, setInput } = useContext(
    ColorContext
  ) as ColorContextInterface;

  const location = useLocation();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    const filteredData = data.filter((element) =>
      element.toLowerCase().includes(newInput.toLowerCase())
    );

    setInput(newInput);
    setFilteredData(filteredData);
  };

  return (
    <div className={classes.base}>
      <img src={hh_logo} alt="company_logo" />

      {location.hash === "" && (
        <input
          className={classes.search}
          placeholder={"Search"}
          onChange={onInputChange}
          value={input}
        />
      )}
    </div>
  );
};

export default NavBar;
