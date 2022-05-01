const isValidHexColor = (color: string) => {
  const reg = /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;

  return reg.test(color);
};
export { isValidHexColor };
