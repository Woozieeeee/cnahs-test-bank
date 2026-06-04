"use client";

import { memo } from "react";

import Link from "next/link";

import MotionModal from "@/components/motion/motionModal";

import ModalHeader from "@/components/common/modal/modalHeader";

import ModalSectionTitle from "@/components/common/modal/modalSectionTitle";

import InfoCard from "@/components/common/cards/infoCard";

import InfoCardHeader from "@/components/common/cards/infoCardHeader";

import InfoCardValue from "@/components/common/cards/infoCardValue";

import ActionButton from "@/components/common/buttons/actionButton";

import type { ExamViolation } from "@/types/examViolation";

interface Props {
  sectionId: number;

  examId: number;

  violation: ExamViolation | null;

  onClose: () => void;
}

function ExamViolationDetailsModal({
  sectionId,
  examId,
  violation,
  onClose,
}: Props) {
  if (!violation) return null;

  return (
    <MotionModal open={!!violation}>
      <div className="p-6">
        <ModalHeader
          title={violation.type}
          description={`Detected ${violation.timeAgo}`}
          onClose={onClose}
        />

        {/* SUMMARY */}

        <InfoCard className="mt-6">
          <ModalSectionTitle>
            Incident Summary
          </ModalSectionTitle>

          <p className="text-muted-foreground mt-3 text-sm leading-7">
            {violation.description}
          </p>
        </InfoCard>

        {/* DETAILS */}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InfoCard>
            <InfoCardHeader label="Student" />

            <InfoCardValue>
              {violation.student}
            </InfoCardValue>
          </InfoCard>

          <InfoCard>
            <InfoCardHeader label="Student ID" />

            <InfoCardValue>
              {violation.studentId}
            </InfoCardValue>
          </InfoCard>

          <InfoCard>
            <InfoCardHeader label="Severity" />

            <InfoCardValue
              className={
                violation.severity === "HIGH"
                  ? "text-red-600"
                  : violation.severity === "MEDIUM"
                    ? "text-amber-600"
                    : "text-sky-600"
              }
            >
              {violation.severity}
            </InfoCardValue>
          </InfoCard>

          <InfoCard>
            <InfoCardHeader label="Detected At" />

            <InfoCardValue>
              {new Date(
                violation.createdAt
              ).toLocaleString()}
            </InfoCardValue>
          </InfoCard>
        </div>

        {/* ACTIONS */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/admin/academic/sections/${sectionId}/exams/${examId}/students/${violation.studentId}`}
          >
            <ActionButton variant="default">
              View Student Session
            </ActionButton>
          </Link>

          <ActionButton variant="default" onClick={onClose}>
            Close
          </ActionButton>
        </div>
      </div>
    </MotionModal>
  );
}

export default memo(ExamViolationDetailsModal);
