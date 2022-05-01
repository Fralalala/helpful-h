import { useContext, useEffect, useState } from "react";
import { Color } from "../../../type/cssType";
import ColorCard from "../../ColorCard/ColorCard";
import classes from "./ListView.module.css";
import { motion } from "framer-motion";
import {
  ColorContext,
  ColorContextInterface,
} from "../../../context/ColorContext";

const ListView = () => {
  const { data, filteredData, input } = useContext(
    ColorContext
  ) as ColorContextInterface;

  const [currentPage, setCurrentPage] = useState(1);
  const [slicedData, setSlicedData] = useState<Color[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const sliceColors = () => {
    const refData = input ? filteredData : data;

    setSlicedData(
      refData.slice(
        currentPage === 1 ? 0 : (currentPage - 1) * 12,
        Math.min(currentPage * 12, refData.length)
      )
    );
  };

  const onPageClick = (value: number) => setCurrentPage(value);

  useEffect(() => {
    const refData = input ? filteredData : data;
    setTotalPages(Math.max(Math.ceil(refData.length / 12), 1));
  }, []);

  useEffect(() => {
    sliceColors();
  }, [currentPage, input]);

  return (
    <div className={classes.base}>
      <div className={classes.card_list}>
        {slicedData.map((_data) => (
          <ColorCard
            featuredColor={_data}
            style={{
              flex: "1 0 24%",
              height: 224,
              minWidth: "130px",
              maxWidth: "25%",
            }}
            contentStyle={{ maxHeight: 268 }}
          />
        ))}
      </div>

      <div className={classes.pagination_container}>
        {Array.from({ length: totalPages }, (x, i) => i).map((page) => (
          <motion.div
            whileHover={{
              color: "#2e2e2e",
              scale: 1.1,
            }}
            transition={{ duration: 0.2 }}
            className={classes.page_number}
            onClick={() => onPageClick(page + 1)}
            style={{
              textDecoration:
                currentPage === page + 1 ? "underline" : undefined,
            }}
          >
            {page + 1}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
