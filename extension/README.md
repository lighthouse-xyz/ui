# Lighthouse Chrome Extension

> This project was started from [Chrome Extension Boilerplate with
React + Vite + TypeScript](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)

## How it works

### Architecture

The extension has 2 main parts: frontend and backend

#### Frontend

The frontend is built with React components, very similar to the rest of the UI. It also communicates
with the backend in two ways:

- By setting values in local storage
- By sending messages that are handled by the backend script

#### Backend

The extension backend (background script) is built with 4 main parts:

**State**: that keeps values in memory and in local storage. Token and user id in local storage
and the tabs to track in memory

**Scan**: which looks at all tabs, decides which one to track and stored their ids in state

**Auth**: which uses the output of the scan stored in the state to try to steal a token from Lighthouse and trade it
for a long-lived extension token

**Process**: which uses the output of the scan stored in the state to send regular tracking events

### Runtime

A click, a browser boot, the 1 minute cron wake-up alarm will have start the extension.
Chrome can kill it at any point in time, nothing we can do about it.

The Scan will:
- Scans all tabs to find Metaverses and Lighthouse (based on the env).
- Keep the last metaverse tab that it saw to track it (active tab will win if it's a metaverse, if not, last in order). 
- Also fetch the tracking config at that point.
- Create listeners that will update the tracked tab

The auth will:
- Try to grab a token from Lighthouse every 2 seconds

The Process will:
- Track the active tab from the state every 15 seconds

## Installation

```
cd extension (if starting from the root of the repo)
npm i
```

## Developing

```
npm run start:local
npm run start:dev
npm run start:prod
```

Once built, you can load the extension in Chrome:

1. Open [chrome://extensions](chrome://extensions)
2. Check "Developer mode" on the top right
3. Click "Load unpacked"
4. Find the path to the "dist" folder, right in this clone repo folder
5. That's it!

Hot Reload works with the popup, but here are the steps to ensure a 100% refresh of the background script:

1. Open the extension details
2. Click "Update"

### Tips to access the Inspect popup

You'll notice that the console logs and network calls done by the extension are not shown in the 
regular Inspect popup. You will need the one from the extension directly by right-clicking on its icon.

Annoyingly, that popup will close every time focus is changed to a different tab.

Pro tip:
- Open a new empty browser window
- Right-click the extension there to open an Inspect popup
- Open another browser to do your work
- When you need to update the extension background script, update it from the first window where you can
leave the manage extension page open for ease of use.
- After updating, reopen the Inspect popup from this window again.

## Building for a Chrome release

```
npm run build
```

Exact steps tbd
