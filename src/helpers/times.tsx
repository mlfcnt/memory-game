import { ReactNode } from "react";

export const times = (n: number, fn: () => ReactNode) => {
  return Array.from(Array(n).keys()).map(fn);
};
