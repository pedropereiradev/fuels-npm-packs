const commonTheme = {
  /* Fonts */
  '--fuel-font-family':
    '"Inter", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
  '--fuel-font-size': '16px',
  '--fuel-letter-spacing': '-0.64px',
  /* Spacing */
  '--fuel-border-radius': '6px',
  '--fuel-items-gap': '8px',
  /* Border */
  '--fuel-border': '1px solid var(--fuel-border-color)',
};

const lightTheme = {
  '--fuel-color': '#141414',
  '--fuel-color-bold': '#000000',
  '--fuel-dialog-background': 'white',
  '--fuel-overlay-background': 'rgba(71,88,107,0.24)',
  '--fuel-connector-background': 'rgb(250 250 250)',
  '--fuel-connector-hover': 'rgb(241 243 244)',
  '--fuel-border-color': 'hsl(210deg 9.52% 83.53%)',
  '--fuel-border-hover': 'hsla(0, 0%, 78.04%, 1)',
  '--fuel-button-background': 'rgb(250 250 250)',
  '--fuel-button-background-hover': 'rgb(203 205 207)',
  '--fuel-loader-background':
    'linear-gradient(to right, hsl(0, 0%, 92%) 8%, hsl(0, 0%, 85%) 18%, hsl(0, 0%, 92%) 33%)',
};

const darkTheme = {
  '--fuel-color': '#e4e7e7',
  '--fuel-color-bold': '#ffffff',
  '--fuel-dialog-background': 'rgb(25 26 26)',
  '--fuel-overlay-background': 'rgba(20, 20, 20, 0.8)',
  '--fuel-connector-background': 'rgb(30 30 30)',
  '--fuel-connector-hover': 'hsl(0deg 0% 18.77%)',
  '--fuel-border-color': 'hsl(0deg 0% 18.77%)',
  '--fuel-border-hover': 'hsla(0, 0%, 50%, 1)',
  '--fuel-button-background': 'hsla(0, 0%, 30%, 1)',
  '--fuel-button-background-hover': 'hsla(0, 0%, 40%, 1)',
  '--fuel-loader-background':
    'linear-gradient(to right, hsl(0, 0%, 20%) 8%, hsl(0, 0%, 25%) 18%, hsl(0, 0%, 20%) 33%)',
};

type CustomTheme = Partial<typeof commonTheme & typeof lightTheme>;

export const getThemeVariables = (
  theme: 'light' | 'dark' | string,
  customTheme?: CustomTheme,
) => {
  const colorTheme = theme === 'dark' ? darkTheme : lightTheme;
  return {
    ...commonTheme,
    ...colorTheme,
    ...customTheme,
  };
};
