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
      if(database.courses.length === 0 || database.subjects.length === 0){
        console.log("Não é possível cadastrar alunos enquanto não houverem cursos e disciplinas cadastradas.");
        input("Pressione ENTER para continuar...");
        return;
      }
      
      let name = "";
      let age: number | null = null;

      while (name.trim() === "") {
        name = input("Nome: ");
        if (name.trim() === "") {
          console.log("Por favor, insira um nome para continuar.");
        }
      }

      while (isNaN(age as number) || age === null || age <= 0) {
        const ageInput = input("Idade: ");
        age = Number(ageInput);

        if (isNaN(age as number) || age <= 0) {
          console.log("Por favor, insira a idade para continuar.");
        }
      }

      age = Math.floor(age);

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
    console.clear();
    console.log(`\n------------- ATUALIZAR ESTUDANTE -------------\n`);

    try {
      if (database.students.length > 0) {
        database.students.forEach((student) =>
          console.log(`${student.id}.................. ${student.name}`)
        );

        console.log("");

        const studentId = inputNumber("Digite o ID do aluno que você deseja atualizar: ");
        const studentIndex = database.students.findIndex((student) => student.id === studentId);

        if (studentIndex >= 0) {
          let name: string = "";
          let age: number = 0;

          while (!name || !name.trim()) {
            name = input("Nome: ");
            if (!name.trim()) {
              console.log("Por favor, insira um nome válido para o aluno.");
            }
          }

          while (isNaN(age) || age <= 0) {
            age = Number(input("Idade: "));
            if (isNaN(age) || age <= 0) {
              console.log("Por favor, insira uma idade válida para o aluno.");
            }
          }

          const updatedStudent = new Student(
            name,
            age,
            database.students[studentIndex].id,
            database.students[studentIndex].course
          );

          database.students[studentIndex] = updatedStudent;

          console.log("Estudante atualizado com sucesso!\n");
          input("Pressione ENTER para continuar...");
        } else {
          console.log("ID inválida");
        }
      } else {
        console.log("Não há estudantes a serem atualizados");
      }

      console.log("");
      input("Pressione ENTER para continuar...");
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error);
    }
  }
}
