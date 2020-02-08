const db = require('./config')

module.exports = {
   getResources,
   getProjects,
   getTasks,
   getProjectById,
   getResourcesByProjectId,
   getTasksByProject,
   insertProject,
   insertResource,
   insertTask
}

function getResources() {
   return db('resources')
}

function getProjects() {
   return db('projects')
}

function getTasks() {
   return db('tasks')
}

//possible stretch goal with joins

function getTasksByProject(id) {
   return db('tasks')
      .join('projects', 'projects.id', 'tasks.project_id')
      .where({'projects.id': id})
}

function getResourcesByProjectId(id) {
   return db('projects')
      .join('projects_resources', 'projects.id', 'projects_resources.project_id')
      .join('resources', 'projects_resources.resource_id', 'resources.id')
      .where({'projects.id': id})
}

function getProjectById(id) {
   
   const project = db('projects').where({'id': id}).first()
   const tasks = getTasksByProject(id)
   const resources = getResourcesByProjectId(id)

   const promises = [project, tasks, resources]

   return Promise.all(promises).then(results => {
      const [project, tasks, resources] = results
      project.tasks = tasks
      project.resources = resources
      return project
   })
}

function insertProject(data) {
   return db('projects').insert(data, "id");
}

function insertResource(data) {
   return db('resources').insert(data, "id");
}

function insertTask(data) {
   return db('tasks').insert(data, "id");
}