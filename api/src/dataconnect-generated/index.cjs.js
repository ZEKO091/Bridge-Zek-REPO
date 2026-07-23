const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'zek-bridge',
  location: 'us-east1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createDeveloperRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDeveloper');
}
createDeveloperRef.operationName = 'CreateDeveloper';
exports.createDeveloperRef = createDeveloperRef;

exports.createDeveloper = function createDeveloper(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createDeveloperRef(dcInstance, inputVars));
}
;

const updateDeveloperRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDeveloper');
}
updateDeveloperRef.operationName = 'UpdateDeveloper';
exports.updateDeveloperRef = updateDeveloperRef;

exports.updateDeveloper = function updateDeveloper(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(updateDeveloperRef(dcInstance, inputVars));
}
;

const deleteDeveloperRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteDeveloper');
}
deleteDeveloperRef.operationName = 'DeleteDeveloper';
exports.deleteDeveloperRef = deleteDeveloperRef;

exports.deleteDeveloper = function deleteDeveloper(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteDeveloperRef(dcInstance, inputVars));
}
;

const getDeveloperRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDeveloper');
}
getDeveloperRef.operationName = 'GetDeveloper';
exports.getDeveloperRef = getDeveloperRef;

exports.getDeveloper = function getDeveloper(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getDeveloperRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listDevelopersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDevelopers');
}
listDevelopersRef.operationName = 'ListDevelopers';
exports.listDevelopersRef = listDevelopersRef;

exports.listDevelopers = function listDevelopers(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listDevelopersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createProjectRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject');
}
createProjectRef.operationName = 'CreateProject';
exports.createProjectRef = createProjectRef;

exports.createProject = function createProject(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createProjectRef(dcInstance, inputVars));
}
;

const updateProjectRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProject');
}
updateProjectRef.operationName = 'UpdateProject';
exports.updateProjectRef = updateProjectRef;

exports.updateProject = function updateProject(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(updateProjectRef(dcInstance, inputVars));
}
;

const deleteProjectRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject');
}
deleteProjectRef.operationName = 'DeleteProject';
exports.deleteProjectRef = deleteProjectRef;

exports.deleteProject = function deleteProject(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteProjectRef(dcInstance, inputVars));
}
;

const getProjectRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProject');
}
getProjectRef.operationName = 'GetProject';
exports.getProjectRef = getProjectRef;

exports.getProject = function getProject(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getProjectRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjects');
}
listProjectsRef.operationName = 'ListProjects';
exports.listProjectsRef = listProjectsRef;

exports.listProjects = function listProjects(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listProjectsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createVibePromptRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateVibePrompt');
}
createVibePromptRef.operationName = 'CreateVibePrompt';
exports.createVibePromptRef = createVibePromptRef;

exports.createVibePrompt = function createVibePrompt(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createVibePromptRef(dcInstance, inputVars));
}
;

const updateVibePromptRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVibePrompt');
}
updateVibePromptRef.operationName = 'UpdateVibePrompt';
exports.updateVibePromptRef = updateVibePromptRef;

exports.updateVibePrompt = function updateVibePrompt(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(updateVibePromptRef(dcInstance, inputVars));
}
;

const deleteVibePromptRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteVibePrompt');
}
deleteVibePromptRef.operationName = 'DeleteVibePrompt';
exports.deleteVibePromptRef = deleteVibePromptRef;

exports.deleteVibePrompt = function deleteVibePrompt(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteVibePromptRef(dcInstance, inputVars));
}
;

const getVibePromptRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetVibePrompt');
}
getVibePromptRef.operationName = 'GetVibePrompt';
exports.getVibePromptRef = getVibePromptRef;

exports.getVibePrompt = function getVibePrompt(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getVibePromptRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listVibePromptsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVibePrompts');
}
listVibePromptsRef.operationName = 'ListVibePrompts';
exports.listVibePromptsRef = listVibePromptsRef;

exports.listVibePrompts = function listVibePrompts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listVibePromptsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createAgentSessionRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAgentSession');
}
createAgentSessionRef.operationName = 'CreateAgentSession';
exports.createAgentSessionRef = createAgentSessionRef;

exports.createAgentSession = function createAgentSession(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createAgentSessionRef(dcInstance, inputVars));
}
;

const updateAgentSessionRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAgentSession');
}
updateAgentSessionRef.operationName = 'UpdateAgentSession';
exports.updateAgentSessionRef = updateAgentSessionRef;

exports.updateAgentSession = function updateAgentSession(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(updateAgentSessionRef(dcInstance, inputVars));
}
;

const deleteAgentSessionRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAgentSession');
}
deleteAgentSessionRef.operationName = 'DeleteAgentSession';
exports.deleteAgentSessionRef = deleteAgentSessionRef;

exports.deleteAgentSession = function deleteAgentSession(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteAgentSessionRef(dcInstance, inputVars));
}
;

const getAgentSessionRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgentSession');
}
getAgentSessionRef.operationName = 'GetAgentSession';
exports.getAgentSessionRef = getAgentSessionRef;

exports.getAgentSession = function getAgentSession(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getAgentSessionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listAgentSessionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAgentSessions');
}
listAgentSessionsRef.operationName = 'ListAgentSessions';
exports.listAgentSessionsRef = listAgentSessionsRef;

exports.listAgentSessions = function listAgentSessions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAgentSessionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createCodeArtifactRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCodeArtifact');
}
createCodeArtifactRef.operationName = 'CreateCodeArtifact';
exports.createCodeArtifactRef = createCodeArtifactRef;

exports.createCodeArtifact = function createCodeArtifact(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createCodeArtifactRef(dcInstance, inputVars));
}
;

const updateCodeArtifactRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCodeArtifact');
}
updateCodeArtifactRef.operationName = 'UpdateCodeArtifact';
exports.updateCodeArtifactRef = updateCodeArtifactRef;

exports.updateCodeArtifact = function updateCodeArtifact(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(updateCodeArtifactRef(dcInstance, inputVars));
}
;

const deleteCodeArtifactRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCodeArtifact');
}
deleteCodeArtifactRef.operationName = 'DeleteCodeArtifact';
exports.deleteCodeArtifactRef = deleteCodeArtifactRef;

exports.deleteCodeArtifact = function deleteCodeArtifact(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteCodeArtifactRef(dcInstance, inputVars));
}
;

const getCodeArtifactRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCodeArtifact');
}
getCodeArtifactRef.operationName = 'GetCodeArtifact';
exports.getCodeArtifactRef = getCodeArtifactRef;

exports.getCodeArtifact = function getCodeArtifact(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCodeArtifactRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCodeArtifactsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCodeArtifacts');
}
listCodeArtifactsRef.operationName = 'ListCodeArtifacts';
exports.listCodeArtifactsRef = listCodeArtifactsRef;

exports.listCodeArtifacts = function listCodeArtifacts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCodeArtifactsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createVibeRoomRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateVibeRoom');
}
createVibeRoomRef.operationName = 'CreateVibeRoom';
exports.createVibeRoomRef = createVibeRoomRef;

exports.createVibeRoom = function createVibeRoom(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createVibeRoomRef(dcInstance, inputVars));
}
;

const updateVibeRoomRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateVibeRoom');
}
updateVibeRoomRef.operationName = 'UpdateVibeRoom';
exports.updateVibeRoomRef = updateVibeRoomRef;

exports.updateVibeRoom = function updateVibeRoom(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(updateVibeRoomRef(dcInstance, inputVars));
}
;

const deleteVibeRoomRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteVibeRoom');
}
deleteVibeRoomRef.operationName = 'DeleteVibeRoom';
exports.deleteVibeRoomRef = deleteVibeRoomRef;

exports.deleteVibeRoom = function deleteVibeRoom(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteVibeRoomRef(dcInstance, inputVars));
}
;

const getVibeRoomRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetVibeRoom');
}
getVibeRoomRef.operationName = 'GetVibeRoom';
exports.getVibeRoomRef = getVibeRoomRef;

exports.getVibeRoom = function getVibeRoom(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getVibeRoomRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listVibeRoomsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListVibeRooms');
}
listVibeRoomsRef.operationName = 'ListVibeRooms';
exports.listVibeRoomsRef = listVibeRoomsRef;

exports.listVibeRooms = function listVibeRooms(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listVibeRoomsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createRoomMembershipRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRoomMembership');
}
createRoomMembershipRef.operationName = 'CreateRoomMembership';
exports.createRoomMembershipRef = createRoomMembershipRef;

exports.createRoomMembership = function createRoomMembership(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createRoomMembershipRef(dcInstance, inputVars));
}
;

const deleteRoomMembershipRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteRoomMembership');
}
deleteRoomMembershipRef.operationName = 'DeleteRoomMembership';
exports.deleteRoomMembershipRef = deleteRoomMembershipRef;

exports.deleteRoomMembership = function deleteRoomMembership(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(deleteRoomMembershipRef(dcInstance, inputVars));
}
;

const getRoomMembershipRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRoomMembership');
}
getRoomMembershipRef.operationName = 'GetRoomMembership';
exports.getRoomMembershipRef = getRoomMembershipRef;

exports.getRoomMembership = function getRoomMembership(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getRoomMembershipRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listRoomMembershipsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListRoomMemberships');
}
listRoomMembershipsRef.operationName = 'ListRoomMemberships';
exports.listRoomMembershipsRef = listRoomMembershipsRef;

exports.listRoomMemberships = function listRoomMemberships(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listRoomMembershipsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
