import React from "react";

export function useSyncChromeStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    chrome.storage.local
      .get(key)
      .then(data => {
        setValue(data[key] as T);
      })
      .catch(error => {
        console.error(`Could not get the ${key} in chrome storage`, error);
      });
  }, [key]);

  const wrappedSetValue = React.useCallback(
    (newValue: React.SetStateAction<T>) => {
      if (newValue) {
        chrome.storage.local
          .set({
            [key]: newValue,
          })
          .catch(error => {
            console.error(`Could not set the ${key} in chrome storage`, error);
          });
      } else {
        chrome.storage.local.remove(key).catch(error => {
          console.error(`Could not remove ${key} in local storage`, error);
        });
      }

      setValue(newValue);
    },
    [key, setValue],
  );

  React.useEffect(() => {
    chrome.storage.local.onChanged.addListener(changes => {
      if (key in changes && changes[key].oldValue !== changes[key].newValue) {
        setValue(changes[key].newValue as T);
      }
    });
  }, [key]);

  return [value, wrappedSetValue];
}
