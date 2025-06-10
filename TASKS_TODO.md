# To-Do List for Implementing System Based on DIAGRAM.PNG

## 1. Extend Prisma Schema
- Add missing models to `backend/prisma/schema.prisma`:
  - ApiKey
  - Formulaire
  - Prospect
  - Interaction
  - Notification
  - Feedback
  - Invoice
  - StripeAccount
  - Message
  - Module
  - OAuthClient
  - Script
  - CallSession
  - Transcript

- Define fields and relationships as per the diagram.

## 2. Backend Implementation
- Create model files or extend existing models for the above entities.
- Implement controllers for CRUD operations on these models.
- Add routes in `backend/src/routes/` for the new controllers.
- Implement services/business logic as needed.

## 3. Database Migration
- After schema update, run Prisma migration and generate client.

## 4. Testing
- Write unit and integration tests for new models and endpoints.
- Test CRUD operations and relationships.

## 5. Frontend Integration (Optional)
- Create or update frontend components to interact with new backend endpoints.

---

This to-do list covers the implementation of the full system schema and backend features based on the provided diagram.
