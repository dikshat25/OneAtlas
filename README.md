# OneAtlas

OneAtlas is a runtime infrastructure platform for building and managing internal tools and operational applications.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: NextAuth.js

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file based on `.env.example` or the required secrets:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/oneatlas"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Database Migration & Seeding**:
   Push the schema to your local database and seed initial data:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Core Features

- **Runtime Builder**: Dynamic application generation interface with persistent schemas.
- **Templates**: Pre-configured app schemas (CRM, HR, Analytics) ready for instantiation.
- **Project Dashboard**: Manage and edit deployed runtime applications.

## Project Structure

- `/src/app` - Next.js App Router pages and Server Actions
- `/src/components` - Reusable UI components (landing, builder, navigation, etc.)
- `/src/lib` - Utility functions, Prisma client, and NextAuth configuration
- `/src/store` - Zustand stores for client-side state
- `/prisma` - Database schema and seed scripts
