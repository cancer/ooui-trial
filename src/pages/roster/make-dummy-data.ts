import { Employees, Team } from "../../domains/roster";
import type { Employee } from "../../domains/roster";

const dummyEmployees = [
  {
    name: "野中一平",
    team: "エンジニアリングチーム",
    contact: "090xxxxxxxxx",
    isOnline: false,
  },
  {
    name: "西村二子",
    team: "エンジニアリングチーム",
    contact: "090xxxxxxxxx",
    isOnline: true,
  },
  {
    name: "横田三男",
    team: "デザインチーム",
    contact: "090xxxxxxxxx",
    isOnline: false,
  },
  {
    name: "城之内四郎",
    team: "マーケティングチーム",
    contact: "090xxxxxxxxx",
    isOnline: true,
  },
  {
    name: "田坂五美",
    team: "マーケティングチーム",
    contact: "090xxxxxxxxx",
    isOnline: true,
  },
] as const;
type EmployeeData = typeof dummyEmployees[number];

const dummyTeams = [
  {
    name: "ファイナンスチーム",
    description: "アットホームな職場です😁",
  },
  {
    name: "デザインチーム",
    description: "社員の自主性を尊重します😤",
  },
  {
    name: "マーケティングチーム",
    description: "仕事は生き甲斐💪",
  },
  {
    name: "エンジニアリングチーム",
    description: "👉ヨシ！！👉",
  },
] as const;
type TeamData = typeof dummyTeams[number];

const makeDummyEmployee = (data: EmployeeData): Employee => {
  return {
    ...data,
    teams: [data.team],
  };
};

export const makeDummyEmployees = (): Employees => {
  return new Employees(dummyEmployees.map((v) => makeDummyEmployee(v)));
};

const makeDummyTeam = (data: TeamData): Team => {
  const employees = new Employees(
    dummyEmployees
      .filter((v) => v.team === data.name)
      .map((v) => makeDummyEmployee(v))
  );
  return new Team({
    ...data,
    employees,
  });
};

export const makeDummyTeams = (): Team[] => {
  return dummyTeams.map((v) => makeDummyTeam(v));
};
