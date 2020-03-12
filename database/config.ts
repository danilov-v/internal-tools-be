const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

const Model = require('objection').Model;
Model.knex(knex);
