
exports.up = function (knex) {
  return knex.schema
  //no foreign keys table
  .createTable('projects', tbl => {
    tbl.increments()
    tbl.string('name', 255)
        .notNullable()
    tbl.string('description', 255)
    tbl.boolean('completed')
        .defaultTo(false)
  })
  //no foreign keys table
  .createTable('resources', tbl => {
    tbl.increments()
    tbl.string('name', 128)
        .notNullable()
    tbl.string('description', 255)
  })
  //bridge table
  .createTable('projects_resources', tbl => {
    tbl.primary(['project_id', 'resource_id'])
    //many projects.id
    tbl.integer('project_id')
        .notNullable()
        .unsigned()
        .references('projects.id')
    //many resource.id
    tbl.integer('resource_id')
        .notNullable()
        .unsigned()
        .references('resources.id')
  })
  //assigns many to project.id
  .createTable('tasks', tbl => {
    tbl.increments()
    tbl.integer('project_id')
        .notNullable()
        .unsigned()
        .references('projects.id')
    tbl.string('description', 255)
        .notNullable()
    tbl.string('notes', 255)
    tbl.boolean('completed')
        .defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
}