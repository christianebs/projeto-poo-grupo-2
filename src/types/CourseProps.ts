export interface CourseProps {
  id: number
  name: string
  shift: string
  subjects: Array<number>
  addSubject(subjectId: number): void
  toString(): string
}
