# Backend Integration Guide - ONG Proteção Animal

## Overview
This document provides instructions for backend developers to integrate their API with the frontend. The frontend is ready for backend connection and uses a dedicated API service layer for easy integration.

## Current Architecture

### Frontend Setup
- **Framework**: Next.js 16 with React 19 and TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks (no external state management needed for MVP)

### Type System
All types are defined in `/src/types/domain.ts` for centralized management and easy backend synchronization.

---

## API Integration Points

### 1. **Base Configuration**
- **Environment Variable**: `NEXT_PUBLIC_API_URL` (defined in `.env.local`)
- **Default**: `http://localhost:3001/api`
- **Usage**: Update `.env.local` to point to your backend server

### 2. **API Service Layer**
Located in `/src/utils/api.ts`:
- Generic `apiRequest()` function for all HTTP requests
- Type-safe session management via `sessionStorage` helper
- Automatic error logging

### 3. **Authentication Endpoints**

#### Login
```typescript
// POST /auth/login
// Body:
{
  email: string;
  senha: string;  // Note: Frontend uses "senha" (Portuguese)
}

// Response:
{
  success: boolean;
  user?: {
    email: string;
    nome: string;
  };
  token?: string;  // Optional JWT token
  message?: string;
}
```

**File Location**: `/src/app/authentication/login/page.tsx`

---

## API Endpoints Required

### Animals (`/api/animals`)

#### Get All Animals
```typescript
GET /api/animals

// Response:
{
  success: boolean;
  data: Animal[];
}
```

#### Get Animal by ID
```typescript
GET /api/animals/:id

// Response:
{
  success: boolean;
  data: Animal;
}
```

#### Create Animal
```typescript
POST /api/animals
Authorization: Bearer {token}

// Body:
{
  nome: string;
  especie: 'Cão' | 'Gato';
  porte: 'Pequeno' | 'Médio' | 'Grande';
  idade: string;
  temperamento: string;
  historia: string;
  foto_url: string;
  vacinas: string[];
  status: 'Esperando por um lar' | 'Final feliz';
}

// Response:
{
  success: boolean;
  data: Animal;
}
```

#### Update Animal
```typescript
PUT /api/animals/:id
Authorization: Bearer {token}

// Body: Same as Create
// Response: Same as Create
```

#### Delete Animal
```typescript
DELETE /api/animals/:id
Authorization: Bearer {token}

// Response:
{
  success: boolean;
  message?: string;
}
```

---

### Requests (`/api/requests`)

#### Get All Requests
```typescript
GET /api/requests
Authorization: Bearer {token}

// Query Parameters (optional):
// ?type=adocao|voluntario
// ?status=Não contatado|Aguardando resposta|Respondido
// ?search=nome

// Response:
{
  success: boolean;
  data: Request[];
}
```

#### Create Adoption Request
```typescript
POST /api/requests

// Body:
{
  tipo: 'adocao';
  nome: string;
  telefone: string;
  email?: string;
  animal_nome: string;
  animal_foto: string;
  animal_id?: string;
}

// Response:
{
  success: boolean;
  data: Request;
}
```

#### Create Volunteer Request
```typescript
POST /api/requests

// Body:
{
  tipo: 'voluntario';
  nome: string;
  telefone: string;
  email?: string;
  disponibilidade: string;
  interesse: string;
}

// Response:
{
  success: boolean;
  data: Request;
}
```

#### Update Request Status
```typescript
PUT /api/requests/:id
Authorization: Bearer {token}

// Body:
{
  status: 'Não contatado' | 'Aguardando resposta' | 'Respondido';
  notas?: string;
}

// Response:
{
  success: boolean;
  data: Request;
}
```

---

### Partners (`/api/partners`)

#### Get All Partners
```typescript
GET /api/partners

// Response:
{
  success: boolean;
  data: Partner[];
}
```

#### Create/Update Partners
```typescript
POST /api/partners
Authorization: Bearer {token}

// Body:
{
  nome: string;
  imagem_url: string;
  link: string;
}

// Response:
{
  success: boolean;
  data: Partner;
}
```

---

## Implementation Strategy

### Phase 1: Prepare Frontend (DONE ✓)
- [x] Created type definitions in `/src/types/domain.ts`
- [x] Created constants in `/src/constants/app.ts`
- [x] Created API service layer in `/src/utils/api.ts`
- [x] Created logger utility in `/src/utils/logger.ts`
- [x] Enabled TypeScript strict mode
- [x] Updated all components with proper types

### Phase 2: Backend Development
1. Set up Node.js/Express server on port 3001
2. Implement authentication with JWT or sessions
3. Create database schema matching the types in `/src/types/domain.ts`
4. Implement API endpoints listed above
5. Test CORS configuration (frontend runs on 3000, backend on 3001)

### Phase 3: Integration
1. Replace mock data calls with API calls
2. Update the `apiRequest` function in `/src/utils/api.ts` to use real endpoints
3. Remove mock data dependencies
4. Implement proper error handling and toasts
5. Add loading states where necessary

---

## Code Examples for Backend Integration

### Adding an API Call to a Component

**Before (Mock Data):**
```typescript
const [animals, setAnimals] = useState(animaisMock);
```

**After (Real API):**
```typescript
import { apiRequest } from '../utils/api';

const [animals, setAnimals] = useState<Animal[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchAnimals = async () => {
    setLoading(true);
    const response = await apiRequest<Animal[]>('/animals');
    if (response.success && response.data) {
      setAnimals(response.data);
    }
    setLoading(false);
  };
  
  fetchAnimals();
}, []);
```

---

## Database Schema Reference

Based on the frontend types, here's the recommended database schema:

### Animals
```
id: UUID/String (Primary Key)
nome: String
especie: Enum ('Cão', 'Gato')
porte: Enum ('Pequeno', 'Médio', 'Grande')
idade: String
temperamento: String
historia: Text
foto_url: String (URL)
vacinas: String[] (Array)
status: Enum ('Esperando por um lar', 'Final feliz')
nome_adotante: String (Optional)
contato_adotante: String (Optional)
doc_adocao_url: String (Optional URL)
createdAt: Timestamp
updatedAt: Timestamp
```

### Requests
```
id: Integer (Primary Key)
tipo: Enum ('adocao', 'voluntario')
nome: String
telefone: String
email: String (Optional)
data: String (Date)
status: Enum ('Não contatado', 'Aguardando resposta', 'Respondido')
notas: Text
animal_id: UUID (For adoption requests)
animal_nome: String (For adoption requests)
animal_foto: String (For adoption requests)
disponibilidade: String (For volunteer requests)
interesse: String (For volunteer requests)
createdAt: Timestamp
updatedAt: Timestamp
```

### Partners
```
id: UUID (Primary Key)
nome: String
imagem_url: String (URL)
link: String (URL)
createdAt: Timestamp
updatedAt: Timestamp
```

### Users/Credentials
```
id: UUID (Primary Key)
email: String (Unique)
senha: String (Hashed with bcrypt or similar)
nome: String
role: Enum ('admin', 'funcionario') (Optional)
createdAt: Timestamp
updatedAt: Timestamp
```

---

## Environment Setup

### Frontend .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development
```

### CORS Configuration (Backend)
```
Allow-Origin: http://localhost:3000
Allow-Methods: GET, POST, PUT, DELETE, PATCH
Allow-Headers: Content-Type, Authorization
```

---

## Testing the Integration

### Testing with cURL
```bash
# Create an animal
curl -X POST http://localhost:3001/api/animals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "nome": "Rex",
    "especie": "Cão",
    "porte": "Grande",
    "idade": "3 anos",
    "temperamento": "Protetor",
    "historia": "Encontrado na rua",
    "foto_url": "https://example.com/rex.jpg",
    "vacinas": ["V10", "Raiva"],
    "status": "Esperando por um lar"
  }'

# Get all animals
curl http://localhost:3001/api/animals

# Get a specific animal
curl http://localhost:3001/api/animals/123
```

---

## Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled
- Check that `NEXT_PUBLIC_API_URL` matches backend origin
- Verify preflight requests are handled (OPTIONS method)

### Type Mismatch Errors
- Keep `/src/types/domain.ts` in sync with backend schema
- Use exact enum values from `src/constants/app.ts`
- Test with Postman/Insomnia before integrating

### Authentication Issues
- Implement JWT token refresh mechanism
- Store token securely (currently in localStorage)
- Implement logout/session invalidation

---

## Next Steps

1. **Setup Backend**: Node.js + Express + Database (MongoDB/PostgreSQL)
2. **Implement Auth**: JWT authentication with token refresh
3. **Create API**: Follow the endpoints specified above
4. **Test Integration**: Test each endpoint with Postman/Insomnia
5. **Deploy**: Deploy backend and update `NEXT_PUBLIC_API_URL` for production

---

## Support Files

- **Types**: `/src/types/domain.ts`
- **Constants**: `/src/constants/app.ts`
- **API Service**: `/src/utils/api.ts`
- **Logger**: `/src/utils/logger.ts`
- **Mock Data**: `/src/data/mockData.ts` (Remove after backend is ready)

