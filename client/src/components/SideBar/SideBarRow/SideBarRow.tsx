import React from "react";
import classes from "./SideBarRow.module.css";
import { motion } from "framer-motion";
import { Color } from "../../../type/cssType";

type Props = {
  title: string;
  hoverColor: Color;
};

const SideBarRow = ({ title, hoverColor }: Props) => {
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
    >
      {title}
    </motion.div>
  );
};

export default SideBarRow;
