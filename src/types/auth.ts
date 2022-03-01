import { Advisor, Student } from "@prisma/client";
import { ListAdvisorResponse } from "controllers/advisor";

export enum UserRoles {
	Student = "aluno",
	Professor = "professor",
}

export enum AdvisorRoles {
	Advisor = "orientador",
	Reviewer = "avaliador",
}

export type LoginRequest = {
	email: string;
	senha: string;
};

export type UserData = {
	matricula?: number;
	siape?: number;
	nome: string;
	email: string;
	tipo_professor?: AdvisorRoles;
};

export type LoginResponse = {
	token: string;
	user_type: UserRoles;
	user: UserData;
};

export type SignupRequest = Student | Advisor;

export type SignupResponse = {
	user: Student | Advisor;
};
