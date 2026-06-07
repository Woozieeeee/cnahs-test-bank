# CNAHS Test Bank System - Broken/Incomplete Features

**Date:** June 7, 2026
**Repository:** Woozieeeee/cnahs-test-bank

---

# Critical Issues

## None Found

All implemented features are working correctly based on code analysis. No critical bugs or broken functionality identified.

---

# High Severity Issues

## 1. Student Module Not Implemented

**Filepath:** `frontend/app/student/`
**Problem:** Entire student module is missing - directory is completely empty
**Severity:** HIGH
**Impact:** Students cannot use the system at all. No exam taking, no result viewing, no progress tracking.
**Current State:**
- Frontend: Empty directory
- Backend: No student-specific controllers, services, or routes
- Schema: StudentProgress, ExamAttempt, StudentAnswer models exist but unused

**Missing Components:**
- Student dashboard page
- Exam taking interface
- Exam timer
- Violation detection frontend
- Result viewing page
- Progress tracking UI
- Difficulty unlocking logic
- Student-specific APIs

**Recommended Fix:**
1. Create student dashboard page
2. Implement exam taking interface with question display
3. Implement exam timer with countdown
4. Implement violation detection (tab switch, window blur, device change)
5. Implement result viewing with score display
6. Implement progress tracking UI
7. Implement difficulty unlocking logic based on scores
8. Create student-specific backend endpoints for exam attempts

**Estimated Effort:** 40-60 hours
**Priority:** P1 - Critical blocker for system usability

---

# Medium Severity Issues

## 2. Exam Detail Page Missing

**Filepath:** `frontend/app/faculty/exams/[examId]/page.tsx`
**Problem:** Exam detail page does not exist
**Severity:** MEDIUM
**Impact:** Faculty cannot view exam details, monitor attempts, or review violations
**Current State:**
- Exam listing page exists and works
- No way to drill down into specific exam details
- Cannot view individual exam configuration
- Cannot monitor exam attempts
- Cannot review flagged violations

**Missing Features:**
- Exam information display
- Exam rules display
- Exam schedule display
- Selected questions list
- Attempt list with student details
- Attempt details with answers
- Violation log
- Exam analytics

**Recommended Fix:**
1. Create exam detail page at `faculty/exams/[examId]/page.tsx`
2. Fetch exam details by ID
3. Display exam information, rules, schedule
4. Display selected questions
5. Fetch and display attempt list
6. Implement attempt details view
7. Implement violation log view
8. Add basic exam analytics

**Estimated Effort:** 20-30 hours
**Priority:** P2 - Important for faculty workflow

---

## 3. Exam Monitoring Not Implemented

**Filepath:** Backend services/controllers
**Problem:** No real-time exam monitoring implementation
**Severity:** MEDIUM
**Impact:** Faculty cannot monitor active exams in real-time
**Current State:**
- No WebSocket implementation
- No polling mechanism for live updates
- No real-time attempt tracking
- No live violation alerts

**Missing Features:**
- Real-time exam status updates
- Live attempt tracking
- Live violation alerts
- Active student count
- Progress indicators

**Recommended Fix:**
1. Implement WebSocket server for real-time updates
2. Create exam monitoring service
3. Implement real-time attempt tracking
4. Implement live violation alerts
5. Create faculty monitoring dashboard
6. Add active student count display
7. Add progress indicators

**Estimated Effort:** 20-30 hours
**Priority:** P2 - Important for exam proctoring

---

## 4. Violation Review Interface Missing

**Filepath:** Frontend components
**Problem:** No UI for reviewing flagged violations
**Severity:** MEDIUM
**Impact:** Faculty cannot review or act on student violations
**Current State:**
- Violation recording endpoint exists
- Violation data stored in database
- No UI to view violations
- No way to dismiss or flag violations for review

**Missing Features:**
- Violation list view
- Violation details view
- Violation type display
- Violation timestamp
- Student information
- Dismiss action
- Flag for review action
- Add notes to violation

**Recommended Fix:**
1. Create violation review component
2. Implement violation list view
3. Implement violation details view
4. Add violation type display
5. Add student information display
6. Implement dismiss action
7. Implement flag for review action
8. Add notes functionality
9. Integrate with exam detail page

**Estimated Effort:** 10-15 hours
**Priority:** P2 - Important for academic integrity

---

## 5. ExamQuestion Order Field Missing

**Filepath:** `backend/prisma/schema.prisma` - ExamQuestion model (lines 309-321)
**Problem:** ExamQuestion model does not have order field
**Severity:** MEDIUM
**Impact:** Question order may not be preserved when randomization is disabled
**Current State:**
- Backend service attempts to add order field (line 85 in create_exam_service.ts)
- Prisma schema does not include order field
- This will cause the service to fail or ignore order

**Schema Issue:**
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

**Recommended Fix:**
1. Add `order Int` field to ExamQuestion model in schema.prisma
2. Run Prisma migration
3. Update create_exam_service.ts to properly use order field
4. Test question ordering in exams
5. Consider if existing exams need data migration

**Estimated Effort:** 2-4 hours
**Priority:** P3 - Schema issue that may cause bugs

---

# Low Severity Issues

## 6. No Pagination on Some Queries

**Filepath:** Multiple backend services
**Problem:** Some queries fetch all records without pagination
**Severity:** LOW
**Impact:** Performance degradation as data grows
**Current State:**
- get_subjects_service.ts - fetches all subjects
- get_dashboard_service.ts - fetches all related data
- get_subject_question_bank_service.ts - may fetch all questions

**Affected Services:**
- `backend/src/services/faculty/subjects/get_subjects_service.ts`
- `backend/src/services/faculty/dashboard/get_dashboard_service.ts`
- `backend/src/services/faculty/questions/get_subject_question_bank_service.ts`

**Recommended Fix:**
1. Add pagination parameters to service functions
2. Add skip/take to Prisma queries
3. Update frontend to handle pagination
4. Add total count for pagination UI
5. Test pagination on large datasets

**Estimated Effort:** 8-12 hours
**Priority:** P3 - Performance optimization

---

## 7. No Caching Layer

**Filepath:** Backend infrastructure
**Problem:** No caching implemented
**Severity:** LOW
**Impact:** Increased database load, slower response times
**Current State:**
- All queries hit database directly
- No Redis or other caching mechanism
- Frequently accessed data re-fetched every time

**Affected Areas:**
- Subject lists
- Topic lists
- Question lists
- Exam lists
- Dashboard data

**Recommended Fix:**
1. Set up Redis infrastructure
2. Implement caching layer in services
3. Add cache to frequently accessed queries
4. Implement cache invalidation on data changes
5. Add cache TTL configuration
6. Test cache performance

**Estimated Effort:** 15-20 hours
**Priority:** P3 - Performance optimization

---

## 8. No Index on Some Query Fields

**Filepath:** `backend/prisma/schema.prisma`
**Problem:** Some frequently queried fields lack indexes
**Severity:** LOW
**Impact:** Slow query performance as data grows
**Current State:**
- Exam.createdAt used for sorting but no index
- Question.createdAt used for sorting but no index
- Some foreign keys may benefit from additional indexes

**Affected Models:**
- Exam - createdAt field
- Question - createdAt field
- ExamAttempt - startedAt, submittedAt fields

**Recommended Fix:**
1. Add index on Exam.createdAt
2. Add index on Question.createdAt
3. Add index on ExamAttempt.startedAt
4. Add index on ExamAttempt.submittedAt
5. Run Prisma migration
6. Test query performance

**Estimated Effort:** 2-3 hours
**Priority:** P3 - Performance optimization

---

## 9. Subject Counters May Become Inconsistent

**Filepath:** Multiple backend services
**Problem:** Subject.totalQuestions and Subject.totalExams are manually incremented
**Severity:** LOW
**Impact:** Counters may become inconsistent if records are deleted
**Current State:**
- Counters only incremented, never decremented
- If question/exam deleted, counter not updated
- No recalculation mechanism

**Affected Services:**
- create_question_service.ts - increments totalQuestions
- create_exam_service.ts - increments totalExams
- archive operations don't decrement counters

**Recommended Fix:**
1. Create counter recalculation service
2. Add admin endpoint to trigger recalculation
3. Implement scheduled job for automatic recalculation
4. Consider using computed fields instead of stored counters
5. Test on existing data

**Estimated Effort:** 5-8 hours
**Priority:** P3 - Data consistency

---

## 10. SectionSubject.facultyId is Optional

**Filepath:** `backend/prisma/schema.prisma` - SectionSubject model (line 130)
**Problem:** SectionSubject.facultyId is optional (nullable)
**Severity:** LOW
**Impact:** May cause confusion about who teaches which section
**Current State:**
- Schema allows null facultyId
- Business logic unclear on when facultyId should be set
- May lead to sections without assigned instructors

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

**Recommended Fix:**
1. Clarify business requirements for facultyId
2. Either:
   - Make facultyId required if every section needs an instructor
   - Keep optional if multiple instructors per subject is allowed
3. Add validation in service layer
4. Document the intended behavior
5. Update UI to handle optional facultyId

**Estimated Effort:** 2-4 hours
**Priority:** P3 - Data clarity

---

## 11. Draft Data JSON Structure Not Validated

**Filepath:** `backend/prisma/schema.prisma` - ExamDraft model (line 221)
**Problem:** ExamDraft.draftData is untyped JSON
**Severity:** LOW
**Impact:** No schema validation for draft data
**Current State:**
- draftData is JSON field without validation
- Frontend types provide structure
- Backend does not validate JSON structure
- Could lead to data corruption if malformed

**Schema:**
```prisma
model ExamDraft {
  // ...
  draftData Json  // No validation
  // ...
}
```

**Recommended Fix:**
1. Add JSON schema validation in backend
2. Validate draftData structure on save
3. Add validation in save_exam_draft_service.ts
4. Consider using Prisma Json type with validation
5. Test with malformed data

**Estimated Effort:** 3-5 hours
**Priority:** P3 - Data integrity

---

## 12. Mock Data File Exists

**Filepath:** `frontend/components/faculty/exams/data/mockAssignedSections.ts`
**Problem:** Mock data file exists but is not actively used
**Severity:** LOW
**Impact:** Code clutter, potential confusion
**Current State:**
- File contains mock section data
- Not actively used in current implementation
- Real API used via useExamSections hook
- File should be removed or documented

**Recommended Fix:**
1. Verify file is not used anywhere
2. Delete mockAssignedSections.ts
3. Search for any other mock data files
4. Remove or document all mock data

**Estimated Effort:** 1 hour
**Priority:** P4 - Code cleanup

---

# Summary

## By Severity

- **Critical:** 0 issues
- **High:** 1 issue (Student Module)
- **Medium:** 4 issues (Exam Detail Page, Exam Monitoring, Violation Review, ExamQuestion Order)
- **Low:** 7 issues (Pagination, Caching, Indexes, Counters, facultyId Optional, Draft Validation, Mock Data)

## By Priority

- **P1 (Critical):** 1 issue - Student Module (40-60 hours)
- **P2 (High):** 3 issues - Exam Detail, Monitoring, Violation Review (50-75 hours)
- **P3 (Medium):** 6 issues - Order Field, Pagination, Caching, Indexes, Counters, facultyId (34-51 hours)
- **P4 (Low):** 1 issue - Mock Data (1 hour)

## Total Estimated Effort

**125-187 hours** to address all identified issues

**Minimum Viable Completion (P1 only):** 40-60 hours
**Recommended Completion (P1-P2):** 90-135 hours
**Full Completion (All priorities):** 125-187 hours

## Recommended Action Plan

1. **Immediate (P1):** Implement Student Module - Critical blocker
2. **Short-term (P2):** Implement Exam Detail, Monitoring, Violation Review - Important for faculty
3. **Medium-term (P3):** Fix schema issues, optimize performance - Technical debt
4. **Long-term (P4):** Code cleanup - Maintenance
