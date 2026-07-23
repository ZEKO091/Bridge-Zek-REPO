import { CreateDeveloperData, UpdateDeveloperData, DeleteDeveloperData, GetDeveloperData, ListDevelopersData, CreateProjectData, UpdateProjectData, DeleteProjectData, GetProjectData, ListProjectsData, CreateVibePromptData, UpdateVibePromptData, DeleteVibePromptData, GetVibePromptData, ListVibePromptsData, CreateAgentSessionData, UpdateAgentSessionData, DeleteAgentSessionData, GetAgentSessionData, ListAgentSessionsData, CreateCodeArtifactData, UpdateCodeArtifactData, DeleteCodeArtifactData, GetCodeArtifactData, ListCodeArtifactsData, CreateVibeRoomData, UpdateVibeRoomData, DeleteVibeRoomData, GetVibeRoomData, ListVibeRoomsData, CreateRoomMembershipData, DeleteRoomMembershipData, GetRoomMembershipData, ListRoomMembershipsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateDeveloper(options?: useDataConnectMutationOptions<CreateDeveloperData, FirebaseError, void>): UseDataConnectMutationResult<CreateDeveloperData, undefined>;
export function useCreateDeveloper(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDeveloperData, FirebaseError, void>): UseDataConnectMutationResult<CreateDeveloperData, undefined>;

export function useUpdateDeveloper(options?: useDataConnectMutationOptions<UpdateDeveloperData, FirebaseError, void>): UseDataConnectMutationResult<UpdateDeveloperData, undefined>;
export function useUpdateDeveloper(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDeveloperData, FirebaseError, void>): UseDataConnectMutationResult<UpdateDeveloperData, undefined>;

export function useDeleteDeveloper(options?: useDataConnectMutationOptions<DeleteDeveloperData, FirebaseError, void>): UseDataConnectMutationResult<DeleteDeveloperData, undefined>;
export function useDeleteDeveloper(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteDeveloperData, FirebaseError, void>): UseDataConnectMutationResult<DeleteDeveloperData, undefined>;

export function useGetDeveloper(options?: useDataConnectQueryOptions<GetDeveloperData>): UseDataConnectQueryResult<GetDeveloperData, undefined>;
export function useGetDeveloper(dc: DataConnect, options?: useDataConnectQueryOptions<GetDeveloperData>): UseDataConnectQueryResult<GetDeveloperData, undefined>;

export function useListDevelopers(options?: useDataConnectQueryOptions<ListDevelopersData>): UseDataConnectQueryResult<ListDevelopersData, undefined>;
export function useListDevelopers(dc: DataConnect, options?: useDataConnectQueryOptions<ListDevelopersData>): UseDataConnectQueryResult<ListDevelopersData, undefined>;

export function useCreateProject(options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, void>): UseDataConnectMutationResult<CreateProjectData, undefined>;
export function useCreateProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, void>): UseDataConnectMutationResult<CreateProjectData, undefined>;

export function useUpdateProject(options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, void>): UseDataConnectMutationResult<UpdateProjectData, undefined>;
export function useUpdateProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, void>): UseDataConnectMutationResult<UpdateProjectData, undefined>;

export function useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, void>): UseDataConnectMutationResult<DeleteProjectData, undefined>;
export function useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, void>): UseDataConnectMutationResult<DeleteProjectData, undefined>;

export function useGetProject(options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, undefined>;
export function useGetProject(dc: DataConnect, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, undefined>;

export function useListProjects(options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;
export function useListProjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;

export function useCreateVibePrompt(options?: useDataConnectMutationOptions<CreateVibePromptData, FirebaseError, void>): UseDataConnectMutationResult<CreateVibePromptData, undefined>;
export function useCreateVibePrompt(dc: DataConnect, options?: useDataConnectMutationOptions<CreateVibePromptData, FirebaseError, void>): UseDataConnectMutationResult<CreateVibePromptData, undefined>;

export function useUpdateVibePrompt(options?: useDataConnectMutationOptions<UpdateVibePromptData, FirebaseError, void>): UseDataConnectMutationResult<UpdateVibePromptData, undefined>;
export function useUpdateVibePrompt(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateVibePromptData, FirebaseError, void>): UseDataConnectMutationResult<UpdateVibePromptData, undefined>;

export function useDeleteVibePrompt(options?: useDataConnectMutationOptions<DeleteVibePromptData, FirebaseError, void>): UseDataConnectMutationResult<DeleteVibePromptData, undefined>;
export function useDeleteVibePrompt(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteVibePromptData, FirebaseError, void>): UseDataConnectMutationResult<DeleteVibePromptData, undefined>;

export function useGetVibePrompt(options?: useDataConnectQueryOptions<GetVibePromptData>): UseDataConnectQueryResult<GetVibePromptData, undefined>;
export function useGetVibePrompt(dc: DataConnect, options?: useDataConnectQueryOptions<GetVibePromptData>): UseDataConnectQueryResult<GetVibePromptData, undefined>;

export function useListVibePrompts(options?: useDataConnectQueryOptions<ListVibePromptsData>): UseDataConnectQueryResult<ListVibePromptsData, undefined>;
export function useListVibePrompts(dc: DataConnect, options?: useDataConnectQueryOptions<ListVibePromptsData>): UseDataConnectQueryResult<ListVibePromptsData, undefined>;

export function useCreateAgentSession(options?: useDataConnectMutationOptions<CreateAgentSessionData, FirebaseError, void>): UseDataConnectMutationResult<CreateAgentSessionData, undefined>;
export function useCreateAgentSession(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAgentSessionData, FirebaseError, void>): UseDataConnectMutationResult<CreateAgentSessionData, undefined>;

export function useUpdateAgentSession(options?: useDataConnectMutationOptions<UpdateAgentSessionData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAgentSessionData, undefined>;
export function useUpdateAgentSession(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAgentSessionData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAgentSessionData, undefined>;

export function useDeleteAgentSession(options?: useDataConnectMutationOptions<DeleteAgentSessionData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAgentSessionData, undefined>;
export function useDeleteAgentSession(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAgentSessionData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAgentSessionData, undefined>;

export function useGetAgentSession(options?: useDataConnectQueryOptions<GetAgentSessionData>): UseDataConnectQueryResult<GetAgentSessionData, undefined>;
export function useGetAgentSession(dc: DataConnect, options?: useDataConnectQueryOptions<GetAgentSessionData>): UseDataConnectQueryResult<GetAgentSessionData, undefined>;

export function useListAgentSessions(options?: useDataConnectQueryOptions<ListAgentSessionsData>): UseDataConnectQueryResult<ListAgentSessionsData, undefined>;
export function useListAgentSessions(dc: DataConnect, options?: useDataConnectQueryOptions<ListAgentSessionsData>): UseDataConnectQueryResult<ListAgentSessionsData, undefined>;

export function useCreateCodeArtifact(options?: useDataConnectMutationOptions<CreateCodeArtifactData, FirebaseError, void>): UseDataConnectMutationResult<CreateCodeArtifactData, undefined>;
export function useCreateCodeArtifact(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCodeArtifactData, FirebaseError, void>): UseDataConnectMutationResult<CreateCodeArtifactData, undefined>;

export function useUpdateCodeArtifact(options?: useDataConnectMutationOptions<UpdateCodeArtifactData, FirebaseError, void>): UseDataConnectMutationResult<UpdateCodeArtifactData, undefined>;
export function useUpdateCodeArtifact(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCodeArtifactData, FirebaseError, void>): UseDataConnectMutationResult<UpdateCodeArtifactData, undefined>;

export function useDeleteCodeArtifact(options?: useDataConnectMutationOptions<DeleteCodeArtifactData, FirebaseError, void>): UseDataConnectMutationResult<DeleteCodeArtifactData, undefined>;
export function useDeleteCodeArtifact(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCodeArtifactData, FirebaseError, void>): UseDataConnectMutationResult<DeleteCodeArtifactData, undefined>;

export function useGetCodeArtifact(options?: useDataConnectQueryOptions<GetCodeArtifactData>): UseDataConnectQueryResult<GetCodeArtifactData, undefined>;
export function useGetCodeArtifact(dc: DataConnect, options?: useDataConnectQueryOptions<GetCodeArtifactData>): UseDataConnectQueryResult<GetCodeArtifactData, undefined>;

export function useListCodeArtifacts(options?: useDataConnectQueryOptions<ListCodeArtifactsData>): UseDataConnectQueryResult<ListCodeArtifactsData, undefined>;
export function useListCodeArtifacts(dc: DataConnect, options?: useDataConnectQueryOptions<ListCodeArtifactsData>): UseDataConnectQueryResult<ListCodeArtifactsData, undefined>;

export function useCreateVibeRoom(options?: useDataConnectMutationOptions<CreateVibeRoomData, FirebaseError, void>): UseDataConnectMutationResult<CreateVibeRoomData, undefined>;
export function useCreateVibeRoom(dc: DataConnect, options?: useDataConnectMutationOptions<CreateVibeRoomData, FirebaseError, void>): UseDataConnectMutationResult<CreateVibeRoomData, undefined>;

export function useUpdateVibeRoom(options?: useDataConnectMutationOptions<UpdateVibeRoomData, FirebaseError, void>): UseDataConnectMutationResult<UpdateVibeRoomData, undefined>;
export function useUpdateVibeRoom(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateVibeRoomData, FirebaseError, void>): UseDataConnectMutationResult<UpdateVibeRoomData, undefined>;

export function useDeleteVibeRoom(options?: useDataConnectMutationOptions<DeleteVibeRoomData, FirebaseError, void>): UseDataConnectMutationResult<DeleteVibeRoomData, undefined>;
export function useDeleteVibeRoom(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteVibeRoomData, FirebaseError, void>): UseDataConnectMutationResult<DeleteVibeRoomData, undefined>;

export function useGetVibeRoom(options?: useDataConnectQueryOptions<GetVibeRoomData>): UseDataConnectQueryResult<GetVibeRoomData, undefined>;
export function useGetVibeRoom(dc: DataConnect, options?: useDataConnectQueryOptions<GetVibeRoomData>): UseDataConnectQueryResult<GetVibeRoomData, undefined>;

export function useListVibeRooms(options?: useDataConnectQueryOptions<ListVibeRoomsData>): UseDataConnectQueryResult<ListVibeRoomsData, undefined>;
export function useListVibeRooms(dc: DataConnect, options?: useDataConnectQueryOptions<ListVibeRoomsData>): UseDataConnectQueryResult<ListVibeRoomsData, undefined>;

export function useCreateRoomMembership(options?: useDataConnectMutationOptions<CreateRoomMembershipData, FirebaseError, void>): UseDataConnectMutationResult<CreateRoomMembershipData, undefined>;
export function useCreateRoomMembership(dc: DataConnect, options?: useDataConnectMutationOptions<CreateRoomMembershipData, FirebaseError, void>): UseDataConnectMutationResult<CreateRoomMembershipData, undefined>;

export function useDeleteRoomMembership(options?: useDataConnectMutationOptions<DeleteRoomMembershipData, FirebaseError, void>): UseDataConnectMutationResult<DeleteRoomMembershipData, undefined>;
export function useDeleteRoomMembership(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteRoomMembershipData, FirebaseError, void>): UseDataConnectMutationResult<DeleteRoomMembershipData, undefined>;

export function useGetRoomMembership(options?: useDataConnectQueryOptions<GetRoomMembershipData>): UseDataConnectQueryResult<GetRoomMembershipData, undefined>;
export function useGetRoomMembership(dc: DataConnect, options?: useDataConnectQueryOptions<GetRoomMembershipData>): UseDataConnectQueryResult<GetRoomMembershipData, undefined>;

export function useListRoomMemberships(options?: useDataConnectQueryOptions<ListRoomMembershipsData>): UseDataConnectQueryResult<ListRoomMembershipsData, undefined>;
export function useListRoomMemberships(dc: DataConnect, options?: useDataConnectQueryOptions<ListRoomMembershipsData>): UseDataConnectQueryResult<ListRoomMembershipsData, undefined>;
