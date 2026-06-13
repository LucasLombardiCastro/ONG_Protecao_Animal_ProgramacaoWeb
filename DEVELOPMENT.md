# Development Guide - ONG Proteção Animal

## Project Structure

```
src/
├── app/                          # Next.js app directory (pages)
│   ├── layout.tsx               # Global layout
│   ├── page.tsx                 # Home page
│   ├── authentication/
│   │   └── login/page.tsx       # Login page
│   ├── adocao/
│   │   └── page.tsx             # Adoption page
│   ├── doacoes/
│   │   └── page.tsx             # Donations page
│   └── solicitacoes/
│       └── page.tsx             # Requests management page
├── components/                   # Reusable React components
│   ├── AnimalCard.tsx           # Animal card display
│   ├── AnimalFormModal.tsx      # Form for adding/editing animals
│   ├── AdoptionModal.tsx        # Adoption request modal
│   ├── PartnerCarousel.tsx      # Partners carousel
│   ├── Navbar.tsx               # Navigation bar
│   └── Footer.tsx               # Footer
├── constants/                    # Application constants
│   └── app.ts                   # All hardcoded values
├── data/                        # Data layer
│   └── mockData.ts              # Mock data (remove when API is ready)
├── types/                       # TypeScript type definitions
│   └── domain.ts                # All domain types
├── utils/                       # Utility functions
│   ├── api.ts                   # API service layer
│   └── logger.ts                # Logging utility
└── styles/
    └── globals.css              # Global styles
```

## Key Files Explained

### `/src/types/domain.ts`
Central location for all TypeScript interfaces and types. Keep this in sync with your backend schema.

### `/src/constants/app.ts`
All magic strings and configuration values are here. Update this when adding new statuses or enums.

### `/src/utils/api.ts`
Generic API request handler. All HTTP calls go through this. Easy to intercept and modify for authentication, logging, or request/response transformation.

### `/src/utils/logger.ts`
Centralized logging. Configure this to send logs to monitoring services (Sentry, LogRocket, etc.).

### `/src/data/mockData.ts`
Temporary mock data. Will be removed once the backend is connected. Keep structured to match your backend response format.

---

## Development Workflow

### Setting Up Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local if needed (default works for local development)
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Visit http://localhost:3000

### Making Changes

#### Adding a New Feature

1. **Create Types** (if needed)
   ```typescript
   // In /src/types/domain.ts
   export interface NewFeature {
     id: string;
     name: string;
     // ...
   }
   ```

2. **Add Constants** (if needed)
   ```typescript
   // In /src/constants/app.ts
   export const NEW_STATUS = {
     ACTIVE: 'Ativo',
     INACTIVE: 'Inativo',
   } as const;
   ```

3. **Create Components**
   ```typescript
   // Components are in /src/components/
   // Always use proper TypeScript types
   // Import constants instead of hardcoding strings
   ```

4. **Test with Mock Data**
   - Update `/src/data/mockData.ts` if needed
   - Components should work with mock data before API integration

#### Using the API Service

```typescript
import { apiRequest } from '../utils/api';
import { Animal } from '../types/domain';

// Get data
const response = await apiRequest<Animal[]>('/animals');
if (response.success && response.data) {
  setAnimals(response.data);
}

// Post data
const response = await apiRequest<Animal>('/animals', {
  method: 'POST',
  body: {
    nome: 'Bidu',
    // ...
  },
});

// Update data
const response = await apiRequest<Animal>(`/animals/${id}`, {
  method: 'PUT',
  body: updatedAnimal,
});

// Delete data
const response = await apiRequest('/animals/{id}', {
  method: 'DELETE',
});
```

#### Using the Logger

```typescript
import { logger } from '../utils/logger';

// Different log levels
logger.info('Operation completed successfully', dataObject);
logger.warn('This might be an issue', dataObject);
logger.error('An error occurred', errorObject);
logger.debug('Debug information', dataObject);
```

#### Working with Sessions

```typescript
import { sessionStorage } from '../utils/api';

// Save session
sessionStorage.set({
  email: user.email,
  nome: user.nome,
  dataLogin: new Date().toISOString(),
});

// Get session
const session = sessionStorage.get();

// Check if logged in
if (sessionStorage.exists()) {
  // User is logged in
}

// Clear session (logout)
sessionStorage.clear();
```

---

## Code Standards

### TypeScript
- Always use proper type annotations
- Avoid `any` type
- Use `as const` for constant objects

### Component Structure
```typescript
'use client'; // If using hooks

import { useState } from 'react';
import { CONSTANTS } from '../constants/app';
import { logger } from '../utils/logger';

interface Props {
  // Define props
}

export default function ComponentName({ prop1, prop2 }: Props) {
  // Component code
  
  const handleAction = () => {
    logger.info('Action performed');
  };
  
  return (
    // JSX
  );
}
```

### Naming Conventions
- **Components**: PascalCase (AnimalCard.tsx)
- **Functions**: camelCase (handleSubmit)
- **Constants**: UPPER_SNAKE_CASE (ANIMAL_STATUS)
- **Types**: PascalCase (Animal, Request)
- **Files**: PascalCase for components, camelCase for utilities

### Comments
- Use JSDoc for functions and complex logic
- Keep comments brief and meaningful
- Remove debug comments before committing

---

## Common Tasks

### Adding a New Animal Status

1. Update `/src/constants/app.ts`:
   ```typescript
   export const ANIMAL_STATUS = {
     WAITING: 'Esperando por um lar',
     ADOPTED: 'Final feliz',
     SICK: 'Em tratamento', // Add new status
   } as const;
   ```

2. Update `/src/types/domain.ts` if the type definition changes

3. Update any components that reference this constant

### Adding a New Form Field

1. Add to the appropriate type in `/src/types/domain.ts`
2. Add any new constants if needed
3. Update the form component to include the field
4. Test with mock data first

### Connecting to Backend

1. Keep the mock data in place for now
2. Update `/src/utils/api.ts` if needed
3. In the component, replace mock data call with `apiRequest()`
4. Test with your backend running
5. Once everything works, remove mock data usage

---

## Debugging

### Enable Debug Logging
Debug logs only show in development mode:
```typescript
logger.debug('Development only info', data);
```

### Check Component State
Use React Developer Tools browser extension to inspect component state and props.

### Network Issues
1. Open DevTools Network tab
2. Check API requests
3. Look for CORS errors
4. Verify request/response format

### Type Errors
- Run `npm run lint` to check for TypeScript errors
- Read the error message carefully, it usually points to the issue
- Use your IDE's IntelliSense (hover over variables)

---

## Performance Tips

1. **Images**: Use proper image URLs, consider lazy loading for lists
2. **State**: Keep state as close to where it's used as possible
3. **Components**: Avoid unnecessary re-renders using React.memo if needed
4. **Lists**: Always use unique `key` prop
5. **API Calls**: Debounce search inputs, paginate large lists

---

## Testing

### Manual Testing Checklist
- [ ] Login works with test credentials
- [ ] Can view all animals
- [ ] Can filter animals by type
- [ ] Can open animal details
- [ ] Can submit adoption request
- [ ] Can submit volunteer request
- [ ] Can view all requests
- [ ] Can filter requests by type
- [ ] Can change request status
- [ ] Can add new animal (with edit button)
- [ ] Can edit existing animal
- [ ] Can change animal to "adopted"

---

## Deployment

### Building for Production
```bash
npm run build
npm start
```

### Environment Variables
Update `.env.local` with production values:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NODE_ENV=production
```

### Deployment Platform Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku

---

## Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Check for TypeScript errors and style issues

# Format Code (if configured)
npm run format       # Auto-format code with Prettier
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

