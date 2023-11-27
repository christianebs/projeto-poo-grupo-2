import { Menu } from "./helpers/Menu"
import { CourseProps } from "./types/CourseProps"
import { StudentProps } from "./types/StudentProps"
import { SubjectProps } from "./types/SubjectProps"

export const database: {
  students: Array<StudentProps>
  courses: Array<CourseProps>
  subjects: Array<SubjectProps>
} = { students: [], courses: [], subjects: [] }

Menu.init()
