import { createDID, manageDIDKeys } from "./did-issuance.js";
import { resolveDID } from "./did-resolution.js";
import { listIdentifier } from "./list-identifiers.js";
import { createVC } from "./create-credential.js";
import { verifyCredential, getAllCredentialStatuses } from "./verify-credential.js";
import { W3CVerifiableCredential } from "@veramo/core";

async function main() {
    // const didObject = await createDID("ethr", "default");
    // console.log("DID created:", didObject);

    // const didObject = { did: 'did:web:jakaskerjanc.github.io:alice' }

    // const resolution = await resolveDID('did:ethr:0x02f49e21ca7636def6820eeb3a3d808af3ea8b6eec14be68cc75039acb0fb380c4');
    // console.log("DID resolution:", JSON.stringify(resolution, null, 2));

    // await listIdentifier();

    // const alias = "default";
    // const vc = await createVC(alias, { age: 18, name: "Alice" });
    // console.log("VC created:", JSON.stringify(vc, null, 2));

    const credential: W3CVerifiableCredential = {
        "credentialSubject": {
            "age": 18,
            "name": "Alice",
            "id": "did:web:example.com"
        },
        "issuer": {
            "id": "did:ethr:0x02f49e21ca7636def6820eeb3a3d808af3ea8b6eec14be68cc75039acb0fb380c4"
        },
        "type": [
            "VerifiableCredential"
        ],
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "issuanceDate": "2025-03-16T10:49:55.000Z",
        "proof": {
            "type": "JwtProof2020",
            "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImFnZSI6MTgsIm5hbWUiOiJBbGljZSJ9fSwic3ViIjoiZGlkOndlYjpleGFtcGxlLmNvbSIsIm5iZiI6MTc0MjEyMjE5NSwiaXNzIjoiZGlkOmV0aHI6MHgwMmY0OWUyMWNhNzYzNmRlZjY4MjBlZWIzYTNkODA4YWYzZWE4YjZlZWMxNGJlNjhjYzc1MDM5YWNiMGZiMzgwYzQifQ.mybaSjnTMW8GCOBVqRQ7xJapo34eLFtCevqrgDQ32sAlw9iImeVxGI_o-b59Qbm-MDTQIUNGOtmJ4IvhQ081BQ"
        }
    }

    const verificationResult = await verifyCredential(credential);
    console.log("Verification result:", verificationResult.verified);

    // const result = await manageDIDKeys('did:web:jakaskerjanc.github.io:alice', 'rotate', '04f61699e6106d83649b67462c413087fbf11dcb93dd763bce2cee346754bbef1fae1344f165a89981640442b0f66ab431586fc82b853f5e0f5c610ce7585389a2');

    // await getAllCredentialStatuses();
}

main().catch(console.error);