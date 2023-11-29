import { database } from ".."
import { Subject } from "../models/Subject"
import { input, inputNumber } from "../utils/prompt"
import { CoreController } from "./CoreController"

export class SubjectController extends CoreController {
  constructor() {
    super("disciplina")
  }

  cadastrar(): void {
    console.clear()
    console.log(`\n------------- NOVA DISCIPLINA -------------\n`)

    try {
      if (database.getCurrentSize("course") === 0) {
        console.log(
          "Não é possível cadastrar disciplina enquanto não houver um curso cadastrado."
        )
        console.log('');
        input("Pressione ENTER para continuar...")
        return
      }
      let name: string

      do {
        name = input("Nome: ")
        if (!name.trim()) {
          console.log("Por favor, informe um valor válido para o nome.")
        }
      } while (!name.trim())

      let workload: string

      do {
        workload = input("Carga horária: ")
        if (!workload.trim()) {
          console.log(
            "Por favor, informe um valor válido para a carga horária."
          )
        }
      } while (!workload.trim())

      let description: string

      do {
        description = input("Adicione uma descrição a desciplina: ")
        if (!description.trim()) {
          console.log("Por favor, informe um valor válido para a descrição.")
          console.log('');
        }
      } while (!description.trim())
      console.log(
        "-------------------- Cursos disponiveis --------------------"
      )
      database.get("course")

      let course: number = -1
      while (isNaN(course) || course < 0) {
        console.log('');
        const courseInput = inputNumber(
          "Digite o ID do curso que a disciplina pertence: "
        )
        if (!courseInput || courseInput > database.getCurrentSize("course")) {
          console.log("Por favor, informe um valor válido para o ID do curso.")
          console.log('')
        } else {
          course = Number(courseInput)
          if (isNaN(course) || course < 0) {
            console.log(
              "Por favor, informe um valor numérico válido e maior ou igual a zero para o ID do curso."
            )
          }
        }
      }

      const subject = new Subject(name, workload, description, course)

      database.add("subject", subject)

      console.log("Disciplina adicionada com sucesso!\n")
      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao cadastrar disciplina:", error)
    }
  }

  consultar(): void {
    console.clear()
    console.log(`\n------------- CONSULTAR DISCIPLINA -------------\n`)
    try {
      if (database.getCurrentSize("subject") > 0) {
        database.get("subject")

        console.log("")

        const subjectId = inputNumber(
          "Digite o ID da disciplina que você quer consultar: "
        )

        if (subjectId) {
          const subject = database.getById("subject", subjectId)
          console.log(subject?.toString())
        } else {
          console.log("ID inválida")
        }
      } else {
        console.log("No momento não há disciplinas a serem consultadas.")
      }

      console.log("")

      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao consultar disciplina:", error)
    }
  }

  remover(): void {
    console.clear()
    console.log(`\n------------- REMOVER DISCIPLINA -------------\n`)
    try {
      if (database.getCurrentSize("subject") > 0) {
        database.get("subject")

        console.log("")
        const subjectId = inputNumber(
          "Digite o ID da disciplina que você quer remover: "
        )
        const subjectIndex = database.getPosition("subject", subjectId)

        if (subjectIndex >= 0) {
          database.remove("subject", subjectId)

          console.log("Disciplina removida com sucesso!\n")
          input("Pressione ENTER para continuar...")
        } else {
          console.log("ID inválida")
        }
      } else {
        console.log("No momento não há disciplinas a serem removidas.")
      }

      console.log("")
      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao remover disciplina:", error)
    }
  }

  atualizar(): void {
    console.clear()
    console.log(`\n------------- ATUALIZAR DISCIPLINA -------------\n`)
    try {
      if (database.getCurrentSize("subject") > 0) {
        database.get("subject")

        console.log("")

        const subjectId = inputNumber(
          "Digite o ID da disciplina que você deseja atualizar: "
        )
        const subjectIndex = database.getPosition("subject", subjectId)

        if (subjectIndex >= 0) {
          let name: string

          do {
            name = input("Nome: ")
            if (!name.trim()) {
              console.log("Por favor, informe um valor válido para o nome.")
            }
          } while (!name.trim())

          let workload: string

          do {
            workload = input("Carga horária: ")
            if (!workload.trim()) {
              console.log(
                "Por favor, informe um valor válido para a carga horária."
              )
            }
          } while (!workload.trim())

          let description: string

          do {
            description = input("Adicione uma descrição a desciplina: ")
            if (!description.trim()) {
              console.log(
                "Por favor, informe um valor válido para a descrição."
              )
            }
          } while (!description.trim())

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

          const subject = new Subject(
            name,
            workload,
            description,
            course,
            subjectId
          )

          database.update("subject", subject)

          console.log("Disciplina atualizada com sucesso!\n")
        } else {
          console.log("ID inválida")
        }
      } else {
        console.log("No momento não há disciplinas a serem atualizadas.")
      }

      console.log("")
      input("Pressione ENTER para continuar...")
    } catch (error) {
      console.error("Erro ao atualizar disciplina:", error)
    }
  }
}
