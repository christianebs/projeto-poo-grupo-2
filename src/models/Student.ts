import { StudentProps } from "../types/StudentProps"
import { database } from ".."

export class Student implements StudentProps {
  private _id: number
  private _name: string
  private _age: number
  private _course: number

  constructor(name: string, age: number, course: number, id?: number) {
    this._id = id || database.getNextId("student")
    this._name = name
    this._age = age
    this._course = course
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

  get age(): number {
    return this._age
  }

  set age(value: number) {
    this._age = value
  }

  get course(): number {
    return this._course
  }

  toString(): string {
    const course = database.getById("course", this.course)

    const student = `\n------------------------------\n
    ID: ${this.id}\n
    Nome: ${this.name}\n
    Idade: ${this.age}\n
    Curso: ${course?.name}
    \n------------------------------\n
    `

    return student
  }
}