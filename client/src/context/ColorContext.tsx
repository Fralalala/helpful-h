import React, { createContext, useState } from "react";
import { Color } from "../type/cssType";

type Props = {
  children?: React.ReactNode;
};

export interface ColorContextInterface {
  data: Color[];
  setData: React.Dispatch<React.SetStateAction<Color[]>>;
  filteredData: Color[];
  setFilteredData: React.Dispatch<React.SetStateAction<Color[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorContext = createContext<ColorContextInterface | null>(null);

export const ColorContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<Color[]>([
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80aa",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
    "#7f80ff",
  ]);
  const [filteredData, setFilteredData] = useState<Color[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <ColorContext.Provider
      value={{
        data,
        setData,
        filteredData,
        setFilteredData,
        input,
        setInput,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
