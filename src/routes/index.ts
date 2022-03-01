import { advisorRoutes } from "./_advisor";
import { authRoutes } from "./_auth";
import { projectRoutes } from "./_project";
import { studentRoutes } from "./_student";
import { suggestionRoutes } from "./_suggestion";
import { versionRoutes } from "./_version";

export const routes = {
	advisor: advisorRoutes,
	auth: authRoutes,
	project: projectRoutes,
	student: studentRoutes,
	suggestion: suggestionRoutes,
	version: versionRoutes,
};
