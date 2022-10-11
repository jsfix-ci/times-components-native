//Flatten array to obj
const arrayToObj = (arg: any) =>
  !Array.isArray(arg)
    ? arg
    : arg.reduce((acc, obj) => ({ ...acc, ...obj }), {});

export default arrayToObj;
