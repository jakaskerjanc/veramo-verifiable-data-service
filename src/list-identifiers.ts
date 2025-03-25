import { agent } from './setup'

async function listIdentifier() {
    const identifiers = await agent.didManagerFind()
    return identifiers
}

export { listIdentifier }	