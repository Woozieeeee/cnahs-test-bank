# CNAHS Test Bank System

## Technical Architecture & Development Documentary

### Version 2.0 – June 2026

---

# Overview

The CNAHS Test Bank System is a web-based examination and question bank platform designed for nursing and health sciences education.

The system provides:

- Academic Management
- Question Bank Management
- Exam Creation
- Exam Scheduling
- Student Examination
- Adaptive Difficulty Progression
- Faculty Analytics
- Administrative Oversight

---

# Technology Stack

## Frontend

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Axios

## Backend

- Express.js
- TypeScript
- Prisma ORM
- MySQL

---

# User Roles

## Admin

Responsibilities:

- User Management
- Faculty Management
- Student Approval
- Academic Structure Management
- Subject Assignment
- Faculty Assignment
- Activity Monitoring
- System Oversight

---

## Faculty

Responsibilities:

- Manage Assigned Subjects
- Manage Topics
- Manage Questions
- Create Exams
- Schedule Exams
- Monitor Student Attempts
- Review Violations
- Analyze Results

---

## Student

Responsibilities:

- Take Exams
- Track Progress
- Unlock Higher Difficulties
- View Performance

Status:

🚧 Under Development

---

# Adaptive Difficulty System

The examination system follows progressive difficulty advancement.

Students must pass each difficulty before unlocking the next.

## Difficulty Progression

EASY

↓

MEDIUM

↓

HARD

↓

EXPERT

---

## Unlock Requirements

EASY → MEDIUM

Minimum Score:

60%

---

MEDIUM → HARD

Minimum Score:

70%

---

HARD → EXPERT

Minimum Score:

70%

---

Mixed difficulty exams are intentionally not supported.

Each exam belongs to exactly one difficulty level.

---

# Faculty Module Status

## Dashboard

Status:

✅ Complete

Features:

- Assigned Subject Statistics
- Question Counts
- Exam Counts
- Student Counts

---

## Subject Management

Status:

✅ Complete

Features:

- Assigned Subjects
- Subject Details
- Subject Analytics

---

## Topic Management

Status:

✅ Complete

Features:

- Create Topic
- Update Topic
- Archive Topic
- Restore Topic
- Dependency Validation

---

## Question Bank

Status:

✅ Complete

Features:

- Question CRUD
- Difficulty Management
- Search
- Pagination
- Filtering
- Dependency Validation
- Archive / Restore
- CSV Import
- CSV Import History
- Import Error Viewer
- Analytics

---

## Exam Management

Status:

🚧 In Progress

Completion Estimate:

85%

---

# Exam Management System

## Purpose

Allows faculty to create, schedule, monitor, and manage examinations.

---

# Exam Builder Workflow

## Setup Modal

Before entering the builder, faculty selects:

### Question Limit

Examples:

- 10 Questions
- 20 Questions
- 30 Questions
- 40 Questions
- 50 Questions
- Custom Value

---

### Exam Level

Options:

- EASY
- MEDIUM
- HARD
- EXPERT

---

# Step 1 – Question Builder

Purpose:

Build the exam questionnaire.

---

## Layout

### Left Panel (2fr)

Selected Questions

Features:

- Question Ordering
- Reordering
- Removal
- Pagination
- Remaining Question Counter

---

### Right Panel (1fr)

Available Questions

Features:

- Search
- Topic Filter
- Pagination
- Add Question

---

## Rules

Questions are automatically filtered using:

- Selected Exam Level

Questions cannot:

- Exceed Question Limit
- Be Added Twice

Selected rows become disabled.

---

# Step 2 – Exam Rules

Purpose:

Configure exam behavior and security.

---

## Exam Behavior

- Randomize Questions
- Randomize Answers
- Show Results After Submission
- Show Correct Answers
- Show Explanations

---

## Security Protection

- Require Fullscreen
- Detect Tab Switching
- Detect Window Blur
- Block Copy
- Block Paste
- Block Right Click
- Detect Device Change

---

## Violation Management

Configurable:

- Violation Threshold
- Threshold Action

Actions:

- Auto Submit
- End Exam
- Flag Review

---

# Step 3 – Exam Information

Purpose:

Configure scheduling and assignment.

---

## Required Fields

- Title
- Description
- Assigned Section
- Duration
- Passing Score
- Start DateTime
- End DateTime

---

## Auto Generated

- Exam Code

---

## Validation

All required fields must be completed before proceeding.

---

# Step 4 – Review & Publish

Purpose:

Final review before exam creation.

---

## Displays

### Exam Information

- Title
- Description
- Section
- Duration
- Passing Score
- Schedule
- Exam Code

---

### Enabled Rules

Displays active protections only.

---

### Selected Questions

Displays all selected questions in order.

---

### Creation Summary

Displays:

- Exam Level
- Question Count
- Duration
- Passing Score
- Section
- Violation Threshold
- Exam Code

---

# Draft Recovery System

Status:

🚧 Backend Ready

🚧 Frontend Pending

---

## Stored Draft Data

- Current Step
- Questions
- Question Order
- Rules
- Exam Information
- Schedule

---

## Recovery Behavior

When a draft exists:

Faculty receives:

"Draft Found"

Options:

- Continue Draft
- Discard Draft

---

# Current Exam Frontend Structure

## Modals

components/faculty/exams/modal/

Files:

- createExamSetupModal.tsx
- createExamWizardModal.tsx

---

## Wizard Components

components/faculty/exams/wizard/

Files:

- createExamStepOne.tsx

- createExamStepTwo.tsx

- createExamStepThree.tsx

- createExamStepFour.tsx

- examCreationSummaryCard.tsx

- ruleSection.tsx

---

## Question Builder Components

components/faculty/exams/question-builder/

Files:

- availableQuestionsPanel.tsx
- selectedQuestionsPanel.tsx
- questionBuilderFilters.tsx

---

## Supporting Components

components/faculty/exams/

Files:

- examHeader.tsx
- examFilters.tsx
- examStats.tsx
- examCard.tsx
- examStatusTabs.tsx
- stepIndicator.tsx

---

# Current Exam Hooks

hooks/exams/

Files:

## useCreateExamWizard.ts

Responsibilities:

- Current Step
- Rules State
- Exam Information State
- Question Selection
- Question Reordering

Status:

✅ Complete

---

## useExamQuestionBuilder.ts

Responsibilities:

- Search
- Topic Filtering
- Difficulty Filtering
- Suggestions

Status:

✅ Complete

---

## useExamWizardNavigation.ts

Responsibilities:

- Next Navigation
- Previous Navigation
- Step Validation
- Submit Button State

Status:

✅ Complete

---

# Current Exam Backend Status

## ExamDraft

Status:

✅ Implemented

Endpoints:

- Save Draft
- Get Draft
- Delete Draft

Supports:

- One Draft Per Faculty Per Subject

---

## Publish Exam

Status:

🚧 Not Started

Needed:

- Create Exam
- Create Exam Questions
- Persist Rules
- Persist Schedule
- Persist Section Assignment

---

# Mock Data Remaining

Temporary Files:

components/faculty/exams/data/

- mockQuestions.ts
- mockAssignedSections.ts

Status:

🚧 Replace with API Data

---

# Current Development Priority

## Phase 2 – Exam Builder

Completed:

✅ Setup Modal

✅ Question Builder

✅ Rules Builder

✅ Schedule Builder

✅ Review Builder

✅ Draft Persistence

✅ Wizard Navigation

---

Remaining:

🚧 Draft Recovery Modal

🚧 Publish Exam API

🚧 Publish Exam Frontend Integration

🚧 Replace Mock Questions

🚧 Replace Mock Assigned Sections

🚧 Exams Listing API

---

# Next Major Milestone

Faculty Exam Management

Planned Pages:

faculty/exams/page.tsx

faculty/exams/[examId]/page.tsx

Features:

- Exam Details
- Exam Monitoring
- Exam Analytics
- Attempt Monitoring
- Violation Review

---

# Project Health

Authentication

✅ Stable

Admin Module

~90% Complete

Faculty Module

~95% Complete

Question Bank

~98% Complete

Exam Builder

~85% Complete

Student Module

~15% Complete

Adaptive Difficulty Engine

🚧 Planned

Overall Project

~80% Complete
