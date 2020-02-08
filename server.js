const express = require('express')
const db = require('./helper.js')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

server.get("/", (req, res)=>{
  res.send(`<p>This server has the following functions</p>
  <p>----Create----<br>
  POST<br>
  /projects<br>
  /resources<br>
  /tasks</p>
  
  <p>----Read----<br>
  GET<br>
  /projects and /projects/id<br>
  /resources and /resources/id<br>
  /tasks and /tasks/id</p>
  `)
})

server.get('/projects', (req, res) => {
  db.getProjects()
    .then(projects => {
      projects.forEach(project => {
        //fix for no defaultTo(false) in sqlite
        if (project.completed == 1) {
          project.completed = true
        } else {
          project.completed = false
        }
      })
      res.status(200).json(projects)
  })
    .catch(error => {
      res.status(500).json({error: error, message: "could not retreive projects"})
  });
});

server.get('/resources', (req, res) => {
  db.getResources()
    .then(resources => {
      res.status(200).json(resources)
  })
    .catch(error => {
      res.status(500).json({error: error, message: "could not retreive resources"})
  });
});

server.get('/tasks', (req, res) => {
  db.getTasks()
    .then(tasks => {
      //fix for no defaultTo(false) in sqlite
      tasks.forEach(task => {
        if (task.completed == 1) {
          task.completed = true
        } else {
          task.completed = false
        }
      })
      res.status(200).json(tasks)
  })
    .catch(error => {
      res.status(500).json({error: error, message: "could not retreive tasks"})
  });
});

server.post('/projects', (req, res) => {
  if(req.body.name) {
    db.insertProject(req.body)
      .then(project => {
        res.status(200).json(project)
      })
      .catch(error => {
        res.status(500).json({error: error, message: "could not add project"})
      })
  } else {
    res.status(400).json({ message: "could not add project, missing name"})
  }
})

server.post('/resources', (req, res) => {
  if(req.body.name) {
    db.insertResource(req.body)
      .then(resource => {
        res.status(200).json(resource)
      })
      .catch(error => {
        res.status(500).json({error: error, message: "could not add resource"})
      })
  } else {
    res.status(400).json({ message: "could not add resource, missing name"})
  }
})

server.post('/tasks', (req, res) => {
  if(req.body.description && req.body.project_id) {
    db.insertTask(req.body)
      .then(task => {
        res.status(200).json(task)
      })
      .catch(error => {
        res.status(500).json({error: error, message: "could not add task"})
      })
  } else {
    res.status(400).json({ message: "could not add task, missing description or project_id"})
  }
})

module.exports = server