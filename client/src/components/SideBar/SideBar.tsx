import React, { useContext } from "react";
import classes from "./SideBar.module.css";
import SideBarRow from "./SideBarRow/SideBarRow";
import { motion } from "framer-motion";
import {
  ColorContext,
  ColorContextInterface,
} from "../../context/ColorContext";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const { data } = useContext(ColorContext) as ColorContextInterface;

  const onRandomColorClick = () => {
    const randomIndex = Math.floor(Math.random() * data.length);

    navigate(`/color/${data[randomIndex].hex}`);
  };

  return (
    <div className={classes.base}>
      <motion.div
        whileHover={{
          color: "#2e2e2e",
          scale: 1.03,
          textDecoration: "underline",
        }}
        transition={{ duration: 0.2 }}
        className={classes.random_btn}
        onClick={onRandomColorClick}
      >
        Random Color
      </motion.div>

      <SideBarRow title={"Red"} hoverColor={"#ff6666"} />
      <SideBarRow title={"Orange"} hoverColor={"#ffb266"} />
      <SideBarRow title={"Yellow"} hoverColor={"#d9ce00"} />
      <SideBarRow title={"Green"} hoverColor={"#2a9b00"} />
      <SideBarRow title={"Blue"} hoverColor={"#228cd3"} />
      <SideBarRow title={"Purple"} hoverColor={"#ab66ff"} />
      <SideBarRow title={"Brown"} hoverColor={"#eab67b"} />
      <SideBarRow title={"Grey"} hoverColor={"#7c7c7c"} />
    </div>
  );
};

export default SideBar;
