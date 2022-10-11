
//Flatten array to obj
export const arrayToObj = (arg: any) =>
  !Array.isArray(arg)
    ? arg
    : arg.reduce((acc, obj) => ({ ...acc, ...obj }), {});
