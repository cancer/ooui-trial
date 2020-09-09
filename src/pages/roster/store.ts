import { derived, writable } from "svelte/store";
import type { Employee, Employees, Team, Teams } from "../../domains/roster";

interface State {
  employees: Employees | null;
  teams: Teams;
  currentEmployee: Employee | null;
  currentTeam: Team | null;
}

const initialState = {
  employees: null,
  teams: [],
  currentEmployee: null,
  currentTeam: null,
};

const state = writable<State>(initialState);

export const update = (updater: (v: State) => State): void => {
  state.update(($state) => updater($state));
};

export const employees = derived(state, ($state) =>
  $state.employees !== null ? [...$state.employees] : []
);
export const teams = derived(state, ($state) => $state.teams);
export const currentEmployee = derived(
  state,
  ($state) => $state.currentEmployee
);
export const currentTeam = derived(state, ($state) => $state.currentTeam);
