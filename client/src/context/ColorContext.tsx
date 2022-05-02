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
  hex: Color;
  group: string;
}

export interface ColorContextInterface {
  data: ColorData[];
  setData: React.Dispatch<React.SetStateAction<ColorData[]>>;
  filteredData: ColorData[];
  setFilteredData: React.Dispatch<React.SetStateAction<ColorData[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  groupCollection: {
    [key: string]: ColorData[];
  };
  selectedGroup: string;
  setSelectedGroup: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorContext = createContext<ColorContextInterface | null>(null);

export const ColorContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<ColorData[]>([]);
  const [filteredData, setFilteredData] = useState<ColorData[]>([]);
  const [input, setInput] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [groupCollection, setGroupCollection] = useState<{
    [key: string]: ColorData[];
  }>({});
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  useEffect(() => {
    if (!isInitialized)
      axios.get("https://hh-json-server.herokuapp.com/colors").then((res) => {
        const response: ColorData[] = res.data;

        setData(res.data);
        console.log(res.data);

        const collection: {
          [key: string]: ColorData[];
        } = {};

        response.forEach((color) => {
          if (collection[color.group]) {
            collection[color.group].push(color);
          } else {
            collection[color.group] = [color];
          }
        });

        setGroupCollection(collection);

        console.log(collection);

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
        groupCollection,
        selectedGroup,
        setSelectedGroup,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
