/* global chrome */

export function setAlarmsToPeriodicallyWakeExtension(): void {
  void chrome.alarms.create({ periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener(() => undefined);
}
