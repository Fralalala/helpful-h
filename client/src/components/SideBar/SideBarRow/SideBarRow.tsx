import React, { useContext } from "react";
import classes from "./SideBarRow.module.css";
import { motion } from "framer-motion";
import { Color } from "../../../type/cssType";
import {
  ColorContext,
  ColorContextInterface,
} from "../../../context/ColorContext";

type Props = {
  title: string;
  hoverColor: Color;
};

const SideBarRow = ({ title, hoverColor }: Props) => {
  const { setSelectedGroup } = useContext(
    ColorContext
  ) as ColorContextInterface;

  const onRowClick = () => {
    if (title.toLowerCase() === "all") setSelectedGroup("");
    else setSelectedGroup(title.toLowerCase());
  };

  return (
    <motion.div
      whileHover={{
        backgroundColor: ["#ededed", hoverColor],
        color: "#2e2e2e",
        scale: 1.03,
      }}
      transition={{ duration: 0.2 }}
      className={classes.base}
      style={{ color: hoverColor }}
      onClick={onRowClick}
    >
      {title}
    </motion.div>
  );
};

export default SideBarRow;
