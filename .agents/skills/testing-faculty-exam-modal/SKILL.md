---
name: testing-faculty-exam-modal
description: Test the CNAHS faculty exam setup modal persistence flow end-to-end or with a safe local mock API fallback.
---

# Faculty Exam Setup Modal Testing

Use this when verifying changes to `frontend/app/faculty/exams/page.tsx` or `frontend/components/faculty/exams/modal/createExamSetupModal.tsx`.

## Devin Secrets Needed

- `CNAHS_TEST_BANK_VERCEL_BYPASS_SECRET`: Vercel Protection Bypass for Automation token for preview deployments. If this returns HTTP 401, it might be invalid, not redeployed, or not enabled for the project.
- `CNAHS_TEST_BANK_FACULTY_USERNAME`: dedicated non-production faculty test username.
- `CNAHS_TEST_BANK_FACULTY_PASSWORD`: dedicated non-production faculty test password.

## Preferred Preview Test

1. Verify the Vercel preview can be reached before recording:
   - Send `x-vercel-protection-bypass: $CNAHS_TEST_BANK_VERCEL_BYPASS_SECRET`.
   - Use `x-vercel-set-bypass-cookie: true` if browser follow-up requests need the bypass cookie.
2. Log in only with the dedicated faculty test account.
3. Navigate to `/faculty/exams` and avoid creating or saving real exams unless the user explicitly asks.
4. Record the UI flow and annotate the major assertions.

## Safe Local Fallback

If preview access is blocked, run the real frontend locally against a read-only mock API so no original data is touched.

Create a temporary mock API outside the repo that responds to:

```text
GET /api/faculty/exams -> []
OPTIONS * -> CORS headers for http://localhost:3000
```

Start the frontend with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api npm run dev --prefix frontend -- --hostname 0.0.0.0
```

Then test `http://localhost:3000/faculty/exams`.

## Modal Assertions

- First open defaults to `10 Questions` and `Easy Only`.
- Difficulty options are exactly `Easy Only`, `Medium Only`, `Hard Only`, `Expert Only`; `Mixed` should not appear.
- Choose a non-default pair such as `20 Questions` / `Hard Only`, close with `Cancel`, reopen with `Create Exam`, and confirm the pair persists. This distinguishes real persistence from default values.
- Also verify the user-reported `10 Questions` / `Easy Only` pair remains stable after close/reopen and does not reset to Medium.

## Reporting

- If using local fallback, clearly mark protected Vercel preview and real backend draft persistence as untested.
- Include full-screen screenshots for default state, non-default persisted state, and `10/Easy` persisted state.
- Post one PR comment with concise pass/failed/untested bullets and a Devin session link.
