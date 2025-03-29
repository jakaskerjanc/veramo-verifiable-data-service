import { agent } from '@/verifiable-data/setup'

async function resolveDID(didUrl: string) {
  console.log(`Resolving DID ${didUrl}`)
  try {
    const resolution = await agent.resolveDid({ didUrl })

    return resolution
  } catch (error) {
    console.error(`Error resolving DID ${didUrl}:`, error)
    throw error
  }
}

export { resolveDID }