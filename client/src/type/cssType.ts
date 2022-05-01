type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}deg ${number}% ${number}%)`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX | HSL;
