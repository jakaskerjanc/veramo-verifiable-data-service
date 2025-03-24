import { agent } from './setup.js'

async function listIdentifier() {
    const identifiers = await agent.didManagerFind()
    return identifiers
}

export { listIdentifier }	