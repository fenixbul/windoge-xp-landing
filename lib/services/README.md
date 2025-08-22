# Actor Services Documentation

This directory contains services for communicating with Internet Computer canisters.

## Core Components

### 1. Canister Service (`canister-service.ts`)

Low-level service that handles the creation and management of canister actors.

**Features:**
- Anonymous and authenticated actor creation
- Actor registry for performance optimization
- Support for local development and mainnet
- Automatic canister ID resolution from `canister_ids.json`

**Usage:**
```typescript
import { coreCanisterService } from '@/lib/services';

// Initialize the service
await coreCanisterService.initialize(false); // false = anonymous

// Call canister methods
const response = await coreCanisterService.promptLLM("Hello!");
```

### 2. AI Service (`ai-service.ts`)

High-level wrapper for LLM interactions with the core canister.

**Features:**
- Singleton pattern for global state management
- Automatic initialization
- Error handling and recovery
- Clean API for frontend components

**Usage:**
```typescript
import { aiService } from '@/lib/services';

// Send a message (auto-initializes if needed)
const response = await aiService.sendMessage("What is Windows XP?");

// Check if ready
if (aiService.isReady()) {
  // Service is initialized and ready
}

// Reset if needed
await aiService.reset();
```

## Integration with SmartAssistant

The SmartAssistant component uses the AI service to communicate with the LLM:

```typescript
// In SmartAssistant.tsx
import { aiService } from '@/lib/services';

const handleSendMessage = async (message: string) => {
  try {
    const response = await aiService.sendMessage(message);
    // Handle response...
  } catch (error) {
    // Handle error...
  }
};
```

## Setup Steps

1. **Generate Declarations:**
   ```bash
   npm run generate
   # or
   dfx generate
   ```

2. **Deploy Canister (Local Development):**
   ```bash
   dfx start --background
   dfx deploy core
   ```

3. **Update Canister IDs:**
   The service automatically reads canister IDs from `canister_ids.json`

4. **Use in Components:**
   ```typescript
   import { aiService } from '@/lib/services';
   ```

## Configuration

### Environment Variables

- `NODE_ENV`: Determines if using local replica or mainnet
  - `development`: Uses `http://localhost:4943` and calls `fetchRootKey()`
  - `production`: Uses `https://icp0.io`

### DFX Configuration

Update `dfx.json` to generate declarations:

```json
{
  "declarations": {
    "output": "lib/declarations",
    "node_compatibility": true
  }
}
```

## Error Handling

The services implement comprehensive error handling:

1. **Initialization Errors**: Failed to create actors
2. **Network Errors**: Connection issues with the canister
3. **Method Call Errors**: Canister method execution failures

All errors are logged and user-friendly messages are provided.

## Best Practices

1. **Use AI Service**: Prefer `aiService` over direct `coreCanisterService` calls
2. **Handle Errors**: Always wrap service calls in try-catch blocks
3. **Check Readiness**: Use `isReady()` for conditional logic
4. **Singleton Pattern**: Services are singletons - import and use directly

## Troubleshooting

### Common Issues

1. **Canister ID Not Found**: Ensure `canister_ids.json` exists and contains the core canister ID
2. **Network Errors**: Check if the local replica is running (`dfx start`)
3. **Declaration Errors**: Run `dfx generate` to update TypeScript declarations
4. **Import Errors**: Verify the service is exported in `index.ts`
