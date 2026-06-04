"use client";

import { memo } from "react";

import MotionModal from "@/components/motion/motionModal";

import ModalHeader from "@/components/common/modal/modalHeader";

import InfoCard from "@/components/common/cards/infoCard";

import InfoCardHeader from "@/components/common/cards/infoCardHeader";

import InfoCardValue from "@/components/common/cards/infoCardValue";

import ActionButton from "@/components/common/buttons/actionButton";

import ModalSectionTitle from "@/components/common/modal/modalSectionTitle";

import type { Violation } from "@/types/violation";

interface Props {
  violation: Violation | null;

  onClose: () => void;
}

function ViolationDetailsModal({
  violation,
  onClose,
}: Props) {
  if (!violation) return null;

  return (
    <MotionModal open={!!violation} maxWidth="max-w-4xl" contentClassName="max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <ModalHeader
          title={violation.type}
          description={`Detected at ${violation.timeAgo}`}
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
            <InfoCardHeader label="Detection Time" />

            <InfoCardValue>
              {violation.timeAgo}
            </InfoCardValue>
          </InfoCard>
        </div>

        {/* ACTIONS */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ActionButton variant="warning">
            Flag Session
          </ActionButton>

          <ActionButton variant="danger">
            Terminate Exam
          </ActionButton>
        </div>
      </div>
    </MotionModal>
  );
}

export default memo(ViolationDetailsModal);
