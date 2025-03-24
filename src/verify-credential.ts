import { VerifiableCredential } from '@veramo/core'
import { agent } from './setup.js'

import { createAgent, ICredentialStatusManager } from '@veramo/core'

async function verifyCredential(credential: VerifiableCredential) {
    const result = await agent.verifyCredential({
        credential,
    })
    return result
}

async function revokeCredential(vc: VerifiableCredential) {
    const result = await agent.credentialStatusUpdate({
        vc,
    })
    console.log(`Credential revoked`, result)
}

async function getAllCredentialStatuses() {
    const credentialStatusAgent = createAgent<ICredentialStatusManager>({
        plugins: [],
    })

    const statuses = credentialStatusAgent.credentialStatusTypes()
    console.log(statuses)
}

export { verifyCredential, getAllCredentialStatuses, revokeCredential }