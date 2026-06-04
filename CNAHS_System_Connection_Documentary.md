# CNAHS Test Bank System Documentary (Updated June 2026)

## Purpose

This document serves as the primary architectural reference for the CNAHS Test Bank System.

It maps:

- Frontend pages and components
- Backend routes and services
- Hooks and service layers
- Active integrations
- Mock or staged areas
- Current project progress
- Remaining implementation work

---

# System Overview

## Tech Stack

### Frontend

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Axios

### Backend

- Express.js
- TypeScript
- Prisma ORM
- MySQL

---

# User Roles

## Admin

Responsible for:

- User management
- Faculty management
- Student approval workflow
- Academic structure management
- Activity monitoring
- Subject assignment
- Faculty assignment
- Assessment oversight

---

## Faculty

Responsible for:

- Managing assigned subjects
- Managing topics
- Managing question banks
- Creating assessments
- Monitoring student performance

---

## Student

Responsible for:

- Taking assessments
- Viewing progress
- Tracking adaptive difficulty progression

(Currently under development)

---

# Backend Route Architecture

## Authentication

Base Route

/api/auth

Features

- Login
- Register
- Logout
- Get current user
- Change password
- Track registration status

---

## Admin

Base Route

/api/admin

Features

### Dashboard

- Statistics
- Recent registrations
- Recent activity

### User Management

- View users
- Create faculty
- Approve students
- Reject students

### Activity Logs

- Retrieve activity logs
- Filter activity logs

### Academic Management

- Sections
- Subjects
- Student Records
- Faculty Assignments

---

## Faculty

Base Route

/api/faculty

Features

### Dashboard

- Assigned subjects
- Student counts
- Assessment counts
- Question counts

### Subject Management

- View assigned subjects
- View subject analytics

### Topic Management

- Get topics
- Create topic
- Update topic
- Archive topic
- Restore topic

### Question Bank

- Get questions
- Create question
- Update question
- Archive question
- Restore question
- CSV Import (planned)

### Assessment Management

Planned

---

## Exam

Base Route

/exam

Features

- Record violations

---

# Current Prisma Architecture

## Subject

Stores:

- Name
- Code
- Description
- Total Questions
- Total Exams

Relationships:

- Topics
- Questions
- Faculty Pool
- Sections
- Exams

---

## Topic

Stores:

- Name
- Description
- Total Questions
- Archived State

Relationships:

- Subject
- Questions

---

## Question

Stores:

- Question Text
- Difficulty
- Correct Answer
- Explanation
- Total Attempts
- Total Correct
- Archived State

Relationships:

- Subject
- Topic
- Exam Questions
- Student Answers
- Options

---

## Exam

Stores:

- Scheduling
- Difficulty
- Duration
- Passing Score
- Randomization Settings

Relationships:

- Subject
- Section
- Questions
- Attempts

---

# Frontend Architecture

## Services Layer

Location

frontend/services

---

### auth_service.ts

Endpoints

- Login
- Register
- Logout
- Profile
- Change Password
- Track Status

---

### admin_service.ts

Endpoints

- Dashboard
- Activity Logs
- Users
- Faculty
- Approvals

---

### academic_service.ts

Endpoints

### Sections

- Create
- Update
- Archive
- Restore

### Subjects

- Create
- Update
- Archive
- Restore

### Assignments

- Assign Sections
- Assign Faculty

### Assessments

- Assessment Summary
- Assessment Details

### Question Bank

- Question Stats
- Question Details

---

### faculty_service.ts

Endpoints

### Dashboard

- getFacultyDashboard()

### Subjects

- getFacultySubjects()
- getFacultySubject()

### Topics

- getFacultyTopics()
- createFacultyTopic()
- updateFacultyTopic()
- archiveFacultyTopic()
- restoreFacultyTopic()

### Questions

- getFacultyQuestions()
- createFacultyQuestion()
- archiveFacultyQuestion()
- restoreFacultyQuestion()

### CSV

- uploadQuestionsCsv() (planned)

---

# Hooks

Location

frontend/hooks

---

## Authentication

- useAuth
- useProtectedRoute
- useGuestGuard

---

## Admin

- useSections
- useSection
- useSubjects
- useSubject
- useSubjectAssessments
- useSubjectQuestions
- useSubjectQuestionStats
- useSectionQuestionBankStats

---

## Faculty

- useFacultyDashboard
- useFacultySubjects
- useFacultySubject
- useFacultyTopics
- useFacultyQuestions

---

# Shared Component System

## components/common

Reusable UI components.

### buttons

- Action Buttons
- Page Buttons

### cards

- Preview Cards
- Stat Cards
- Info Cards

### form

- Inputs
- Selects
- Labels

### modal

- Modal Header
- Modal Actions
- Section Titles

### search

- Search Inputs
- Search Filters

### states

- LoadingState
- ErrorState
- EmptyState
- NotFoundState

### badges

- Status
- Severity
- Difficulty
- Violation

### navigation

- Tabs
- Tab Selectors

### utilities

- BackButton
- Pagination
- SortableTableHeader
- PasswordInput

---

## components/motion

Reusable animation wrappers.

- MotionPage
- MotionCard
- MotionButton
- MotionDropdown
- MotionModal

---

# Dependency Protection System

## Topic Dependency Protection

Topics cannot be archived when:

- Questions exist under the topic
- Active exams are using those questions

Frontend

- TopicDependencyModal

Backend

- getTopicDependencies()

---

## Question Dependency Protection

Questions cannot be archived when attached to:

- Draft Exams
- Scheduled Exams
- Ongoing Exams

Questions may be archived when only used in:

- Completed Exams
- Archived Exams

Frontend

- QuestionDependencyModal

Backend

- getQuestionDependencies()

---

# Faculty Module Status

## Completed

### Dashboard

✅ Faculty Dashboard

### Subject Management

✅ Assigned Subjects

✅ Subject Details

### Topic Management

✅ Create Topic

✅ Edit Topic

✅ Archive Topic

✅ Restore Topic

✅ Topic Dependency Validation

### Question Bank

✅ Retrieve Questions

✅ Question Table

✅ Pagination

✅ Search

✅ Filtering

✅ Archive Question

✅ Restore Question

✅ Dependency Validation Backend

✅ Create Question

✅ Create Question Backend

✅ Edit Question Backend

✅ Edit Question Modal

✅ Question Dependency Modal

### Question Bank CSV Import

Route Base:
`/api/faculty/topics/:topicId`

Endpoints:

POST `/upload`

- Upload question CSV
- Creates ImportJob
- Creates QuestionImportBatch
- Performs row validation

GET `/template`

- Downloads official CSV template

Tables:

- ImportJob
- QuestionImportBatch

Purpose:

Provides bulk question creation with validation,
error tracking, import history,
and downloadable templates.\

## In Progress

🚧 CSV Question Upload

🚧 Assessment Builder

---

## Planned

📋 Student Exam Taking

📋 Adaptive Difficulty Engine

📋 Student Analytics

📋 Faculty Assessment Analytics

---

# Mock Data Remaining

The following areas still contain mock or staged data and should eventually be replaced.

### Admin

- mockSessionViolations
- mockExamViolationsLog
- mockSectionSubjects
- mockExamStudents
- mockSessionTimeline
- mockStudentSession

### Subjects

- mockSubjects
- mockFaculty
- mockSections
- mockSubjectDetails
- mockAssessmentDetails

---

# Development Order

Current

Faculty Question Bank

Done

1. Topics and Topic CRUD
2. Question Bank CRUD
3. Question Dependency Validation
4. Question Archive/Restore

Next

1. CSV Import
2. Faculty Assessment Builder

Then

Student Module

Then

Remaining Admin Enhancements

---

# Current Project Health

Authentication: Stable

Admin Module: ~90% Complete

Faculty Module: ~75% Complete

Student Module: ~15% Complete

Question Bank System: ~70% Complete

Assessment System: ~40% Complete

Adaptive Learning Engine: Planned
