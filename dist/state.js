"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextPersona = exports.state = exports.AgentPersona = void 0;
var AgentPersona;
(function (AgentPersona) {
    AgentPersona["PLANNER"] = "Planner";
    AgentPersona["DEVELOPER"] = "Developer";
    AgentPersona["TESTER"] = "Tester";
})(AgentPersona || (exports.AgentPersona = AgentPersona = {}));
exports.state = {
    activePersona: AgentPersona.PLANNER,
    tasks: [],
    hasPlan: false,
    hasReport: false,
    isTaskListExpanded: true,
    docContextAnalyzed: false
};
const getNextPersona = (current) => {
    switch (current) {
        case AgentPersona.PLANNER:
            return AgentPersona.DEVELOPER;
        case AgentPersona.DEVELOPER:
            return AgentPersona.TESTER;
        case AgentPersona.TESTER:
            return AgentPersona.PLANNER;
    }
};
exports.getNextPersona = getNextPersona;
