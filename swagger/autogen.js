import swaggerAutogen from 'swagger-autogen'

const doc = {
    "info": {
      "version": "1.0.0",
      "title": "REST API",
      "description": ""
    },
    "servers": [
          {
              "url": "https://veramo-jrtjw.ondigitalocean.app/",
              "description": "Public deployment",
              "variables": {}
          },
          {
              "url": "http://localhost:3000",
              "description": "Local Development Server",
              "variables": {}
          }
      ],
    "basePath": "/",
    "schemes": [
      "http",
      "https"
    ],
}

const outputFile = 'swagger/openapi.json'
const endpointsFiles = ['src/index.ts']

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc)