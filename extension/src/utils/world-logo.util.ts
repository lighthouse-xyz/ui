import ariumLogo from "@src/assets/logos/arium-logo.svg";
import artifexUnrealLogo from "@src/assets/logos/artifexunreal-logo.svg";
import astraLogo from "@src/assets/logos/astra-logo.svg";
import createraLogo from "@src/assets/logos/createra-logo.svg";
import decentralandLogo from "@src/assets/logos/decentraland-logo.svg";
import etherealLogo from "@src/assets/logos/ethereal-logo.svg";
import hiberWorldLogo from "@src/assets/logos/hiberworld-logo.svg";
import hyperfyLogo from "@src/assets/logos/hyperfy-logo.svg";
import janusXrLogo from "@src/assets/logos/janus-logo.svg";
import lvcidiaLogo from "@src/assets/logos/lvcidia-logo.svg";
import monaLogo from "@src/assets/logos/mona-logo.svg";
import mozillaHubsLogo from "@src/assets/logos/mozillahubs-logo.svg";
import museLogo from "@src/assets/logos/muse-logo.svg";
import onCyberLogo from "@src/assets/logos/oncyber-logo.svg";
import portalsLogo from "@src/assets/logos/portals-logo.svg";
import protoworldLogo from "@src/assets/logos/protoworld-logo.svg";
import rareRoomsLogo from "@src/assets/logos/rarerooms-logo.svg";
import rondayLogo from "@src/assets/logos/ronday-logo.svg";
import roveLogo from "@src/assets/logos/rove-logo.svg";
import simulacraLogo from "@src/assets/logos/simulacra-logo.svg";
import somniumSpaceLogo from "@src/assets/logos/somniumspace-logo.svg";
import sougenLogo from "@src/assets/logos/sougen-logo.svg";
import soutsideCityLogo from "@src/assets/logos/soutsidecity-logo.svg";
import spatialLogo from "@src/assets/logos/spatial-logo.svg";
import substrataLogo from "@src/assets/logos/substrata-logo.svg";
import swivelLogo from "@src/assets/logos/swivel-logo.svg";
import theNemesisLogo from "@src/assets/logos/thenemesis-logo.svg";
import theSandboxLogo from "@src/assets/logos/thesandbox-logo.svg";
import tz1andLogo from "@src/assets/logos/tz1and-logo.svg";
import vestaLogo from "@src/assets/logos/vesta-logo.svg";
import viverseLogo from "@src/assets/logos/viverse-logo.svg";
import voxelsLogo from "@src/assets/logos/voxels-logo.svg";
import vrChatLogo from "@src/assets/logos/vrchat-logo.svg";
import w3rldsLogo from "@src/assets/logos/w3rlds-logo.svg";
import webaverseLogo from "@src/assets/logos/webaverse-logo.svg";
import defaultLogo from "@src/assets/logos/world-generic-logo.svg";
import { World } from "@src/common/graphql/generated/discovery.schema.graphql";

const worldLogoMap: { [key in World]: string } = {
  [World.arium]: ariumLogo,
  [World.artifexUnreal]: artifexUnrealLogo,
  [World.astra]: astraLogo,
  [World.createra]: createraLogo,
  [World.decentraland]: decentralandLogo,
  [World.ethereal]: etherealLogo,
  [World.hiberWorld]: hiberWorldLogo,
  [World.hyperfy]: hyperfyLogo,
  [World.janusXr]: janusXrLogo,
  [World.lvcidia]: lvcidiaLogo,
  [World.mona]: monaLogo,
  [World.mozillaHubs]: mozillaHubsLogo,
  [World.muse]: museLogo,
  [World.onCyber]: onCyberLogo,
  [World.portals]: portalsLogo,
  [World.protoworld]: protoworldLogo,
  [World.rareRooms]: rareRoomsLogo,
  [World.ronday]: rondayLogo,
  [World.rove]: roveLogo,
  [World.simulacra]: simulacraLogo,
  [World.somniumSpace]: somniumSpaceLogo,
  [World.sougen]: sougenLogo,
  [World.soutsideCity]: soutsideCityLogo,
  [World.spatial]: spatialLogo,
  [World.substrata]: substrataLogo,
  [World.swivelMeta]: swivelLogo,
  [World.theNemesis]: theNemesisLogo,
  [World.theSandbox]: theSandboxLogo,
  [World.tz1and]: tz1andLogo,
  [World.vesta]: vestaLogo,
  [World.viverse]: viverseLogo,
  [World.voxels]: voxelsLogo,
  [World.vrChat]: vrChatLogo,
  [World.w3rlds]: w3rldsLogo,
  [World.webaverse]: webaverseLogo,
};

export function getWorldLogo(world?: World): string {
  if (!world) return defaultLogo;

  return worldLogoMap[world] || defaultLogo;
}
