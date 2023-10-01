import type { MegaByte, MilliSecond } from '~/features/solution/core/types';

export type BojPacket = {
  result: number;
  memory: MegaByte;
  time: MilliSecond;
};
