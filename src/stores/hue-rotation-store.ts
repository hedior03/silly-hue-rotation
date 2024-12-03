import { persistentMap } from "@nanostores/persistent";

export const hueRotationStore = persistentMap(
  "hue-rotations::",
  {
    opacity: 0.7,
    color1: "#FFFFFF",
    color2: "#FF0000",
    rotations: [140],
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
