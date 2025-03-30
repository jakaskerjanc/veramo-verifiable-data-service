import { createDID } from '@/verifiable-data/did/manage'

export async function initializeDID(host: string) {
    try {
        const did = await createDID('did:web', host, 'Secp256k1')
        console.log('DID created:', did)
    } catch (error) {
        console.error('Error initializing DID:', error)
    }
}
