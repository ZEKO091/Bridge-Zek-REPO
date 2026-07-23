# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateDeveloper, useUpdateDeveloper, useDeleteDeveloper, useGetDeveloper, useListDevelopers, useCreateProject, useUpdateProject, useDeleteProject, useGetProject, useListProjects } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateDeveloper();

const { data, isPending, isSuccess, isError, error } = useUpdateDeveloper();

const { data, isPending, isSuccess, isError, error } = useDeleteDeveloper();

const { data, isPending, isSuccess, isError, error } = useGetDeveloper();

const { data, isPending, isSuccess, isError, error } = useListDevelopers();

const { data, isPending, isSuccess, isError, error } = useCreateProject();

const { data, isPending, isSuccess, isError, error } = useUpdateProject();

const { data, isPending, isSuccess, isError, error } = useDeleteProject();

const { data, isPending, isSuccess, isError, error } = useGetProject();

const { data, isPending, isSuccess, isError, error } = useListProjects();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createDeveloper, updateDeveloper, deleteDeveloper, getDeveloper, listDevelopers, createProject, updateProject, deleteProject, getProject, listProjects } from '@dataconnect/generated';


// Operation CreateDeveloper: 
const { data } = await CreateDeveloper(dataConnect);

// Operation UpdateDeveloper: 
const { data } = await UpdateDeveloper(dataConnect);

// Operation DeleteDeveloper: 
const { data } = await DeleteDeveloper(dataConnect);

// Operation GetDeveloper: 
const { data } = await GetDeveloper(dataConnect);

// Operation ListDevelopers: 
const { data } = await ListDevelopers(dataConnect);

// Operation CreateProject: 
const { data } = await CreateProject(dataConnect);

// Operation UpdateProject: 
const { data } = await UpdateProject(dataConnect);

// Operation DeleteProject: 
const { data } = await DeleteProject(dataConnect);

// Operation GetProject: 
const { data } = await GetProject(dataConnect);

// Operation ListProjects: 
const { data } = await ListProjects(dataConnect);


```