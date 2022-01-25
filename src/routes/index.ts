import { advisorRoutes } from "./_advisor";
import { projectRoutes } from "./_project";
import { studentRoutes } from "./_student";
import { versionRoutes } from "./_version";
import { suggestionRoutes } from "./_suggestion";

export const routes = {
	advisor: advisorRoutes,
	project: projectRoutes,
	student: studentRoutes,
	version: versionRoutes,
	suggestion: suggestionRoutes,
};
