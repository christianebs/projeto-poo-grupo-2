import { input, inputNumber } from "../utils/prompt"

export abstract class CoreController {
  private model: string

  constructor(model: string) {
    this.model = model.toUpperCase()
  }

  private printMenu() {
    console.clear()

    console.log(`\n------------- MODULO ${this.model} -------------\n`)

    console.log(`
    1.................. Cadastrar ${this.model}\n
    2.................. Consultar ${this.model}\n
    3.................. Remover ${this.model}\n
    4.................. Atualizar ${this.model}\n
    0.................. VOLTAR
    `)
  }

  public init() {
    let rodando = true;

    do {
      this.printMenu()
      const escolha = inputNumber("Escolha uma opção: ")

      switch (escolha) {
        case 1: {
          this.cadastrar()
          break
        }
        case 2: {
          this.consultar()
          break
        }
        case 3: {
          this.remover()
          break
        }
        case 4: {
          this.atualizar()
          break
        }
        case 0: {
          rodando = false
          break
        }
        default:
          console.log("Valor invalido! Tente novamente")
      }
    } while (rodando)
  }

  cadastrar() {
    console.log(
      `This method 'Cadastrar' has not been implemented yet for module ${this.model}\n\n`
    )
    input("Press Enter to continue...")
  }

  consultar() {
    console.log(
      `This method 'Consultar' has not been implemented yet for module ${this.model}\n\n`
    )
    input("Press Enter to continue...")
  }

  remover() {
    console.log(
      `This method 'Remover' has not been implemented yet for module ${this.model}\n\n`
    )
    input("Press Enter to continue...")
  }

  atualizar() {
    console.log(
      `This method 'Atualizar' has not been implemented yet for module ${this.model}\n\n`
    )
    input("Press Enter to continue...")
  }
}
