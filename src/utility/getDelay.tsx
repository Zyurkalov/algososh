import { SHORT_DELAY_IN_MS } from "../constants/delays";

export const getDelay = (timer: number = SHORT_DELAY_IN_MS) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timer));
};