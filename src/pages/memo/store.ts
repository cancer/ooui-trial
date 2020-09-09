import { derived, writable } from "svelte/store";
import type { Memo } from "../../domains/memo";

interface State {
  memos: Memo[];
  current: Memo | null;
  keyword: string;
}

const initialState: State = {
  memos: [],
  current: null,
  keyword: "",
};

const state = writable<State>(initialState);

export const memos = derived(state, ($state) => {
  if ($state.keyword === "") {
    return $state.memos;
  }
  return $state.memos.filter((memo) => memo.title.includes($state.keyword));
});

export const current = derived(state, ($state) => $state.current);
export const keyword = derived(state, ($state) => $state.keyword);

export const update = (updater: (v: State) => State): void => {
  state.update(($state) => updater($state));
};
