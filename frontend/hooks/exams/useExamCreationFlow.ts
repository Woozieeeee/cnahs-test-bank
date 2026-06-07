"use client";

import { useState } from "react";

import useExamDraft from "@/hooks/exams/useExamDraft";

import type { CreateExamSetup } from "@/types/exams/createExamSetup";
import type { ExamDraft } from "@/types/exams/examDraft";

export default function useExamCreationFlow(
  subjectId: number
) {
  const {
    draft,
    loading: draftLoading,
    refresh: refreshDraft,
    deleteDraft,
  } = useExamDraft(subjectId);

  const [activeDraft, setActiveDraft] =
    useState<ExamDraft | null>(null);

  const [showSetupModal, setShowSetupModal] =
    useState(false);

  const [showWizardModal, setShowWizardModal] =
    useState(false);

  const [
    showDraftRecoveryModal,
    setShowDraftRecoveryModal,
  ] = useState(false);

  const [examSetup, setExamSetup] =
    useState<CreateExamSetup | null>(null);

  const [isDeletingDraft, setIsDeletingDraft] =
    useState(false);

  const [wizardInstance, setWizardInstance] = useState(0);

  const handleCreateExam = () => {
    console.log("Draft value:", draft);

    if (draft) {
      setShowDraftRecoveryModal(true);

      return;
    }

    setShowSetupModal(true);
  };

  const closeSetup = () => {
    setShowSetupModal(false);
  };

  const startWizard = (setup: CreateExamSetup) => {
    setExamSetup(setup);

    setShowSetupModal(false);

    setActiveDraft(null);

    setShowWizardModal(true);
  };

  const closeWizard = async () => {
    setShowWizardModal(false);
  };

  const cancelWizard = async () => {
    setShowWizardModal(false);

    if (draft) {
      try {
        await deleteDraft();
        await refreshDraft();
      } catch (error) {
        console.error("Failed to delete draft:", error);
      }
    }
  };

  const handleContinueDraft = () => {
    if (!draft) {
      return;
    }

    setActiveDraft(draft);

    setExamSetup({
      questionLimit: draft.draftData.questionLimit,

      examLevel: draft.draftData.examLevel,
    });

    setShowDraftRecoveryModal(false);

    setShowWizardModal(true);
  };

  const handleResumeDraft = () => {
    if (!draft) {
      return;
    }

    setShowDraftRecoveryModal(true);
  };

  const handleStartNewExam = async () => {
    setIsDeletingDraft(true);

    try {
      await deleteDraft();

      await refreshDraft();

      setShowDraftRecoveryModal(false);

      setShowSetupModal(true);

      setActiveDraft(null);

      setWizardInstance((prev) => prev + 1);
    } finally {
      setIsDeletingDraft(false);
    }
  };

  const closeDraftRecovery = () => {
    setShowDraftRecoveryModal(false);
  };

  return {
    draft,
    refreshDraft,
    draftLoading,

    showSetupModal,
    showWizardModal,
    showDraftRecoveryModal,

    examSetup,
    activeDraft,

    handleCreateExam,

    closeSetup,

    startWizard,

    closeWizard,
    cancelWizard,

    handleContinueDraft,
    handleStartNewExam,

    closeDraftRecovery,

    isDeletingDraft,
    wizardInstance,

    handleResumeDraft,
  };
}
