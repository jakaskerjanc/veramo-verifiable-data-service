import { createDID } from '@/verifiable-data/did/manage'
import { IIdentifier } from '@veramo/core';
import { agent } from '@/verifiable-data/setup';

let issuerDid: IIdentifier;

async function initializeDID() {
    try {
        issuerDid = await createDID('did:ethr')
    } catch (error) {
        const defaultDid = await agent.didManagerGetByAlias({ alias: 'default' });
        issuerDid = defaultDid;
    }
    console.log('Set issuer DID to:', issuerDid.did);
}

initializeDID();

export { issuerDid }
