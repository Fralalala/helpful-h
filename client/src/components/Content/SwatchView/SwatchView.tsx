import { useEffect, useState } from "react";
import { Color } from "../../../type/cssType";
import ColorCard from "../../ColorCard/ColorCard";
import classes from "./SwatchView.module.css";
// @ts-ignore contains no type from npm
import hexToHsl from "hex-to-hsl";
// @ts-ignore contains no type from npm
import hslToHex from "hsl-to-hex";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidHexColor } from "../../../helper/colorHelper";

const SwatchView = () => {
  const [shades, setShades] = useState<Color[][]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const generateShades = (color: Color) => {
    const [h, s, l]: number[] = hexToHsl(color);
    const newShades: Color[][] = [];

    for (let i = 1; i <= 5; i++) {
      const hsl = `hsl(${h}deg ${s}% ${l - i * 8}%)`;
      newShades.push([hsl, hslToHex(h, s, l - i * 8)]);
    }

    setShades(newShades);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const color: string = url.hash.split("/")[0];

    if (isValidHexColor(color)) {
      setSelectedColor(color as Color);
      generateShades(color as Color);
    }
  }, [location]);

  const onClearClick = () => navigate("/");

  return (
    <div className={classes.base}>
      <ColorCard featuredColor={selectedColor} />

      <div className={classes.shade_list}>
        {shades &&
          shades.map((shade) => (
            <ColorCard featuredColor={shade[0]} footerText={shade[1]} />
          ))}
      </div>

      <motion.button
        whileHover={{
          color: "#2e2e2e",
          scale: 1.03,
          textDecoration: "underline",
        }}
        transition={{ duration: 0.2 }}
        className={classes.clear_btn}
        onClick={onClearClick}
      >
        Clear
      </motion.button>
    </div>
  );
};

export default SwatchView;
