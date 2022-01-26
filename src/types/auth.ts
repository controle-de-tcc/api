import { Advisor, Student } from "@prisma/client";

export type LoginRequest = {
	email: string;
	senha: string;
};

export type LoginResponse = {
	token: string;
	userType: "student" | "advisor";
	user: Student | Advisor;
};

export type SignupRequest = Student | Advisor;

export type SignupResponse = {
	user: Student | Advisor;
};
