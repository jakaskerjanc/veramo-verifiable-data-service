import { createDID } from "@/verifiable-data/did/manage";
import express from "express";
import { agent } from "./verifiable-data/setup";
import { issuerDid } from "./verifiable-data/did/init";
import crypto from 'crypto';
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const pendingChallenges: Record<string, string | undefined> = {};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

app.post('/api/register', async (req, res) => {
    const { did } = req.body;
    try {
      const vc = await agent.createVerifiableCredential({
        credential: {
          id: issuerDid.did,
          issuer: { id: issuerDid.did },
          issuanceDate: new Date().toISOString(),
          type: ['VerifiableCredential', 'UserCredential'],
          credentialSubject: {
            did: did,
            registeredAt: Date.now(),
          },
        },
        proofFormat: 'jwt',
      });
    
      res.json({ vc });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create verifiable credential' });
    }
});
  
app.post('/api/request-challenge', (req, res) => {
    const { did } = req.body;
    const challenge = crypto.randomBytes(16).toString('hex');
    pendingChallenges[did] = challenge;
    res.json({ challenge });
});
  
app.post('/api/verify', async (req, res) => {
    const { vp } = req.body;
    const did = vp.holder
    const challenge = pendingChallenges[did];
  
    if (!challenge) {
      res.status(400).json({ success: false, error: 'No challenge found.' });
      return;
    }
  
    try {
      const result = await agent.verifyPresentation({ presentation: vp, challenge });
      console.log(result);
      if (result.verified) {
        delete pendingChallenges[did];
        res.json({ success: true });
        return;
      }
      res.status(401).json({ success: false, error: 'Invalid presentation' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        res.status(401).json({ success: false, error: error.message });
        return;
      }
      res.status(401).json({ success: false, error: 'Unknown error occurred' });
    }
});

app.post('/api/login', async (req, res) => {
    const { vc } = req.body;
    try {
      // Verify the VC
      const verificationResult = await agent.verifyCredential({
        credential: vc,
      });
      
      if (verificationResult.verified) {
        // Return some user information or token
        res.json({ 
          success: true, 
          user: {
            did: vc.credentialSubject.id,
            registeredAt: vc.credentialSubject.registeredAt
          }
        });
        return;
      }
      
      res.status(401).json({ success: false, error: 'Invalid credential' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Error processing login' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
});