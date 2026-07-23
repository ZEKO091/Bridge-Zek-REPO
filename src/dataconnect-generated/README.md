# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetDeveloper*](#getdeveloper)
  - [*ListDevelopers*](#listdevelopers)
  - [*GetProject*](#getproject)
  - [*ListProjects*](#listprojects)
  - [*GetVibePrompt*](#getvibeprompt)
  - [*ListVibePrompts*](#listvibeprompts)
  - [*GetAgentSession*](#getagentsession)
  - [*ListAgentSessions*](#listagentsessions)
  - [*GetCodeArtifact*](#getcodeartifact)
  - [*ListCodeArtifacts*](#listcodeartifacts)
  - [*GetVibeRoom*](#getviberoom)
  - [*ListVibeRooms*](#listviberooms)
  - [*GetRoomMembership*](#getroommembership)
  - [*ListRoomMemberships*](#listroommemberships)
- [**Mutations**](#mutations)
  - [*CreateDeveloper*](#createdeveloper)
  - [*UpdateDeveloper*](#updatedeveloper)
  - [*DeleteDeveloper*](#deletedeveloper)
  - [*CreateProject*](#createproject)
  - [*UpdateProject*](#updateproject)
  - [*DeleteProject*](#deleteproject)
  - [*CreateVibePrompt*](#createvibeprompt)
  - [*UpdateVibePrompt*](#updatevibeprompt)
  - [*DeleteVibePrompt*](#deletevibeprompt)
  - [*CreateAgentSession*](#createagentsession)
  - [*UpdateAgentSession*](#updateagentsession)
  - [*DeleteAgentSession*](#deleteagentsession)
  - [*CreateCodeArtifact*](#createcodeartifact)
  - [*UpdateCodeArtifact*](#updatecodeartifact)
  - [*DeleteCodeArtifact*](#deletecodeartifact)
  - [*CreateVibeRoom*](#createviberoom)
  - [*UpdateVibeRoom*](#updateviberoom)
  - [*DeleteVibeRoom*](#deleteviberoom)
  - [*CreateRoomMembership*](#createroommembership)
  - [*DeleteRoomMembership*](#deleteroommembership)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetDeveloper
You can execute the `GetDeveloper` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDeveloper(options?: ExecuteQueryOptions): QueryPromise<GetDeveloperData, undefined>;

interface GetDeveloperRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDeveloperData, undefined>;
}
export const getDeveloperRef: GetDeveloperRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDeveloper(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDeveloperData, undefined>;

interface GetDeveloperRef {
  ...
  (dc: DataConnect): QueryRef<GetDeveloperData, undefined>;
}
export const getDeveloperRef: GetDeveloperRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDeveloperRef:
```typescript
const name = getDeveloperRef.operationName;
console.log(name);
```

### Variables
The `GetDeveloper` query has no variables.
### Return Type
Recall that executing the `GetDeveloper` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDeveloperData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDeveloperData {
  developer?: {
    username: string;
    email: string;
  };
}
```
### Using `GetDeveloper`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDeveloper } from '@dataconnect/generated';


// Call the `getDeveloper()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDeveloper();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDeveloper(dataConnect);

console.log(data.developer);

// Or, you can use the `Promise` API.
getDeveloper().then((response) => {
  const data = response.data;
  console.log(data.developer);
});
```

### Using `GetDeveloper`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDeveloperRef } from '@dataconnect/generated';


// Call the `getDeveloperRef()` function to get a reference to the query.
const ref = getDeveloperRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDeveloperRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.developer);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.developer);
});
```

## ListDevelopers
You can execute the `ListDevelopers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDevelopers(options?: ExecuteQueryOptions): QueryPromise<ListDevelopersData, undefined>;

interface ListDevelopersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDevelopersData, undefined>;
}
export const listDevelopersRef: ListDevelopersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDevelopers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDevelopersData, undefined>;

interface ListDevelopersRef {
  ...
  (dc: DataConnect): QueryRef<ListDevelopersData, undefined>;
}
export const listDevelopersRef: ListDevelopersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDevelopersRef:
```typescript
const name = listDevelopersRef.operationName;
console.log(name);
```

### Variables
The `ListDevelopers` query has no variables.
### Return Type
Recall that executing the `ListDevelopers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDevelopersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDevelopersData {
  developers: ({
    username: string;
    bio?: string | null;
  })[];
}
```
### Using `ListDevelopers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDevelopers } from '@dataconnect/generated';


// Call the `listDevelopers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDevelopers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDevelopers(dataConnect);

console.log(data.developers);

// Or, you can use the `Promise` API.
listDevelopers().then((response) => {
  const data = response.data;
  console.log(data.developers);
});
```

### Using `ListDevelopers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDevelopersRef } from '@dataconnect/generated';


// Call the `listDevelopersRef()` function to get a reference to the query.
const ref = listDevelopersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDevelopersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.developers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.developers);
});
```

## GetProject
You can execute the `GetProject` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getProject(options?: ExecuteQueryOptions): QueryPromise<GetProjectData, undefined>;

interface GetProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetProjectData, undefined>;
}
export const getProjectRef: GetProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProject(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, undefined>;

interface GetProjectRef {
  ...
  (dc: DataConnect): QueryRef<GetProjectData, undefined>;
}
export const getProjectRef: GetProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectRef:
```typescript
const name = getProjectRef.operationName;
console.log(name);
```

### Variables
The `GetProject` query has no variables.
### Return Type
Recall that executing the `GetProject` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProjectData {
  project?: {
    title: string;
    description: string;
  };
}
```
### Using `GetProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProject } from '@dataconnect/generated';


// Call the `getProject()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProject();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProject(dataConnect);

console.log(data.project);

// Or, you can use the `Promise` API.
getProject().then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

### Using `GetProject`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectRef } from '@dataconnect/generated';


// Call the `getProjectRef()` function to get a reference to the query.
const ref = getProjectRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.project);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

## ListProjects
You can execute the `ListProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsRef:
```typescript
const name = listProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListProjects` query has no variables.
### Return Type
Recall that executing the `ListProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectsData {
  projects: ({
    title: string;
    repoUrl?: string | null;
  })[];
}
```
### Using `ListProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjects } from '@dataconnect/generated';


// Call the `listProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjects(dataConnect);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjects().then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsRef } from '@dataconnect/generated';


// Call the `listProjectsRef()` function to get a reference to the query.
const ref = listProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## GetVibePrompt
You can execute the `GetVibePrompt` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getVibePrompt(options?: ExecuteQueryOptions): QueryPromise<GetVibePromptData, undefined>;

interface GetVibePromptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetVibePromptData, undefined>;
}
export const getVibePromptRef: GetVibePromptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getVibePrompt(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetVibePromptData, undefined>;

interface GetVibePromptRef {
  ...
  (dc: DataConnect): QueryRef<GetVibePromptData, undefined>;
}
export const getVibePromptRef: GetVibePromptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getVibePromptRef:
```typescript
const name = getVibePromptRef.operationName;
console.log(name);
```

### Variables
The `GetVibePrompt` query has no variables.
### Return Type
Recall that executing the `GetVibePrompt` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetVibePromptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetVibePromptData {
  vibePrompt?: {
    content: string;
    status: string;
  };
}
```
### Using `GetVibePrompt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getVibePrompt } from '@dataconnect/generated';


// Call the `getVibePrompt()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getVibePrompt();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getVibePrompt(dataConnect);

console.log(data.vibePrompt);

// Or, you can use the `Promise` API.
getVibePrompt().then((response) => {
  const data = response.data;
  console.log(data.vibePrompt);
});
```

### Using `GetVibePrompt`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getVibePromptRef } from '@dataconnect/generated';


// Call the `getVibePromptRef()` function to get a reference to the query.
const ref = getVibePromptRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getVibePromptRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vibePrompt);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vibePrompt);
});
```

## ListVibePrompts
You can execute the `ListVibePrompts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVibePrompts(options?: ExecuteQueryOptions): QueryPromise<ListVibePromptsData, undefined>;

interface ListVibePromptsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVibePromptsData, undefined>;
}
export const listVibePromptsRef: ListVibePromptsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVibePrompts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVibePromptsData, undefined>;

interface ListVibePromptsRef {
  ...
  (dc: DataConnect): QueryRef<ListVibePromptsData, undefined>;
}
export const listVibePromptsRef: ListVibePromptsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVibePromptsRef:
```typescript
const name = listVibePromptsRef.operationName;
console.log(name);
```

### Variables
The `ListVibePrompts` query has no variables.
### Return Type
Recall that executing the `ListVibePrompts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVibePromptsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVibePromptsData {
  vibePrompts: ({
    content: string;
    complexityScore?: number | null;
  })[];
}
```
### Using `ListVibePrompts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVibePrompts } from '@dataconnect/generated';


// Call the `listVibePrompts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVibePrompts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVibePrompts(dataConnect);

console.log(data.vibePrompts);

// Or, you can use the `Promise` API.
listVibePrompts().then((response) => {
  const data = response.data;
  console.log(data.vibePrompts);
});
```

### Using `ListVibePrompts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVibePromptsRef } from '@dataconnect/generated';


// Call the `listVibePromptsRef()` function to get a reference to the query.
const ref = listVibePromptsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVibePromptsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vibePrompts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vibePrompts);
});
```

## GetAgentSession
You can execute the `GetAgentSession` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAgentSession(options?: ExecuteQueryOptions): QueryPromise<GetAgentSessionData, undefined>;

interface GetAgentSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAgentSessionData, undefined>;
}
export const getAgentSessionRef: GetAgentSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAgentSession(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAgentSessionData, undefined>;

interface GetAgentSessionRef {
  ...
  (dc: DataConnect): QueryRef<GetAgentSessionData, undefined>;
}
export const getAgentSessionRef: GetAgentSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAgentSessionRef:
```typescript
const name = getAgentSessionRef.operationName;
console.log(name);
```

### Variables
The `GetAgentSession` query has no variables.
### Return Type
Recall that executing the `GetAgentSession` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAgentSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAgentSessionData {
  agentSession?: {
    agentType: string;
    isActive?: boolean | null;
  };
}
```
### Using `GetAgentSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAgentSession } from '@dataconnect/generated';


// Call the `getAgentSession()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAgentSession();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAgentSession(dataConnect);

console.log(data.agentSession);

// Or, you can use the `Promise` API.
getAgentSession().then((response) => {
  const data = response.data;
  console.log(data.agentSession);
});
```

### Using `GetAgentSession`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAgentSessionRef } from '@dataconnect/generated';


// Call the `getAgentSessionRef()` function to get a reference to the query.
const ref = getAgentSessionRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAgentSessionRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.agentSession);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.agentSession);
});
```

## ListAgentSessions
You can execute the `ListAgentSessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAgentSessions(options?: ExecuteQueryOptions): QueryPromise<ListAgentSessionsData, undefined>;

interface ListAgentSessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAgentSessionsData, undefined>;
}
export const listAgentSessionsRef: ListAgentSessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAgentSessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAgentSessionsData, undefined>;

interface ListAgentSessionsRef {
  ...
  (dc: DataConnect): QueryRef<ListAgentSessionsData, undefined>;
}
export const listAgentSessionsRef: ListAgentSessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAgentSessionsRef:
```typescript
const name = listAgentSessionsRef.operationName;
console.log(name);
```

### Variables
The `ListAgentSessions` query has no variables.
### Return Type
Recall that executing the `ListAgentSessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAgentSessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAgentSessionsData {
  agentSessions: ({
    startTime: TimestampString;
    agentType: string;
  })[];
}
```
### Using `ListAgentSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAgentSessions } from '@dataconnect/generated';


// Call the `listAgentSessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAgentSessions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAgentSessions(dataConnect);

console.log(data.agentSessions);

// Or, you can use the `Promise` API.
listAgentSessions().then((response) => {
  const data = response.data;
  console.log(data.agentSessions);
});
```

### Using `ListAgentSessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAgentSessionsRef } from '@dataconnect/generated';


// Call the `listAgentSessionsRef()` function to get a reference to the query.
const ref = listAgentSessionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAgentSessionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.agentSessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.agentSessions);
});
```

## GetCodeArtifact
You can execute the `GetCodeArtifact` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCodeArtifact(options?: ExecuteQueryOptions): QueryPromise<GetCodeArtifactData, undefined>;

interface GetCodeArtifactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCodeArtifactData, undefined>;
}
export const getCodeArtifactRef: GetCodeArtifactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCodeArtifact(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCodeArtifactData, undefined>;

interface GetCodeArtifactRef {
  ...
  (dc: DataConnect): QueryRef<GetCodeArtifactData, undefined>;
}
export const getCodeArtifactRef: GetCodeArtifactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCodeArtifactRef:
```typescript
const name = getCodeArtifactRef.operationName;
console.log(name);
```

### Variables
The `GetCodeArtifact` query has no variables.
### Return Type
Recall that executing the `GetCodeArtifact` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCodeArtifactData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCodeArtifactData {
  codeArtifact?: {
    filePath: string;
    version: string;
  };
}
```
### Using `GetCodeArtifact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCodeArtifact } from '@dataconnect/generated';


// Call the `getCodeArtifact()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCodeArtifact();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCodeArtifact(dataConnect);

console.log(data.codeArtifact);

// Or, you can use the `Promise` API.
getCodeArtifact().then((response) => {
  const data = response.data;
  console.log(data.codeArtifact);
});
```

### Using `GetCodeArtifact`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCodeArtifactRef } from '@dataconnect/generated';


// Call the `getCodeArtifactRef()` function to get a reference to the query.
const ref = getCodeArtifactRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCodeArtifactRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.codeArtifact);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.codeArtifact);
});
```

## ListCodeArtifacts
You can execute the `ListCodeArtifacts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCodeArtifacts(options?: ExecuteQueryOptions): QueryPromise<ListCodeArtifactsData, undefined>;

interface ListCodeArtifactsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCodeArtifactsData, undefined>;
}
export const listCodeArtifactsRef: ListCodeArtifactsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCodeArtifacts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCodeArtifactsData, undefined>;

interface ListCodeArtifactsRef {
  ...
  (dc: DataConnect): QueryRef<ListCodeArtifactsData, undefined>;
}
export const listCodeArtifactsRef: ListCodeArtifactsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCodeArtifactsRef:
```typescript
const name = listCodeArtifactsRef.operationName;
console.log(name);
```

### Variables
The `ListCodeArtifacts` query has no variables.
### Return Type
Recall that executing the `ListCodeArtifacts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCodeArtifactsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCodeArtifactsData {
  codeArtifacts: ({
    filePath: string;
    language?: string | null;
  })[];
}
```
### Using `ListCodeArtifacts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCodeArtifacts } from '@dataconnect/generated';


// Call the `listCodeArtifacts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCodeArtifacts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCodeArtifacts(dataConnect);

console.log(data.codeArtifacts);

// Or, you can use the `Promise` API.
listCodeArtifacts().then((response) => {
  const data = response.data;
  console.log(data.codeArtifacts);
});
```

### Using `ListCodeArtifacts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCodeArtifactsRef } from '@dataconnect/generated';


// Call the `listCodeArtifactsRef()` function to get a reference to the query.
const ref = listCodeArtifactsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCodeArtifactsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.codeArtifacts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.codeArtifacts);
});
```

## GetVibeRoom
You can execute the `GetVibeRoom` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getVibeRoom(options?: ExecuteQueryOptions): QueryPromise<GetVibeRoomData, undefined>;

interface GetVibeRoomRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetVibeRoomData, undefined>;
}
export const getVibeRoomRef: GetVibeRoomRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getVibeRoom(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetVibeRoomData, undefined>;

interface GetVibeRoomRef {
  ...
  (dc: DataConnect): QueryRef<GetVibeRoomData, undefined>;
}
export const getVibeRoomRef: GetVibeRoomRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getVibeRoomRef:
```typescript
const name = getVibeRoomRef.operationName;
console.log(name);
```

### Variables
The `GetVibeRoom` query has no variables.
### Return Type
Recall that executing the `GetVibeRoom` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetVibeRoomData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetVibeRoomData {
  vibeRoom?: {
    name: string;
  };
}
```
### Using `GetVibeRoom`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getVibeRoom } from '@dataconnect/generated';


// Call the `getVibeRoom()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getVibeRoom();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getVibeRoom(dataConnect);

console.log(data.vibeRoom);

// Or, you can use the `Promise` API.
getVibeRoom().then((response) => {
  const data = response.data;
  console.log(data.vibeRoom);
});
```

### Using `GetVibeRoom`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getVibeRoomRef } from '@dataconnect/generated';


// Call the `getVibeRoomRef()` function to get a reference to the query.
const ref = getVibeRoomRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getVibeRoomRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vibeRoom);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vibeRoom);
});
```

## ListVibeRooms
You can execute the `ListVibeRooms` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVibeRooms(options?: ExecuteQueryOptions): QueryPromise<ListVibeRoomsData, undefined>;

interface ListVibeRoomsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVibeRoomsData, undefined>;
}
export const listVibeRoomsRef: ListVibeRoomsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVibeRooms(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVibeRoomsData, undefined>;

interface ListVibeRoomsRef {
  ...
  (dc: DataConnect): QueryRef<ListVibeRoomsData, undefined>;
}
export const listVibeRoomsRef: ListVibeRoomsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVibeRoomsRef:
```typescript
const name = listVibeRoomsRef.operationName;
console.log(name);
```

### Variables
The `ListVibeRooms` query has no variables.
### Return Type
Recall that executing the `ListVibeRooms` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVibeRoomsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListVibeRoomsData {
  vibeRooms: ({
    name: string;
    createdAt?: TimestampString | null;
  })[];
}
```
### Using `ListVibeRooms`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVibeRooms } from '@dataconnect/generated';


// Call the `listVibeRooms()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVibeRooms();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVibeRooms(dataConnect);

console.log(data.vibeRooms);

// Or, you can use the `Promise` API.
listVibeRooms().then((response) => {
  const data = response.data;
  console.log(data.vibeRooms);
});
```

### Using `ListVibeRooms`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVibeRoomsRef } from '@dataconnect/generated';


// Call the `listVibeRoomsRef()` function to get a reference to the query.
const ref = listVibeRoomsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVibeRoomsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vibeRooms);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vibeRooms);
});
```

## GetRoomMembership
You can execute the `GetRoomMembership` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getRoomMembership(options?: ExecuteQueryOptions): QueryPromise<GetRoomMembershipData, undefined>;

interface GetRoomMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRoomMembershipData, undefined>;
}
export const getRoomMembershipRef: GetRoomMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRoomMembership(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetRoomMembershipData, undefined>;

interface GetRoomMembershipRef {
  ...
  (dc: DataConnect): QueryRef<GetRoomMembershipData, undefined>;
}
export const getRoomMembershipRef: GetRoomMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRoomMembershipRef:
```typescript
const name = getRoomMembershipRef.operationName;
console.log(name);
```

### Variables
The `GetRoomMembership` query has no variables.
### Return Type
Recall that executing the `GetRoomMembership` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRoomMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRoomMembershipData {
  roomMembership?: {
    room: {
      name: string;
    };
  };
}
```
### Using `GetRoomMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRoomMembership } from '@dataconnect/generated';


// Call the `getRoomMembership()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRoomMembership();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRoomMembership(dataConnect);

console.log(data.roomMembership);

// Or, you can use the `Promise` API.
getRoomMembership().then((response) => {
  const data = response.data;
  console.log(data.roomMembership);
});
```

### Using `GetRoomMembership`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRoomMembershipRef } from '@dataconnect/generated';


// Call the `getRoomMembershipRef()` function to get a reference to the query.
const ref = getRoomMembershipRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRoomMembershipRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.roomMembership);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.roomMembership);
});
```

## ListRoomMemberships
You can execute the `ListRoomMemberships` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listRoomMemberships(options?: ExecuteQueryOptions): QueryPromise<ListRoomMembershipsData, undefined>;

interface ListRoomMembershipsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRoomMembershipsData, undefined>;
}
export const listRoomMembershipsRef: ListRoomMembershipsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listRoomMemberships(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListRoomMembershipsData, undefined>;

interface ListRoomMembershipsRef {
  ...
  (dc: DataConnect): QueryRef<ListRoomMembershipsData, undefined>;
}
export const listRoomMembershipsRef: ListRoomMembershipsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listRoomMembershipsRef:
```typescript
const name = listRoomMembershipsRef.operationName;
console.log(name);
```

### Variables
The `ListRoomMemberships` query has no variables.
### Return Type
Recall that executing the `ListRoomMemberships` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListRoomMembershipsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListRoomMembershipsData {
  roomMemberships: ({
    roomId: UUIDString;
    developerId: UUIDString;
  } & RoomMembership_Key)[];
}
```
### Using `ListRoomMemberships`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listRoomMemberships } from '@dataconnect/generated';


// Call the `listRoomMemberships()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listRoomMemberships();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listRoomMemberships(dataConnect);

console.log(data.roomMemberships);

// Or, you can use the `Promise` API.
listRoomMemberships().then((response) => {
  const data = response.data;
  console.log(data.roomMemberships);
});
```

### Using `ListRoomMemberships`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listRoomMembershipsRef } from '@dataconnect/generated';


// Call the `listRoomMembershipsRef()` function to get a reference to the query.
const ref = listRoomMembershipsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listRoomMembershipsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.roomMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.roomMemberships);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateDeveloper
You can execute the `CreateDeveloper` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDeveloper(): MutationPromise<CreateDeveloperData, undefined>;

interface CreateDeveloperRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDeveloperData, undefined>;
}
export const createDeveloperRef: CreateDeveloperRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDeveloper(dc: DataConnect): MutationPromise<CreateDeveloperData, undefined>;

interface CreateDeveloperRef {
  ...
  (dc: DataConnect): MutationRef<CreateDeveloperData, undefined>;
}
export const createDeveloperRef: CreateDeveloperRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDeveloperRef:
```typescript
const name = createDeveloperRef.operationName;
console.log(name);
```

### Variables
The `CreateDeveloper` mutation has no variables.
### Return Type
Recall that executing the `CreateDeveloper` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDeveloperData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDeveloperData {
  developer_insert: Developer_Key;
}
```
### Using `CreateDeveloper`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDeveloper } from '@dataconnect/generated';


// Call the `createDeveloper()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDeveloper();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDeveloper(dataConnect);

console.log(data.developer_insert);

// Or, you can use the `Promise` API.
createDeveloper().then((response) => {
  const data = response.data;
  console.log(data.developer_insert);
});
```

### Using `CreateDeveloper`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDeveloperRef } from '@dataconnect/generated';


// Call the `createDeveloperRef()` function to get a reference to the mutation.
const ref = createDeveloperRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDeveloperRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.developer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.developer_insert);
});
```

## UpdateDeveloper
You can execute the `UpdateDeveloper` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDeveloper(): MutationPromise<UpdateDeveloperData, undefined>;

interface UpdateDeveloperRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateDeveloperData, undefined>;
}
export const updateDeveloperRef: UpdateDeveloperRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDeveloper(dc: DataConnect): MutationPromise<UpdateDeveloperData, undefined>;

interface UpdateDeveloperRef {
  ...
  (dc: DataConnect): MutationRef<UpdateDeveloperData, undefined>;
}
export const updateDeveloperRef: UpdateDeveloperRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDeveloperRef:
```typescript
const name = updateDeveloperRef.operationName;
console.log(name);
```

### Variables
The `UpdateDeveloper` mutation has no variables.
### Return Type
Recall that executing the `UpdateDeveloper` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDeveloperData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDeveloperData {
  developer_update?: Developer_Key | null;
}
```
### Using `UpdateDeveloper`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDeveloper } from '@dataconnect/generated';


// Call the `updateDeveloper()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDeveloper();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDeveloper(dataConnect);

console.log(data.developer_update);

// Or, you can use the `Promise` API.
updateDeveloper().then((response) => {
  const data = response.data;
  console.log(data.developer_update);
});
```

### Using `UpdateDeveloper`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDeveloperRef } from '@dataconnect/generated';


// Call the `updateDeveloperRef()` function to get a reference to the mutation.
const ref = updateDeveloperRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDeveloperRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.developer_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.developer_update);
});
```

## DeleteDeveloper
You can execute the `DeleteDeveloper` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteDeveloper(): MutationPromise<DeleteDeveloperData, undefined>;

interface DeleteDeveloperRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteDeveloperData, undefined>;
}
export const deleteDeveloperRef: DeleteDeveloperRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteDeveloper(dc: DataConnect): MutationPromise<DeleteDeveloperData, undefined>;

interface DeleteDeveloperRef {
  ...
  (dc: DataConnect): MutationRef<DeleteDeveloperData, undefined>;
}
export const deleteDeveloperRef: DeleteDeveloperRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDeveloperRef:
```typescript
const name = deleteDeveloperRef.operationName;
console.log(name);
```

### Variables
The `DeleteDeveloper` mutation has no variables.
### Return Type
Recall that executing the `DeleteDeveloper` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDeveloperData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDeveloperData {
  developer_delete?: Developer_Key | null;
}
```
### Using `DeleteDeveloper`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteDeveloper } from '@dataconnect/generated';


// Call the `deleteDeveloper()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteDeveloper();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteDeveloper(dataConnect);

console.log(data.developer_delete);

// Or, you can use the `Promise` API.
deleteDeveloper().then((response) => {
  const data = response.data;
  console.log(data.developer_delete);
});
```

### Using `DeleteDeveloper`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDeveloperRef } from '@dataconnect/generated';


// Call the `deleteDeveloperRef()` function to get a reference to the mutation.
const ref = deleteDeveloperRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDeveloperRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.developer_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.developer_delete);
});
```

## CreateProject
You can execute the `CreateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProject(): MutationPromise<CreateProjectData, undefined>;

interface CreateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateProjectData, undefined>;
}
export const createProjectRef: CreateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProject(dc: DataConnect): MutationPromise<CreateProjectData, undefined>;

interface CreateProjectRef {
  ...
  (dc: DataConnect): MutationRef<CreateProjectData, undefined>;
}
export const createProjectRef: CreateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectRef:
```typescript
const name = createProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateProject` mutation has no variables.
### Return Type
Recall that executing the `CreateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProject } from '@dataconnect/generated';


// Call the `createProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProject();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProject(dataConnect);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProject().then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectRef } from '@dataconnect/generated';


// Call the `createProjectRef()` function to get a reference to the mutation.
const ref = createProjectRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## UpdateProject
You can execute the `UpdateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProject(): MutationPromise<UpdateProjectData, undefined>;

interface UpdateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateProjectData, undefined>;
}
export const updateProjectRef: UpdateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProject(dc: DataConnect): MutationPromise<UpdateProjectData, undefined>;

interface UpdateProjectRef {
  ...
  (dc: DataConnect): MutationRef<UpdateProjectData, undefined>;
}
export const updateProjectRef: UpdateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectRef:
```typescript
const name = updateProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateProject` mutation has no variables.
### Return Type
Recall that executing the `UpdateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProject } from '@dataconnect/generated';


// Call the `updateProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProject();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProject(dataConnect);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProject().then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectRef } from '@dataconnect/generated';


// Call the `updateProjectRef()` function to get a reference to the mutation.
const ref = updateProjectRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProject(): MutationPromise<DeleteProjectData, undefined>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteProjectData, undefined>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect): MutationPromise<DeleteProjectData, undefined>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect): MutationRef<DeleteProjectData, undefined>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation has no variables.
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject } from '@dataconnect/generated';


// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
deleteProject().then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef } from '@dataconnect/generated';


// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

## CreateVibePrompt
You can execute the `CreateVibePrompt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createVibePrompt(): MutationPromise<CreateVibePromptData, undefined>;

interface CreateVibePromptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateVibePromptData, undefined>;
}
export const createVibePromptRef: CreateVibePromptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createVibePrompt(dc: DataConnect): MutationPromise<CreateVibePromptData, undefined>;

interface CreateVibePromptRef {
  ...
  (dc: DataConnect): MutationRef<CreateVibePromptData, undefined>;
}
export const createVibePromptRef: CreateVibePromptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createVibePromptRef:
```typescript
const name = createVibePromptRef.operationName;
console.log(name);
```

### Variables
The `CreateVibePrompt` mutation has no variables.
### Return Type
Recall that executing the `CreateVibePrompt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateVibePromptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateVibePromptData {
  vibePrompt_insert: VibePrompt_Key;
}
```
### Using `CreateVibePrompt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createVibePrompt } from '@dataconnect/generated';


// Call the `createVibePrompt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createVibePrompt();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createVibePrompt(dataConnect);

console.log(data.vibePrompt_insert);

// Or, you can use the `Promise` API.
createVibePrompt().then((response) => {
  const data = response.data;
  console.log(data.vibePrompt_insert);
});
```

### Using `CreateVibePrompt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createVibePromptRef } from '@dataconnect/generated';


// Call the `createVibePromptRef()` function to get a reference to the mutation.
const ref = createVibePromptRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createVibePromptRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vibePrompt_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vibePrompt_insert);
});
```

## UpdateVibePrompt
You can execute the `UpdateVibePrompt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVibePrompt(): MutationPromise<UpdateVibePromptData, undefined>;

interface UpdateVibePromptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateVibePromptData, undefined>;
}
export const updateVibePromptRef: UpdateVibePromptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVibePrompt(dc: DataConnect): MutationPromise<UpdateVibePromptData, undefined>;

interface UpdateVibePromptRef {
  ...
  (dc: DataConnect): MutationRef<UpdateVibePromptData, undefined>;
}
export const updateVibePromptRef: UpdateVibePromptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVibePromptRef:
```typescript
const name = updateVibePromptRef.operationName;
console.log(name);
```

### Variables
The `UpdateVibePrompt` mutation has no variables.
### Return Type
Recall that executing the `UpdateVibePrompt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVibePromptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVibePromptData {
  vibePrompt_update?: VibePrompt_Key | null;
}
```
### Using `UpdateVibePrompt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVibePrompt } from '@dataconnect/generated';


// Call the `updateVibePrompt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVibePrompt();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVibePrompt(dataConnect);

console.log(data.vibePrompt_update);

// Or, you can use the `Promise` API.
updateVibePrompt().then((response) => {
  const data = response.data;
  console.log(data.vibePrompt_update);
});
```

### Using `UpdateVibePrompt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVibePromptRef } from '@dataconnect/generated';


// Call the `updateVibePromptRef()` function to get a reference to the mutation.
const ref = updateVibePromptRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVibePromptRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vibePrompt_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vibePrompt_update);
});
```

## DeleteVibePrompt
You can execute the `DeleteVibePrompt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteVibePrompt(): MutationPromise<DeleteVibePromptData, undefined>;

interface DeleteVibePromptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteVibePromptData, undefined>;
}
export const deleteVibePromptRef: DeleteVibePromptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteVibePrompt(dc: DataConnect): MutationPromise<DeleteVibePromptData, undefined>;

interface DeleteVibePromptRef {
  ...
  (dc: DataConnect): MutationRef<DeleteVibePromptData, undefined>;
}
export const deleteVibePromptRef: DeleteVibePromptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteVibePromptRef:
```typescript
const name = deleteVibePromptRef.operationName;
console.log(name);
```

### Variables
The `DeleteVibePrompt` mutation has no variables.
### Return Type
Recall that executing the `DeleteVibePrompt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteVibePromptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteVibePromptData {
  vibePrompt_delete?: VibePrompt_Key | null;
}
```
### Using `DeleteVibePrompt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteVibePrompt } from '@dataconnect/generated';


// Call the `deleteVibePrompt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteVibePrompt();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteVibePrompt(dataConnect);

console.log(data.vibePrompt_delete);

// Or, you can use the `Promise` API.
deleteVibePrompt().then((response) => {
  const data = response.data;
  console.log(data.vibePrompt_delete);
});
```

### Using `DeleteVibePrompt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteVibePromptRef } from '@dataconnect/generated';


// Call the `deleteVibePromptRef()` function to get a reference to the mutation.
const ref = deleteVibePromptRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteVibePromptRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vibePrompt_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vibePrompt_delete);
});
```

## CreateAgentSession
You can execute the `CreateAgentSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAgentSession(): MutationPromise<CreateAgentSessionData, undefined>;

interface CreateAgentSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAgentSessionData, undefined>;
}
export const createAgentSessionRef: CreateAgentSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAgentSession(dc: DataConnect): MutationPromise<CreateAgentSessionData, undefined>;

interface CreateAgentSessionRef {
  ...
  (dc: DataConnect): MutationRef<CreateAgentSessionData, undefined>;
}
export const createAgentSessionRef: CreateAgentSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAgentSessionRef:
```typescript
const name = createAgentSessionRef.operationName;
console.log(name);
```

### Variables
The `CreateAgentSession` mutation has no variables.
### Return Type
Recall that executing the `CreateAgentSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAgentSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAgentSessionData {
  agentSession_insert: AgentSession_Key;
}
```
### Using `CreateAgentSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAgentSession } from '@dataconnect/generated';


// Call the `createAgentSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAgentSession();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAgentSession(dataConnect);

console.log(data.agentSession_insert);

// Or, you can use the `Promise` API.
createAgentSession().then((response) => {
  const data = response.data;
  console.log(data.agentSession_insert);
});
```

### Using `CreateAgentSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAgentSessionRef } from '@dataconnect/generated';


// Call the `createAgentSessionRef()` function to get a reference to the mutation.
const ref = createAgentSessionRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAgentSessionRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.agentSession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.agentSession_insert);
});
```

## UpdateAgentSession
You can execute the `UpdateAgentSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAgentSession(): MutationPromise<UpdateAgentSessionData, undefined>;

interface UpdateAgentSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAgentSessionData, undefined>;
}
export const updateAgentSessionRef: UpdateAgentSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAgentSession(dc: DataConnect): MutationPromise<UpdateAgentSessionData, undefined>;

interface UpdateAgentSessionRef {
  ...
  (dc: DataConnect): MutationRef<UpdateAgentSessionData, undefined>;
}
export const updateAgentSessionRef: UpdateAgentSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAgentSessionRef:
```typescript
const name = updateAgentSessionRef.operationName;
console.log(name);
```

### Variables
The `UpdateAgentSession` mutation has no variables.
### Return Type
Recall that executing the `UpdateAgentSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAgentSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAgentSessionData {
  agentSession_update?: AgentSession_Key | null;
}
```
### Using `UpdateAgentSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAgentSession } from '@dataconnect/generated';


// Call the `updateAgentSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAgentSession();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAgentSession(dataConnect);

console.log(data.agentSession_update);

// Or, you can use the `Promise` API.
updateAgentSession().then((response) => {
  const data = response.data;
  console.log(data.agentSession_update);
});
```

### Using `UpdateAgentSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAgentSessionRef } from '@dataconnect/generated';


// Call the `updateAgentSessionRef()` function to get a reference to the mutation.
const ref = updateAgentSessionRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAgentSessionRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.agentSession_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.agentSession_update);
});
```

## DeleteAgentSession
You can execute the `DeleteAgentSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAgentSession(): MutationPromise<DeleteAgentSessionData, undefined>;

interface DeleteAgentSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAgentSessionData, undefined>;
}
export const deleteAgentSessionRef: DeleteAgentSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAgentSession(dc: DataConnect): MutationPromise<DeleteAgentSessionData, undefined>;

interface DeleteAgentSessionRef {
  ...
  (dc: DataConnect): MutationRef<DeleteAgentSessionData, undefined>;
}
export const deleteAgentSessionRef: DeleteAgentSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAgentSessionRef:
```typescript
const name = deleteAgentSessionRef.operationName;
console.log(name);
```

### Variables
The `DeleteAgentSession` mutation has no variables.
### Return Type
Recall that executing the `DeleteAgentSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAgentSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAgentSessionData {
  agentSession_delete?: AgentSession_Key | null;
}
```
### Using `DeleteAgentSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAgentSession } from '@dataconnect/generated';


// Call the `deleteAgentSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAgentSession();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAgentSession(dataConnect);

console.log(data.agentSession_delete);

// Or, you can use the `Promise` API.
deleteAgentSession().then((response) => {
  const data = response.data;
  console.log(data.agentSession_delete);
});
```

### Using `DeleteAgentSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAgentSessionRef } from '@dataconnect/generated';


// Call the `deleteAgentSessionRef()` function to get a reference to the mutation.
const ref = deleteAgentSessionRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAgentSessionRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.agentSession_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.agentSession_delete);
});
```

## CreateCodeArtifact
You can execute the `CreateCodeArtifact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCodeArtifact(): MutationPromise<CreateCodeArtifactData, undefined>;

interface CreateCodeArtifactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateCodeArtifactData, undefined>;
}
export const createCodeArtifactRef: CreateCodeArtifactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCodeArtifact(dc: DataConnect): MutationPromise<CreateCodeArtifactData, undefined>;

interface CreateCodeArtifactRef {
  ...
  (dc: DataConnect): MutationRef<CreateCodeArtifactData, undefined>;
}
export const createCodeArtifactRef: CreateCodeArtifactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCodeArtifactRef:
```typescript
const name = createCodeArtifactRef.operationName;
console.log(name);
```

### Variables
The `CreateCodeArtifact` mutation has no variables.
### Return Type
Recall that executing the `CreateCodeArtifact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCodeArtifactData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCodeArtifactData {
  codeArtifact_insert: CodeArtifact_Key;
}
```
### Using `CreateCodeArtifact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCodeArtifact } from '@dataconnect/generated';


// Call the `createCodeArtifact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCodeArtifact();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCodeArtifact(dataConnect);

console.log(data.codeArtifact_insert);

// Or, you can use the `Promise` API.
createCodeArtifact().then((response) => {
  const data = response.data;
  console.log(data.codeArtifact_insert);
});
```

### Using `CreateCodeArtifact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCodeArtifactRef } from '@dataconnect/generated';


// Call the `createCodeArtifactRef()` function to get a reference to the mutation.
const ref = createCodeArtifactRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCodeArtifactRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.codeArtifact_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.codeArtifact_insert);
});
```

## UpdateCodeArtifact
You can execute the `UpdateCodeArtifact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCodeArtifact(): MutationPromise<UpdateCodeArtifactData, undefined>;

interface UpdateCodeArtifactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateCodeArtifactData, undefined>;
}
export const updateCodeArtifactRef: UpdateCodeArtifactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCodeArtifact(dc: DataConnect): MutationPromise<UpdateCodeArtifactData, undefined>;

interface UpdateCodeArtifactRef {
  ...
  (dc: DataConnect): MutationRef<UpdateCodeArtifactData, undefined>;
}
export const updateCodeArtifactRef: UpdateCodeArtifactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCodeArtifactRef:
```typescript
const name = updateCodeArtifactRef.operationName;
console.log(name);
```

### Variables
The `UpdateCodeArtifact` mutation has no variables.
### Return Type
Recall that executing the `UpdateCodeArtifact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCodeArtifactData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCodeArtifactData {
  codeArtifact_update?: CodeArtifact_Key | null;
}
```
### Using `UpdateCodeArtifact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCodeArtifact } from '@dataconnect/generated';


// Call the `updateCodeArtifact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCodeArtifact();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCodeArtifact(dataConnect);

console.log(data.codeArtifact_update);

// Or, you can use the `Promise` API.
updateCodeArtifact().then((response) => {
  const data = response.data;
  console.log(data.codeArtifact_update);
});
```

### Using `UpdateCodeArtifact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCodeArtifactRef } from '@dataconnect/generated';


// Call the `updateCodeArtifactRef()` function to get a reference to the mutation.
const ref = updateCodeArtifactRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCodeArtifactRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.codeArtifact_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.codeArtifact_update);
});
```

## DeleteCodeArtifact
You can execute the `DeleteCodeArtifact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCodeArtifact(): MutationPromise<DeleteCodeArtifactData, undefined>;

interface DeleteCodeArtifactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteCodeArtifactData, undefined>;
}
export const deleteCodeArtifactRef: DeleteCodeArtifactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCodeArtifact(dc: DataConnect): MutationPromise<DeleteCodeArtifactData, undefined>;

interface DeleteCodeArtifactRef {
  ...
  (dc: DataConnect): MutationRef<DeleteCodeArtifactData, undefined>;
}
export const deleteCodeArtifactRef: DeleteCodeArtifactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCodeArtifactRef:
```typescript
const name = deleteCodeArtifactRef.operationName;
console.log(name);
```

### Variables
The `DeleteCodeArtifact` mutation has no variables.
### Return Type
Recall that executing the `DeleteCodeArtifact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCodeArtifactData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCodeArtifactData {
  codeArtifact_delete?: CodeArtifact_Key | null;
}
```
### Using `DeleteCodeArtifact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCodeArtifact } from '@dataconnect/generated';


// Call the `deleteCodeArtifact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCodeArtifact();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCodeArtifact(dataConnect);

console.log(data.codeArtifact_delete);

// Or, you can use the `Promise` API.
deleteCodeArtifact().then((response) => {
  const data = response.data;
  console.log(data.codeArtifact_delete);
});
```

### Using `DeleteCodeArtifact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCodeArtifactRef } from '@dataconnect/generated';


// Call the `deleteCodeArtifactRef()` function to get a reference to the mutation.
const ref = deleteCodeArtifactRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCodeArtifactRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.codeArtifact_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.codeArtifact_delete);
});
```

## CreateVibeRoom
You can execute the `CreateVibeRoom` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createVibeRoom(): MutationPromise<CreateVibeRoomData, undefined>;

interface CreateVibeRoomRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateVibeRoomData, undefined>;
}
export const createVibeRoomRef: CreateVibeRoomRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createVibeRoom(dc: DataConnect): MutationPromise<CreateVibeRoomData, undefined>;

interface CreateVibeRoomRef {
  ...
  (dc: DataConnect): MutationRef<CreateVibeRoomData, undefined>;
}
export const createVibeRoomRef: CreateVibeRoomRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createVibeRoomRef:
```typescript
const name = createVibeRoomRef.operationName;
console.log(name);
```

### Variables
The `CreateVibeRoom` mutation has no variables.
### Return Type
Recall that executing the `CreateVibeRoom` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateVibeRoomData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateVibeRoomData {
  vibeRoom_insert: VibeRoom_Key;
}
```
### Using `CreateVibeRoom`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createVibeRoom } from '@dataconnect/generated';


// Call the `createVibeRoom()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createVibeRoom();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createVibeRoom(dataConnect);

console.log(data.vibeRoom_insert);

// Or, you can use the `Promise` API.
createVibeRoom().then((response) => {
  const data = response.data;
  console.log(data.vibeRoom_insert);
});
```

### Using `CreateVibeRoom`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createVibeRoomRef } from '@dataconnect/generated';


// Call the `createVibeRoomRef()` function to get a reference to the mutation.
const ref = createVibeRoomRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createVibeRoomRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vibeRoom_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vibeRoom_insert);
});
```

## UpdateVibeRoom
You can execute the `UpdateVibeRoom` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVibeRoom(): MutationPromise<UpdateVibeRoomData, undefined>;

interface UpdateVibeRoomRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateVibeRoomData, undefined>;
}
export const updateVibeRoomRef: UpdateVibeRoomRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVibeRoom(dc: DataConnect): MutationPromise<UpdateVibeRoomData, undefined>;

interface UpdateVibeRoomRef {
  ...
  (dc: DataConnect): MutationRef<UpdateVibeRoomData, undefined>;
}
export const updateVibeRoomRef: UpdateVibeRoomRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVibeRoomRef:
```typescript
const name = updateVibeRoomRef.operationName;
console.log(name);
```

### Variables
The `UpdateVibeRoom` mutation has no variables.
### Return Type
Recall that executing the `UpdateVibeRoom` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVibeRoomData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVibeRoomData {
  vibeRoom_update?: VibeRoom_Key | null;
}
```
### Using `UpdateVibeRoom`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVibeRoom } from '@dataconnect/generated';


// Call the `updateVibeRoom()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVibeRoom();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVibeRoom(dataConnect);

console.log(data.vibeRoom_update);

// Or, you can use the `Promise` API.
updateVibeRoom().then((response) => {
  const data = response.data;
  console.log(data.vibeRoom_update);
});
```

### Using `UpdateVibeRoom`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVibeRoomRef } from '@dataconnect/generated';


// Call the `updateVibeRoomRef()` function to get a reference to the mutation.
const ref = updateVibeRoomRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVibeRoomRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vibeRoom_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vibeRoom_update);
});
```

## DeleteVibeRoom
You can execute the `DeleteVibeRoom` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteVibeRoom(): MutationPromise<DeleteVibeRoomData, undefined>;

interface DeleteVibeRoomRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteVibeRoomData, undefined>;
}
export const deleteVibeRoomRef: DeleteVibeRoomRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteVibeRoom(dc: DataConnect): MutationPromise<DeleteVibeRoomData, undefined>;

interface DeleteVibeRoomRef {
  ...
  (dc: DataConnect): MutationRef<DeleteVibeRoomData, undefined>;
}
export const deleteVibeRoomRef: DeleteVibeRoomRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteVibeRoomRef:
```typescript
const name = deleteVibeRoomRef.operationName;
console.log(name);
```

### Variables
The `DeleteVibeRoom` mutation has no variables.
### Return Type
Recall that executing the `DeleteVibeRoom` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteVibeRoomData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteVibeRoomData {
  vibeRoom_delete?: VibeRoom_Key | null;
}
```
### Using `DeleteVibeRoom`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteVibeRoom } from '@dataconnect/generated';


// Call the `deleteVibeRoom()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteVibeRoom();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteVibeRoom(dataConnect);

console.log(data.vibeRoom_delete);

// Or, you can use the `Promise` API.
deleteVibeRoom().then((response) => {
  const data = response.data;
  console.log(data.vibeRoom_delete);
});
```

### Using `DeleteVibeRoom`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteVibeRoomRef } from '@dataconnect/generated';


// Call the `deleteVibeRoomRef()` function to get a reference to the mutation.
const ref = deleteVibeRoomRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteVibeRoomRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vibeRoom_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vibeRoom_delete);
});
```

## CreateRoomMembership
You can execute the `CreateRoomMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createRoomMembership(): MutationPromise<CreateRoomMembershipData, undefined>;

interface CreateRoomMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateRoomMembershipData, undefined>;
}
export const createRoomMembershipRef: CreateRoomMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRoomMembership(dc: DataConnect): MutationPromise<CreateRoomMembershipData, undefined>;

interface CreateRoomMembershipRef {
  ...
  (dc: DataConnect): MutationRef<CreateRoomMembershipData, undefined>;
}
export const createRoomMembershipRef: CreateRoomMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRoomMembershipRef:
```typescript
const name = createRoomMembershipRef.operationName;
console.log(name);
```

### Variables
The `CreateRoomMembership` mutation has no variables.
### Return Type
Recall that executing the `CreateRoomMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRoomMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRoomMembershipData {
  roomMembership_insert: RoomMembership_Key;
}
```
### Using `CreateRoomMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRoomMembership } from '@dataconnect/generated';


// Call the `createRoomMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRoomMembership();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRoomMembership(dataConnect);

console.log(data.roomMembership_insert);

// Or, you can use the `Promise` API.
createRoomMembership().then((response) => {
  const data = response.data;
  console.log(data.roomMembership_insert);
});
```

### Using `CreateRoomMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRoomMembershipRef } from '@dataconnect/generated';


// Call the `createRoomMembershipRef()` function to get a reference to the mutation.
const ref = createRoomMembershipRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRoomMembershipRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.roomMembership_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.roomMembership_insert);
});
```

## DeleteRoomMembership
You can execute the `DeleteRoomMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteRoomMembership(): MutationPromise<DeleteRoomMembershipData, undefined>;

interface DeleteRoomMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteRoomMembershipData, undefined>;
}
export const deleteRoomMembershipRef: DeleteRoomMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteRoomMembership(dc: DataConnect): MutationPromise<DeleteRoomMembershipData, undefined>;

interface DeleteRoomMembershipRef {
  ...
  (dc: DataConnect): MutationRef<DeleteRoomMembershipData, undefined>;
}
export const deleteRoomMembershipRef: DeleteRoomMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteRoomMembershipRef:
```typescript
const name = deleteRoomMembershipRef.operationName;
console.log(name);
```

### Variables
The `DeleteRoomMembership` mutation has no variables.
### Return Type
Recall that executing the `DeleteRoomMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteRoomMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteRoomMembershipData {
  roomMembership_delete?: RoomMembership_Key | null;
}
```
### Using `DeleteRoomMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteRoomMembership } from '@dataconnect/generated';


// Call the `deleteRoomMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteRoomMembership();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteRoomMembership(dataConnect);

console.log(data.roomMembership_delete);

// Or, you can use the `Promise` API.
deleteRoomMembership().then((response) => {
  const data = response.data;
  console.log(data.roomMembership_delete);
});
```

### Using `DeleteRoomMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteRoomMembershipRef } from '@dataconnect/generated';


// Call the `deleteRoomMembershipRef()` function to get a reference to the mutation.
const ref = deleteRoomMembershipRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteRoomMembershipRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.roomMembership_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.roomMembership_delete);
});
```

