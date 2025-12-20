import arcjet, { validateEmail, shield } from "@arcjet/next";

const key = process.env.ARCJET_KEY;

export const aj = key
  ? arcjet({
      key,
      characteristics: ["ip.src"],
      rules: [
        shield({
          mode: "LIVE",
        }),
        validateEmail({
          mode: "LIVE",
          block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
        }),
      ],
    })
  : null;
