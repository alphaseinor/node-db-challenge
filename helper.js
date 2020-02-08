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

function getProjectByTask(id) {
   return db('projects')
      .join('tasks', 'projects.id', 'tasks.project_id')
      .where({'projects.id': id})
}

function getTasks() {
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