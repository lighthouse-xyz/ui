import { setContext } from "@apollo/client/link/context";

const reCaptchaKey =
  process.env.REACT_APP_ENV === "prod"
    ? "6LcbHgMkAAAAACzi2Nio7jdzyljm5S8q_y5OlCgp"
    : "6LdObwEkAAAAANk-bxB5XQYmvaSFmk7wr45K8EpX";

const captchaLink = setContext(async (context, { headers = {} }) => {
  let grecaptchaToken = null;
  const queriesWithCaptcha = ["ProfileFromToken", "RegisterToAku", "ValidateAkuAnswer"];
  if (!!context.operationName && queriesWithCaptcha.includes(context.operationName)) {
    const action: string = context.operationName.charAt(0).toLowerCase() + context.operationName.slice(1);
    grecaptchaToken = await new Promise(resolve => {
      grecaptcha.enterprise.ready(() => {
        void grecaptcha.enterprise.execute(reCaptchaKey, { action }).then(token => {
          return resolve(token);
        });
      });
    });
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      ...(grecaptchaToken ? { "Lighthouse-Captcha": grecaptchaToken } : {}),
    },
  };
});

export default captchaLink;
