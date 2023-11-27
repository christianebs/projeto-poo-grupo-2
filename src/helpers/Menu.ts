import { inputNumber } from "../utils/prompt"
import { CourseController } from "../controller/CourseController"
import { StudentController } from "../controller/StudentController"
import { SubjectController } from "../controller/SubjectController"

export class Menu {
  private static studentsController = new StudentController()
  private static subjectController = new SubjectController()
  private static courseController = new CourseController()

  private static printMenu() {
    console.log(`\n------------- SISTEMA GESTÃO ACADÊMICO -------------\n`)

    console.log(`
    1.................. Gerenciar ALUNOS\n
    2.................. Gerenciar DISCIPLINAS\n
    3.................. Gerenciar CURSOS\n
    0.................. SAIR
    `)
  }

  public static init() {
    let rodando = true

    do {
      console.clear()
      this.printMenu()
      const escolha = inputNumber("Escolha uma opção: ")

      switch (escolha) {
        case 1: {
          this.studentsController.init()
          break
        }
        case 2: {
          this.subjectController.init()
          break
        }
        case 3: {
          this.courseController.init()
          break
        }
        case 0: {
          console.log("saindo...")
          rodando = false
          break
        }
        default:
          console.log("valor invalido! tente novamente")
      }
    } while (rodando)
  }
}
