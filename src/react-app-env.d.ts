/// <reference types="react-scripts" />

import "react-i18next";
import "i18next";

import React from "react";
import type { XRSystem } from "webxr";

import { defaultNS, resources } from "./locales/i18n";

/* eslint-disable @typescript-eslint/naming-convention */
export interface PaletteColorShades {
  "4p"?: string;
  "8p"?: string;
  "12p"?: string;
  "30p"?: string;
  "30pRipple"?: string;
  "50p"?: string;
  "160p"?: string;
  "190p"?: string;
}

export declare module "@mui/material/styles" {
  interface TypographyVariants {
    h7: React.CSSProperties;
    h8: React.CSSProperties;
    h9: React.CSSProperties;
    badgeLabel: React.CSSProperties;
    h1FkGrotesk: React.CSSProperties;
    h1IvyOra: React.CSSProperties;
    h2FkGrotesk: React.CSSProperties;
    h2IvyOra: React.CSSProperties;
    p: React.CSSProperties;
    button1: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h7?: React.CSSProperties;
    h8?: React.CSSProperties;
    h9?: React.CSSProperties;
    badgeLabel?: React.CSSProperties;
    h1FkGrotesk?: React.CSSProperties;
    h1IvyOra?: React.CSSProperties;
    h2FkGrotesk?: React.CSSProperties;
    h2IvyOra?: React.CSSProperties;
    p?: React.CSSProperties;
    button1?: React.CSSProperties;
  }

  interface BreakpointOverrides {
    smMd: true;
    mdLg: true;
    mobile: true;
    collapsed: true;
    collapsedVr: true;
    lgVr: true;
    xlVr: true;
    twoCards: true;
    threeCards: true;
    fourCards: true;
    fiveCards: true;
    twoCardsVr: true;
    threeCardsVr: true;
    fourCardsVr: true;
    fiveCardsVr: true;
    containedPage: true;
  }

  interface PaletteColor {
    darker?: string;
    gradient?: string;
    shades?: PaletteColorShades;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
    gradient?: string;
    shades?: PaletteColorShades;
  }

  interface Palette {
    neutral: Palette["primary"];
    pink: Palette["grey"];
    deepPurple: Palette["grey"];
    border: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    pink: PaletteOptions["grey"];
    deepPurple: PaletteOptions["grey"];
    border: PaletteOptions["primary"];
  }

  interface TypeBackground {
    transparent: string;
    appBar: string;
    starVideoFallback: string;
    darker: string;
  }
}

export declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h7: true;
    h8: true;
    h9: true;
    badgeLabel: true;
    h1FkGrotesk: true;
    h1IvyOra: true;
    h2FkGrotesk: true;
    h2IvyOra: true;
    p: true;
    button1: true;
  }
}

export declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    primary: true;
    neutral: true;
  }
}

export declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    containedDark: true;
  }
}

export declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

export interface Navigator {
  xr?: XRSystem | undefined;
}
