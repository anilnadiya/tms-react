export const convertDotToComma = (value) => {
    if (typeof value === "number" || typeof value === "string") {
      return value.toString().replace(/\./g, ",");
    }
    return value; // Return the original value if it's not a number or string
  };
  