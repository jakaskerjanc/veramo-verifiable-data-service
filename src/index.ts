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
    try {
        const { method, alias, keyType } = req.body;
        const didObject = await createDID(method, alias, keyType);
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
    try {
        const { didAlias, credential } = req.body;
        const vc = await createVC(didAlias, credential);
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