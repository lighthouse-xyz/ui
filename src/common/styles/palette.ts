import { PaletteMode } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles";

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "rgba(124,58,237,1)",
    light: "rgba(150,97,240,1)",
    dark: "rgba(86,40,165,1)",
    gradient: "linear-gradient(290.57deg, #8732F8 -0.7%, #C95FFD 97.09%, #EC77FF 148.31%)",
    contrastText: "rgba(255,255,255,1)",
    shades: {
      "4p": "rgba(124,58,237,0.04)",
      "12p": "rgba(124,58,237,0.12)",
      "30p": "rgba(124,58,237,0.30)",
      "50p": "rgba(124,58,237,0.50)",
      "160p": "rgba(86,40,165,1)",
      "190p": "rgba(234,222,252,1)",
    },
  },
  secondary: {
    main: "rgba(234,74,250,1)",
    light: "rgba(238,110,251,1)",
    dark: "rgba(163,51,175,1)",
    gradient: "linear-gradient(288.88deg, #E832F8 -0.71%, #F093FF 100%)",
    contrastText: "rgba(255,255,255,1)",
  },
  text: {
    primary: "rgba(0,0,0,0.87)",
    secondary: "rgba(0,0,0,0.60)",
    disabled: "rgba(0,0,0,0.38)",
  },
  info: {
    main: "rgba(0,125,255,1)",
    light: "rgba(94,159,224,1)",
    dark: "rgba(0,87,178,1)",
    contrastText: "rgba(255,255,255,1)",
    shades: {
      "160p": "rgba(37,63,89,1)",
      "190p": "rgba(222,239,249,1)",
    },
  },
  error: {
    main: "rgba(244,67,54,1)",
    light: "rgba(210,90,130,1)",
    dark: "rgba(170,170,170,1)",
    contrastText: "rgba(255,255,255,1)",
    shades: {
      "160p": "rgba(84,36,52,1)",
      "190p": "rgba(249,227,227,1)",
    },
  },
  warning: {
    main: "rgba(255,152,0,1)",
    light: "rgba(255,183,77,1)",
    dark: "rgba(245,124,0,1)",
    contrastText: "rgba(255,255,255,1)",
    shades: {
      "160p": "rgba(102,73,30,1)",
      "190p": "rgba(253,242,232,1)",
    },
  },
  success: {
    main: "rgba(76,175,80,1)",
    light: "rgba(129,199,132,1)",
    dark: "rgba(56,142,60,1)",
    contrastText: "rgba(255,255,255,1)",
    shades: {
      "4p": "rgba(46,125,50,0.04)",
      "30p": "rgba(46,125,50,0.30)",
      "160p": "rgba(51,79,52,1)",
      "190p": "rgb(230,239,230,1)",
    },
  },
  neutral: {
    main: "rgba(0,0,0,0.6)",
    light: "rgba(0,0,0,0.38)",
    dark: "rgba(0,0,0,0.87)",
    contrastText: "rgba(255,255,255,1)",
    shades: {
      "4p": "rgba(0,0,0,0.04)",
    },
  },
  background: {
    default: "rgba(255,255,255,1)",
    paper: "rgba(255,255,255,1)",
    darker: "rgba(247,247,247,1)",
    transparent: "rgba(255,255,255,0.50)",
    appBar: "rgba(255,255,255,0.80)",
    starVideoFallback: "rgba(15,9,97,1)",
  },
  action: {
    active: "rgba(0,0,0,0.54)",
    hover: "rgba(0,0,0,0.04)",
    selected: "rgba(0,0,0,0.08)",
    disabled: "rgba(0,0,0,0.26)",
    disabledBackground: "rgba(0,0,0,0.12)",
    focus: "rgba(0,0,0,0.12)",
  },
  divider: "rgba(0,0,0,0.12)",
  border: {
    main: "rgba(0,0,0,0.23)",
    gradient:
      "linear-gradient(90deg, #825BFC 0.52%, #895CFF 4.22%, #B96EFF 17.2%, #FEA01C 30.63%, #EED900 40.67%, #D3FE3B 47.4%, #D3FE3B 55.21%, #D8EF9F 58.76%, #D0CFD7 67.81%, #8084FA 84.33%, #6A6AFF 100%)",
  },
  common: {
    white: "rgba(255,255,255,1)",
    black: "rgba(0,0,0,1)",
  },
  deepPurple: {
    100: "rgba(209,196,233,1)",
    200: "rgba(179,157,219,1)",
    500: "rgba(103,58,183,1)",
    600: "rgba(94,53,177,1)",
    700: "rgba(81,45,168,1)",
    900: "rgba(49,27,146,1)",
  },
  pink: {
    500: "rgba(233,30,99,1)",
  },
  grey: {
    600: "rgba(117,117,117,1)",
    900: "rgba(33,33,33,1)",
  },
  contrastThreshold: 4.5,
};

const darkPalette: PaletteOptions = {
  ...lightPalette,
  mode: "dark",
  primary: {
    main: "rgba(158,98,255,1)",
    light: "rgba(197,161,255,1)",
    dark: "rgba(127,47,255,1)",
    gradient: "linear-gradient(290.57deg, #8732F8 -0.7%, #C95FFD 97.09%, #EC77FF 148.31%)",
    contrastText: "rgba(0,0,0,1)",
    shades: {
      "4p": "rgba(158,98,255,0.08)",
      "12p": "rgba(158,98,255,0.12)",
      "30p": "rgba(158,98,255,0.30)",
      "50p": "rgba(158,98,255,0.50)",
      "160p": "rgba(197,161,255,1)",
      "190p": "rgba(5,0,14,1)",
    },
  },
  secondary: {
    main: "rgba(247,170,255,1)",
    light: "rgba(248,187,255,1)",
    dark: "rgba(172,118,178,1)",
    gradient: "linear-gradient(288.88deg, #E832F8 -0.71%, #F093FF 100%)",
    contrastText: "rgba(0,0,0,1)",
  },
  text: {
    primary: "rgba(255,255,255,1)",
    secondary: "rgba(255,255,255,0.70)",
    disabled: "rgba(255,255,255,0.50)",
  },
  info: {
    main: "rgba(41,182,246,1)",
    light: "rgba(79,195,247,1)",
    dark: "rgba(2,136,209,1)",
    contrastText: "rgba(0,0,0,0.87)",
    shades: {
      "160p": "rgba(184,231,251,1)",
      "190p": "rgba(0,8,13,1)",
    },
  },
  error: {
    main: "rgba(244,67,54,1)",
    light: "rgba(229,115,115,1)",
    dark: "rgba(211,47,47,1)",
    contrastText: "rgba(255,255,255,1)",
    shades: {
      "160p": "rgba(244,199,199,1)",
      "190p": "rgba(22,8,6,1)",
    },
  },
  warning: {
    main: "rgba(255,167,38,1)",
    light: "rgba(255,183,77,1)",
    dark: "rgba(245,124,0,1)",
    contrastText: "rgba(0,0,0,0.87)",
    shades: {
      "160p": "rgba(255,226,183,1)",
      "190p": "rgba(25,17,6,1)",
    },
  },
  success: {
    main: "rgba(102,187,106,1)",
    light: "rgba(129,199,132,1)",
    dark: "rgba(56,142,60,1)",
    contrastText: "rgba(0,0,0,0.87)",
    shades: {
      "4p": "rgba(102,187,106,0.04)",
      "30p": "rgba(102,187,106,0.30)",
      "160p": "rgba(204,232,205,1)",
      "190p": "rgba(12,19,12,1)",
    },
  },
  neutral: {
    main: "rgba(255,255,255,1)",
    light: "rgba(255,255,255,0.7)",
    dark: "rgba(255,255,255,0.50)",
    shades: {
      "4p": "rgba(255,255,255,0.04)",
    },
  },
  action: {
    active: "rgba(255,255,255,0.56)",
    hover: "rgba(255,255,255,0.08)",
    selected: "rgba(255,255,255,0.16)",
    disabled: "rgba(255,255,255,0.30)",
    disabledBackground: "rgba(255,255,255,0.12)",
    focus: "rgba(255,255,255,0.12)",
  },
  divider: "rgba(255,255,255,0.12)",
  border: {
    main: "rgba(255,255,255,0.23)",
    gradient:
      "linear-gradient(90deg, #825BFC 0.52%, #895CFF 4.22%, #B96EFF 17.2%, #FEA01C 30.63%, #EED900 40.67%, #D3FE3B 47.4%, #D3FE3B 55.21%, #D8EF9F 58.76%, #D0CFD7 67.81%, #8084FA 84.33%, #6A6AFF 100%)",
  },
  background: {
    default: "rgba(29,29,29,1)",
    paper: "rgba(29,29,29,1)",
    darker: "rgba(39,39,39,1)",
    transparent: "rgba(0,0,0,0.50)",
    appBar: "rgba(0,0,0,0.80)",
    starVideoFallback: "rgba(15, 9, 97, 1)",
  },
};

const getPalette = (mode: PaletteMode): { palette: PaletteOptions } => ({
  palette: {
    mode,
    ...(mode === "light" ? lightPalette : darkPalette),
  },
});

export { getPalette };
