import { World } from "../../src/common/graphql/generated/user.schema.graphql";

export const allHosts: { world: World; url: URL }[] = [
  { world: World.arium, url: new URL("https://arium.xyz") },
  { world: World.artifexUnreal, url: new URL("https://artifex.art") },
  { world: World.artifexUnreal, url: new URL("https://nft.time.com") },
  { world: World.astra, url: new URL("https://playastra.com") },
  { world: World.createra, url: new URL("https://createra.fun") },
  { world: World.decentraland, url: new URL("https://play.decentraland.org") },
  { world: World.ethereal, url: new URL("https://app.etherealengine.com") },
  { world: World.hiberWorld, url: new URL("https://hiberworld.com") },
  { world: World.hyperfy, url: new URL("https://hyperfy.io") },
  { world: World.janusXr, url: new URL("https://janusxr.org") },
  { world: World.lvcidia, url: new URL("https://dream.lvcidia.xyz") },
  { world: World.mona, url: new URL("https://monaverse.com/spaces") },
  { world: World.mozillaHubs, url: new URL("https://hubs.mozilla.com") },
  { world: World.muse, url: new URL("https://www.muse.place") },
  { world: World.onCyber, url: new URL("https://oncyber.io") },
  { world: World.portals, url: new URL("https://theportal.to") },
  { world: World.protoworld, url: new URL("https://protoworld.io") },
  { world: World.rareRooms, url: new URL("https://app.rarerooms.io") },
  { world: World.ronday, url: new URL("https://my.ronday.app") },
  { world: World.rove, url: new URL("https://rove.to") },
  { world: World.simulacra, url: new URL("https://simulacra.io") },
  { world: World.somniumSpace, url: new URL("https://somniumspace.com") },
  { world: World.sougen, url: new URL("https://alpha.sougen.co") },
  { world: World.soutsideCity, url: new URL("https://mygame.page") },
  { world: World.spatial, url: new URL("https://www.spatial.io") },
  { world: World.substrata, url: new URL("https://substrata.info") },
  { world: World.swivelMeta, url: new URL("https://go.swivelmeta.io") },
  { world: World.theNemesis, url: new URL("https://game.thenemesis.io") },
  { world: World.theSandbox, url: new URL("https://www.sandbox.game") },
  { world: World.tz1and, url: new URL("https://www.tz1and.com") },
  { world: World.viverse, url: new URL("https://world.viverse.com") },
  { world: World.voxels, url: new URL("https://www.voxels.com") },
  { world: World.w3rlds, url: new URL("https://spaces.w3rlds.com") },
  { world: World.webaverse, url: new URL("https://app.webaverse.com") },
];

export const lighthouseSites = {
  dev: "https://dev.lighthouse.world",
  prod: "https://lighthouse.world",
  local: "http://localhost:3000",
};

export const lighthouseApis = {
  dev: "https://api.dev.lighthouse.world",
  prod: "https://api.lighthouse.world",
  local: "http://localhost:3000",
};
