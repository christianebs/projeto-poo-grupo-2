import test from "node:test";
import { database } from "..";
import { Student } from "../models/Student";
import { input, inputNumber } from "../utils/prompt";
import { CoreController } from "./CoreController";

export class StudentController extends CoreController {

  private static lastStudentId: number = 0;

  constructor() {
    super("aluno");
  }

  cadastrar(): void {

    console.clear();
    console.log(`\n------------- NOVO ESTUDANTE -------------\n`);

    try {
      const name = input("Nome: ");
      const age = Number(input("Idade: "));

      const student = new Student(name, age, ++StudentController.lastStudentId);

      database.students.push(student);

      console.log("Aluno adicionado com sucesso!\n");
      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao cadastrar estudante:", error);
    }
  }

  consultar(): void {

    console.clear();
    console.log(`\n------------- CONSULTAR ESTUDANTE -------------\n`);

    try {
      if (database.students.length > 0) {
        database.students.forEach((student) =>
          console.log(`${student.id}.................. ${student.name}`)
        );

        console.log("");

        const studentId = inputNumber("Digite o ID do estudante que você quer consultar: ");
        const student = database.students.find((student) => student.id === studentId);

        console.log(student?.toString());
      } else {
        console.log("No momento não há estudantes a serem consultados.");
      }

      console.log("");

      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao consultar estudante:", error);
    }
  }

  remover(): void {

    console.clear();
    console.log(`\n------------- REMOVER ESTUDANTE -------------\n`);

    try {
      if (database.students.length > 0) {
        database.students.forEach((student) =>
          console.log(`${student.id}.................. ${student.name}`)
        );

        console.log("");
        const studentId = inputNumber("Digite o ID do estudante que você quer remover: ");
        const studentIndex = database.students.findIndex((student) => student.id === studentId);

        if (studentIndex >= 0) {
          database.students.splice(studentIndex, 1);

          console.log("Estudante removido com sucesso!\n");
          input("Pressione ENTER para continuar...");
        } else {
          console.log("ID inválida");
        }
      } else {
        console.log("No momento não há estudantes a serem removidos.");
      }

      console.log("");
      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao remover estudante:", error);
    }
  }

  atualizar(): void {
    try {
      console.clear();
      console.log(`\n------------- ATUALIZAR ESTUDANTE -------------\n`);


      if (database.students.length > 0) {
        database.students.forEach((student) =>
          console.log(`${student.id}.................. ${student.name}`)
        );

        console.log("");

        const studentId = inputNumber("Digite o ID do aluno que você deseja atualizar: ");
        const studentIndex = database.students.findIndex((student) => student.id === studentId);

        if (studentIndex >= 0) {
          const name = input("Nome: ");
          const age = Number(input("Idade: "));

          const student = new Student(
            name,
            age,
            database.students[studentIndex].id,
            database.students[studentIndex].course
          );

          database.students[studentIndex] = student;

          console.log("Estudante atualizado com sucesso!\n");
          input("Pressione ENTER para continuar...");
        } else {
          console.log("ID inválida");
        }
      } else {
        console.log("Não há estudantes a serem removidos");
      }

      console.log("");
      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error);
    }
  }
}
