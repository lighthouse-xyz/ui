import validator from "validator";

export enum UrlType {
  discord = "discord",
  discordUsername = "discordUsername",
  instagram = "instagram",
  medium = "medium",
  mirror = "mirror",
  twitter = "twitter",
  website = "website",
}

const socialDomain: { [key in UrlType]?: string } = {
  [UrlType.discord]: "discord.(gg|com)",
  [UrlType.instagram]: "instagram.com",
  [UrlType.medium]: "medium.com",
  [UrlType.mirror]: "mirror.xyz",
  [UrlType.twitter]: "twitter.com",
};

const urlTypes = [
  UrlType.discord,
  UrlType.discordUsername,
  UrlType.instagram,
  UrlType.medium,
  UrlType.mirror,
  UrlType.twitter,
  UrlType.website,
];

function getUrlRegexWithIdInPath(domain: string): RegExp {
  return new RegExp(`^(https?:\\/\\/)?(?:www\\.)?${domain.replace(".", "\\.")}(?:\\/\\w+)`);
}

function getUrlRegexWithIdInPathOrSubdomain(domain: string): RegExp {
  return new RegExp(`^(https?:\\/\\/)?(?:www\\.)?(?:\\w+\\.)?${domain.replace(".", "\\.")}(?:\\/\\w+)?`);
}

function isUrlInput(input: string): boolean {
  return urlTypes.includes(input as UrlType);
}

function isDiscordUsername(): RegExp {
  return /^.+#\d{4}$/;
}

function isUrlValid(url: string, urlType: UrlType): boolean | undefined {
  if (!url) {
    return undefined;
  }

  const domain = socialDomain[urlType] as string;
  switch (urlType) {
    case UrlType.website:
      return validator.isURL(url);
    case UrlType.medium:
    case UrlType.mirror:
      return getUrlRegexWithIdInPathOrSubdomain(domain).test(url);
    case UrlType.discordUsername:
      return isDiscordUsername().test(url);
    default:
      return getUrlRegexWithIdInPath(domain).test(url);
  }
}

function urlStartsWithHttps(url: string): boolean {
  return /^https?:\/\//gi.test(url);
}

export { isUrlInput, isUrlValid, urlStartsWithHttps };
