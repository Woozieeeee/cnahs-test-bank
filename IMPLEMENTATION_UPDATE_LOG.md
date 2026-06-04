# Implementation Update Log

## Files Updated In This Pass Only

These are the files changed or created for the Assign Faculty, Activity Logs, and documentation work.

| File                                                                                  | What Changed                                                                                                                                                                              |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ACADEMIC_BACKEND_GAP_DOCUMENTARY.md`                                                 | Added the full Academic backend gap documentary, including backend-ready areas, mock-only areas, Assign Faculty notes, Activity Logs requirements, build order, and acceptance checklist. |
| `Academic_Backend_Gap_Documentary.docx`                                               | Added a polished Word version of the Academic backend gap documentary.                                                                                                                    |
| `frontend/app/admin/academic/subjects/page.tsx`                                       | Replaced `mockFaculty` with real faculty loading, replaced mock section assignment options with backend sections, and wired Assign Faculty save to `assignFacultiesToSubject`.            |
| `frontend/services/admin_service.ts`                                                  | Added `getFacultyUsers()` to fetch faculty users from `/admin/users` using `role=FACULTY`.                                                                                                |
| `frontend/lib/constants/activity.ts`                                                  | Added `ACADEMIC` as a first-class Activity Logs category.                                                                                                                                 |
| `frontend/lib/constants/activityIcons.ts`                                             | Added an icon mapping for the new `ACADEMIC` activity category.                                                                                                                           |
| `backend/src/middleware/admin_activity_logger_middleware.ts`                          | Added Academic route categorization, readable Academic action labels, and request body metadata for audit logs.                                                                           |
| `backend/src/controllers/admin/academic/student_records/assign_section_controller.ts` | Removed the manual duplicate activity-log write so the centralized admin activity logger handles the event once.                                                                          |

## Important Behavior Now Added

- Assign Faculty on Subject now uses real faculty users instead of mock faculty data.
- Assign Faculty save now calls the backend assignment endpoint.
- Assign Sections modal on the Subjects page now receives real backend sections instead of mock sections.
- Academic mutations are categorized as `ACADEMIC` instead of generic `SYSTEM`.
- Activity Logs can now filter Academic events once logs are created under the `ACADEMIC` category.
- Student-section assignment no longer creates both manual and middleware logs for the same action.

## Validation Completed

- Backend TypeScript build passed with `npm.cmd run build`.
- Frontend lint passed for the touched frontend files.
- Word document was structurally verified.
- Word visual rendering could not be completed because the local Office/LibreOffice converter was not found.

## Remaining Files That Still Need Backend Updates

These Academic pages still import or use mock data and need future backend wiring.

| Remaining Page                                                                                      | Needed Backend Work                                                                 |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `frontend/app/admin/academic/subjects/[subjectId]/page.tsx`                                         | Replace mock subject dashboard data with a real subject details/dashboard endpoint. |
| `frontend/app/admin/academic/subjects/[subjectId]/question-bank/page.tsx`                           | Add subject-scoped question bank list and analytics endpoints.                      |
| `frontend/app/admin/academic/subjects/[subjectId]/question-bank/[questionId]/page.tsx`              | Add subject question detail endpoint.                                               |
| `frontend/app/admin/academic/subjects/[subjectId]/assessments/page.tsx`                             | Add subject assessment list, filters, and summary stats endpoints.                  |
| `frontend/app/admin/academic/subjects/[subjectId]/assessments/[assessmentId]/page.tsx`              | Add subject assessment details and performance endpoints.                           |
| `frontend/app/admin/academic/sections/[id]/subjects/page.tsx`                                       | Replace mock section-subject list with real assigned section subjects.              |
| `frontend/app/admin/academic/sections/[id]/subjects/[subjectId]/page.tsx`                           | Add section-subject dashboard/details endpoint.                                     |
| `frontend/app/admin/academic/sections/[id]/subjects/[subjectId]/assessment/page.tsx`                | Add section-subject assessment list and analytics endpoints.                        |
| `frontend/app/admin/academic/sections/[id]/subjects/[subjectId]/assessment/[assessmentId]/page.tsx` | Add section-subject assessment detail, student, and violation endpoints.            |
| `frontend/app/admin/academic/sections/[id]/students/page.tsx`                                       | Replace mock section student roster with real student records/users endpoint.       |
| `frontend/app/admin/academic/sections/[id]/question-bank/page.tsx`                                  | Add section-scoped question bank list and analytics endpoints.                      |
| `frontend/app/admin/academic/sections/[id]/question-bank/[questionId]/page.tsx`                     | Add section question detail endpoint.                                               |
| `frontend/app/admin/academic/sections/[id]/exams/page.tsx`                                          | Add section exam list endpoint.                                                     |
| `frontend/app/admin/academic/sections/[id]/exams/[examId]/students/page.tsx`                        | Add exam student/session roster endpoint.                                           |
| `frontend/app/admin/academic/sections/[id]/exams/[examId]/violations/page.tsx`                      | Connect exam violations to real violation records and Activity Logs.                |

## Remaining Backend Work To Add

- Subject dashboard endpoint.
- Subject question bank endpoints.
- Subject assessment endpoints.
- Section-subject list/details endpoints.
- Section student roster/profile endpoints.
- Section question bank endpoints.
- Section exam list/details endpoints.
- Exam student/session endpoints.
- Exam violation endpoints connected to Activity Logs.
- Richer Activity Logs metadata for Academic actions, such as subject names, section names, target student names, and before/after assignment summaries.
