export enum AgentPersona {
  PLANNER = 'Planner',
  DEVELOPER = 'Developer'
}

export interface Task {
  id: string;
  description: string;
  isDone: boolean;
}

export interface OrchestratorState {
  tasks: Task[];
  hasPlan: boolean;
  hasReport: boolean;
  isTaskListExpanded: boolean;
  docContextAnalyzed: boolean;
}

export const state: OrchestratorState = {
  tasks: [],
  hasPlan: false,
  hasReport: false,
  isTaskListExpanded: true,
  docContextAnalyzed: false
};
