import { TKeyType } from '@veramo/core'
import { agent } from './setup.js'

async function createDID(method: string, alias: string = 'default', keyType: TKeyType = 'Secp256k1') {
  try {
    const identifier = await agent.didManagerCreate({
      provider: `did:${method}`,
      alias,
      options: {
        keyType,
      },
    })

    return identifier
  } catch (error) {
    console.error(`Error creating DID with method ${method}:`, error)
    throw error
  }
}

async function manageDIDKeys(did: string, action: string, kidToRemove?: string) {
  // Implement key rotation, addition, revocation
  try {
    switch (action) {
      case 'add':
        // Generate a new key and add it to the DID
        const key = await agent.keyManagerCreate({
          type: 'Secp256k1',
          kms: 'local'
        })

        return await agent.didManagerAddKey({
          did,
          key,
        })

      case 'remove':
        // The kid parameter is required to identify which key to remove
        if (!did) throw new Error('DID identifier is required')
        if (!kidToRemove) throw new Error('Key ID (kid) is required for key removal')

        return await agent.didManagerRemoveKey({
          did,
          kid: kidToRemove,
        })
      case 'rotate':
        // Key rotation involves removing an old key and adding a new one
        // First create a new key
        const newKey = await agent.keyManagerCreate({
          type: 'Secp256k1',
          kms: 'local'
        })

        // The kid parameter is required to identify which key to remove
        if (!did) throw new Error('DID identifier is required')
        if (!kidToRemove) throw new Error('Key ID (kid) is required for key removal')

        await agent.didManagerRemoveKey({
          did,
          kid: kidToRemove,
        })

        // Add the new key to the DID
        return await agent.didManagerAddKey({
          did,
          key: newKey,
        })
      default:
        throw new Error(`Unsupported key management action: ${action}`)
    }
  } catch (error) {
    console.error(`Error managing keys for DID ${did}:`, error)
    throw error
  }
}

export { createDID, manageDIDKeys }