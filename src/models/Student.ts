import { StudentProps } from "../types/StudentProps";
import { database } from "..";

export class Student implements StudentProps {
    private _id: number
    private _name: string
    private _age: number
    private _course: Array<number>

    constructor(
        name: string,
        age: number,
        id?: number,
        course?: Array<number>
    ) {
        this._id = id || database.students.length + 1
        this._name = name
        this._age = age
        this._course = course || []
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

    get course(): Array<number> {
        return this._course
    }

    toString(): string {
        const student = `\n------------------------------\n
    ID: ${this.id}\n
    Nome: ${this.name}\n
    Idade: ${this.age}\n
    Curso: ${this.course}
    \n------------------------------\n
    `
    //falta puxar disciplinas

        return student
    }
}