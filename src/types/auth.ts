import { Advisor, Student } from "@prisma/client";
import { ListAdvisorResponse } from "controllers/advisor";

export type LoginRequest = {
	email: string;
	senha: string;
};

export type LoginResponse = {
	token: string;
	userType: "student" | "advisor";
	user: Student | ListAdvisorResponse;
};

export type SignupRequest = Student | Advisor;

export type SignupResponse = {
	user: Student | Advisor;
};
