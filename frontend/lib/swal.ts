import Swal from "sweetalert2";

// =========================
// BASE TOAST
// =========================

const Toast = Swal.mixin({
  toast: true,

  position: "top-end",

  showConfirmButton: false,

  timerProgressBar: true,

  customClass: {
    popup: "rounded-xl",
  },
});

// =========================
// SUCCESS TOAST
// =========================

export const successToast = (title: string) => {
  Toast.fire({
    icon: "success",

    title,

    timer: 3000,
  });
};

// =========================
// ERROR TOAST
// =========================

export const errorToast = (title: string) => {
  Toast.fire({
    icon: "error",

    title,

    timer: 4000,
  });
};

// =========================
// INFO TOAST
// =========================

export const infoToast = (title: string) => {
  Toast.fire({
    icon: "info",

    title,

    timer: 3000,
  });
};

// =========================
// WARNING TOAST
// =========================

export const warningToast = (title: string) => {
  Toast.fire({
    icon: "warning",

    title,

    timer: 3500,
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

  destructive = true,
}: {
  title: string;

  text: string;

  confirmText?: string;

  cancelText?: string;

  destructive?: boolean;
}) => {
  return Swal.fire({
    title,

    text,

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: confirmText,

    cancelButtonText: cancelText,

    reverseButtons: true,

    focusCancel: true,

    confirmButtonColor: destructive ? "#dc2626" : "#2563eb",
  });
};
