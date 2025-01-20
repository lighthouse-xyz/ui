const localStorageKeys = {
  colorMode: "colorMode",
  cookiesDisabled: "cookiesDisabled",
  extensionAlertDismissed: "extensionAlertDismissed",
  extensionBannerDismissed: "extensionBannerDismissed",
  isCypressContext: "isCypressContext",
  onboarding: "onboarding",
  referralsAlertDismissed: "referralsAlertDismissed",
  token: "token",
  unauthorized: "unauthorized",
};

function getLocalStorage<T>(key: string, initialValue: T): T {
  try {
    const value: string | null = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : initialValue;
  } catch (e) {
    return initialValue;
  }
}

function setLocalStorage<T>(key: string, value: T | null): void {
  try {
    if (value !== null) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export { getLocalStorage, localStorageKeys, setLocalStorage };
