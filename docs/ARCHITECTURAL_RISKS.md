# CNAHS Test Bank System - Architectural Risks

**Date:** June 7, 2026
**Repository:** Woozieeeee/cnahs-test-bank

---

# Executive Summary

This document identifies architectural risks in the CNAHS Test Bank System based on code analysis. Risks are categorized by severity and likelihood, with mitigation strategies provided.

**Risk Summary:**
- **Critical Risks:** 0
- **High Risks:** 3
- **Medium Risks:** 5
- **Low Risks:** 4

---

# Schema Risks

## Risk 1: Exam SectionId Dependency

**Category:** Schema Design
**Severity:** LOW
**Likelihood:** N/A (Intentional Design)
**Impact:** HIGH if removed

**Description:**
The Exam model requires both subjectId and sectionId as mandatory fields. This creates a strong dependency on the section assignment architecture.

**Schema:**
```prisma
model Exam {
  // ...
  subjectId Int
  sectionId Int  // Required field
  // ...
}
```

**Risk Details:**
- Cannot create section-less exams
- All exams must be assigned to a specific section
- Students are filtered by sectionId for exam visibility
- Faculty are filtered by sectionId for exam management

**Mitigation:**
- This is intentional and architecturally required
- DO NOT REMOVE sectionId from Exam model
- Document this dependency clearly
- Ensure all exam creation flows enforce section assignment

**Recommendation:**
✅ **NO ACTION REQUIRED** - This is correct architecture

---

## Risk 2: Draft Data JSON Structure

**Category:** Data Integrity
**Severity:** MEDIUM
**Likelihood:** MEDIUM
**Impact:** MEDIUM

**Description:**
ExamDraft.draftData is stored as untyped JSON without schema validation. This could lead to data corruption if malformed data is saved.

**Schema:**
```prisma
model ExamDraft {
  // ...
  draftData Json  // No validation
  // ...
}
```

**Risk Details:**
- Backend does not validate JSON structure
- Frontend types provide structure but not enforced
- Malformed data could break draft restoration
- No guarantee of data consistency

**Potential Issues:**
- Missing required fields in draft data
- Incorrect data types
- Corrupted draft data preventing restoration
- Silent failures when restoring drafts

**Mitigation:**
1. Add JSON schema validation in backend
2. Validate draftData structure in save_exam_draft_service.ts
3. Use Zod or similar library for runtime validation
4. Add validation middleware for draft operations
5. Log validation failures for debugging

**Implementation Example:**
```typescript
import { z } from 'zod';

const DraftDataSchema = z.object({
  questionLimit: z.number(),
  examLevel: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']),
  selectedQuestions: z.array(z.number()),
  rules: CreateExamRulesSchema,
  info: CreateExamInfoSchema,
});

// In service
const validatedData = DraftDataSchema.parse(draftData);
```

**Estimated Effort:** 3-5 hours
**Priority:** P3

---

## Risk 3: Question Order Not Persisted

**Category:** Schema Design
**Severity:** MEDIUM
**Likelihood:** HIGH
**Impact:** MEDIUM

**Description:**
ExamQuestion model does not have an order field, but the backend service attempts to set it. This creates a schema-code mismatch.

**Schema:**
```prisma
model ExamQuestion {
  id Int @id @default(autoincrement())
  examId Int
  questionId Int
  exam Exam @relation(fields: [examId], references: [id])
  question Question @relation(fields: [questionId], references: [id])
  @@unique([examId, questionId])
  @@index([examId])
  @@index([questionId])
}
```

**Backend Code Issue:**
```typescript
// Line 85 in create_exam_service.ts
data: payload.questionIds.map((questionId, index) => ({
  examId: exam.id,
  questionId,
  order: index + 1,  // This field doesn't exist in schema!
})),
```

**Risk Details:**
- Service will fail or ignore order field
- Question order not preserved when randomization disabled
- Inconsistent behavior between expected and actual
- Silent failure - no error thrown

**Potential Issues:**
- Questions appear in random order regardless of settings
- Faculty cannot control question sequence
- Exam experience differs from faculty intent
- Data migration needed if field added later

**Mitigation:**
1. Add `order Int` field to ExamQuestion model
2. Run Prisma migration
3. Update create_exam_service.ts to use order field
4. Add index on order field for sorting
5. Test question ordering with and without randomization
6. Consider data migration for existing exams

**Schema Fix:**
```prisma
model ExamQuestion {
  id Int @id @default(autoincrement())
  examId Int
  questionId Int
  order Int  // Add this field
  exam Exam @relation(fields: [examId], references: [id])
  question Question @relation(fields: [questionId], references: [id])
  @@unique([examId, questionId])
  @@index([examId])
  @@index([questionId])
  @@index([order])  // Add index
}
```

**Estimated Effort:** 2-4 hours
**Priority:** P3

---

# Data Consistency Risks

## Risk 4: Subject Counters Manual Increment

**Category:** Data Consistency
**Severity:** MEDIUM
**Likelihood:** HIGH
**Impact:** MEDIUM

**Description:**
Subject.totalQuestions and Subject.totalExams are manually incremented but never decremented. This can lead to inconsistent counters.

**Schema:**
```prisma
model Subject {
  // ...
  totalQuestions Int @default(0)
  totalExams Int @default(0)
  // ...
}
```

**Risk Details:**
- Counters only incremented on create
- Counters not decremented on delete/archive
- No recalculation mechanism
- Counters drift from actual counts over time

**Potential Issues:**
- Dashboard shows incorrect statistics
- Faculty misled by wrong counts
- Analytics based on incorrect data
- Data integrity questions

**Affected Operations:**
- Question creation increments totalQuestions
- Question deletion does NOT decrement
- Question archive does NOT decrement
- Exam creation increments totalExams
- Exam deletion does NOT decrement
- Exam archive does NOT decrement

**Mitigation Options:**

**Option 1: Implement Decrement Logic**
- Add decrement on delete/archive operations
- Ensure all counter updates are transactional
- Add validation to prevent negative counts

**Option 2: Implement Recalculation Job**
- Create scheduled job to recalculate counters
- Run daily or weekly
- Update all Subject records
- Log discrepancies

**Option 3: Use Computed Fields**
- Remove stored counters
- Calculate counts on demand
- Add caching for performance
- More accurate but slower

**Recommended Approach:**
1. Implement decrement logic for immediate consistency (Option 1)
2. Add recalculation job as safety net (Option 2)
3. Consider computed fields for future (Option 3)

**Estimated Effort:** 5-8 hours
**Priority:** P3

---

## Risk 5: Faculty-Section-Subject Assignment Ambiguity

**Category:** Data Consistency
**Severity:** LOW
**Likelihood:** MEDIUM
**Impact:** LOW

**Description:**
SectionSubject.facultyId is optional, creating ambiguity about who teaches which section.

**Schema:**
```prisma
model SectionSubject {
  id Int @id @default(autoincrement())
  sectionId Int
  subjectId Int
  facultyId Int?  // Optional
  // ...
}
```

**Risk Details:**
- Schema allows null facultyId
- Business logic unclear on when facultyId should be set
- May lead to sections without assigned instructors
- Confusion between SubjectFaculty and SectionSubject assignments

**Potential Issues:**
- Sections without instructors
- Unclear responsibility for exam creation
- Duplicate or missing instructor assignments
- Faculty unsure of their teaching assignments

**Assignment Models:**
1. **SubjectFaculty** - Faculty assigned to subject (teaches subject across all sections)
2. **SectionSubject** - Subject assigned to section (with optional specific instructor)

**Mitigation:**
1. Clarify business requirements:
   - Is facultyId required for every SectionSubject?
   - Can a subject be taught by multiple faculty in different sections?
   - What happens if facultyId is null?

2. Choose approach:
   - **Option A:** Make facultyId required (every section has specific instructor)
   - **Option B:** Keep optional (allow multiple instructors per subject)
   - **Option C:** Remove facultyId entirely (use SubjectFaculty only)

3. Implement validation:
   - Add service-level validation
   - Enforce chosen approach
   - Document the decision

4. Update UI:
   - Handle optional facultyId in forms
   - Display instructor information clearly
   - Add validation feedback

**Estimated Effort:** 2-4 hours
**Priority:** P3

---

## Risk 6: Exam Status Transition Validation

**Category:** Data Consistency
**Severity:** LOW
**Likelihood:** LOW
**Impact:** MEDIUM

**Description:**
No validation for exam status transitions. Exams could transition to invalid states.

**Schema:**
```prisma
enum ExamStatus {
  DRAFT
  SCHEDULED
  ONGOING
  COMPLETED
  ARCHIVED
}
```

**Risk Details:**
- No validation of status transitions
- Could transition directly from DRAFT to COMPLETED
- Could transition from COMPLETED back to SCHEDULED
- No business logic enforcement

**Potential Issues:**
- Invalid exam states
- Students accessing exams at wrong times
- Faculty confusion about exam status
- Data integrity issues

**Valid Transitions:**
- DRAFT → SCHEDULED (on publish)
- SCHEDULED → ONGOING (when exam starts)
- ONGOING → COMPLETED (when exam ends)
- COMPLETED → ARCHIVED (after review)
- Any status → ARCHIVED (admin action)

**Invalid Transitions:**
- SCHEDULED → DRAFT (cannot unpublish)
- COMPLETED → ONGOING (cannot reopen)
- ARCHIVED → SCHEDULED (cannot unarchive)

**Mitigation:**
1. Implement status transition validation
2. Add state machine pattern
3. Validate transitions in service layer
4. Add transition logging
5. Document valid transitions

**Implementation Example:**
```typescript
const VALID_TRANSITIONS: Record<ExamStatus, ExamStatus[]> = {
  DRAFT: ['SCHEDULED', 'ARCHIVED'],
  SCHEDULED: ['ONGOING', 'ARCHIVED'],
  ONGOING: ['COMPLETED', 'ARCHIVED'],
  COMPLETED: ['ARCHIVED'],
  ARCHIVED: [],
};

function validateTransition(current: ExamStatus, next: ExamStatus) {
  const valid = VALID_TRANSITIONS[current].includes(next);
  if (!valid) {
    throw new Error(`Invalid transition: ${current} → ${next}`);
  }
}
```

**Estimated Effort:** 4-6 hours
**Priority:** P3

---

# Performance Risks

## Risk 7: No Pagination on List Queries

**Category:** Performance
**Severity:** MEDIUM
**Likelihood:** HIGH
**Impact:** HIGH

**Description:**
Some queries fetch all records without pagination, causing performance degradation as data grows.

**Affected Services:**
- `backend/src/services/faculty/subjects/get_subjects_service.ts`
- `backend/src/services/faculty/dashboard/get_dashboard_service.ts`
- `backend/src/services/faculty/questions/get_subject_question_bank_service.ts`

**Risk Details:**
- Fetches all records regardless of dataset size
- Memory usage increases linearly with data
- Response time increases linearly with data
- Database load increases with data

**Potential Issues:**
- Slow page loads
- Timeouts on large datasets
- Memory exhaustion
- Database performance degradation

**Impact Timeline:**
- **< 100 records:** Negligible
- **100-1,000 records:** Noticeable slowdown
- **1,000-10,000 records:** Significant performance issues
- **> 10,000 records:** Potential timeouts

**Mitigation:**
1. Add pagination to all list queries
2. Implement cursor-based pagination for large datasets
3. Add default page size limits
4. Add maximum page size limits
5. Update frontend to handle pagination
6. Add total count for pagination UI

**Implementation Example:**
```typescript
interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

async function getSubjectsPaginated(
  facultyId: number,
  params: PaginationParams
): Promise<PaginatedResult<Subject>> {
  const page = params.page || 1;
  const limit = Math.min(params.limit || 20, 100); // Max 100
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.subject.findMany({
      where: { faculties: { some: { facultyId } } },
      skip,
      take: limit,
    }),
    prisma.subject.count({
      where: { faculties: { some: { facultyId } } },
    }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    hasNext: skip + data.length < total,
  };
}
```

**Estimated Effort:** 8-12 hours
**Priority:** P3

---

## Risk 8: No Caching Layer

**Category:** Performance
**Severity:** MEDIUM
**Likelihood:** HIGH
**Impact:** MEDIUM

**Description:**
No caching implemented. All queries hit database directly, causing increased load and slower response times.

**Risk Details:**
- Frequently accessed data re-fetched every time
- No cache hit ratio optimization
- Database handles all read load
- No cache invalidation strategy

**Affected Data:**
- Subject lists (rarely change)
- Topic lists (rarely change)
- Exam lists (change moderately)
- Dashboard data (changes frequently)
- Question lists (change moderately)

**Potential Issues:**
- Increased database load
- Slower response times
- Higher infrastructure costs
- Poor user experience during peak load

**Mitigation:**
1. Set up Redis infrastructure
2. Implement caching layer in services
3. Add cache to frequently accessed data:
   - Subject lists (TTL: 1 hour)
   - Topic lists (TTL: 1 hour)
   - Exam lists (TTL: 5 minutes)
   - Dashboard data (TTL: 1 minute or no cache)
4. Implement cache invalidation on data changes
5. Add cache warming for critical data
6. Monitor cache hit ratio

**Implementation Example:**
```typescript
import Redis from 'ioredis';

const redis = new Redis();

async function getSubjectsWithCache(facultyId: number) {
  const cacheKey = `subjects:${facultyId}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Cache miss - fetch from database
  const subjects = await getSubjectsService(facultyId);
  
  // Set cache with TTL
  await redis.setex(cacheKey, 3600, JSON.stringify(subjects));
  
  return subjects;
}

async function invalidateSubjectCache(facultyId: number) {
  const cacheKey = `subjects:${facultyId}`;
  await redis.del(cacheKey);
}
```

**Estimated Effort:** 15-20 hours
**Priority:** P3

---

## Risk 9: Missing Database Indexes

**Category:** Performance
**Severity:** LOW
**Likelihood:** HIGH
**Impact:** MEDIUM

**Description:**
Some frequently queried fields lack indexes, causing slow query performance.

**Affected Fields:**
- Exam.createdAt (used for sorting)
- Question.createdAt (used for sorting)
- ExamAttempt.startedAt (used for filtering)
- ExamAttempt.submittedAt (used for filtering)

**Risk Details:**
- Sorting operations require full table scans
- Filtering operations slow without indexes
- Query performance degrades with data growth
- Database load increases

**Potential Issues:**
- Slow exam list loading
- Slow question list loading
- Slow attempt queries
- Poor user experience

**Mitigation:**
1. Add indexes to frequently sorted fields
2. Add indexes to frequently filtered fields
3. Add composite indexes for common query patterns
4. Analyze query performance with EXPLAIN
5. Monitor slow query logs
6. Rebuild indexes periodically

**Schema Changes:**
```prisma
model Exam {
  // ...
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([createdAt])  // Add this
  @@index([status])
  @@index([subjectId])
  @@index([sectionId])
  @@index([isArchived])
  @@index([createdById])
}

model Question {
  // ...
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([createdAt])  // Add this
  @@index([subjectId])
  @@index([topicId])
  @@index([isArchived])
  @@index([difficulty])
  @@index([createdById])
  @@index([importBatchId])
}

model ExamAttempt {
  // ...
  startedAt DateTime
  submittedAt DateTime?
  @@index([examId])
  @@index([studentId])
  @@index([startedAt])  // Add this
  @@index([submittedAt])  // Add this
}
```

**Estimated Effort:** 2-3 hours
**Priority:** P3

---

# Scalability Risks

## Risk 10: No Horizontal Scaling Strategy

**Category:** Scalability
**Severity:** MEDIUM
**Likelihood:** LOW
**Impact:** HIGH

**Description:**
No strategy for horizontal scaling of the application. Current architecture is monolithic.

**Risk Details:**
- Single server deployment
- No load balancing
- No database sharding
- No session sharing strategy

**Potential Issues:**
- Single point of failure
- Cannot handle increased load
- Downtime during deployments
- Limited capacity

**Mitigation:**
1. Implement load balancing
2. Add horizontal scaling capability
3. Implement session sharing (Redis)
4. Add database read replicas
5. Implement database sharding strategy
6. Add containerization (Docker)
7. Add orchestration (Kubernetes)

**Estimated Effort:** 40-60 hours
**Priority:** P4 (Future consideration)

---

## Risk 11: No Rate Limiting on Critical Endpoints

**Category:** Scalability
**Severity:** LOW
**Likelihood:** MEDIUM
**Impact:** MEDIUM

**Description:**
Rate limiting middleware exists but may not be configured for all critical endpoints.

**Current State:**
- Rate limit middleware exists: `backend/src/middleware/rate_limit_middleware.ts`
- Configuration unclear
- May not be applied to all endpoints

**Risk Details:**
- Potential for abuse
- DDoS vulnerability
- Resource exhaustion
- API abuse

**Mitigation:**
1. Review rate limit configuration
2. Apply rate limiting to all public endpoints
3. Apply stricter limits to critical endpoints:
   - Login endpoint
   - Exam submission endpoint
   - File upload endpoint
4. Implement IP-based rate limiting
5. Implement user-based rate limiting
6. Monitor rate limit violations

**Estimated Effort:** 4-6 hours
**Priority:** P3

---

# Security Risks

## Risk 12: No Input Validation on Some Endpoints

**Category:** Security
**Severity:** MEDIUM
**Likelihood:** LOW
**Impact:** HIGH

**Description:**
Some endpoints may lack comprehensive input validation.

**Risk Details:**
- SQL injection risk (mitigated by Prisma)
- XSS risk in user inputs
- File upload validation
- Payload size limits

**Mitigation:**
1. Add comprehensive input validation
2. Use Zod or similar for runtime validation
3. Sanitize user inputs
4. Validate file uploads (type, size, content)
5. Add payload size limits
6. Implement content security policy

**Estimated Effort:** 8-12 hours
**Priority:** P2

---

# Risk Summary

## By Severity

- **Critical:** 0 risks
- **High:** 3 risks (Question Order, No Pagination, No Caching)
- **Medium:** 5 risks (Draft Validation, Subject Counters, Status Transitions, No Indexes, Security Validation)
- **Low:** 4 risks (SectionId Dependency, Faculty Assignment, Horizontal Scaling, Rate Limiting)

## By Category

- **Schema Risks:** 3 risks
- **Data Consistency Risks:** 3 risks
- **Performance Risks:** 3 risks
- **Scalability Risks:** 2 risks
- **Security Risks:** 1 risk

## Recommended Action Plan

### Immediate (P2)
1. Add input validation to all endpoints (8-12 hours)

### Short-term (P3)
1. Fix ExamQuestion order field (2-4 hours)
2. Add pagination to list queries (8-12 hours)
3. Implement caching layer (15-20 hours)
4. Add database indexes (2-3 hours)
5. Validate draft data structure (3-5 hours)
6. Implement subject counter recalculation (5-8 hours)
7. Clarify faculty assignment logic (2-4 hours)
8. Implement exam status transition validation (4-6 hours)
9. Configure rate limiting (4-6 hours)

### Long-term (P4)
1. Design horizontal scaling strategy (40-60 hours)

## Total Estimated Effort

**P2 (Security):** 8-12 hours
**P3 (Performance & Consistency):** 43-74 hours
**P4 (Scalability):** 40-60 hours

**Total:** 91-146 hours to address all architectural risks

**Minimum Viable (P2-P3):** 51-86 hours
**Full Completion (All):** 91-146 hours
