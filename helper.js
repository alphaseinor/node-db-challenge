const db = require('./config')

module.exports = {
   getResources,
   getProjects,
   getTasks,
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
   return db("projects")
      .join('tasks', 'tasks.project_id', 'projects.id')
      .select('tasks.*', 'projects.name as project_name', 'projects.description as project_description')
}

function insertProject(data) {
   return db('projects').insert(data, "id");
}

function getProjectById(id) {
   return db('projects').where("id", id).first()
}

function insertResource(data) {
   return db('resources').insert(data, "id");
}

function insertTask(data) {
   return db('tasks').insert(data, "id");
}