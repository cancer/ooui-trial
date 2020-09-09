import { ulid } from "ulid";
import type { Memo } from "../../domains/memo";

const content = "The quick brown fox jumps over the lazy dog";

export const dummyData: Memo[] = [...new Array(20)].map((_, i) => {
  return {
    title: `Memo${i + 1}`,
    content: [...new Array(i + 1)].map(() => content).join(""),
    id: ulid(),
  };
});
