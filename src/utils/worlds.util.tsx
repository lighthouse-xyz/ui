import React from "react";

import getTitleCase from "./convert-camel-case-to-title-case.util";
import { ReactComponent as AriumLogo } from "@src/assets/logos/arium-logo.svg";
import { ReactComponent as ArtifexUnrealLogo } from "@src/assets/logos/artifexunreal-logo.svg";
import { ReactComponent as AstraLogo } from "@src/assets/logos/astra-logo.svg";
import { ReactComponent as CreateraLogo } from "@src/assets/logos/createra-logo.svg";
import { ReactComponent as DecentralandLogo } from "@src/assets/logos/decentraland-logo.svg";
import { ReactComponent as EtherealLogo } from "@src/assets/logos/ethereal-logo.svg";
import { ReactComponent as HiberWorldLogo } from "@src/assets/logos/hiberworld-logo.svg";
import { ReactComponent as HyperfyLogo } from "@src/assets/logos/hyperfy-logo.svg";
import { ReactComponent as JanusXrLogo } from "@src/assets/logos/janus-logo.svg";
import { ReactComponent as LvcidiaLogo } from "@src/assets/logos/lvcidia-logo.svg";
import { ReactComponent as MonaLogo } from "@src/assets/logos/mona-logo.svg";
import { ReactComponent as MozillaHubsLogo } from "@src/assets/logos/mozillahubs-logo.svg";
import { ReactComponent as MuseLogo } from "@src/assets/logos/muse-logo.svg";
import { ReactComponent as OnCyberLogo } from "@src/assets/logos/oncyber-logo.svg";
import { ReactComponent as PortalsLogo } from "@src/assets/logos/portals-logo.svg";
import { ReactComponent as ProtoworldLogo } from "@src/assets/logos/protoworld-logo.svg";
import { ReactComponent as RareRoomsLogo } from "@src/assets/logos/rarerooms-logo.svg";
import { ReactComponent as RondayLogo } from "@src/assets/logos/ronday-logo.svg";
import { ReactComponent as RoveLogo } from "@src/assets/logos/rove-logo.svg";
import { ReactComponent as SimulacraLogo } from "@src/assets/logos/simulacra-logo.svg";
import { ReactComponent as SomniumSpaceLogo } from "@src/assets/logos/somniumspace-logo.svg";
import { ReactComponent as SougenLogo } from "@src/assets/logos/sougen-logo.svg";
import { ReactComponent as SoutsideCityLogo } from "@src/assets/logos/soutsidecity-logo.svg";
import { ReactComponent as SpatialLogo } from "@src/assets/logos/spatial-logo.svg";
import { ReactComponent as SubstrataLogo } from "@src/assets/logos/substrata-logo.svg";
import { ReactComponent as SwivelLogo } from "@src/assets/logos/swivel-logo.svg";
import { ReactComponent as TheNemesisLogo } from "@src/assets/logos/thenemesis-logo.svg";
import { ReactComponent as TheSandboxLogo } from "@src/assets/logos/thesandbox-logo.svg";
import { ReactComponent as Tz1andLogo } from "@src/assets/logos/tz1and-logo.svg";
import { ReactComponent as VestaLogo } from "@src/assets/logos/vesta-logo.svg";
import { ReactComponent as ViverseLogo } from "@src/assets/logos/viverse-logo.svg";
import { ReactComponent as VoxelsLogo } from "@src/assets/logos/voxels-logo.svg";
import { ReactComponent as VrChatLogo } from "@src/assets/logos/vrchat-logo.svg";
import { ReactComponent as W3rldsLogo } from "@src/assets/logos/w3rlds-logo.svg";
import { ReactComponent as WebaverseLogo } from "@src/assets/logos/webaverse-logo.svg";
import { ReactComponent as DefaultLogo } from "@src/assets/logos/world-generic-logo.svg";
import { World } from "@src/common/graphql/generated/discovery.schema.graphql";
import { resources } from "@src/locales/i18n";
import { t } from "i18next";

const defaultSizeLogo = "24px";

const worldLogoMap = (size: string, color: string): { [key in World]: JSX.Element } => {
  const props = {
    width: size,
    height: size,
    color,
  };
  return {
    [World.arium]: <AriumLogo {...props} />,
    [World.artifexUnreal]: <ArtifexUnrealLogo {...props} />,
    [World.astra]: <AstraLogo {...props} />,
    [World.createra]: <CreateraLogo {...props} />,
    [World.decentraland]: <DecentralandLogo {...props} />,
    [World.ethereal]: <EtherealLogo {...props} />,
    [World.hiberWorld]: <HiberWorldLogo {...props} />,
    [World.hyperfy]: <HyperfyLogo {...props} />,
    [World.janusXr]: <JanusXrLogo {...props} />,
    [World.lvcidia]: <LvcidiaLogo {...props} />,
    [World.mona]: <MonaLogo {...props} />,
    [World.mozillaHubs]: <MozillaHubsLogo {...props} />,
    [World.muse]: <MuseLogo {...props} />,
    [World.onCyber]: <OnCyberLogo {...props} />,
    [World.portals]: <PortalsLogo {...props} />,
    [World.protoworld]: <ProtoworldLogo {...props} />,
    [World.rareRooms]: <RareRoomsLogo {...props} />,
    [World.ronday]: <RondayLogo {...props} />,
    [World.rove]: <RoveLogo {...props} />,
    [World.simulacra]: <SimulacraLogo {...props} />,
    [World.somniumSpace]: <SomniumSpaceLogo {...props} />,
    [World.sougen]: <SougenLogo {...props} />,
    [World.soutsideCity]: <SoutsideCityLogo {...props} />,
    [World.spatial]: <SpatialLogo {...props} />,
    [World.substrata]: <SubstrataLogo {...props} />,
    [World.swivelMeta]: <SwivelLogo {...props} />,
    [World.theNemesis]: <TheNemesisLogo {...props} />,
    [World.theSandbox]: <TheSandboxLogo {...props} />,
    [World.tz1and]: <Tz1andLogo {...props} />,
    [World.vesta]: <VestaLogo {...props} />,
    [World.viverse]: <ViverseLogo {...props} />,
    [World.voxels]: <VoxelsLogo {...props} />,
    [World.vrChat]: <VrChatLogo {...props} />,
    [World.w3rlds]: <W3rldsLogo {...props} />,
    [World.webaverse]: <WebaverseLogo {...props} />,
  };
};

export const excludedWorlds = [World.astra, World.rareRooms, World.rove, World.soutsideCity, World.vesta, World.vrChat];

export const compatibleWorldsInVr = [
  World.hyperfy,
  World.janusXr,
  World.mozillaHubs,
  World.muse,
  World.onCyber,
  World.rareRooms,
  World.somniumSpace,
  World.spatial,
  World.sougen,
  World.theNemesis,
  World.tz1and,
  World.viverse,
  World.w3rlds,
  World.webaverse,
];

export const excludedWorldsInVr = [
  ...excludedWorlds,
  ...Object.keys(World).filter(world => !compatibleWorldsInVr.includes(world as World)),
];

export function getIndexedWorlds(): string[] {
  return (Object.keys(World) as (keyof typeof World)[]).filter(
    (key: string) => !(excludedWorlds as string[]).includes(key),
  );
}

export function getWorldLabel(world?: World): string | undefined {
  if (!world) return undefined;

  return t(`enum.world.${world as keyof typeof resources.en.common.enum.world}`, { defaultValue: getTitleCase(world) });
}

export function getWorldLogo(color: string, world?: World, size?: string): JSX.Element {
  const sizeSelected = size || defaultSizeLogo;

  if (!world) return <DefaultLogo width={sizeSelected} height={sizeSelected} />;

  return worldLogoMap(sizeSelected, color)[world] || <DefaultLogo width={sizeSelected} height={sizeSelected} />;
}
