import Swal from "sweetalert2";

// =========================
// SUCCESS TOAST
// =========================

export const successToast = (title: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

// =========================
// ERROR TOAST
// =========================

export const errorToast = (title: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title,
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });
};

// =========================
// INFO TOAST
// =========================

export const infoToast = (title: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "info",
    title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

// =========================
// WARNING TOAST
// =========================

export const warningToast = (title: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "warning",
    title,
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
  });
};

// =========================
// CONFIRM DIALOG
// =========================

export const confirmDialog = async ({
  title,
  text,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
}) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });
};
