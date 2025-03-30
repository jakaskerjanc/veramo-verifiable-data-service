import { createDID } from '@/verifiable-data/did/manage'

export async function initializeDID(host: string) {
    try {
        const did = await createDID('did:web', host, 'Secp256k1')
        console.log('DID created:', did)
    } catch (error) {
        console.error('Error initializing DID:', error)
    }

    try {
        const ethrDid = await createDID('did:ethr', '0xc530503a148babcaca68565cfa576d6f43427a2d', 'Secp256k1')
        console.log('Ethr DID created:', ethrDid)
    } catch (error) {
        console.error('Error initializing Ethr DID:', error)
    }
}
