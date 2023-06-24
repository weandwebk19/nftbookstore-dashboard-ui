import "@fontsource/poppins";
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#292929",
      light: "#424242",
      dark: "#101010",
      contrastText: "#e6e6e6",
    },
    secondary: {
      main: "#e6e6e6",
      light: "#fafafa",
      dark: "#bdbdbd",
      contrastText: "#292929",
    },
  },
  background: {
    paper: "#e6e6e6",
    default: "#e6e6e6",
  },
  shadows: Array(25).fill("none"),
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Poppins', 'sans-serif'",
    fontSize: 14,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightBold: 700,
    h6: {
      fontWeight: 700,
      fontSize: "1rem",
    },
  },
});
