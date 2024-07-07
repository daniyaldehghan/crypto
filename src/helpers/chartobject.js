const conver = (data, type) => {
  const converData = data[type].map((i) => {
    return {
      data: i[0],
      [type]: i[1],
    };
  });
  return converData;
};
export { conver };
