export enum AgentPersona {
  PLANNER = 'Planner',
  DEVELOPER = 'Developer',
  TESTER = 'Tester'
}

export interface Task {
  id: string;
  description: string;
  isDone: boolean;
}

export interface OrchestratorState {
  activePersona: AgentPersona;
  tasks: Task[];
  hasPlan: boolean;
  hasReport: boolean;
  isTaskListExpanded: boolean;
  docContextAnalyzed: boolean;
}

export const state: OrchestratorState = {
  activePersona: AgentPersona.PLANNER,
  tasks: [],
  hasPlan: false,
  hasReport: false,
  isTaskListExpanded: true,
  docContextAnalyzed: false
};

export const getNextPersona = (current: AgentPersona): AgentPersona => {
  switch (current) {
    case AgentPersona.PLANNER:
      return AgentPersona.DEVELOPER;
    case AgentPersona.DEVELOPER:
      return AgentPersona.TESTER;
    case AgentPersona.TESTER:
      return AgentPersona.PLANNER;
  }
};
