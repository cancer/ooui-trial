import { ulid } from "ulid";

export interface Memo {
  content: string;
  title: string;
  id: string;
}

export const makeDefaultMemo = (): Memo => ({
  title: "名称未設定のメモ",
  content: "",
  id: ulid(),
});
