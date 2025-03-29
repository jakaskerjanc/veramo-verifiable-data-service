import { agent } from '@/verifiable-data/setup'

async function createVC(alias: string, data: { [x: string]: any }) {
    const identifier = await agent.didManagerGetByAlias({ alias })

    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            issuer: { id: identifier.did },
            credentialSubject: data,
        },
        proofFormat: 'jwt',
    })
    console.log(`New credential created`)
    console.log(JSON.stringify(verifiableCredential, null, 2))

    return verifiableCredential
}

export { createVC }