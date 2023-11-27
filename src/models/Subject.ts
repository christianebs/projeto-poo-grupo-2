import { database } from ".."
import { SubjectProps } from "../types/SubjectProps";

export class Subject implements SubjectProps {
  private _id: number;
  private _name: string;
  private _workload: string;
  private _grade: number;
  private _idCourse: number;

  constructor(
    name: string,
    workload: string,
    grade: number,
    idCourse: number,
    id?: number,
  ) {
    this._id = id || database.subjects.length + 1;
    this._name = name;
    this._grade = grade;
    this._workload = workload;
    this._idCourse = idCourse;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get workload(): string {
    return this._workload;
  }

  set workload(value: string) {
    this._workload = value;
  }

  get grade(): number {
    return this._grade;
  }

  set grade(value: number){
    this._grade = value;
  }

  get idCourse(): number {
    return this._idCourse;
  }

  toString(): string {
    const course = database.courses.find((course) => course.id === this.idCourse)
    const subject = `\n------------------------------\n
    ID: ${this.id}\n
    Nome: ${this.name}\n
    Carga Horária: ${this.workload}\n
    Nota: ${this.grade}\n
    Curso: ${course?.name}
    \n------------------------------\n
    `;

    return subject;
  }
}