import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: "1.0.0",
    title: "REST API (testing)",
    description: "Does not work!"
  },
  servers: [
    {
      url: "https://veramo-jrtjw.ondigitalocean.app/",
      description: "Public deployment",
      variables: {}
    },
    {
      url: "http://localhost:3000",
      description: "Local Development Server",
      variables: {}
    }
  ],
  components: {
    schemas: {
      error: {
        message: "string",
      },
      addDid: {
        $provider: 'did:web:jakaskerjanc.github.io:alice',
        $alias: "default",
        $keyType: 'Secp256k1'
      },
      didObject: {
        $did: 'did:web:jakaskerjanc.github.io:alice',
        $alias: "default",
        $provider: '',
        $controllerKeyId: 'did:web:jakaskerjanc.github.io:alice#key-1',
        $keys: [],
        $services: [],
      },
      issueVC: {
        $didAlias: 'default',
        $credentialData: {
          "key": "value",
        },
      },
      credential: {
        $credential: {
          "@context": [
            "https://www.w3.org/2018/credentials/v1"
          ],
          "type": [
            "VerifiableCredential"
          ],
          "credentialSubject": {
            "id": "did:web:jakaskerjanc.github.io:alice",
            "name": "Alice"
          },
          "issuer": "did:web:jakaskerjanc.github.io:alice",
          "issuanceDate": "2021-07-15T00:00:00Z",
          "expirationDate": "2022-07-15T00:00:00Z",
          "credentialStatus": {
            "id": "https://example.edu/status/24",
            "type": "CredentialStatusList2017"
          }
        }
      },
      modifyKey: {
        $did: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190',
        $kidToRemove: '<public_key_in_hex_encoding>',
        $action : 'add',
      }
    }
  }
}

const outputFile = 'swagger/openapi.json'
const endpointsFiles = ['src/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)