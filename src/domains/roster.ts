// 社員 チーム 確認する
// 社員 新規登録する
// 社員 オンラインステータス 確認する
// 社員 連絡先 確認する
// チーム 社員 追加する
// チーム 社員 削除する
// チーム 社員 確認する
// チーム 紹介文 確認する

export interface Employee {
  name: string;
  teams: string[];
  contact: string;
  isOnline: boolean;
}
export class Employees {
  constructor(private list: Employee[]) {}

  add(employee: Employee): Employees {
    return new Employees(this.list);
  }

  has(name: string): boolean {
    const found = this.list.find((v) => v.name === name) ?? null;
    return found !== null;
  }

  *[Symbol.iterator](): IterableIterator<Employee> {
    for (const v of this.list) {
      yield v;
    }
  }
}

interface Params {
  name: string;
  employees: Employees;
  description: string;
}
export class Team {
  readonly name: string;
  readonly employees: Employees;
  readonly description: string;

  constructor(params: Params) {
    this.name = params.name;
    this.employees = params.employees;
    this.description = params.description;
  }

  addEmployee(employee: Employee): Team {
    return new Team({} as Params);
  }

  deleteEmployee(employee: Employee): Team {
    return new Team({} as Params);
  }
}
export type Teams = Team[];
