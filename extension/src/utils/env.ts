import { lighthouseApis, lighthouseSites } from "../hosts";

type Environment = "local" | "dev" | "prod";

function getEnvFromConfigVariables(): Environment {
  if (process.env.__LOCAL__ === "true") {
    return "local";
  }

  if (process.env.__DEV__ === "true") {
    return "dev";
  }

  return "prod";
}

export function getEnv(): Environment {
  return (process.env.REACT_APP_ENV as Environment) || getEnvFromConfigVariables();
}

export function getApiUrlBasedOnEnv(): string {
  let lighthouseApiFromEnv: string;
  switch (getEnv()) {
    case "local":
      lighthouseApiFromEnv = lighthouseApis.local;
      break;
    case "dev":
      lighthouseApiFromEnv = lighthouseApis.dev;
      break;
    default:
      lighthouseApiFromEnv = lighthouseApis.prod;
      break;
  }

  return lighthouseApiFromEnv;
}

export function getEnvBasedOnConfigValues(): string {
  let lighthouseWebsiteFromEnv: string;
  switch (process.env.REACT_APP_ENV || getEnvFromConfigVariables()) {
    case "local":
      lighthouseWebsiteFromEnv = lighthouseSites.local;
      break;
    case "dev":
      lighthouseWebsiteFromEnv = lighthouseSites.dev;
      break;
    default:
      lighthouseWebsiteFromEnv = lighthouseSites.prod;
      break;
  }

  return lighthouseWebsiteFromEnv;
}
