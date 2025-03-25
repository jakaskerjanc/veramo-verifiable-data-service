import swaggerAutogen from 'swagger-autogen'

const outputFile = 'swagger/openapi.json'
const endpointsFiles = ['src/index.ts']

swaggerAutogen(outputFile, endpointsFiles)