// src/theme/breakpoints.js
const values = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  };
  
  const breakpoints = {
    values,
    up: (key) => `@media (min-width:${values[key]}px)`,
    down: (key) => `@media (max-width:${values[key]}px)`,
    between: (start, end) => `@media (min-width:${values[start]}px) and (max-width:${values[end]}px)`,
  };
  
  export default breakpoints;
  