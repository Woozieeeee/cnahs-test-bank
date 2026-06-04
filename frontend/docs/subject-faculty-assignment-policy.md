# Subject Faculty Assignment & Unassigned Subject Policy

## Purpose

This policy defines how faculty assignments are managed within the Academic Management module and establishes the behavior of subjects when a faculty member is removed, reassigned, resigns, or becomes unavailable.

The goal is to preserve all academic records and prevent data loss while allowing administrators to manage faculty transitions safely.

---

# Core Principle

A Subject is an independent academic entity.

Faculty members are assigned to subjects, but they do not own the subject or its academic records.

Therefore:

- Removing a faculty assignment must never delete the subject.
- Removing a faculty assignment must never delete academic data.
- Removing a faculty assignment must never remove the subject from sections.
- Removing a faculty assignment must never affect historical records.

Only the faculty-to-subject relationship is removed.

---

# Academic Structure

A Subject is an independent academic entity.

Subjects may be taught by multiple faculty members, and a faculty member may teach multiple subjects.

To support faculty transitions and section-specific teaching assignments, faculty assignments are separated into two layers:

## Subject Faculty Pool

The Subject Faculty Pool defines which faculty members are authorized to teach a subject.

Example:

```text
Subject:
Pharmacology

Authorized Faculty:
├─ Dr. Maria Santos
├─ Dr. Juan Cruz
└─ Dr. Anna Reyes
```

These faculty members are eligible to teach the subject but are not automatically assigned to any section.

---

## Section Subject Assignment

When a subject is assigned to a section, one faculty member from the Subject Faculty Pool is selected as the instructor for that section.

Example:

```text
BSN-2A
└─ Pharmacology
   └─ Dr. Maria Santos

BSN-2B
└─ Pharmacology
   └─ Dr. Juan Cruz

BSN-2C
└─ Pharmacology
   └─ Dr. Anna Reyes
```

Each section may have a different faculty member while sharing the same subject, question bank, assessments, and analytics.

---

## Relationship Model

```text
Subject
├─ Faculty Pool
│
├─ Question Bank
├─ Assessments
├─ Analytics
│
└─ Section Assignments
   ├─ Section
   └─ Assigned Faculty
```

Academic data belongs to the Subject.

Faculty assignments are replaceable relationships that determine who teaches the subject within a section.

```text
Faculty
   ↓
Subject
   ↓
Section
   ↓
Students
```

A subject may be assigned to one or more sections.

A faculty member may teach one or more subjects.

Sections consume subjects, not faculty assignments directly.

Because of this relationship, faculty changes should not impact the existence of the subject itself.

---

# Unassigned Subject Status

A subject enters the UNASSIGNED state when no faculty members exist within its Faculty Pool.

Example:

Before:

```text
Subject:
Pharmacology

Faculty Pool:
├─ Dr. Maria Santos
└─ Dr. Juan Cruz

Status:
Assigned
```

After all faculty assignments are removed:

```text
Subject:
Pharmacology

Faculty Pool:
None

Status:
Unassigned
```

The subject remains active and accessible.

Only its teaching coverage status changes.

A subject enters the UNASSIGNED state when:

- A faculty member is manually removed from the subject.
- A faculty member resigns.
- A faculty member is deactivated.
- A faculty member is transferred away from the subject.
- An administrator intentionally clears the faculty assignment.

Example:

Before:

```text
Subject:
Pharmacology

Faculty:
Dr. Maria Santos

Status:
Assigned
```

After faculty removal:

```text
Subject:
Pharmacology

Faculty:
None

Status:
Unassigned
```

---

# Data Preservation Requirements

When a subject becomes UNASSIGNED, the following data must remain intact:

## Subject Information

- Subject Name
- Subject Code
- Subject Description
- Subject Settings
- Curriculum Mapping

## Assessment Records

- Exams
- Quizzes
- Assignments
- Question Banks
- Exam Configurations

## Student Academic Records

- Grades
- Scores
- Progress Records
- Performance Analytics
- Examination Results

## Historical Records

- Faculty Assignment History
- Academic Reports
- Activity Logs
- Audit Logs

No academic information should be deleted because of a faculty reassignment.

---

# Section Behavior

If a subject is assigned to one or more sections:

```text
BSN-2A
BSN-2B
BSN-3A
```

and the faculty assignment is removed:

The subject must remain visible within all sections.

Example:

Before:

```text
Pharmacology
Faculty: Maria Santos
Status: Assigned
```

After:

```text
Pharmacology
Faculty: None
Status: Unassigned
```

The subject remains accessible to all linked sections.

Only the faculty information changes.

---

# Section Subjects Page

The Subjects page within a section supports the following filters:

## ALL

Displays every subject assigned to the section.

## WITH FACULTY

Displays subjects that currently have an active faculty assignment.

Condition:

```text
subject.faculty != null
```

## UNASSIGNED

Displays subjects without an active faculty assignment.

Condition:

```text
subject.faculty == null
```

This filter helps administrators quickly identify subjects requiring reassignment.

---

# Faculty Reassignment Workflow

Step 1

Faculty leaves the subject.

```text
Academic
 → Subjects
 → Pharmacology
 → Remove Faculty Assignment
```

Step 2

Subject automatically enters:

```text
Status: Unassigned
```

Step 3

The subject remains available in all linked sections.

Step 4

Administrator assigns a replacement faculty.

```text
Academic
 → Subjects
 → Pharmacology
 → Assign Faculty
```

Step 5

Status returns to:

```text
Assigned
```

All linked sections automatically reflect the new faculty assignment.

---

# Future Enhancements

Potential future features:

## Faculty Assignment History

```text
Jan 2026
Assigned to Maria Santos

Apr 2026
Unassigned

May 2026
Assigned to Juan Cruz
```

## Faculty Coverage Metrics

```text
Total Subjects
Assigned Subjects
Unassigned Subjects
Faculty Coverage %
```

## Unassigned Subject Alerts

Administrative dashboard warnings for subjects without active faculty assignments.

---

# Architectural Rule

A Subject may exist without an assigned faculty member.

Faculty assignments are replaceable relationships.

Academic records belong to the Subject and must never be removed when faculty assignments change.

The UNASSIGNED status exists to preserve academic continuity while allowing faculty transitions without data loss.
