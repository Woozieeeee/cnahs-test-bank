# CNAHS Test Bank System - Next Development Priorities

**Date:** June 7, 2026
**Repository:** Woozieeeee/cnahs-test-bank

---

# Executive Summary

This document prioritizes development tasks based on the current repository state. Priorities are ranked by business impact, technical debt, and dependencies.

**Key Findings:**
- Student Module is the critical blocker (0% complete)
- Exam System is fully implemented (100% complete)
- Faculty Module is nearly complete (98% complete)
- Admin Module is nearly complete (95% complete)

**Total Estimated Effort to 100% Completion:** 75-110 hours

---

# Priority 1 - Student Module Implementation

**Estimated Effort:** 40-60 hours
**Business Impact:** CRITICAL
**Technical Debt:** None
**Dependencies:** None

## Overview

The student module is completely missing (0% complete). This is the single most critical gap in the system. Without the student module, the system cannot be used by its primary users.

## Tasks

### 1.1 Student Dashboard

**Estimated Effort:** 8-12 hours
**Filepath:** `frontend/app/student/page.tsx`

**Features:**
- Welcome message with student name
- Available exams list
- Upcoming exams
- Completed exams with scores
- Current difficulty level
- Progress to next difficulty
- Recent activity

**Backend Requirements:**
- `GET /student/dashboard` endpoint
- Fetch student's assigned exams
- Fetch student's completed attempts
- Fetch student progress

---

### 1.2 Exam Taking Interface

**Estimated Effort:** 15-20 hours
**Filepath:** `frontend/app/student/exams/[examId]/page.tsx`

**Features:**
- Exam information display
- Question display (one at a time or list)
- Answer selection
- Navigation (next/previous)
- Question progress indicator
- Submit confirmation

**Backend Requirements:**
- `GET /student/exams/:examId` endpoint
- `POST /student/exams/:examId/attempts` endpoint
- `PUT /student/attempts/:attemptId/answers` endpoint
- `PUT /student/attempts/:attemptId/submit` endpoint

**Schema Support:**
- ExamAttempt model exists
- StudentAnswer model exists
- QuestionOption model exists

---

### 1.3 Exam Timer

**Estimated Effort:** 4-6 hours
**Filepath:** Frontend component

**Features:**
- Countdown timer display
- Auto-submit on timeout
- Warning at 5 minutes remaining
- Warning at 1 minute remaining
- Pause on tab switch (if configured)

**Implementation:**
- Use `useTimer` hook (exists but empty)
- Sync with backend for accuracy
- Handle page refresh (persist remaining time)

---

### 1.4 Violation Detection Frontend

**Estimated Effort:** 6-8 hours
**Filepath:** Frontend hooks/components

**Features:**
- Tab switch detection
- Window blur detection
- Device change detection
- Copy/paste blocking
- Right-click blocking
- Fullscreen enforcement
- Violation counting
- Auto-submit on threshold

**Backend Requirements:**
- `POST /exam/violations` endpoint (exists)
- ViolationAction handling

**Implementation:**
- Use `useExamViolationMonitor` hook (exists)
- Implement event listeners
- Send violations to backend
- Handle threshold actions

---

### 1.5 Result Viewing

**Estimated Effort:** 4-6 hours
**Filepath:** `frontend/app/student/results/[attemptId]/page.tsx`

**Features:**
- Score display
- Pass/fail status
- Question-by-question breakdown
- Correct/incorrect indicators
- Explanations (if enabled)
- Time spent per question
- Overall statistics

**Backend Requirements:**
- `GET /student/attempts/:attemptId` endpoint
- Include answers and explanations

---

### 1.6 Progress Tracking UI

**Estimated Effort:** 2-4 hours
**Filepath:** Frontend component

**Features:**
- Current difficulty display
- Progress to next difficulty
- Required score display
- Unlock requirements
- Achievement badges

**Schema Support:**
- StudentProgress model exists
- All difficulty fields exist

---

### 1.7 Difficulty Unlocking Logic

**Estimated Effort:** 3-6 hours
**Filepath:** Backend service

**Features:**
- Check if student passed current difficulty
- Unlock next difficulty if score threshold met
- Update StudentProgress model
- Notify student of unlock

**Requirements:**
- EASY → MEDIUM: 60% required
- MEDIUM → HARD: 70% required
- HARD → EXPERT: 70% required

**Implementation:**
- Create `unlock_difficulty_service.ts`
- Call after exam submission
- Update StudentProgress fields

---

## Dependencies

None - can be started immediately

## Success Criteria

- Students can log in and view dashboard
- Students can take exams
- Timer works correctly
- Violations are detected and recorded
- Students can view results
- Progress tracking displays correctly
- Difficulty unlocking works as specified

---

# Priority 2 - Exam Detail & Monitoring

**Estimated Effort:** 20-30 hours
**Business Impact:** HIGH
**Technical Debt:** None
**Dependencies:** None

## Overview

Faculty cannot view exam details, monitor attempts, or review violations. This limits faculty's ability to manage exams effectively.

## Tasks

### 2.1 Exam Detail Page

**Estimated Effort:** 10-15 hours
**Filepath:** `frontend/app/faculty/exams/[examId]/page.tsx`

**Features:**
- Exam information display
- Exam rules display
- Exam schedule display
- Selected questions list
- Attempt list with student details
- Attempt status indicators
- Navigation to attempt details

**Backend Requirements:**
- `GET /faculty/exams/:examId` endpoint
- Include exam details, questions, attempts

---

### 2.2 Attempt Details View

**Estimated Effort:** 4-6 hours
**Filepath:** Frontend component/modal

**Features:**
- Student information
- Score display
- Time taken
- Question-by-question answers
- Correct/incorrect indicators
- Violations list
- Attempt timeline

**Backend Requirements:**
- `GET /faculty/attempts/:attemptId` endpoint
- Include answers, violations, timeline

---

### 2.3 Real-Time Exam Monitoring

**Estimated Effort:** 6-9 hours
**Filepath:** Backend service + Frontend component

**Features:**
- WebSocket connection for real-time updates
- Live attempt tracking
- Active student count
- Progress indicators
- Live violation alerts
- Exam status updates

**Implementation:**
- Implement WebSocket server
- Create exam monitoring service
- Add faculty monitoring dashboard
- Handle connection/disconnection

---

## Dependencies

None - can be started immediately

## Success Criteria

- Faculty can view exam details
- Faculty can view attempt details
- Faculty can monitor active exams in real-time
- Live updates work correctly

---

# Priority 3 - Fix ExamQuestion Order Field

**Estimated Effort:** 2-4 hours
**Business Impact:** MEDIUM
**Technical Debt:** HIGH
**Dependencies:** None

## Overview

ExamQuestion model lacks order field, but backend service attempts to set it. This creates a schema-code mismatch.

## Tasks

### 3.1 Add Order Field to Schema

**Estimated Effort:** 1 hour
**Filepath:** `backend/prisma/schema.prisma`

**Changes:**
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

---

### 3.2 Run Migration

**Estimated Effort:** 30 minutes
**Command:** `npx prisma migrate dev --name add_exam_question_order`

---

### 3.3 Update Service

**Estimated Effort:** 30 minutes
**Filepath:** `backend/src/services/faculty/exams/create_exam_service.ts`

**Changes:**
- Ensure order field is used correctly
- Test question ordering

---

### 3.4 Test Question Ordering

**Estimated Effort:** 1-2 hours
**Filepath:** Frontend exam taking interface

**Tests:**
- Create exam with randomization disabled
- Verify questions appear in selected order
- Create exam with randomization enabled
- Verify questions appear in random order

---

## Dependencies

None - can be started immediately

## Success Criteria

- Schema migration successful
- Order field persisted correctly
- Question ordering works as expected
- No existing data broken

---

# Priority 4 - Add Pagination to Queries

**Estimated Effort:** 8-12 hours
**Business Impact:** MEDIUM
**Technical Debt:** MEDIUM
**Dependencies:** None

## Overview

Some queries fetch all records without pagination, causing performance degradation as data grows.

## Tasks

### 4.1 Add Pagination to get_subjects_service

**Estimated Effort:** 2 hours
**Filepath:** `backend/src/services/faculty/subjects/get_subjects_service.ts`

**Changes:**
- Add page and limit parameters
- Use skip/take in Prisma query
- Return total count

---

### 4.2 Add Pagination to get_dashboard_service

**Estimated Effort:** 2 hours
**Filepath:** `backend/src/services/faculty/dashboard/get_dashboard_service.ts`

**Changes:**
- Add pagination to subject list
- Add pagination to exam list
- Return paginated results

---

### 4.3 Add Pagination to get_subject_question_bank_service

**Estimated Effort:** 2 hours
**Filepath:** `backend/src/services/faculty/questions/get_subject_question_bank_service.ts`

**Changes:**
- Add page and limit parameters
- Use skip/take in Prisma query
- Return total count

---

### 4.4 Update Frontend Components

**Estimated Effort:** 4-6 hours
**Filepath:** Multiple frontend components

**Changes:**
- Add pagination controls
- Handle page changes
- Display total count
- Add loading states

---

## Dependencies

None - can be started immediately

## Success Criteria

- All list queries use pagination
- Frontend handles pagination correctly
- Performance improved with large datasets
- No breaking changes to existing functionality

---

# Priority 5 - Violation Review Interface

**Estimated Effort:** 10-15 hours
**Business Impact:** MEDIUM
**Technical Debt:** None
**Dependencies:** Priority 2 (Exam Detail Page)

## Overview

Faculty cannot review or act on student violations. This limits academic integrity management.

## Tasks

### 5.1 Violation Review Component

**Estimated Effort:** 4-6 hours
**Filepath:** Frontend component

**Features:**
- Violation list view
- Violation type display
- Timestamp display
- Student information
- Filter by violation type
- Sort by timestamp

---

### 5.2 Violation Details View

**Estimated Effort:** 2-3 hours
**Filepath:** Frontend component/modal

**Features:**
- Detailed violation information
- Context (what student was doing)
- Screenshot (if available)
- Device information
- Browser information

---

### 5.3 Violation Actions

**Estimated Effort:** 2-3 hours
**Filepath:** Backend service

**Features:**
- Dismiss violation
- Flag for review
- Add notes to violation
- Escalate to admin

**Backend Requirements:**
- `PUT /faculty/violations/:violationId/dismiss` endpoint
- `PUT /faculty/violations/:violationId/flag` endpoint
- `PUT /faculty/violations/:violationId/notes` endpoint

---

### 5.4 Integration with Exam Detail Page

**Estimated Effort:** 2-3 hours
**Filepath:** `frontend/app/faculty/exams/[examId]/page.tsx`

**Changes:**
- Add violations tab
- Display violation count
- Navigate to violation review

---

## Dependencies

Priority 2 - Exam Detail Page must exist first

## Success Criteria

- Faculty can view violations
- Faculty can dismiss violations
- Faculty can flag violations for review
- Faculty can add notes to violations
- Integration with exam detail page works

---

# Priority 6 - Counter Recalculation

**Estimated Effort:** 5-8 hours
**Business Impact:** LOW
**Technical Debt:** MEDIUM
**Dependencies:** None

## Overview

Subject counters may become inconsistent over time. Need recalculation mechanism.

## Tasks

### 6.1 Create Recalculation Service

**Estimated Effort:** 2-3 hours
**Filepath:** `backend/src/services/admin/recalculate_counters_service.ts`

**Features:**
- Recalculate Subject.totalQuestions
- Recalculate Subject.totalExams
- Update all Subject records
- Log discrepancies

---

### 6.2 Add Admin Endpoint

**Estimated Effort:** 1 hour
**Filepath:** Backend controller + route

**Endpoint:** `POST /admin/recalculate-counters`

**Features:**
- Trigger recalculation
- Return results
- Require admin role

---

### 6.3 Add Scheduled Job

**Estimated Effort:** 2-3 hours
**Filepath:** Backend job scheduler

**Features:**
- Run daily at midnight
- Recalculate all counters
- Log results
- Send alert if discrepancies found

---

### 6.4 Test on Existing Data

**Estimated Effort:** 1 hour
**Filepath:** Test script

**Tests:**
- Run recalculation on test data
- Verify counters updated correctly
- Check for discrepancies

---

## Dependencies

None - can be started immediately

## Success Criteria

- Recalculation service works correctly
- Admin endpoint triggers recalculation
- Scheduled job runs automatically
- Counters stay consistent over time

---

# Priority 7 - Implement Caching

**Estimated Effort:** 15-20 hours
**Business Impact:** LOW
**Technical Debt:** MEDIUM
**Dependencies:** Redis infrastructure

## Overview

No caching implemented. All queries hit database directly, causing increased load.

## Tasks

### 7.1 Set Up Redis

**Estimated Effort:** 2-3 hours
**Filepath:** Infrastructure

**Steps:**
- Install Redis
- Configure connection
- Test connection
- Add to environment variables

---

### 7.2 Implement Caching Layer

**Estimated Effort:** 4-6 hours
**Filepath:** Backend services

**Features:**
- Create cache client wrapper
- Add get/set/delete methods
- Add TTL support
- Add cache key generation

---

### 7.3 Add Cache to Queries

**Estimated Effort:** 6-8 hours
**Filepath:** Multiple backend services

**Queries to Cache:**
- Subject lists (TTL: 1 hour)
- Topic lists (TTL: 1 hour)
- Exam lists (TTL: 5 minutes)
- Dashboard data (TTL: 1 minute)

---

### 7.4 Implement Cache Invalidation

**Estimated Effort:** 3-4 hours
**Filepath:** Backend services

**Features:**
- Invalidate on create
- Invalidate on update
- Invalidate on delete
- Invalidate on archive

---

## Dependencies

Redis infrastructure must be available

## Success Criteria

- Redis configured and working
- Caching layer implemented
- Frequently accessed data cached
- Cache invalidation works correctly
- Performance improved

---

# Priority 8 - Add Input Validation

**Estimated Effort:** 8-12 hours
**Business Impact:** MEDIUM
**Technical Debt:** MEDIUM
**Dependencies:** None

## Overview

Some endpoints may lack comprehensive input validation, creating security risks.

## Tasks

### 8.1 Install Validation Library

**Estimated Effort:** 1 hour
**Library:** Zod or similar

---

### 8.2 Create Validation Schemas

**Estimated Effort:** 3-4 hours
**Filepath:** Backend validations

**Schemas to Create:**
- CreateExamPayload schema
- CreateQuestionPayload schema
- CreateTopicPayload schema
- Update schemas for all entities

---

### 8.3 Add Validation to Controllers

**Estimated Effort:** 4-6 hours
**Filepath:** Backend controllers

**Changes:**
- Add validation middleware
- Validate all inputs
- Return validation errors
- Log validation failures

---

## Dependencies

None - can be started immediately

## Success Criteria

- All inputs validated
- Validation errors returned clearly
- Security improved
- No breaking changes

---

# Priority 9 - Clarify Faculty Assignment Logic

**Estimated Effort:** 2-4 hours
**Business Impact:** LOW
**Technical Debt:** LOW
**Dependencies:** None

## Overview

SectionSubject.facultyId is optional, creating ambiguity about instructor assignments.

## Tasks

### 9.1 Clarify Requirements

**Estimated Effort:** 1 hour
**Stakeholders:** Product owner, faculty

**Questions:**
- Is facultyId required for every SectionSubject?
- Can a subject be taught by multiple faculty?
- What happens if facultyId is null?

---

### 9.2 Update Schema (if needed)

**Estimated Effort:** 1 hour
**Filepath:** `backend/prisma/schema.prisma`

**Options:**
- Make facultyId required
- Keep optional with clear documentation
- Remove facultyId entirely

---

### 9.3 Add Validation

**Estimated Effort:** 1-2 hours
**Filepath:** Backend services

**Changes:**
- Add service-level validation
- Enforce chosen approach
- Document decision

---

## Dependencies

None - can be started immediately

## Success Criteria

- Requirements clarified
- Schema updated if needed
- Validation implemented
- Documentation updated

---

# Priority 10 - Add Database Indexes

**Estimated Effort:** 2-3 hours
**Business Impact:** LOW
**Technical Debt:** LOW
**Dependencies:** None

## Overview

Some frequently queried fields lack indexes, causing slow query performance.

## Tasks

### 10.1 Add Indexes to Schema

**Estimated Effort:** 1 hour
**Filepath:** `backend/prisma/schema.prisma`

**Indexes to Add:**
- Exam.createdAt
- Question.createdAt
- ExamAttempt.startedAt
- ExamAttempt.submittedAt

---

### 10.2 Run Migration

**Estimated Effort:** 30 minutes
**Command:** `npx prisma migrate dev --name add_performance_indexes`

---

### 10.3 Test Query Performance

**Estimated Effort:** 1-2 hours
**Filepath:** Test script

**Tests:**
- Run EXPLAIN on queries
- Compare before/after performance
- Verify index usage

---

## Dependencies

None - can be started immediately

## Success Criteria

- Indexes added successfully
- Query performance improved
- No breaking changes

---

# Priority 11 - Validate Draft Data Structure

**Estimated Effort:** 3-5 hours
**Business Impact:** LOW
**Technical Debt:** LOW
**Dependencies:** None

## Overview

ExamDraft.draftData is untyped JSON without validation, risking data corruption.

## Tasks

### 11.1 Create Validation Schema

**Estimated Effort:** 1-2 hours
**Filepath:** Backend validations

**Schema:**
- questionLimit: number
- examLevel: enum
- selectedQuestions: number[]
- rules: CreateExamRules
- info: CreateExamInfo

---

### 11.2 Add Validation to Service

**Estimated Effort:** 1-2 hours
**Filepath:** `backend/src/services/faculty/exams/save_exam_draft_service.ts`

**Changes:**
- Validate draftData on save
- Return validation errors
- Log validation failures

---

### 11.3 Test with Malformed Data

**Estimated Effort:** 1 hour
**Filepath:** Test script

**Tests:**
- Test with missing fields
- Test with wrong types
- Test with invalid enums
- Verify errors returned

---

## Dependencies

None - can be started immediately

## Success Criteria

- Draft data validated
- Malformed data rejected
- Errors returned clearly
- No data corruption

---

# Priority 12 - Remove Mock Data Files

**Estimated Effort:** 1 hour
**Business Impact:** LOW
**Technical Debt:** LOW
**Dependencies:** None

## Overview

Mock data file exists but is not used, creating code clutter.

## Tasks

### 12.1 Verify File Not Used

**Estimated Effort:** 30 minutes
**Filepath:** `frontend/components/faculty/exams/data/mockAssignedSections.ts`

**Action:**
- Search for imports
- Search for references
- Confirm not used

---

### 12.2 Delete File

**Estimated Effort:** 30 minutes
**Filepath:** `frontend/components/faculty/exams/data/mockAssignedSections.ts`

**Action:**
- Delete file
- Verify no build errors

---

## Dependencies

None - can be started immediately

## Success Criteria

- Mock data file removed
- No build errors
- No functionality broken

---

# Summary

## By Priority

- **Priority 1:** Student Module (40-60 hours) - CRITICAL
- **Priority 2:** Exam Detail & Monitoring (20-30 hours) - HIGH
- **Priority 3:** ExamQuestion Order Field (2-4 hours) - MEDIUM
- **Priority 4:** Pagination (8-12 hours) - MEDIUM
- **Priority 5:** Violation Review (10-15 hours) - MEDIUM
- **Priority 6:** Counter Recalculation (5-8 hours) - LOW
- **Priority 7:** Caching (15-20 hours) - LOW
- **Priority 8:** Input Validation (8-12 hours) - MEDIUM
- **Priority 9:** Faculty Assignment Logic (2-4 hours) - LOW
- **Priority 10:** Database Indexes (2-3 hours) - LOW
- **Priority 11:** Draft Validation (3-5 hours) - LOW
- **Priority 12:** Remove Mock Data (1 hour) - LOW

## Recommended Timeline

### Sprint 1 (2 weeks) - Critical Features
- Priority 1: Student Module (40-60 hours)
- **Goal:** Make system usable for students

### Sprint 2 (1 week) - Faculty Features
- Priority 2: Exam Detail & Monitoring (20-30 hours)
- Priority 5: Violation Review (10-15 hours)
- **Goal:** Complete faculty exam management

### Sprint 3 (1 week) - Technical Debt
- Priority 3: ExamQuestion Order (2-4 hours)
- Priority 4: Pagination (8-12 hours)
- Priority 8: Input Validation (8-12 hours)
- **Goal:** Fix critical technical issues

### Sprint 4 (1 week) - Performance & Optimization
- Priority 7: Caching (15-20 hours)
- Priority 10: Database Indexes (2-3 hours)
- Priority 6: Counter Recalculation (5-8 hours)
- **Goal:** Improve performance

### Sprint 5 (1 week) - Cleanup & Polish
- Priority 9: Faculty Assignment Logic (2-4 hours)
- Priority 11: Draft Validation (3-5 hours)
- Priority 12: Remove Mock Data (1 hour)
- **Goal:** Final polish

## Total Estimated Timeline

**5-6 weeks** to complete all priorities

**Minimum Viable (Sprint 1-2):** 3 weeks
**Recommended (Sprint 1-3):** 4 weeks
**Full Completion (All Sprints):** 5-6 weeks

## Next Steps

1. **Immediate:** Start Priority 1 - Student Module
2. **After Student Module:** Start Priority 2 - Exam Detail & Monitoring
3. **After Faculty Features:** Address technical debt (Priorities 3-4)
4. **After Technical Debt:** Performance optimization (Priorities 7, 10)
5. **Final:** Cleanup and polish (Priorities 6, 9, 11, 12)
