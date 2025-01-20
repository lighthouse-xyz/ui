/* eslint-disable max-lines, no-magic-numbers */
import { PaletteMode } from "@mui/material";
import { createTheme, SimplePaletteColorOptions, Theme } from "@mui/material/styles";

import { breakpoints } from "./breakpoints";
import { getPalette } from "./palette";
import { borderRadius, pageLayout, tabMaxWidth, tabMinWidth } from "./style.const";

const shadowContained =
  "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)";

// eslint-disable-next-line max-lines-per-function
const getTheme = (mode: PaletteMode): Theme => {
  const palette = getPalette(mode).palette;

  return createTheme({
    palette,
    spacing: 4,
    typography: {
      fontFamily: "Inter, sans-serif, FK Grotesk Neue, Maison Neue Mono, IvyOra Display",
      h1: {
        fontSize: "96px",
        fontWeight: 700,
        lineHeight: "112px",
        letterSpacing: "-1.5px",
        "@media (max-width:744px)": {
          fontSize: "60px",
          lineHeight: "60px",
        },
        "@media (max-width:376px)": {
          fontSize: "36px",
          lineHeight: "40px",
        },
      },
      h2: {
        fontSize: "60px",
        fontWeight: 700,
        lineHeight: "72px",
        letterSpacing: "-0.5px",
      },
      h3: {
        fontSize: "48px",
        fontWeight: 700,
        lineHeight: "56px",
        letterSpacing: "0",
      },
      h4: {
        fontSize: "34px",
        fontWeight: 700,
        lineHeight: "40px",
        letterSpacing: "0.25px",
      },
      h5: {
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: "32px",
        letterSpacing: "0",
      },
      h6: {
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "32px",
        letterSpacing: "0.15px",
      },
      h7: {
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: "24px",
        letterSpacing: "0.15px",
      },
      h8: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "20px",
        letterSpacing: "0.15px",
      },
      h9: {
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "16px",
        letterSpacing: "0.15px",
      },
      body1: {
        //textField, placeholder
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
        letterSpacing: "0.15px",
      },
      body2: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: "0.15px",
      },
      caption: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "16px",
        letterSpacing: "0.4px",
      },
      overline: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "32px",
        letterSpacing: "1px",
      },
      button: {
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "0.4px",
        textTransform: "none",
        whiteSpace: "nowrap",
      },
      subtitle1: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "28px",
        letterSpacing: "0.15px",
      },
      subtitle2: {
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "24px",
        letterSpacing: "0.1px",
      },
      badgeLabel: {
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: "20px",
        letterSpacing: "0.14px",
      },
      h1FkGrotesk: {
        fontFamily: "FK Grotesk Neue",
        fontSize: "116px",
        fontWeight: 400,
        letterSpacing: "-0.05em",
        lineHeight: "100%",
        [`@media (max-width:${breakpoints.md}px)`]: {
          fontSize: "100px",
        },
        [`@media (max-width:${breakpoints.smMd}px)`]: {
          fontSize: "48px",
        },
      },
      h1IvyOra: {
        fontFamily: "IvyOra Display",
        fontStyle: "italic",
        fontSize: "120px",
        fontWeight: 500,
        letterSpacing: "-0.015em",
        lineHeight: "100%",
        [`@media (max-width:${breakpoints.md}px)`]: {
          fontSize: "105px",
        },
        [`@media (max-width:${breakpoints.smMd}px)`]: {
          fontSize: "52px",
        },
      },
      h2FkGrotesk: {
        fontFamily: "FK Grotesk Neue",
        fontSize: "52px",
        fontWeight: 400,
        letterSpacing: "-0.05em",
        lineHeight: "105%",
        [`@media (max-width:${breakpoints.smMd}px)`]: {
          fontSize: "26px",
        },
      },
      h2IvyOra: {
        fontFamily: "IvyOra Display",
        fontStyle: "italic",
        fontSize: "56px",
        fontWeight: 500,
        letterSpacing: "-0.015em",
        lineHeight: "105%",
        [`@media (max-width:${breakpoints.smMd}px)`]: {
          fontSize: "28px",
        },
      },
      p: {
        fontFamily: "FK Grotesk Neue",
        fontSize: "28px",
        fontWeight: 400,
        letterSpacing: "-0.05em",
        lineHeight: "32px",
        [`@media (max-width:${breakpoints.smMd}px)`]: {
          fontSize: "20px",
          lineHeight: "24px",
        },
      },
      button1: {
        fontFamily: "FK Grotesk Neue",
        fontSize: "44px",
        fontWeight: 400,
        letterSpacing: "-0.05em",
        lineHeight: "56px",
        [`@media (max-width:${breakpoints.smMd}px)`]: {
          fontSize: "24px",
          lineHeight: "28px",
        },
      },
    },
    breakpoints: {
      values: breakpoints,
    },
    shape: {
      borderRadius: borderRadius.theme,
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    components: {
      /* -- BUTTONS -- */
      MuiButton: {
        variants: [
          {
            props: { variant: "containedDark" },
            style: {
              color: palette.common?.white,
              backgroundColor: (palette.primary as SimplePaletteColorOptions)?.dark,
              "&:hover": {
                backgroundColor: (palette.primary as SimplePaletteColorOptions)?.dark,
                boxShadow: shadowContained,
              },
            },
          },
        ],
        styleOverrides: {
          root: {
            padding: "8px 16px",
          },
          containedPrimary: {
            background: (palette.primary as SimplePaletteColorOptions)?.gradient,
            color: palette.common?.white,
          },
          containedSecondary: {
            background: (palette.secondary as SimplePaletteColorOptions)?.gradient,
            color: palette.common?.white,
          },
          containedError: {
            "&:hover": {
              background: (palette.error as SimplePaletteColorOptions)?.main,
            },
          },
          containedInherit: {
            background: (palette.neutral as SimplePaletteColorOptions)?.shades?.["4p"],
            color: palette.text?.primary,
            boxShadow: "none",
            "&:hover": {
              background: (palette.neutral as SimplePaletteColorOptions)?.shades?.["4p"],
              boxShadow: "none",
            },
          },
          contained: {
            ":disabled": {
              background: palette.action?.disabledBackground,
            },
          },
          outlinedPrimary: {
            color: (palette.primary as SimplePaletteColorOptions)?.main,
            borderColor: (palette.primary as SimplePaletteColorOptions)?.main,
            background: "none",
          },
          outlinedSecondary: {
            color: palette.common?.white,
            borderColor: palette.common?.white,
            background: "none",
            "&:hover": {
              borderColor: palette.common?.white,
              background: palette.action?.hover,
            },
          },
          outlinedInherit: {
            color: palette.text?.secondary,
            borderColor: palette.text?.disabled,
            background: "none",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "24px",
          },
          text: {
            boxShadow: "none",
          },
          textPrimary: {
            color: (palette.primary as SimplePaletteColorOptions)?.main,
          },
          textSecondary: {
            color: palette.text?.primary,
          },
          sizeSmall: {
            fontSize: "13px",
            lineHeight: "24px",
            fontWeight: "500",
            letterSpacing: "0.46px",
            padding: "4px 10px",
            height: "32px",
            borderRadius: borderRadius.small,
          },
          outlinedSizeSmall: {
            padding: "3px 9px",
          },
          outlinedSizeMedium: {
            padding: "7px 15px",
          },
          sizeLarge: {
            padding: "12px 22px",
            fontSize: "15px",
            letterSpacing: "0.46px",
          },
          outlinedSizeLarge: {
            padding: "11px 21px",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.default,
            padding: "4px",
          },
          colorSecondary: {
            color: palette.common?.white,
            "&:hover": {
              color: palette.common?.white,
              background: palette.action?.hover,
            },
          },
          colorInherit: {
            color: palette.action?.active,
          },
          sizeMedium: {
            width: "32px",
            height: "32px",
            svg: {
              height: "24px",
              width: "24px",
            },
          },
          sizeLarge: {
            borderRadius: borderRadius.default,
            padding: "12px",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: palette.text?.primary,
            padding: "8px 16px",
            height: "40px",
            svg: {
              color: palette.action?.active,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            flexGrow: 1,
            maxWidth: "100%",
            boxShadow: "none",
            backgroundColor: palette.background?.appBar,
            backdropFilter: "blur(16px)",
            padding: `0 ${pageLayout.columnGap}`,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            "&&": {
              padding: `${pageLayout.paddingTop} 0`,
              minHeight: "60px",
            },
          },
        },
      },
      /* -- INPUT -- */
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            flexWrap: "nowrap",
          },
        },
      },
      /* -- LIST -- */
      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: "4px 16px",
            borderRadius: borderRadius.default,
            margin: "8px 0",
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            color: palette.text?.primary,
          },
          secondary: {
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.17px",
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "40px",
          },
        },
      },
      /* -- MENU -- */
      MuiMenu: {
        styleOverrides: {
          root: {
            boxShadow: "8px",
            borderRadius: borderRadius.default,
            "& .MuiMenu-paper": {
              borderRadius: borderRadius.default,
              padding: "16px",
              maxHeight: "320px",
            },
          },
          list: {
            padding: "0px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: "12px 16px",
            borderRadius: borderRadius.small,
          },
        },
      },
      /* -- CHIP (Tag) -- */
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.default,
          },
          label: {
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "16px",
            letterSpacing: "0.16px",
            padding: "0 6px",
          },
          deleteIcon: {
            marginLeft: "-4px",
            marginRight: "0",
          },
          sizeSmall: {
            height: "20px",
          },
          sizeMedium: {
            height: "30px",
            padding: "4px",
          },
          colorSecondary: {
            backgroundColor: (palette.primary as SimplePaletteColorOptions)?.shades?.["30p"],
            borderColor: (palette.primary as SimplePaletteColorOptions)?.shades?.["30p"],
            color: palette.text?.primary,
            "&.MuiChip-clickableColorSecondary": {
              "&:hover": {
                backgroundColor: (palette.primary as SimplePaletteColorOptions)?.shades?.["50p"],
                borderColor: (palette.primary as SimplePaletteColorOptions)?.shades?.["50p"],
              },
            },
          },
          outlinedPrimary: {
            backgroundColor: palette.pink?.[500],
            borderColor: palette.pink?.[500],
            color: palette.common?.white,
            borderRadius: borderRadius.large,
          },
          outlinedSecondary: {
            backgroundColor: palette.grey?.[600],
            borderColor: palette.grey?.[600],
            color: palette.common?.white,
            borderRadius: borderRadius.large,
          },
        },
      },
      /* -- TAB -- */
      MuiTab: {
        styleOverrides: {
          root: {
            minWidth: tabMinWidth,
            maxWidth: tabMaxWidth,
            ".MuiTouchRipple-root": {
              display: "none",
            },
          },
        },
      },
      /* -- ALERT -- */
      MuiAlert: {
        styleOverrides: {
          root: {
            padding: "6px 16px",
            gap: "12px",
            ".MuiAlert-action": {
              paddingTop: "2px",
            },
            ".MuiAlert-icon": {
              marginRight: "0px",
            },
          },
          filled: {
            color: "white",
            ".MuiIconButton-colorInherit": {
              color: "white",
            },
          },
        },
        variants: [
          {
            props: { color: "neutral" },
            style: {
              color: (palette.neutral as SimplePaletteColorOptions)?.dark,
              backgroundColor: (palette.neutral as SimplePaletteColorOptions)?.shades?.["4p"],
              ".MuiAlert-icon": {
                color: (palette.neutral as SimplePaletteColorOptions)?.dark,
              },
              ".MuiAlert-action": {
                color: (palette.neutral as SimplePaletteColorOptions)?.dark,
              },
            },
          },
          {
            props: { color: "primary", variant: "standard" },
            style: {
              color: (palette.primary as SimplePaletteColorOptions)?.shades?.["160p"],
              ".MuiAlert-action": {
                color: (palette.primary as SimplePaletteColorOptions)?.shades?.["160p"],
              },
            },
          },
        ],
      },
      /* -- TOOLTIP -- */
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: borderRadius.xsmall,
            fontSize: "12px",
            lineHeight: "16px",
            backgroundColor: palette.grey?.[600],
            opacity: 0.9,
            maxWidth: "400px",
          },
          arrow: {
            color: palette.grey?.[600],
          },
        },
      },
    },
  });
};

export { getTheme };
