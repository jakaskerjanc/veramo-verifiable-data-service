// Core interfaces
import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager, ICredentialPlugin, ICredentialStatusManager } from '@veramo/core'

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager'

// Web did identity provider
import { WebDIDProvider } from '@veramo/did-provider-web'

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// W3C Verifiable Credential plugin
import { CredentialPlugin } from '@veramo/credential-w3c'

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'
import { getDidKeyResolver as keyDidResolver } from '@veramo/did-provider-key'

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, IDataStoreORM, PrivateKeyStore, migrations } from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm'

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'

// This will be the secret key for the KMS
const KMS_SECRET_KEY =
    '9b3e999cd09c498561610ba723880605a7cc783890a5e7572b41c8469b9a70d0'

const dbConnection = new DataSource({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
}).initialize()

export const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin & ICredentialStatusManager>({
    plugins: [
        new KeyManager({
            store: new KeyStore(dbConnection),
            kms: {
                local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
            },
        }),
        new DIDManager({
            store: new DIDStore(dbConnection),
            defaultProvider: 'did:web',
            providers: {
                'did:web': new WebDIDProvider({
                    defaultKms: 'local',
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ...webDidResolver(),
            }),
        }),
        new CredentialPlugin(),
    ],
})