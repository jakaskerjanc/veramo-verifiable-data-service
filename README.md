# TrustManagement System

This is a decentralized identity-based trust management system composed of multiple interconnected modules. This README focuses on two core components: the Swarm Frontend and the Verifiable Data Service.

## 1. Swarm Frontend

The Swarm Frontend is a Vue.js-based web application that provides a user interface for identity management and authentication using decentralized identifiers (DIDs) and verifiable credentials.

### Key Features

- **Identity Creation**: Generate and manage DIDs (Decentralized Identifiers)
- **Authentication**: Login using verifiable credentials
- **Registration**: Register users with verifiable credentials
- **Challenge-Response Authentication**: Secure authentication using cryptographic challenges

### Technology Stack

- **Framework**: Vue.js with Vue Router
- **State Management**: Pinia
- **Identity Management**: Veramo SDK for DID and VC handling
- **Styling**: PrimeVue components
- **Blockchain Integration**: Ethereum-compatible DID methods (ethr-did)

### Running the Swarm Frontend

```bash
cd swarm-frontend
npm install
npm run dev
```

The application will be available at http://localhost:5173 (or another port specified by Vite).

## 2. Verifiable Data Service

The Verifiable Data Service is a backend application that handles the issuance and verification of verifiable credentials used for authentication and identity management.

### Key Features

- **Credential Issuance**: Creates verifiable credentials for registered users
- **Credential Verification**: Validates credentials presented during authentication
- **Challenge Generation**: Provides cryptographic challenges for secure authentication
- **DID Management**: Handles DID creation and resolution

### Technology Stack

- **Runtime**: Node.js with Express
- **Identity Framework**: Veramo for DIDs and VCs
- **Database**: SQLite for credential storage
- **API Documentation**: Swagger UI

### Running the Verifiable Data Service

```bash
cd verifiable-data-service
npm install
npm run dev
```

The service will be available at http://localhost:3000.

## How the Components Work Together

The two modules form a decentralized identity system with the following workflow:

1. **User Registration**:
   - User creates a DID in the Swarm Frontend
   - Frontend requests a credential from the Verifiable Data Service
   - Service issues a verifiable credential to the user
   - Frontend stores the credential for future use

2. **User Authentication**:
   - User initiates login with their DID
   - Frontend requests a challenge from the Verifiable Data Service
   - User signs the challenge creating a verifiable presentation
   - Service verifies the presentation and confirms authentication
   - User gains access to protected resources

3. **Communication Flow**:
   - Frontend makes API calls to the Service endpoints
   - Service processes requests and returns verifiable credentials
   - Frontend uses Veramo SDK to manage and present credentials

## Security Considerations

- All credentials are cryptographically signed
- Challenge-response authentication prevents replay attacks
- DIDs provide a self-sovereign identity model
- No central authority controls user identities

## Integration Points

The integration between the frontend and backend is handled through REST API endpoints:

- `/api/register`: Issues a new credential to a DID
- `/api/request-challenge`: Generates a cryptographic challenge for authentication
- `/api/verify`: Verifies a signed challenge presentation
- `/api/login`: Authenticates using a verifiable credential

Both modules use the Veramo framework, ensuring compatible credential formats and verification processes.