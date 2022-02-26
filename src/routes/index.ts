import { advisorRoutes } from "./_advisor";
import { projectRoutes } from "./_project";
import { studentRoutes } from "./_student";
import { suggestionRoutes } from "./_suggestion";
import { authRoutes } from "./_auth";

export const routes = {
	advisor: advisorRoutes,
	auth: authRoutes,
	project: projectRoutes,
	student: studentRoutes,
	suggestion: suggestionRoutes,
};
