import { setAlarmsToPeriodicallyWakeExtension } from "@extension/background/alarms";
import { setupStealingCron } from "@extension/background/auth/cron";
import { setupTrackingCron, trackCurrentUrl } from "@extension/background/process/cron";
import { setProcessTabListeners } from "@extension/background/scan/listener";
import { processAllTabsWithActiveLast } from "@extension/background/scan/process-tab";
import { initIsTracking, initIsTrackingSyncWithPopup } from "@extension/background/state/sharing-config";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

setProcessTabListeners();

initIsTrackingSyncWithPopup();
void initIsTracking();

setAlarmsToPeriodicallyWakeExtension();

processAllTabsWithActiveLast(trackCurrentUrl);
setupTrackingCron();
void setupStealingCron();
