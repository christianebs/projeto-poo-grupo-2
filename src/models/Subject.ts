import { database } from ".."
import { SubjectProps } from "../types/SubjectProps"

export class Subject implements SubjectProps {
  private _id: number
  private _name: string
  private _workload: string
  private _description: string
  private _idCourse: number

  constructor(
    name: string,
    workload: string,
    description: string,
    idCourse: number,
    id?: number
  ) {
    this._id = id || database.getNextId("subject")
    this._name = name
    this._description = description
    this._workload = workload
    this._idCourse = idCourse
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get workload(): string {
    return this._workload
  }

  set workload(value: string) {
    this._workload = value
  }

  get description(): string {
    return this._description
  }

  set description(value: string) {
    this._description = value
  }

  get idCourse(): number {
    return this._idCourse
  }

  toString(): string {
    const course = database.getById("course", this._idCourse)

    const subject = `\n------------------------------\n
    ID: ${this.id}\n
    Nome: ${this.name}\n
    Carga Horária: ${this.workload}\n
    Descrição: ${this.description}\n
    Curso: ${course?.name}
    \n------------------------------\n
    `

    return subject
  }
}