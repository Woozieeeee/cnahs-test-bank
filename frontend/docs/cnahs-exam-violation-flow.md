# CNAHS Examination Integrity Escalation Workflow

## Purpose

The examination integrity workflow provides a structured process for handling student violations during an active examination session.

The goal is to:

- Prevent accidental exam termination.
- Give students an opportunity to correct behavior.
- Maintain a clear audit trail of administrative actions.
- Ensure consistent enforcement of examination policies.

---

## Student Session Status

A student examination session can have one of the following statuses:

### ACTIVE

The student is currently taking the examination without administrative intervention.

### FLAGGED

The student has received one or more integrity warnings due to detected violations.

### TERMINATED

The student's examination session has been forcibly ended by an administrator due to repeated or severe violations.

---

## Warning System

### First Warning

When an administrator reviews a violation and selects **Flag Session**:

- Warning Count becomes 1.
- Student Session Status becomes FLAGGED.
- A notification is sent to the student.
- The examination continues.

Student Message:

> Warning 1 of 2: Suspicious examination behavior has been detected. Please follow examination guidelines. Further violations may result in exam termination.

---

### Second Warning

When another violation occurs and the administrator selects **Flag Session** again:

- Warning Count becomes 2.
- Student Session remains FLAGGED.
- A second notification is sent to the student.
- The examination continues.

Student Message:

> Warning 2 of 2: Additional suspicious behavior has been detected. One more confirmed violation may result in examination termination.

---

## Exam Termination Eligibility

The **Terminate Exam** action must remain disabled until:

```text
warningCount >= 2
```

This prevents accidental or premature termination decisions.

### UI Behavior

Before two warnings:

- Flag Session → Enabled
- Terminate Exam → Disabled

After two warnings:

- Flag Session → Enabled
- Terminate Exam → Enabled

---

## Third Confirmed Violation

After a student has accumulated two warnings, the administrator may terminate the examination session.

When **Terminate Exam** is selected:

- Student Session Status becomes TERMINATED.
- Examination access is revoked immediately.
- Current answers are saved.
- A termination record is added to the audit log.
- The termination reason is stored.

Student Message:

> Your examination session has been terminated due to repeated integrity violations. Please contact your instructor for further review.

---

## Violation Tracking

Each violation should store:

- Violation ID
- Student ID
- Exam ID
- Violation Type
- Severity
- Detection Timestamp
- Administrator Action
- Warning Count at Time of Action

---

## Session Data Structure

```typescript
interface ExamSessionModeration {
  warningCount: number;

  status: "ACTIVE" | "FLAGGED" | "TERMINATED";

  terminatedAt?: Date;

  terminatedBy?: number;

  terminationReason?: string;
}
```

---

## Administrative Audit Log

Every moderation action must generate an audit log entry.

Examples:

### Warning Issued

```text
Faculty John Smith issued Warning #1 to Student 2024-001 during Pharmacology Midterm.
```

### Second Warning

```text
Faculty John Smith issued Warning #2 to Student 2024-001 during Pharmacology Midterm.
```

### Exam Terminated

```text
Faculty John Smith terminated Student 2024-001 examination session after repeated integrity violations.
```

---

## Future Enhancements

Potential future additions:

- Automatic warning issuance based on AI confidence thresholds.
- Configurable warning limits per examination.
- Temporary lockout before full termination.
- Faculty override with justification notes.
- Automatic instructor notification workflow.
- Student appeal and review process.

```

```
