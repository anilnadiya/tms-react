/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
export default function themePalette(theme) {
    return {
      primary: {
        main: theme.colors.primary
      },
      text: {
        error: theme.colors.error,
      },
    };
  }
  