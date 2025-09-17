# @workspace/types

This package contains all the shared TypeScript types for the project.

## Usage

```typescript
import { ProductListItem, UserCart } from '@workspace/types';
```

## Structure

- `src/client.ts` - Contains all frontend-related types inferred from tRPC router outputs
- More type files can be added as needed

## Development

```bash
# Build the package
bun run build

# Watch mode during development
bun run dev

# Type check
bun run check-types
```
