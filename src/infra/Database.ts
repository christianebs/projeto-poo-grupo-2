import { Course } from "../models/Course"
import { Student } from "../models/Student"
import { Subject } from "../models/Subject"
import { CourseProps } from "../types/CourseProps"
import { StudentProps } from "../types/StudentProps"
import { SubjectProps } from "../types/SubjectProps"

type model = "course" | "student" | "subject"

export class Database {
  private _courses: Array<CourseProps>
  private _students: Array<StudentProps>
  private _subjects: Array<SubjectProps>

  constructor() {
    this._courses = []
    this._students = []
    this._subjects = []
  }

  getCurrentSize(model: model) {
    if (model === "course") {
      return this._courses.length
    } else if (model === "student") {
      return this._students.length
    } else {
      return this._subjects.length
    }
  }

  getNextId(model: model) {
    if (model === "course") {
      return this._courses.length + 1
    } else if (model === "student") {
      return this._students.length + 1
    } else {
      return this._subjects.length + 1
    }
  }

  getById(model: model, id: number) {
    if (model === "course") {
      return this._courses.find((course) => course.id === id)
    } else if (model === "student") {
      return this._students.find((student) => student.id === id)
    } else {
      return this._subjects.find((subject) => subject.id === id)
    }
  }

  getPosition(model: model, id: number) {
    if (model === "course") {
      return this._courses.findIndex((course) => course.id === id)
    } else if (model === "student") {
      return this._students.findIndex((student) => student.id === id)
    } else {
      return this._subjects.findIndex((subject) => subject.id === id)
    }
  }

  get(model: model) {
    if (model === "course") {
      this._courses.forEach((course) =>
        console.log(`${course.id} .................... ${course.name}`)
      )
    } else if (model === "student") {
      this._students.forEach((student) =>
        console.log(`${student.id} .................... ${student.name}`)
      )
    } else {
      this._subjects.forEach((subject) =>
        console.log(`${subject.id} .................... ${subject.name}`)
      )
    }
  }

  add(model: model, item: CourseProps | StudentProps | SubjectProps) {
    if (model === "course" && item instanceof Course) {
      this._courses.push(item)
    } else if (model === "student" && item instanceof Student) {
      this._students.push(item)
    } else if (model === "subject" && item instanceof Subject) {
      this._subjects.push(item)

      const courseIndex = this.getPosition("course", item.idCourse)

      this._courses[courseIndex].addSubject(item.id)
    }
  }

  remove(model: model, id: number) {
    const index = this.getPosition(model, id)

    if (model === "course") {
      this._courses.splice(index, 1)
    } else if (model === "student") {
      this._students.splice(index, 1)
    } else {
      this._subjects.splice(index, 1)
    }
  }

  update(model: model, item: CourseProps | StudentProps | SubjectProps) {
    const index = this.getPosition(model, item.id)

    if (model === "course" && item instanceof Course) {
      this._courses[index] = item
    } else if (model === "student" && item instanceof Student) {
      this._students[index] = item
    } else if (model === "subject" && item instanceof Subject) {
      this._subjects[index] = item
    }
  }
}
