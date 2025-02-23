import { createTheme } from '@mui/material/styles';

import colors from '../assets/scss/_themeVariables.module.scss';
import themeOverrides from './themeOverride';
import themePalette from './palette';
import themeTypography from './typography';


/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = themeOverrides(themeOption);

  return themes;
};

export default theme;
