// 野坂さんの所属チームを確認する
// 西村さんをファイナンスチームに追加する
// 横田さんをデザインチームから削除する
// マーケティングチームの社員を確認する
// 社員を新規登録する
// 城之内さんのオンラインステータスを確認する
// エンジニアリングチームの紹介文を確認する
// 田坂さんの連絡先を確認する

import type { Employee, Team } from "../../domains/roster";
import { makeDummyEmployees, makeDummyTeams } from "./make-dummy-data";
import { update } from "./store";

export const fetchEmployees = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = makeDummyEmployees();
      update((state) => ({
        ...state,
        employees,
      }));
      resolve();
    }, 0);
  });
};

export const fetchTeams = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teams = makeDummyTeams();
      update((state) => ({
        ...state,
        teams,
      }));
      resolve();
    }, 0);
  });
};

export const selectEmployee = (employee: Employee): void => {
  update((state) => ({
    ...state,
    currentEmployee: employee,
  }));
};

export const selectTeam = (team: Team): void => {
  update((state) => ({
    ...state,
    currentTeam: team,
  }));
};

export const addEmployeeToTeam = () => {
  console.log("add employee");
};

export const deleteEmployeeFromTeam = () => {
  console.log("delete employee");
};

interface Params {
  name: string;
  team: string;
  contact: string;
}
export const createEmployee = ({ name, team, contact }: Params) => {
  console.log("create employee", name, team, contact);
};
