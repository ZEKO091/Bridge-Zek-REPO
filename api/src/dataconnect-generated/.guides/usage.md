# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





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