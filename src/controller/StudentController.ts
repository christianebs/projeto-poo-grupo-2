import { database } from ".."
import { Student } from "../models/Student"
import { input, inputNumber } from "../utils/prompt"
import { CoreController } from "./CoreController"

export class StudentController extends CoreController {
  private static lastStudentId: number = 0

  constructor() {
    super("aluno")
  }

  cadastrar(): void {
    console.clear()
    console.log(`\n------------- NOVO ESTUDANTE -------------\n`)

    try {
      if (
        database.getCurrentSize("course") === 0 ||
        database.getCurrentSize("subject") === 0
      ) {
        console.log(
          "Não é possível cadastrar alunos enquanto não houverem cursos e disciplinas cadastradas."
        )
        input("Pressione ENTER para continuar...")
        return
      }

      let name = ""
      let age: number | null = null

      while (name.trim() === "") {
        name = input("Nome: ")
        if (name.trim() === "") {
          console.log("Por favor, insira um nome para continuar.")
        }
      }

      while (isNaN(age as number) || age === null || age <= 0) {
        const ageInput = input("Idade: ")
        age = Number(ageInput)

        if (isNaN(age as number) || age <= 0) {
          console.log("Por favor, insira a idade para continuar.")
        }
      }

      console.log(
        "-------------------- Cursos disponiveis --------------------"
      )
      database.get("course")

      let course: number = -1
      while (isNaN(course) || course < 0) {
        const courseInput = inputNumber(
          "Digite o ID do curso que o aluno pertence: "
        )
        if (!courseInput || courseInput > database.getCurrentSize("course")) {
          console.log("Por favor, informe um valor válido para o ID do curso.")
        } else {
          course = Number(courseInput)
          if (isNaN(course) || course < 0) {
            console.log(
              "Por favor, informe um valor numérico válido e maior ou igual a zero para o ID do curso."
            )
          }
        }
      }

      age = Math.floor(age)

      const student = new Student(name, age, course)

      database.add("student", student)

      console.log("Aluno adicionado com sucesso!\n")
      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao cadastrar estudante:", error)
    }
  }

  consultar(): void {
    console.clear()
    console.log(`\n------------- CONSULTAR ESTUDANTE -------------\n`)

    try {
      if (database.getCurrentSize("student") > 0) {
        database.get("student")

        console.log("")

        const studentId = inputNumber(
          "Digite o ID do estudante que você quer consultar: "
        )

        if (studentId) {
          const student = database.getById("student", studentId)
          console.log(student?.toString())
        } else {
          console.log("ID inválida")
        }
      } else {
        console.log("No momento não há estudantes a serem consultados.")
      }

      console.log("")

      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao consultar estudante:", error)
    }
  }

  remover(): void {
    console.clear()
    console.log(`\n------------- REMOVER ESTUDANTE -------------\n`)

    try {
      if (database.getCurrentSize("student") > 0) {
        database.get("student")

        console.log("")
        const studentId = inputNumber(
          "Digite o ID do estudante que você quer remover: "
        )
        const studentIndex = database.getPosition("student", studentId)

        if (studentIndex >= 0) {
          database.remove("student", studentId)

          console.log("Estudante removido com sucesso!\n")
          input("Pressione ENTER para continuar...")
        } else {
          console.log("ID inválida")
        }
      } else {
        console.log("No momento não há estudantes a serem removidos.")
      }

      console.log("")
      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao remover estudante:", error)
    }
  }

  atualizar(): void {
    console.clear()
    console.log(`\n------------- ATUALIZAR ESTUDANTE -------------\n`)

    try {
      if (database.getCurrentSize("student") > 0) {
        database.get("student")

        console.log("")

        const studentId = inputNumber(
          "Digite o ID do aluno que você deseja atualizar: "
        )
        const studentIndex = database.getPosition("student", studentId)
        const student = database.getById("student", studentId)

        if (studentIndex >= 0 && student) {
          let name: string = ""
          let age: number = 0

          while (!name || !name.trim()) {
            name = input("Nome: ")
            if (!name.trim()) {
              console.log("Por favor, insira um nome válido para o aluno.")
            }
          }

          while (isNaN(age) || age <= 0) {
            age = Number(input("Idade: "))
            if (isNaN(age) || age <= 0) {
              console.log("Por favor, insira uma idade válida para o aluno.")
            }
          }

          console.log(
            "-------------------- Cursos disponiveis --------------------"
          )
          database.get("course")

          let course: number = -1
          while (isNaN(course) || course < 0) {
            const courseInput = inputNumber(
              "Digite o ID do curso que a disciplina pertence: "
            )
            if (
              !courseInput ||
              courseInput > database.getCurrentSize("course")
            ) {
              console.log(
                "Por favor, informe um valor válido para o ID do curso."
              )
            } else {
              course = Number(courseInput)
              if (isNaN(course) || course < 0) {
                console.log(
                  "Por favor, informe um valor numérico válido e maior ou igual a zero para o ID do curso."
                )
              }
            }
          }

          const updatedStudent = new Student(name, age, course, student.id)

          database.update("student", updatedStudent)

          console.log("Estudante atualizado com sucesso!\n")
          input("Pressione ENTER para continuar...")
        } else {
          console.log("ID inválida")
        }
      } else {
        console.log("Não há estudantes a serem atualizados")
      }

      console.log("")
      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error)
    }
  }
}
