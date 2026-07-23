import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AgentSession_Key {
  id: UUIDString;
  __typename?: 'AgentSession_Key';
}

export interface CodeArtifact_Key {
  id: UUIDString;
  __typename?: 'CodeArtifact_Key';
}

export interface CreateAgentSessionData {
  agentSession_insert: AgentSession_Key;
}

export interface CreateCodeArtifactData {
  codeArtifact_insert: CodeArtifact_Key;
}

export interface CreateDeveloperData {
  developer_insert: Developer_Key;
}

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateRoomMembershipData {
  roomMembership_insert: RoomMembership_Key;
}

export interface CreateVibePromptData {
  vibePrompt_insert: VibePrompt_Key;
}

export interface CreateVibeRoomData {
  vibeRoom_insert: VibeRoom_Key;
}

export interface DeleteAgentSessionData {
  agentSession_delete?: AgentSession_Key | null;
}

export interface DeleteCodeArtifactData {
  codeArtifact_delete?: CodeArtifact_Key | null;
}

export interface DeleteDeveloperData {
  developer_delete?: Developer_Key | null;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteRoomMembershipData {
  roomMembership_delete?: RoomMembership_Key | null;
}

export interface DeleteVibePromptData {
  vibePrompt_delete?: VibePrompt_Key | null;
}

export interface DeleteVibeRoomData {
  vibeRoom_delete?: VibeRoom_Key | null;
}

export interface Developer_Key {
  id: UUIDString;
  __typename?: 'Developer_Key';
}

export interface GetAgentSessionData {
  agentSession?: {
    agentType: string;
    isActive?: boolean | null;
  };
}

export interface GetCodeArtifactData {
  codeArtifact?: {
    filePath: string;
    version: string;
  };
}

export interface GetDeveloperData {
  developer?: {
    username: string;
    email: string;
  };
}

export interface GetProjectData {
  project?: {
    title: string;
    description: string;
  };
}

export interface GetRoomMembershipData {
  roomMembership?: {
    room: {
      name: string;
    };
  };
}

export interface GetVibePromptData {
  vibePrompt?: {
    content: string;
    status: string;
  };
}

export interface GetVibeRoomData {
  vibeRoom?: {
    name: string;
  };
}

export interface ListAgentSessionsData {
  agentSessions: ({
    startTime: TimestampString;
    agentType: string;
  })[];
}

export interface ListCodeArtifactsData {
  codeArtifacts: ({
    filePath: string;
    language?: string | null;
  })[];
}

export interface ListDevelopersData {
  developers: ({
    username: string;
    bio?: string | null;
  })[];
}

export interface ListProjectsData {
  projects: ({
    title: string;
    repoUrl?: string | null;
  })[];
}

export interface ListRoomMembershipsData {
  roomMemberships: ({
    roomId: UUIDString;
    developerId: UUIDString;
  } & RoomMembership_Key)[];
}

export interface ListVibePromptsData {
  vibePrompts: ({
    content: string;
    complexityScore?: number | null;
  })[];
}

export interface ListVibeRoomsData {
  vibeRooms: ({
    name: string;
    createdAt?: TimestampString | null;
  })[];
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface RoomMembership_Key {
  roomId: UUIDString;
  developerId: UUIDString;
  __typename?: 'RoomMembership_Key';
}

export interface UpdateAgentSessionData {
  agentSession_update?: AgentSession_Key | null;
}

export interface UpdateCodeArtifactData {
  codeArtifact_update?: CodeArtifact_Key | null;
}

export interface UpdateDeveloperData {
  developer_update?: Developer_Key | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

export interface UpdateVibePromptData {
  vibePrompt_update?: VibePrompt_Key | null;
}

export interface UpdateVibeRoomData {
  vibeRoom_update?: VibeRoom_Key | null;
}

export interface VibePrompt_Key {
  id: UUIDString;
  __typename?: 'VibePrompt_Key';
}

export interface VibeRoom_Key {
  id: UUIDString;
  __typename?: 'VibeRoom_Key';
}

interface CreateDeveloperRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDeveloperData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDeveloperData, undefined>;
  operationName: string;
}
export const createDeveloperRef: CreateDeveloperRef;

export function createDeveloper(): MutationPromise<CreateDeveloperData, undefined>;
export function createDeveloper(dc: DataConnect): MutationPromise<CreateDeveloperData, undefined>;

interface UpdateDeveloperRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateDeveloperData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateDeveloperData, undefined>;
  operationName: string;
}
export const updateDeveloperRef: UpdateDeveloperRef;

export function updateDeveloper(): MutationPromise<UpdateDeveloperData, undefined>;
export function updateDeveloper(dc: DataConnect): MutationPromise<UpdateDeveloperData, undefined>;

interface DeleteDeveloperRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteDeveloperData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteDeveloperData, undefined>;
  operationName: string;
}
export const deleteDeveloperRef: DeleteDeveloperRef;

export function deleteDeveloper(): MutationPromise<DeleteDeveloperData, undefined>;
export function deleteDeveloper(dc: DataConnect): MutationPromise<DeleteDeveloperData, undefined>;

interface GetDeveloperRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDeveloperData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetDeveloperData, undefined>;
  operationName: string;
}
export const getDeveloperRef: GetDeveloperRef;

export function getDeveloper(options?: ExecuteQueryOptions): QueryPromise<GetDeveloperData, undefined>;
export function getDeveloper(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDeveloperData, undefined>;

interface ListDevelopersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDevelopersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDevelopersData, undefined>;
  operationName: string;
}
export const listDevelopersRef: ListDevelopersRef;

export function listDevelopers(options?: ExecuteQueryOptions): QueryPromise<ListDevelopersData, undefined>;
export function listDevelopers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDevelopersData, undefined>;

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateProjectData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateProjectData, undefined>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(): MutationPromise<CreateProjectData, undefined>;
export function createProject(dc: DataConnect): MutationPromise<CreateProjectData, undefined>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateProjectData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateProjectData, undefined>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(): MutationPromise<UpdateProjectData, undefined>;
export function updateProject(dc: DataConnect): MutationPromise<UpdateProjectData, undefined>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteProjectData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteProjectData, undefined>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(): MutationPromise<DeleteProjectData, undefined>;
export function deleteProject(dc: DataConnect): MutationPromise<DeleteProjectData, undefined>;

interface GetProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetProjectData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetProjectData, undefined>;
  operationName: string;
}
export const getProjectRef: GetProjectRef;

export function getProject(options?: ExecuteQueryOptions): QueryPromise<GetProjectData, undefined>;
export function getProject(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, undefined>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;
export function listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface CreateVibePromptRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateVibePromptData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateVibePromptData, undefined>;
  operationName: string;
}
export const createVibePromptRef: CreateVibePromptRef;

export function createVibePrompt(): MutationPromise<CreateVibePromptData, undefined>;
export function createVibePrompt(dc: DataConnect): MutationPromise<CreateVibePromptData, undefined>;

interface UpdateVibePromptRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateVibePromptData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateVibePromptData, undefined>;
  operationName: string;
}
export const updateVibePromptRef: UpdateVibePromptRef;

export function updateVibePrompt(): MutationPromise<UpdateVibePromptData, undefined>;
export function updateVibePrompt(dc: DataConnect): MutationPromise<UpdateVibePromptData, undefined>;

interface DeleteVibePromptRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteVibePromptData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteVibePromptData, undefined>;
  operationName: string;
}
export const deleteVibePromptRef: DeleteVibePromptRef;

export function deleteVibePrompt(): MutationPromise<DeleteVibePromptData, undefined>;
export function deleteVibePrompt(dc: DataConnect): MutationPromise<DeleteVibePromptData, undefined>;

interface GetVibePromptRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetVibePromptData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetVibePromptData, undefined>;
  operationName: string;
}
export const getVibePromptRef: GetVibePromptRef;

export function getVibePrompt(options?: ExecuteQueryOptions): QueryPromise<GetVibePromptData, undefined>;
export function getVibePrompt(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetVibePromptData, undefined>;

interface ListVibePromptsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVibePromptsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListVibePromptsData, undefined>;
  operationName: string;
}
export const listVibePromptsRef: ListVibePromptsRef;

export function listVibePrompts(options?: ExecuteQueryOptions): QueryPromise<ListVibePromptsData, undefined>;
export function listVibePrompts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVibePromptsData, undefined>;

interface CreateAgentSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAgentSessionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateAgentSessionData, undefined>;
  operationName: string;
}
export const createAgentSessionRef: CreateAgentSessionRef;

export function createAgentSession(): MutationPromise<CreateAgentSessionData, undefined>;
export function createAgentSession(dc: DataConnect): MutationPromise<CreateAgentSessionData, undefined>;

interface UpdateAgentSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAgentSessionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateAgentSessionData, undefined>;
  operationName: string;
}
export const updateAgentSessionRef: UpdateAgentSessionRef;

export function updateAgentSession(): MutationPromise<UpdateAgentSessionData, undefined>;
export function updateAgentSession(dc: DataConnect): MutationPromise<UpdateAgentSessionData, undefined>;

interface DeleteAgentSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAgentSessionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteAgentSessionData, undefined>;
  operationName: string;
}
export const deleteAgentSessionRef: DeleteAgentSessionRef;

export function deleteAgentSession(): MutationPromise<DeleteAgentSessionData, undefined>;
export function deleteAgentSession(dc: DataConnect): MutationPromise<DeleteAgentSessionData, undefined>;

interface GetAgentSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAgentSessionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAgentSessionData, undefined>;
  operationName: string;
}
export const getAgentSessionRef: GetAgentSessionRef;

export function getAgentSession(options?: ExecuteQueryOptions): QueryPromise<GetAgentSessionData, undefined>;
export function getAgentSession(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAgentSessionData, undefined>;

interface ListAgentSessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAgentSessionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAgentSessionsData, undefined>;
  operationName: string;
}
export const listAgentSessionsRef: ListAgentSessionsRef;

export function listAgentSessions(options?: ExecuteQueryOptions): QueryPromise<ListAgentSessionsData, undefined>;
export function listAgentSessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAgentSessionsData, undefined>;

interface CreateCodeArtifactRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateCodeArtifactData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateCodeArtifactData, undefined>;
  operationName: string;
}
export const createCodeArtifactRef: CreateCodeArtifactRef;

export function createCodeArtifact(): MutationPromise<CreateCodeArtifactData, undefined>;
export function createCodeArtifact(dc: DataConnect): MutationPromise<CreateCodeArtifactData, undefined>;

interface UpdateCodeArtifactRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateCodeArtifactData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateCodeArtifactData, undefined>;
  operationName: string;
}
export const updateCodeArtifactRef: UpdateCodeArtifactRef;

export function updateCodeArtifact(): MutationPromise<UpdateCodeArtifactData, undefined>;
export function updateCodeArtifact(dc: DataConnect): MutationPromise<UpdateCodeArtifactData, undefined>;

interface DeleteCodeArtifactRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteCodeArtifactData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteCodeArtifactData, undefined>;
  operationName: string;
}
export const deleteCodeArtifactRef: DeleteCodeArtifactRef;

export function deleteCodeArtifact(): MutationPromise<DeleteCodeArtifactData, undefined>;
export function deleteCodeArtifact(dc: DataConnect): MutationPromise<DeleteCodeArtifactData, undefined>;

interface GetCodeArtifactRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCodeArtifactData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCodeArtifactData, undefined>;
  operationName: string;
}
export const getCodeArtifactRef: GetCodeArtifactRef;

export function getCodeArtifact(options?: ExecuteQueryOptions): QueryPromise<GetCodeArtifactData, undefined>;
export function getCodeArtifact(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCodeArtifactData, undefined>;

interface ListCodeArtifactsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCodeArtifactsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCodeArtifactsData, undefined>;
  operationName: string;
}
export const listCodeArtifactsRef: ListCodeArtifactsRef;

export function listCodeArtifacts(options?: ExecuteQueryOptions): QueryPromise<ListCodeArtifactsData, undefined>;
export function listCodeArtifacts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCodeArtifactsData, undefined>;

interface CreateVibeRoomRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateVibeRoomData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateVibeRoomData, undefined>;
  operationName: string;
}
export const createVibeRoomRef: CreateVibeRoomRef;

export function createVibeRoom(): MutationPromise<CreateVibeRoomData, undefined>;
export function createVibeRoom(dc: DataConnect): MutationPromise<CreateVibeRoomData, undefined>;

interface UpdateVibeRoomRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateVibeRoomData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateVibeRoomData, undefined>;
  operationName: string;
}
export const updateVibeRoomRef: UpdateVibeRoomRef;

export function updateVibeRoom(): MutationPromise<UpdateVibeRoomData, undefined>;
export function updateVibeRoom(dc: DataConnect): MutationPromise<UpdateVibeRoomData, undefined>;

interface DeleteVibeRoomRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteVibeRoomData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteVibeRoomData, undefined>;
  operationName: string;
}
export const deleteVibeRoomRef: DeleteVibeRoomRef;

export function deleteVibeRoom(): MutationPromise<DeleteVibeRoomData, undefined>;
export function deleteVibeRoom(dc: DataConnect): MutationPromise<DeleteVibeRoomData, undefined>;

interface GetVibeRoomRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetVibeRoomData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetVibeRoomData, undefined>;
  operationName: string;
}
export const getVibeRoomRef: GetVibeRoomRef;

export function getVibeRoom(options?: ExecuteQueryOptions): QueryPromise<GetVibeRoomData, undefined>;
export function getVibeRoom(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetVibeRoomData, undefined>;

interface ListVibeRoomsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVibeRoomsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListVibeRoomsData, undefined>;
  operationName: string;
}
export const listVibeRoomsRef: ListVibeRoomsRef;

export function listVibeRooms(options?: ExecuteQueryOptions): QueryPromise<ListVibeRoomsData, undefined>;
export function listVibeRooms(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVibeRoomsData, undefined>;

interface CreateRoomMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateRoomMembershipData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateRoomMembershipData, undefined>;
  operationName: string;
}
export const createRoomMembershipRef: CreateRoomMembershipRef;

export function createRoomMembership(): MutationPromise<CreateRoomMembershipData, undefined>;
export function createRoomMembership(dc: DataConnect): MutationPromise<CreateRoomMembershipData, undefined>;

interface DeleteRoomMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteRoomMembershipData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteRoomMembershipData, undefined>;
  operationName: string;
}
export const deleteRoomMembershipRef: DeleteRoomMembershipRef;

export function deleteRoomMembership(): MutationPromise<DeleteRoomMembershipData, undefined>;
export function deleteRoomMembership(dc: DataConnect): MutationPromise<DeleteRoomMembershipData, undefined>;

interface GetRoomMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRoomMembershipData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetRoomMembershipData, undefined>;
  operationName: string;
}
export const getRoomMembershipRef: GetRoomMembershipRef;

export function getRoomMembership(options?: ExecuteQueryOptions): QueryPromise<GetRoomMembershipData, undefined>;
export function getRoomMembership(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetRoomMembershipData, undefined>;

interface ListRoomMembershipsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRoomMembershipsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListRoomMembershipsData, undefined>;
  operationName: string;
}
export const listRoomMembershipsRef: ListRoomMembershipsRef;

export function listRoomMemberships(options?: ExecuteQueryOptions): QueryPromise<ListRoomMembershipsData, undefined>;
export function listRoomMemberships(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListRoomMembershipsData, undefined>;

