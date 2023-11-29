import PromptSync from "prompt-sync"

const input = PromptSync()

const inputNumber = (mensagem: string): number => {
  const result = input(mensagem)

  return isNaN(Number(result)) ? -1 : Number(result)
}

export { input, inputNumber }
