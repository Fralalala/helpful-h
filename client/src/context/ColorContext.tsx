import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Color } from "../type/cssType";

type Props = {
  children?: React.ReactNode;
};

export interface ColorData {
  hue: number;
  saturation: number;
  light: number;
  hex: Color
}

export interface ColorContextInterface {
  data: ColorData[];
  setData: React.Dispatch<React.SetStateAction<ColorData[]>>;
  filteredData: ColorData[];
  setFilteredData: React.Dispatch<React.SetStateAction<ColorData[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorContext = createContext<ColorContextInterface | null>(null);

export const ColorContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<ColorData[]>([]);
  const [filteredData, setFilteredData] = useState<ColorData[]>([]);
  const [input, setInput] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!isInitialized)
      axios.get("https://hh-json-server.herokuapp.com/colors?query=query colors{hex}&operationName=RootQueryType").then((res) => {
        setData(res.data);
        console.log(res.data)
        setIsInitialized(true);
      });
  }, []);

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
