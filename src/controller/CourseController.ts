import { database } from ".."
import { Course } from "../models/Course"
import { input, inputNumber } from "../utils/prompt"
import { CoreController } from "./CoreController"

export class CourseController extends CoreController {
  constructor() {
    super("curso")
  }

  cadastrar(): void {
    console.clear()
    console.log(`\n------------- NOVO CURSO -------------\n`)

    try {
      let name: string
      let shift: string

      do {
        name = input("Nome: ")
        if (!name.trim()) {
          console.log("Por favor, forneça um nome válido para o curso.")
        }
      } while (!name.trim())

      do {
        shift = input("Turno: ")
        if (!shift.trim()) {
          console.log("Por favor, forneça um nome válido para o turno.")
        }
      } while (!shift.trim())

      const course = new Course(name, shift)
      database.add("course", course)

      console.log("Curso adicionado com sucesso!\n")
    } catch (error) {
      console.error("Erro ao cadastrar curso: ", error)
    }
    input("Pressione ENTER para continuar...")
  }

  consultar(): void {
    console.clear()
    console.log(`\n------------- CONSULTAR CURSO -------------\n`)
    try {
      if (database.getCurrentSize("course") === 0) {
        console.log("Nenhum curso encontrado para consultar.")
        console.log("")
        input("Pressione ENTER para continuar...")
        return
      }

      database.get("course")

      console.log("")

      const courseId = inputNumber("Digite o ID do curso desejado: ")

      if (courseId) {
        const course = database.getById("course", courseId)
        console.log(course?.toString())
      } else {
        console.log("ID inválida")
      }
    } catch (error) {
      console.error("Erro ao consultar curso: ", error)
    }

    console.log("")
    input("Pressione ENTER para continuar...")
  }

  remover(): void {
    console.clear()
    console.log(`\n------------- REMOVER CURSO -------------\n`)
    try {
      if (database.getCurrentSize("course") === 0) {
        console.log(
          "A lista de cursos está vazia. Não existe curso para ser removido."
        )
        console.log("")
        input("Pressione ENTER para continuar...")
        return
      }

      database.get("course")

      console.log("")

      const courseId = inputNumber("Digite o ID do curso desejado: ")

      const courseIndex = database.getPosition("course", courseId)

      console.log('');

      if (courseIndex >= 0) {
        database.remove("course", courseIndex)
        console.log("Curso removido com sucesso!\n")
      } else {
        console.log("Nenhum curso encontrado com o ID fornecido.")
      }

      console.log('');
      
      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao remover curso: ", error)
      input("Pressione ENTER para continuar...")
    }
    console.log("")
  }

  atualizar(): void {
    console.clear()
    console.log(`\n------------- ATUALIZAR CURSO -------------\n`)

    try {
      if (database.getCurrentSize("course") === 0) {
        console.log("Nenhum curso encontrado para atualizar.")
        console.log("")
        input("Pressione ENTER para continuar...")
        return
      }

      database.get("course")

      console.log("")

      const courseId = inputNumber("Digite o ID do curso desejado: ")
      const courseIndex = database.getPosition("course", courseId)
      const course = database.getById("course", courseId)

      if (courseIndex >= 0 && course) {
        let name: string
        let shift: string

        do {
          name = input("Nome: ")
          if (!name.trim()) {
            console.log("Por favor, forneça um nome válido para o curso.")
          }
        } while (!name.trim())

        do {
          shift = input("Turno: ")
          if (!shift.trim()) {
            console.log("Por favor, forneça um nome válido para o turno.")
          }
        } while (!shift.trim())

        const courseUpdated = new Course(
          name,
          shift,
          course.id
          // course.subjects
        )

        database.update("course", courseUpdated)
        console.log("Curso atualizado com sucesso!\n")
      } else {
        console.log("Nenhum curso encontrado com o ID fornecido.")
      }
    } catch (error) {
      console.error("Erro ao atualizar curso:", error)
    }

    console.log("")
    input("Pressione ENTER para continuar...")
  }
}
