/* Initializing test environment with global variables that are injected into all tests. */
import "@testing-library/jest-dom";
import "jest-canvas-mock";

import crypto from "crypto";
import { TextDecoder, TextEncoder } from "util";

const cryptoMock = {
  getRandomValues: (arr: []) => crypto.randomBytes(arr.length),
} as Crypto;

class IntersectionObserverMock implements IntersectionObserver {
  public readonly root: Element | null = null;
  public readonly rootMargin: string = "";
  public readonly thresholds: ReadonlyArray<number> = [];
  public takeRecords: () => IntersectionObserverEntry[] = () => [];
  public disconnect: () => void = () => null;
  public observe: (target: Element) => void = () => null;
  public unobserve: (target: Element) => void = () => null;
}

class TextDecoderMock implements TextDecoder {
  public readonly encoding: string = "";
  public readonly fatal: boolean = true;
  public readonly ignoreBOM: boolean = true;
  public decode: () => string = () => "";
}

global.crypto = cryptoMock;
global.IntersectionObserver = IntersectionObserverMock;
global.TextDecoder = TextDecoderMock;
global.TextEncoder = TextEncoder;
