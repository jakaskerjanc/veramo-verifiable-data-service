import { createDID, manageDIDKeys } from "./did-issuance";
import { resolveDID } from "./did-resolution";
import { listIdentifier } from "./list-identifiers";
import { createVC } from "./create-credential";
import { verifyCredential } from "./verify-credential";
import express from "express";
import swaggerUi from 'swagger-ui-express';
import openapiSpec from '../swagger/openapi.json';

const app = express();
const port = 3000;
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.post("/did/add", async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addDid"
                    }  
                }
            }
        }
        #swagger.responses[200] = {
            description: 'DID created successfully',
            schema: {
                $ref: "#/components/schemas/didObject"
            }
        }
        #swagger.responses[500] = {
            description: 'Error creating DID',
            schema: {
                $ref: "#/components/schemas/error"
            }
        }
    */
    try {
        const { provider, alias, keyType } = req.body;
        const didObject = await createDID(provider, alias, keyType);
        res.send(didObject);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ error });
    }
});

app.get("/did", async (_req, res) => {
    /*  #swagger.responses[200] = {
            description: 'List of all added DIDs',
            schema: { $ref: "#/components/schemas/didObject" }
        }
        #swagger.responses[500] = {
            description: 'Error retrieving DIDs',
            schema: {
                $ref: "#/components/schemas/error"
            }
        }
    */
    try {
        const allDids = await listIdentifier();
        res.send(allDids);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ error });
    }
});

app.get("/did/:didUrl", async (req, res) => {
    /*  
        #swagger.parameters['didUrl'] = {
            in: 'path',
            description: 'DID URL',
            required: true,
            type: 'string',
            example: 'did:ethr:0xb09b66026ba5909a7cfe99b76875431d2b8d5190'
        }
        #swagger.responses[200] = {
            description: 'Get DID by URL',
            schema: { $ref: "#/components/schemas/didObject" }
        }
        #swagger.responses[500] = {
            description: 'Error retrieving DIDs',
            schema: {
                $ref: "#/components/schemas/error"
            }
        }
    */
    try {
        const didUrl = req.params.didUrl;
        const didObject = await resolveDID(didUrl);
        res.send(didObject);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ error });
    }
});

app.post("/vc/issue", async (req, res) => {
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/issueVC"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'VC issued successfully',
            schema: {
                $ref: "#/components/schemas/credential"
            }
        }
        #swagger.responses[500] = {
            description: 'Error issuing VC',
            schema: {
                $ref: "#/components/schemas/error"
            }
        }
    */
    try {
        const { didAlias, credentialData } = req.body;
        const vc = await createVC(didAlias, credentialData);
        res.send(vc);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ error });
    }
});

app.post("/vc/verify", async (req, res) => {
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/credential"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'VC verified successfully',
            schema: {
                type: "boolean"
            }
        }
        #swagger.responses[500] = {
            description: 'Error verifying VC',
            schema: {
                $ref: "#/components/schemas/error"
            }
        }
    */
    try {
        const vc = req.body;
        console.log(vc);
        const result = await verifyCredential(vc);
        res.send(result.verified);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ error });
    }
});

app.post("/did/key/modify", async (req, res) => {
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/modifyKey"
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'Key added/removed/rotated successfully',
            schema: {
                $ref: "#/components/schemas/didObject"
            }
        }
        #swagger.responses[500] = {
            description: 'Error modifying key',
            schema: {
                $ref: "#/components/schemas/error"
            }
        }
    */
    try {
        const { did, kidToRemove, action } = req.body;
        const result = await manageDIDKeys(did, action, kidToRemove);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ error });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});