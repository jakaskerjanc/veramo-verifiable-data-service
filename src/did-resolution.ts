import { createAgent } from '@veramo/core'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'
import { agent } from './setup.js'
// import { MetadataStore } from './metadata-store'

// Metadata storage implementation
// const metadataStore = new MetadataStore()

async function resolveDID(didUrl: string) {
  console.log(`Resolving DID ${didUrl}`)
  try {
    const resolution = await agent.resolveDid({ didUrl })
    // const metadata = await metadataStore.getMetadata(did)

    return resolution
  } catch (error) {
    console.error(`Error resolving DID ${didUrl}:`, error)
    throw error
  }
}

// async function storeMetadata(did, metadata) {
//   return await metadataStore.setMetadata(did, metadata)
// }

export { resolveDID }