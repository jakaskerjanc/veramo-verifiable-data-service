// Function to generate DID document based on host
export function generateDIDDocument(host: string) {
    return {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/jws-2020/v1"
        ],
        "id": `did:web:${host}`,
        "verificationMethod": [
            {
                "id": `did:web:${host}#key1`,
                "type": "JsonWebKey2020",
                "controller": `did:web:${host}`,
                "publicKeyJwk": {
                    "kty": "OKP",
                    "crv": "Ed25519",
                    "x": "ywrc0jHfJvpJQX-rdW_fNxLKwkE4rFJeKQL0DA2kMrU"
                }
            }
        ],
        "authentication": [
            `did:web:${host}#key1`
        ],
        "assertionMethod": [
            `did:web:${host}#key1`
        ]
    };
}