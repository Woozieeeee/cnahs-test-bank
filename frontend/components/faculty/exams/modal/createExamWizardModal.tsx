"use client";

import { memo, useEffect, useState } from "react";

import ModalContainer from "@/components/common/modal/modalContainer";
import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";

import StepIndicator from "../stepIndicator";
import { generateExamCode } from "@/lib/exams/generateExamCode";

import CreateExamStepOne from "../wizard/createExamStepOne";
import CreateExamStepTwo from "../wizard/createExamStepTwo";
import CreateExamStepThree from "../wizard/createExamStepThree";
import CreateExamStepFour from "../wizard/createExamStepFour";

import useCreateExamWizard from "@/hooks/exams/useCreateExamWizard";
import useExamQuestionBuilder from "@/hooks/exams/useExamQuestionBuilder";
import useExamWizardNavigation from "@/hooks/exams/useExamWizardNavigation";
import useExamBuilderQuestions from "@/hooks/exams/useExamBuilderQuestions";
import useCreateExam from "@/hooks/exams/useCreateExam";
import useExamAutoSave from "@/hooks/exams/useExamAutoSave";
import useExamSections from "@/hooks/exams/useExamSections";

import { successToast, errorToast } from "@/lib/swal";

import type { ExamDraft } from "@/types/exams/examDraft";
import type { CreateExamPayload } from "@/types/exams/createExamPayload";

import { createExam, updateExam } from "@/services/faculty_service";

interface Props {
  open: boolean;

  onClose: () => void;

  onCancel: () => void;

  subjectId: number;

  onDraftSaved?: () => void;

  onExamCreated?: () => void;

  questionLimit: number;

  draft: ExamDraft | null;

  examLevel: "EASY" | "MEDIUM" | "HARD" | "EXPERT";

  editExamData?: any;

  onEditCompleted?: () => void;
}

function CreateExamWizardModal({
  open,
  onClose,
  onCancel,
  questionLimit,
  subjectId,
  onDraftSaved,
  onExamCreated,
  draft,
  examLevel,
  editExamData,
  onEditCompleted,
}: Props) {
  const [disableAutoSave, setDisableAutoSave] =
    useState(false);

  const {
    currentStep,
    setCurrentStep,

    search,
    setSearch,

    topic,
    setTopic,

    rules,
    setRules,

    info,
    setInfo,

    selectedQuestions,

    canProceedToStep2,
    canProceedToStep3,
    canProceedToStep4,

    restoreDraft,
    resetWizard,

    handleAddQuestion,
    handleRemoveQuestion,
    handleMoveUp,
    handleMoveDown,
  } = useCreateExamWizard(questionLimit);

  useExamAutoSave({
    subjectId,

    currentStep,

    title: info.title,

    onSaved: onDraftSaved,

    questionLimit,
    examLevel,

    rules,

    info,

    selectedQuestions,

    disabled: disableAutoSave,
  });

  const { loading, handleCreateExam } = useCreateExam();

  const { questions, loading: questionsLoading } =
    useExamBuilderQuestions(subjectId, examLevel);

  const { topics, suggestions, filteredQuestions } =
    useExamQuestionBuilder({
      questions,
      search,
      topic,
      examLevel,
    });

  const { submitDisabled, handleNext, handlePrevious } =
    useExamWizardNavigation({
      currentStep,
      setCurrentStep,

      canProceedToStep2,
      canProceedToStep3,
      canProceedToStep4,
    });

  const { sections, loading: sectionsLoading } =
    useExamSections(subjectId);

  const handleClose = () => {
    setDisableAutoSave(true);
    onClose();
  };

  const handleCancel = () => {
    setDisableAutoSave(true);
    onCancel();
  };

  const handlePublishExam = async () => {
    try {
      setDisableAutoSave(true);

      // Calculate duration from start and end times (in minutes)
      const calculateDuration = () => {
        if (!info.startsAt || !info.endsAt) return 0;
        const start = new Date(info.startsAt).getTime();
        const end = new Date(info.endsAt).getTime();
        return Math.round((end - start) / (1000 * 60));
      };

      const payload: CreateExamPayload = {
        title: info.title,

        description: info.description,

        examCode: info.examCode || generateExamCode(),

        difficulty: examLevel,

        // Duration calculated from startsAt and endsAt
        duration: calculateDuration(),

        passingScore: info.passingScore,

        startsAt: info.startsAt,

        endsAt: info.endsAt,

        questionIds: selectedQuestions.map(
          (question) => question.id
        ),

        randomizeQuestions: rules.randomizeQuestions,

        randomizeAnswers: rules.randomizeAnswers,

        showResultAfterSubmission:
          rules.showResultAfterSubmission,

        showCorrectAnswers: rules.showCorrectAnswers,

        showExplanations: rules.showExplanations,

        requireFullscreen: rules.requireFullscreen,

        detectTabSwitch: rules.detectTabSwitch,

        detectWindowBlur: rules.detectWindowBlur,

        blockCopy: rules.blockCopy,

        blockPaste: rules.blockPaste,

        blockRightClick: rules.blockRightClick,

        detectDeviceChange: rules.detectDeviceChange,

        violationThreshold: rules.violationThreshold,

        thresholdAction: rules.thresholdAction,

        sectionIds: info.sectionIds,
      };

      if (editExamData) {
        // Update mode
        await updateExam(subjectId, editExamData.id, payload);
        successToast("Exam updated successfully.");
        onEditCompleted?.();
      } else {
        // Create mode
        await handleCreateExam(subjectId, payload);
        successToast("Exam created successfully.");
        onExamCreated?.();
        onDraftSaved?.();
      }

      handleClose();
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ??
          (editExamData
            ? "Failed to update exam."
            : "Failed to create exam.")
      );
    }
  };

  useEffect(() => {
    if (!draft || questions.length === 0) {
      return;
    }

    restoreDraft(draft, questions);
  }, [draft, questions, restoreDraft]);

  useEffect(() => {
    if (!editExamData || questions.length === 0) {
      return;
    }

    // Load exam data for editing by restoring like a draft
    const selectedQs = questions.filter((q) =>
      editExamData.questionIds.includes(q.id)
    );

    // Create a draft-like structure from exam data
    const examAsDraft: ExamDraft = {
      id: editExamData.id,
      facultyId: 0,
      subjectId: subjectId,
      title: editExamData.title,
      currentStep: 1,
      draftData: {
        questionLimit: selectedQs.length,
        examLevel: editExamData.difficulty,
        selectedQuestions: editExamData.questionIds,
        rules: {
          randomizeQuestions: editExamData.randomizeQuestions,
          randomizeAnswers: editExamData.randomizeAnswers,
          showResultAfterSubmission: editExamData.showResultAfterSubmission,
          showCorrectAnswers: editExamData.showCorrectAnswers,
          showExplanations: editExamData.showExplanations,
          requireFullscreen: editExamData.requireFullscreen,
          detectTabSwitch: editExamData.detectTabSwitch,
          detectWindowBlur: editExamData.detectWindowBlur,
          blockCopy: editExamData.blockCopy,
          blockPaste: editExamData.blockPaste,
          blockRightClick: editExamData.blockRightClick,
          detectDeviceChange: editExamData.detectDeviceChange,
          violationThreshold: editExamData.violationThreshold,
          thresholdAction: editExamData.thresholdAction,
        },
        info: {
          title: editExamData.title,
          description: editExamData.description || "",
          examCode: editExamData.examCode,
          duration: editExamData.duration,
          passingScore: editExamData.passingScore,
          startsAt: editExamData.startsAt ? new Date(editExamData.startsAt).toISOString().slice(0, 16) : "",
          endsAt: editExamData.endsAt ? new Date(editExamData.endsAt).toISOString().slice(0, 16) : "",
          sectionIds: editExamData.sectionIds || [],
          minutesPerQuestion: editExamData.minutesPerQuestion || 0,
        },
      },
      createdAt: "",
      updatedAt: "",
    };

    restoreDraft(examAsDraft, questions);
  }, [editExamData, questions, restoreDraft, subjectId]);

  useEffect(() => {
    if (open) {
      setDisableAutoSave(false);
    } else {
      setDisableAutoSave(true);
      resetWizard();
    }
  }, [open, resetWizard]);

  if (questionsLoading) {
    return (
      <ModalContainer open={open} maxWidth="max-w-4xl">
        <div className="p-10 text-center">
          Loading exam builder...
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer open={open} maxWidth="max-w-8xl">
      <div className="p-6">
        <ModalHeader
          title={editExamData ? "Edit Exam" : "Create Exam"}
          description={editExamData ? "Update your assessment configuration." : "Build and configure your assessment."}
          onClose={handleClose}
        />

        <div className="mt-6">
          <StepIndicator currentStep={currentStep} />
        </div>

        <div className="bg-muted/20 mt-8 min-h-175 rounded-2xl border p-6">
          {currentStep === 1 && (
            <CreateExamStepOne
              search={search}
              setSearch={setSearch}
              topic={topic}
              setTopic={setTopic}
              topics={topics}
              suggestions={suggestions}
              questionLimit={questionLimit}
              selectedQuestions={selectedQuestions}
              filteredQuestions={filteredQuestions}
              onAddQuestion={handleAddQuestion}
              onRemoveQuestion={handleRemoveQuestion}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          )}

          {currentStep === 2 && (
            <CreateExamStepTwo
              rules={rules}
              setRules={setRules}
            />
          )}

          {currentStep === 3 && (
            <CreateExamStepThree
              info={info}
              setInfo={setInfo}
              questionLimit={questionLimit}
              examLevel={examLevel}
              assignedSections={sections}
            />
          )}

          {currentStep === 4 && (
            <CreateExamStepFour
              info={info}
              rules={rules}
              selectedQuestions={selectedQuestions}
              questionLimit={questionLimit}
              examLevel={examLevel}
              sectionNames={sections
                .filter((section) =>
                  info.sectionIds.includes(section.id)
                )
                .map((s) => s.name)
                .join(", ")}
            />
          )}
        </div>

        <div className="mt-6">
          <ModalActions
            loading={loading}
            submitLabel={
              currentStep === 4
                ? editExamData
                  ? "Update Exam"
                  : "Create Exam"
                : "Next"
            }
            cancelLabel={
              currentStep === 1 ? "Cancel" : "Previous"
            }
            submitDisabled={submitDisabled}
            onSubmit={
              currentStep === 4
                ? handlePublishExam
                : handleNext
            }
            onCancel={() => handlePrevious(handleCancel)}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default memo(CreateExamWizardModal);
