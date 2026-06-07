interface Props {
  currentStep: number;

  setCurrentStep: (step: number) => void;

  canProceedToStep2: boolean;

  canProceedToStep3: boolean;

  canProceedToStep4: boolean;
}

export default function useExamWizardNavigation({
  currentStep,
  setCurrentStep,
  canProceedToStep2,
  canProceedToStep3,
  canProceedToStep4,
}: Props) {
  const submitDisabled =
    (currentStep === 1 && !canProceedToStep2) ||
    (currentStep === 2 && !canProceedToStep3) ||
    (currentStep === 3 && !canProceedToStep4);

  const handleNext = () => {
    if (currentStep === 1 && !canProceedToStep2) {
      return;
    }

    if (currentStep === 2 && !canProceedToStep3) {
      return;
    }

    if (currentStep === 3 && !canProceedToStep4) {
      return;
    }

    setCurrentStep(Math.min(currentStep + 1, 4));
  };

  const handlePrevious = (onClose: () => void) => {
    if (currentStep === 1) {
      onClose();

      return;
    }

    setCurrentStep(currentStep - 1);
  };

  return {
    submitDisabled,
    handleNext,
    handlePrevious,
  };
}
