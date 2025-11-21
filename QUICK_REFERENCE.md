# ComplianceAI - Quick Reference Guide

## 📋 Essential Files to Know

### 🎯 Core Application Files (Must Know)

1. **src/App.tsx** - Root component, routing setup
2. **src/routes.tsx** - All page routes defined here
3. **src/index.css** - Global styles and design tokens
4. **src/db/api.ts** - All database operations (15+ functions)
5. **src/types/types.ts** - TypeScript type definitions

### 📄 Main Pages (7 Pages)

| File | Route | Purpose |
|------|-------|---------|
| `src/pages/Home.tsx` | `/` | Landing page |
| `src/pages/Dashboard.tsx` | `/dashboard` | Main dashboard |
| `src/pages/DocumentUpload.tsx` | `/upload` | Upload & verify documents |
| `src/pages/CaseManagement.tsx` | `/cases` | List all cases |
| `src/pages/CaseDetails.tsx` | `/cases/:id` | Case investigation |
| `src/pages/AuditTrail.tsx` | `/audit` | Activity logs |
| `src/pages/Analytics.tsx` | `/analytics` | Statistics |

### 🗄️ Database Files

1. **supabase/migrations/00001_create_compliance_schema.sql**
   - Creates 5 tables: documents, verification_results, cases, audit_trail, alerts
   - Defines enums, indexes, functions, triggers

2. **supabase/migrations/00002_create_storage_bucket.sql**
   - Creates 'documents' storage bucket (5MB limit)

3. **supabase/migrations/00003_add_sample_data.sql**
   - Adds 5 sample cases and 3 sample alerts

### 🔧 Configuration Files

- **package.json** - Dependencies and scripts
- **tsconfig.json** - TypeScript configuration
- **vite.config.ts** - Build configuration
- **.env** - Supabase credentials

## 🎨 Key Components

### Navigation
- `src/components/common/AppHeader.tsx` - Top navigation bar

### UI Library (shadcn/ui)
All in `src/components/ui/`:
- `button.tsx`, `card.tsx`, `input.tsx`, `select.tsx`
- `badge.tsx`, `alert.tsx`, `dialog.tsx`, `tabs.tsx`
- `table.tsx`, `form.tsx`, `textarea.tsx`, `toast.tsx`
- 40+ more components

## 🔌 API Functions (src/db/api.ts)

### User
```typescript
getUserId() // Get/create anonymous UUID
```

### Documents
```typescript
uploadDocument(file, type) // Upload to storage
getDocuments() // Fetch user documents
getDocumentById(id) // Fetch single document
```

### Verification
```typescript
createVerificationResult(documentId, result) // Store AI analysis
getVerificationResult(documentId) // Fetch verification
```

### Cases
```typescript
getCases() // Fetch all cases
getCaseById(id) // Fetch single case
createCase(data) // Create new case
updateCase(id, updates) // Update case
```

### Audit Trail
```typescript
getAuditTrail(limit) // Fetch logs
createAuditEntry(type, entity, id, details) // Log action
```

### Alerts
```typescript
getAlerts() // Fetch all alerts
getUnreadAlerts() // Fetch unread
markAlertAsRead(id) // Mark as read
createAlert(data) // Create alert
```

### Analytics
```typescript
getDashboardStats() // Get statistics
```

## 📊 Database Schema Quick Reference

### documents
```
id, user_id, file_name, file_type, file_url, 
document_type, upload_date, status
```

### verification_results
```
id, document_id, risk_score, is_fraudulent, 
fraud_indicators, confidence_level, verification_date, heatmap_data
```

### cases
```
id, case_number, customer_name, customer_id, case_type, 
priority, status, assigned_to, created_date, updated_date, resolution_notes
```

### audit_trail
```
id, action_type, entity_type, entity_id, user_id, 
action_details, blockchain_hash, timestamp
```

### alerts
```
id, alert_type, severity, entity_id, message, 
is_read, created_date
```

## 🎯 Common Tasks

### Add a New Page
1. Create file in `src/pages/NewPage.tsx`
2. Add route in `src/routes.tsx`
3. Add navigation link in `src/components/common/AppHeader.tsx`

### Add a Database Table
1. Create migration in `supabase/migrations/`
2. Add TypeScript types in `src/types/types.ts`
3. Add API functions in `src/db/api.ts`

### Add a New Component
1. Create in `src/components/` (common or ui)
2. Import and use in pages

### Modify Styles
1. Global styles: `src/index.css`
2. Component styles: Use Tailwind classes
3. Design tokens: Update CSS variables in `src/index.css`

## 🚀 NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## 🔐 Environment Variables

Located in `.env`:
```
VITE_SUPABASE_URL=https://tnemwiilxhzwhuejxyhc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📦 Key Dependencies

```json
{
  "@supabase/supabase-js": "^2.49.2",  // Backend
  "react": "^18.3.1",                   // UI Framework
  "react-router-dom": "^7.9.5",         // Routing
  "lucide-react": "^0.469.0",           // Icons
  "sonner": "^2.0.7",                   // Toasts
  "tailwindcss": "^3.4.17"              // Styling
}
```

## 🎨 Design Tokens (src/index.css)

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## 🔍 File Locations Cheat Sheet

| What | Where |
|------|-------|
| Pages | `src/pages/` |
| Components | `src/components/` |
| UI Components | `src/components/ui/` |
| Database API | `src/db/api.ts` |
| Types | `src/types/types.ts` |
| Styles | `src/index.css` |
| Routes | `src/routes.tsx` |
| Migrations | `supabase/migrations/` |
| Config | Root directory |
| Assets | `public/` |

## 🎯 Feature Checklist

✅ Document upload with real file storage
✅ AI-powered fraud detection (simulated)
✅ Risk scoring (0-100%)
✅ Case management (CRUD)
✅ Audit trail with blockchain hashing
✅ Real-time alerts
✅ Dashboard with statistics
✅ Analytics and trends
✅ Search and filters
✅ Responsive design
✅ Toast notifications
✅ Error handling
✅ Loading states
✅ Form validation

## 📱 User Flow

1. **Start** → Home page (`/`)
2. **Click "Launch Platform"** → Dashboard (`/dashboard`)
3. **Upload Document** → DocumentUpload (`/upload`)
4. **View Results** → Risk score, fraud indicators
5. **Check Cases** → CaseManagement (`/cases`)
6. **Investigate** → CaseDetails (`/cases/:id`)
7. **Review Logs** → AuditTrail (`/audit`)
8. **Analyze Trends** → Analytics (`/analytics`)

## 🎓 Learning Path

### Beginner
1. Explore `src/pages/Home.tsx` - Simple landing page
2. Check `src/components/common/AppHeader.tsx` - Navigation
3. Review `src/routes.tsx` - Routing setup

### Intermediate
1. Study `src/pages/Dashboard.tsx` - Data fetching
2. Examine `src/db/api.ts` - Database operations
3. Review `src/types/types.ts` - Type definitions

### Advanced
1. Analyze `src/pages/DocumentUpload.tsx` - File upload flow
2. Study `supabase/migrations/` - Database schema
3. Review `src/pages/CaseManagement.tsx` - Complex filtering

## 🐛 Troubleshooting

### Build Errors
```bash
npm run lint  # Check for errors
```

### Database Issues
- Check `.env` file for correct Supabase credentials
- Verify migrations ran successfully in Supabase dashboard

### UI Issues
- Check browser console for errors
- Verify component imports are correct
- Check Tailwind classes are valid

## 📚 Documentation Files

- **README.md** - Project overview
- **APPLICATION_GUIDE.md** - User guide and features
- **PROJECT_STRUCTURE.md** - Detailed file structure
- **FILE_LIST.txt** - Complete file listing
- **QUICK_REFERENCE.md** - This file

---

**Pro Tip**: Start by exploring the Dashboard page (`src/pages/Dashboard.tsx`) to understand how data flows from the database to the UI!
