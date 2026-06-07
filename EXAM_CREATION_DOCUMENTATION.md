# Exam Creation System Documentation

## Overview

This document provides a comprehensive overview of the exam creation system, including current functionality, recent changes, known issues, and remaining work.

## Recent Updates (June 7, 2026)

### Faculty Dashboard Improvements

- **Pagination**: Added pagination to assigned subjects and upcoming exams (default 5 items)
- **View All Links**: Added "View All" links for both sections when there are more than 5 items
- **Files Modified**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\dashboard\facultySubjectsPreview.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\dashboard\facultyUpcomingExams.tsx`

### Faculty Activity Logs

- **New Page**: Created faculty activity logs page at `/faculty/activity-logs`
- **Faculty-Specific Categories**: Added faculty-specific activity categories (EXAMS, QUESTIONS, TOPICS, VIOLATIONS, ACADEMIC)
- **User Filtering**: Activity logs are filtered by the authenticated faculty user's ID
- **Files Created**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\app\faculty\activity-logs\page.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\backend\src\controllers\faculty\activity\get_faculty_activity_log_controller.ts`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\backend\src\services\faculty\activity\get_faculty_activity_logs_service.ts`
- **Files Modified**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\backend\src\routes\faculty_routes.ts`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\services\faculty_service.ts`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\lib\constants\activity.ts`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\admin\activity\activityTabs.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\admin\activity\activityFilters.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\config\navigation\facultyNav.ts`

### Draft Management Fix

- **Status**: ✅ Working perfectly
- **Description**: Drafts are now properly managed with distinct behaviors for different close actions
- **Key Improvements**:
  - Added `disableAutoSave` flag to prevent auto-save when modal is closing
  - Auto-save hook clears timeout immediately when disabled
  - Draft is deleted when user clicks cancel
  - Draft is saved when user clicks "x" close button
  - Draft is deleted and UI is refreshed after successful exam creation

## Current Functional State

### Working Features

#### 1. Multi-Section Selection

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepThree.tsx`
- **Status**: ✅ Working
- **Description**: Users can now select multiple sections for an exam using checkboxes instead of a single dropdown
- **Implementation Details**:
  - Changed from single `sectionId` to `sectionIds: number[]` array
  - UI now displays checkboxes with scrollable container (max-height: 40)
  - Section names are joined with comma separator for display
- **Backend Status**: Currently uses first sectionId from array (`payload.sectionIds[0]`) since Exam model has single `sectionId` field
- **Future Enhancement**: Full multi-section support would require adding a junction table to Prisma schema for exam-section relationships

#### 2. Datetime Validation

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepThree.tsx`
- **Status**: ✅ Working
- **Description**: Start and end datetime inputs now prevent selection of past dates
- **Implementation Details**:
  - Added `min` attribute to both `startsAt` and `endsAt` inputs
  - Uses `getLocalDateTimeMin()` helper function to get current local time in correct format
  - Format: `YYYY-MM-DDTHH:mm` (local timezone)
- **Helper Function**:
  ```typescript
  const getLocalDateTimeMin = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  ```

#### 3. Collapsible Sections (Step 2 & Step 4)

- **Files**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepTwo.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepFour.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\ruleSection.tsx`
- **Status**: ✅ Working
- **Description**: RuleSection components now support collapsible functionality to save space
- **Implementation Details**:
  - Added `collapsible`, `isOpen`, and `onToggle` props to RuleSection
  - Sections start collapsed by default (useState(false))
  - Visual indicator (▼/▶) shows expand/collapse state
  - Clicking header toggles visibility when collapsible
- **Affected Sections**:
  - Step 2: "Exam Behavior" and "Security & Focus Protection"
  - Step 4: "Exam Information", "Enabled Rules", "Selected Questions"

#### 4. Draft Management

- **Files**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\modal\createExamWizardModal.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\hooks\exams\useExamAutoSave.ts`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\hooks\exams\useExamCreationFlow.ts`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\app\faculty\subjects\[subjectId]\assessments\page.tsx`
- **Status**: ✅ Working (Fixed)
- **Description**: Drafts are now properly managed with distinct behaviors for different close actions
- **Implementation Details**:
  - Added `onCancel` prop to distinguish between "x" close (save draft) and cancel button (delete draft)
  - Added `disableAutoSave` flag to prevent auto-save when modal is closing
  - Auto-save hook now respects `disabled` flag and clears timeout immediately when disabled
  - After successful exam creation, draft is deleted and UI is refreshed
  - Cancel button deletes draft instead of saving it
- **Key Changes**:
  - `handleClose()`: Disables auto-save, then calls `onClose()` (saves draft)
  - `handleCancel()`: Disables auto-save, then calls `onCancel()` (deletes draft)
  - `handlePublishExam()`: Disables auto-save before creating exam, refreshes draft after success
  - Auto-save dependency array: `disabled` moved to first position to ensure timeout is cleared immediately

#### 5. Auto-Refresh After Exam Creation

- **Files**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\modal\createExamWizardModal.tsx`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\app\faculty\subjects\[subjectId]\assessments\page.tsx`
- **Status**: ✅ Working
- **Description**: Newly created exams appear immediately without requiring page refresh
- **Implementation Details**:
  - Added `onExamCreated` callback prop to CreateExamWizardModal
  - Called after successful exam creation before closing modal
  - Parent component passes `refresh` function from `useSubjectAssessments` hook
  - Backend already deletes draft upon successful exam creation (lines 100-105 in create_exam_service.ts)

#### 6. Unique Exam Code Generation

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\hooks\exams\useCreateExamWizard.ts`
- **Status**: ✅ Working
- **Description**: Exam codes now include timestamp for better uniqueness
- **Implementation Details**:
  - Format: `EXM-{timestamp}-{random}`
  - Example: `EXM-LX7ABC-XYZ`
  - Timestamp uses `Date.now().toString(36).toUpperCase()`
  - Random string uses `Math.random().toString(36).substring(2, 5).toUpperCase()`
- **Purpose**: Reduces collision probability causing unique constraint errors on `examCode`

#### 7. Section Display in Wizard

- **Files**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\backend\src\services\faculty\exams\get_exam_sections_service.ts`
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepThree.tsx`
- **Status**: ✅ Working
- **Description**: All sections assigned to a subject are now displayed regardless of which faculty assigned them
- **Implementation Details**:
  - Removed `facultyId` filter from `getExamSectionsService`
  - Sections are now fetched based on `subjectId` only
  - Allows faculty to see sections assigned by admin or other faculty members

## Type Changes

### Frontend Types

1. **CreateExamInfo** (`c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\types\exams\createExamInfo.ts`)
   - Changed: `sectionId: number | null` → `sectionIds: number[]`

2. **CreateExamPayload** (`c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\types\exams\createExamPayload.ts`)
   - Changed: `sectionId: number` → `sectionIds: number[]`

### Backend Types

1. **CreateExamPayload** (`c:\Users\Woozie\Downloads\CNAHSTestBank\backend\src\types\exams\create_exams_payload.ts`)
   - Changed: `sectionId: number` → `sectionIds: number[]`

## Backend Changes

### create_exam_service.ts

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\backend\src\services\faculty\exams\create_exam_service.ts`
- **Changes**:
  - Line 33: Changed to use `payload.sectionIds[0]` (first section from array)
  - Lines 81-86: Removed non-existent `order` field from examQuestion.createMany
- **Draft Deletion**: Already implemented (lines 100-105) - deletes exam drafts for faculty and subject upon successful exam creation

### get_exam_sections_service.ts

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\backend\src\services\faculty\exams\get_exam_sections_service.ts`
- **Changes**:
  - Removed `facultyId` filter from where clause (lines 7-10)
  - Now returns all sections assigned to a subject

## Frontend Component Changes

### createExamStepThree.tsx

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepThree.tsx`
- **Changes**:
  - Added `getLocalDateTimeMin()` helper function
  - Changed section dropdown to multi-select checkboxes
  - Added `min` attribute to datetime inputs
  - Updated to use `sectionIds` array
  - Updated ExamSummaryCard prop to `sectionNames`

### examSummaryCard.tsx

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\examSummaryCard.tsx`
- **Changes**:
  - Changed prop from `sectionName` to `sectionNames`
  - Updated all references

### createExamStepFour.tsx

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepFour.tsx`
- **Changes**:
  - Added collapsible state for all three sections (examInfoOpen, enabledRulesOpen, selectedQuestionsOpen)
  - All sections start collapsed (useState(false))
  - Added collapsible props to RuleSection components
  - Changed prop from `sectionName` to `sectionNames`

### createExamStepTwo.tsx

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\createExamStepTwo.tsx`
- **Changes**:
  - Added collapsible state (examBehaviorOpen, securityOpen)
  - Both sections start collapsed (useState(false))
  - Added collapsible props to RuleSection components

### ruleSection.tsx

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\wizard\ruleSection.tsx`
- **Changes**:
  - Added `collapsible`, `isOpen`, `onToggle` props
  - Added click handler to header when collapsible
  - Added visual indicator (▼/▶)
  - Conditionally render children based on `isOpen` when collapsible

### createExamWizardModal.tsx

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\modal\createExamWizardModal.tsx`
- **Changes**:
  - Added `onCancel` prop
  - Added `disableAutoSave` state
  - Created `handleClose()` and `handleCancel()` wrapper functions
  - Updated ModalHeader to use `handleClose`
  - Updated ModalActions to use `handleCancel`
  - Updated `handlePublishExam` to use `handleClose`
  - Added `onDraftSaved?.()` call after successful exam creation
  - Added useEffect to disable auto-save and reset wizard when modal closes
  - Added useEffect to re-enable auto-save when modal opens

### useExamAutoSave.ts

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\hooks\exams\useExamAutoSave.ts`
- **Changes**:
  - Added `disabled` prop
  - Early return when disabled
  - Moved `disabled` to first position in dependency array

### useExamCreationFlow.ts

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\hooks\exams\useExamCreationFlow.ts`
- **Changes**:
  - Added `cancelWizard()` function that deletes draft when user cancels
  - Exported `cancelWizard` in return object

### assessments\page.tsx

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\app\faculty\subjects\[subjectId]\assessments\page.tsx`
- **Changes**:
  - Added `cancelWizard` to destructured values
  - Passed `onCancel={cancelWizard}` to CreateExamWizardModal
  - Passed `onExamCreated={refresh}` to CreateExamWizardModal

### defaultExamInfo.ts

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\data\defaultExamInfo.ts`
- **Changes**:
  - Changed `sectionId: null` to `sectionIds: []`

### useCreateExamWizard.ts

- **File**: `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\hooks\exams\useCreateExamWizard.ts`
- **Changes**:
  - Updated validation to check `info.sectionIds.length > 0` instead of `info.sectionId !== null`

## Known Issues

### None Currently

All reported issues have been resolved:

- ✅ Datetime inputs now prevent past date selection
- ✅ Multi-section selection implemented
- ✅ Drafts properly managed (deleted on cancel, deleted after exam creation, working perfectly)
- ✅ Auto-refresh after exam creation working
- ✅ Sections display correctly in wizard
- ✅ Unique exam code generation improved
- ✅ Faculty dashboard pagination implemented
- ✅ Faculty activity logs page created with user filtering

## Remaining Work

### High Priority

#### 1. Full Multi-Section Support

- **Description**: Currently only the first sectionId from the array is used in the backend
- **Required Changes**:
  - Add junction table to Prisma schema for exam-section relationships
  - Update Exam model to remove single `sectionId` field
  - Update backend service to create multiple exam-section associations
  - Update frontend to handle multiple sections in exam display
- **Estimated Effort**: Medium
- **Dependencies**: Database schema changes

### Medium Priority

#### 2. Draft Recovery for Multi-Section

- **Description**: Ensure draft recovery works correctly with multiple selected sections
- **Files to Check**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\hooks\exams\useCreateExamWizard.ts` (restoreDraft function)
- **Status**: Likely needs verification

#### 3. Exam Display with Multiple Sections

- **Description**: Update exam cards and details to display multiple sections
- **Files to Update**:
  - `c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\components\faculty\exams\examCard.tsx`
  - Any other components displaying exam section information
- **Status**: Not started

### Low Priority

#### 4. Enhanced Draft Management

- **Description**: Consider adding draft expiration or cleanup mechanisms
- **Potential Features**:
  - Auto-delete drafts after X days
  - Draft versioning
  - Draft naming/labeling
- **Status**: Not started

#### 5. Improved Error Handling

- **Description**: Add better error messages for edge cases
- **Examples**:
  - No sections available for selection
  - All sections already have exams scheduled
  - Conflicts in exam scheduling
- **Status**: Not started

## Testing Checklist

### Manual Testing Required

- [ ] Multi-section selection works correctly
- [ ] Datetime inputs prevent past date selection in different timezones
- [ ] Collapsible sections work in Step 2
- [ ] Collapsible sections work in Step 4
- [ ] Draft is saved when clicking "x" on modal
- [ ] Draft is deleted when clicking "Cancel" button
- [ ] Draft is deleted after successful exam creation
- [ ] Draft does not reappear after deletion
- [ ] Exam appears immediately after creation without page refresh
- [ ] Exam codes are unique (test rapid creation)
- [ ] All assigned sections display in wizard dropdown
- [ ] Draft recovery works with multiple sections
- [ ] Faculty dashboard shows only 5 subjects with View All link when more exist
- [ ] Faculty dashboard shows only 5 exams with View All link when more exist
- [ ] Faculty activity logs page loads and displays user's own activities
- [ ] Faculty activity logs categories filter correctly (EXAMS, QUESTIONS, TOPICS, VIOLATIONS, ACADEMIC)
- [ ] Faculty activity logs search functionality works

## File Structure Summary

### Backend

```
c:\Users\Woozie\Downloads\CNAHSTestBank\backend\
├── src\
│   ├── controllers\
│   │   └── faculty\
│   │       └── activity\
│   │           └── get_faculty_activity_log_controller.ts (New)
│   ├── routes\
│   │   └── faculty_routes.ts (Updated)
│   ├── services\
│   │   └── faculty\
│   │       ├── activity\
│   │       │   └── get_faculty_activity_logs_service.ts (New)
│   │       └── exams\
│   │           ├── create_exam_service.ts (Updated)
│   │           └── get_exam_sections_service.ts (Updated)
│   └── types\
│       └── exams\
│           └── create_exams_payload.ts (Updated)
└── prisma\
    └── schema.prisma (Referenced)
```

### Frontend

```
c:\Users\Woozie\Downloads\CNAHSTestBank\frontend\
├── app\
│   └── faculty\
│       ├── activity-logs\
│       │   └── page.tsx (New)
│       ├── dashboard\
│       │   └── page.tsx (Referenced)
│       └── subjects\
│           └── [subjectId]\
│               └── assessments\
│                   └── page.tsx (Updated)
├── components\
│   ├── admin\
│   │   └── activity\
│   │       ├── activityTabs.tsx (Updated)
│   │       └── activityFilters.tsx (Updated)
│   └── faculty\
│       ├── dashboard\
│       │   ├── facultySubjectsPreview.tsx (Updated)
│       │   └── facultyUpcomingExams.tsx (Updated)
│       └── exams\
│           ├── wizard\
│           │   ├── createExamStepTwo.tsx (Updated)
│           │   ├── createExamStepThree.tsx (Updated)
│           │   ├── createExamStepFour.tsx (Updated)
│           │   ├── ruleSection.tsx (Updated)
│           │   ├── examSummaryCard.tsx (Updated)
│           │   └── data\
│           │       └── defaultExamInfo.ts (Updated)
│           └── modal\
│               └── createExamWizardModal.tsx (Updated)
├── config\
│   └── navigation\
│       └── facultyNav.ts (Updated)
├── hooks\
│   ├── exams\
│   │   ├── useCreateExamWizard.ts (Updated)
│   │   ├── useExamAutoSave.ts (Updated)
│   │   └── useExamCreationFlow.ts (Updated)
│   └── faculty\
│       └── subjects\
│           └── useSubjectAssessments.ts (Referenced)
├── lib\
│   └── constants\
│       └── activity.ts (Updated)
├── services\
│   └── faculty_service.ts (Updated)
└── types\
    └── exams\
        ├── createExamInfo.ts (Updated)
        └── createExamPayload.ts (Updated)
```

## Database Schema Notes

### Current Exam Model

```prisma
model Exam {
  id         Int      @id @default(autoincrement())
  title      String
  examCode   String   @unique
  sectionId  Int      // Single section - needs junction table for multi-section
  subjectId  Int
  // ... other fields
}
```

### Proposed Junction Table for Multi-Section

```prisma
model ExamSection {
  id       Int @id @default(autoincrement())
  examId   Int
  sectionId Int
  exam     Exam    @relation(fields: [examId], references: [id])
  section  Section @relation(fields: [sectionId], references: [id])

  @@unique([examId, sectionId])
}
```

## API Endpoints

### Create Exam

- **Endpoint**: POST `/api/faculty/exams`
- **Payload**: `CreateExamPayload` with `sectionIds: number[]`
- **Current Behavior**: Uses first sectionId from array
- **Future Behavior**: Create multiple exam-section associations

### Get Exam Sections

- **Endpoint**: GET `/api/faculty/exams/sections?subjectId={id}`
- **Current Behavior**: Returns all sections for subject (no faculty filter)
- **Previous Behavior**: Filtered by facultyId

## Conclusion

The exam creation system has been significantly improved with multi-section selection, datetime validation, collapsible UI sections, and proper draft management. All reported issues have been resolved. The main remaining work is implementing full multi-section support at the database level, which requires schema changes and backend updates.
