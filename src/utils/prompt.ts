import PromptSync from "prompt-sync"

const input = PromptSync()

const inputNumber = (mensagem: string): number | string => {
  const result = input(mensagem)

  return isNaN(Number(result)) ? "Valor não numérico" : Number(result)
}

export { input, inputNumber }
