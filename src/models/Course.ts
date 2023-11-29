import { database } from ".."
import { CourseProps } from "../types/CourseProps"

export class Course implements CourseProps {
  private _id: number;
  private _name: string;
  private _shift: string;
  private _subjects: Array<number>;

  constructor(
    name: string,
    shift: string,
    id?: number,
    subjects?: Array<number>
  ) {
    this._id = id || database.getNextId("course");
    this._name = name;
    this._shift = shift;
    this._subjects = subjects || [];
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

  get shift(): string {
    return this._shift;
  }

  set shift(value: string) {
    this._shift = value;
  }

  get subjects(): Array<number> {
    return this._subjects;
  }

  addSubject(subjectId: number) {
    try{
    this._subjects.push(subjectId);
    } catch(error){
      console.error("Erro ao adicionar disciplina: ", error);
    }
  }

  toString(): string {
    const course = `\n------------------------------\n
    ID: ${this.id}\n
    Nome: ${this.name}\n
    Turno: ${this.shift}
    \n------------------------------\n
    `;

    return course;
  }
}