import swaggerAutogen from 'swagger-autogen'

import config from '../config.js'

const doc = {
  
  info: {
    title: 'ProgramacionIII',
    description: 'Aplicacion inicial de backend',
  },
   host: 'localhost:' + config.port
};

const outputFile = '../../swagger-output.json'
const routes = [
  "../routes/user.routes.js",
  "../routes/task.routes.js"
];

swaggerAutogen(outputFile, routes, doc)