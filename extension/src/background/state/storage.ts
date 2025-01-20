import { storageKeys } from "@extension/common/storage";

export class LocalStorageState {
  public static async getIsTracking(): Promise<boolean | undefined> {
    const value = (await chrome.storage.local.get(storageKeys.isTracking)).isTracking as string | undefined;

    return value?.toLowerCase() === "true";
  }

  public static async getToken(): Promise<string | undefined> {
    return (await chrome.storage.local.get(storageKeys.token)).token as string | undefined;
  }

  public static async getUserId(): Promise<string | undefined> {
    return (await chrome.storage.local.get(storageKeys.userId)).userId as string | undefined;
  }

  public static async setIsTracking(value: boolean): Promise<void> {
    return this.setValue(storageKeys.isTracking, value);
  }

  public static async setToken(token: string | null): Promise<void> {
    return this.setValue(storageKeys.token, token);
  }

  public static async setUserId(userId: string | null): Promise<void> {
    return this.setValue(storageKeys.userId, userId);
  }

  private static async setValue(key: string, value: string | boolean | null): Promise<void> {
    console.log(`Setting ${key} to ${String(value)}`);
    if (value) {
      await chrome.storage.local
        .set({
          [key]: value.toString(),
        })
        .catch(error => {
          console.error(`Could not set ${key} in local storage`, error);
        });
    } else {
      await chrome.storage.local.remove(key).catch(error => {
        console.error(`Could not reset ${key} in local storage`, error);
      });
    }
  }
}
