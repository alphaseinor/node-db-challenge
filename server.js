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
      projects.forEach(obj => {
        if (obj.completed == 1) {
          obj.completed = true
        } else {
          obj.completed = false
        }
      })
      res.status(200).json(projects);
  })
    .catch(error => {
      res.status(500).json({error: 'problems retrieving projects'});
  });
});

module.exports = server