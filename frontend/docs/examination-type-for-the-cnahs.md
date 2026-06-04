# CNAHS Assessment Architecture Standard

## Decision

CNAHS will standardize all examinations, assessments, mock boards, readiness tests, and question bank items as Multiple Choice Questions (MCQ).

This decision is based on alignment with actual nursing licensure examinations and simplifies analytics, progression tracking, remediation, and board readiness measurement.

---

# Rationale

## Alignment with Nursing Board Examinations

The Philippine Nursing Licensure Examination (PNLE) primarily uses multiple-choice questions.

Similarly, most nursing board review centers, mock board examinations, and readiness assessments use MCQ-based testing.

By adopting MCQ as the universal assessment format, CNAHS can closely simulate the actual board examination experience.

---

## Consistent Analytics

Multiple-choice questions provide structured answer data.

Every attempt produces:

- Correct answer selection
- Incorrect answer selections
- Distractor effectiveness
- Success rate
- Difficulty measurements
- Topic mastery indicators

This allows CNAHS to generate meaningful analytics.

Example:

Question:
Which drug classification does Metoprolol belong to?

Answer Distribution:

A. Beta Blocker (Correct) ........ 505 students

B. Beta Agonist .................. 187 students

C. ACE Inhibitor ................. 96 students

D. Calcium Channel Blocker ....... 58 students

Faculty can immediately identify misconceptions rather than simply seeing that students answered incorrectly.

---

# Supported Question Structure

Every question shall contain:

- Question Text
- Choice A
- Choice B
- Choice C
- Choice D
- Correct Answer
- Difficulty
- Topic
- Explanation
- Board Relevance (optional)

Example:

Question:
Which drug classification does Metoprolol belong to?

A. Beta Blocker
B. Beta Agonist
C. ACE Inhibitor
D. Calcium Channel Blocker

Correct Answer:
A. Beta Blocker

Difficulty:
Medium

Topic:
Pharmacology

---

# Unsupported Question Types

The following assessment formats will not be supported:

- Essay
- Identification
- Fill-in-the-Blank
- Matching Type
- Enumeration
- Short Answer
- Open Response Questions

Reason:

These formats do not provide the same level of automated analytics, progression tracking, and board readiness measurement.

---

# Question Bank Analytics Standard

Each question shall track:

## Performance Metrics

- Total Attempts
- Correct Attempts
- Incorrect Attempts
- Success Rate
- Average Response Time

## Answer Distribution

For every choice:

- Choice Label
- Answer Text
- Selection Count
- Selection Percentage
- Correct/Incorrect Status

Example:

A. Beta Blocker
Selected by 74%

B. Beta Agonist
Selected by 27%

C. ACE Inhibitor
Selected by 14%

D. Calcium Channel Blocker
Selected by 8%

---

# Common Mistakes Standard

The "Common Mistakes" section will be replaced by:

Answer Distribution

Reason:

Faculty members need to know which distractor attracts students rather than simply knowing students answered incorrectly.

This allows CNAHS to identify:

- Misconceptions
- Weak topics
- Distractor effectiveness
- Board readiness gaps

---

# Progression Integration

Questions directly influence progression.

Question results contribute to:

- Easy Difficulty Mastery
- Medium Difficulty Mastery
- Hard Difficulty Mastery
- Expert Difficulty Mastery

Repeated failure patterns can identify:

- Blocked progression
- Knowledge gaps
- Remediation opportunities

---

# Student Analytics Integration

Every student profile can derive:

- Strongest Topics
- Weakest Topics
- Highest Scoring Subjects
- Lowest Scoring Subjects
- Difficulty Readiness
- Board Readiness Rating

using only MCQ analytics.

---

# Future Compatibility

Although CNAHS currently standardizes MCQ assessments, the architecture should remain extensible.

Future versions may support:

- SATA (Select All That Apply)
- Case-Based Questions
- NCLEX-Style Items

without requiring redesign of the analytics engine.

However, essays and open-ended responses are outside the scope of CNAHS board-readiness analytics and will not be implemented.
