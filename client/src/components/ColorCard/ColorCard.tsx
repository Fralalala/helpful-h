import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Color } from "../../type/cssType";
import classes from "./ColorCard.module.css";
import { motion } from "framer-motion";
// @ts-ignore np types
import hslToHex from "hsl-to-hex";

type Props = {
  className?: string;
  featuredColor: Color | null;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  footerText?: string;
  disableAnimate?: boolean;
};

const ColorCard = ({
  className,
  featuredColor,
  style,
  contentStyle,
  footerStyle,
  footerText,
  disableAnimate,
}: Props) => {
  const navigate = useNavigate();

  const onColorClick = () => {
    if (!featuredColor?.includes("hsl"))
      return navigate(`/color/${featuredColor}`);

    let hsl;

    if (featuredColor) {
      hsl = featuredColor
        .replaceAll("hsl(", "")
        .replaceAll("deg", "")
        .replaceAll("%", "")
        .replaceAll(")", "")
        .split(" ");
    } else hsl = null;

    if (hsl) navigate(`/color/${hslToHex(+hsl[0], +hsl[1], +hsl[2])}`);
  };

  return (
    <motion.div
      transition={{ duration: disableAnimate ? undefined : 0.2 }}
      whileHover={{ scale: disableAnimate ? undefined : 1.03 }}
      className={`${classes.base} ${className || ""}`}
      style={{ ...style }}
    >
      <div
        className={classes.color_content}
        style={{
          backgroundColor: featuredColor ? featuredColor : undefined,
          ...contentStyle,
        }}
        onClick={onColorClick}
      />

      <div className={classes.card_footer} style={{ ...footerStyle }}>
        {featuredColor ? (
          <>{footerText ? footerText : featuredColor}</>
        ) : (
          <>Selected Color is not valid</>
        )}
      </div>
    </motion.div>
  );
};

export default ColorCard;
