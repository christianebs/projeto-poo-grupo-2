import { database } from "..";
import { Subject } from "../models/Subject";
import { input, inputNumber } from "../utils/prompt";
import { CoreController } from "./CoreController";

export class SubjectController extends CoreController {
  constructor() {
    super('disciplina');
  }

  cadastrar(): void {

    console.clear();
    console.log(`\n------------- NOVA DISCIPLINA -------------\n`);
    try {
      const name = input("Nome: ");
      const workload = input("Carga horária: ");
      const grade = Number(input("Nota: "));
      const course = Number(input("Digite o ID do curso que a disciplina pertence: "));

      const subject = new Subject(name, workload, grade, course);

      database.subjects.push(subject);

      console.log("Disciplina adicionada com sucesso!\n");
      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao cadastrar disciplina:", error);
    }
  }

  consultar(): void {

    console.clear();
    console.log(`\n------------- CONSULTAR DISCIPLINA -------------\n`);
    try {
      if (database.subjects.length > 0) {
        database.subjects.forEach((subject) =>
          console.log(`${subject.id}.................. ${subject.name}`)
        );

        console.log("");

        const subjectId = inputNumber("Digite o ID da disciplina que você quer consultar: ");
        const subject = database.subjects.find((subject) => subject.id === subjectId);

        console.log(subject?.toString());
      } else {
        console.log("No momento não há disciplinas a serem consultadas.");
      }

      console.log("");

      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao consultar disciplina:", error);
    }
  }

  remover(): void {

    console.clear();
    console.log(`\n------------- REMOVER DISCIPLINA -------------\n`);
    try {
      if (database.subjects.length > 0) {
        database.subjects.forEach((subject) =>
          console.log(`${subject.id}.................. ${subject.name}`)
        );

        console.log("");
        const subjectId = inputNumber("Digite o ID da disciplina que você quer remover: ");
        const subjectIndex = database.subjects.findIndex(
          (subject) => subject.id === subjectId
        );

        if (subjectIndex >= 0) {
          database.subjects.splice(subjectIndex, 1);

          console.log("Disciplina removida com sucesso!\n");
          input("Pressione ENTER para continuar...");
        } else {
          console.log('ID inválida');
        }
      } else {
        console.log("No momento não há disciplinas a serem removidas.");
      }

      console.log('');
      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao remover disciplina:", error);
    }
  }

  atualizar(): void {

    console.clear();
    console.log(`\n------------- ATUALIZAR DISCIPLINA -------------\n`);
    try {
      if (database.subjects.length > 0) {
        database.subjects.forEach((subject) =>
          console.log(`${subject.id}.................. ${subject.name}`)
        );

        console.log("");

        const subjectId = inputNumber("Digite o ID da disciplina que você deseja atualizar: ");
        const subjectIndex = database.subjects.findIndex(
          (subject) => subject.id === subjectId
        );

        if (subjectIndex >= 0) {
          const name = input("Nome: ");
          const workload = input("Carga horária: ");
          const grade = Number(input("Nota: "));
          const course = Number(input("Digite o curso que a disciplina pertence: "));

          const subject = new Subject(
            name,
            workload,
            grade,
            course,
            database.subjects[subjectIndex].id,
          );

          database.subjects[subjectIndex] = subject;

          console.log("Disciplina atualizada com sucesso!\n");
          input("Pressione ENTER para continuar...");
        } else {
          console.log('ID inválida');
        }
      } else {
        console.log('Não há disciplinas a serem removidas');
      }

      console.log('');
      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao atualizar disciplina:", error);
    }
  }
}
