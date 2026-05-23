import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,

  position: "top-end",

  showConfirmButton: false,

  timer: 3000,

  timerProgressBar: true,

  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;

    toast.onmouseleave = Swal.resumeTimer;
  },
});

// =========================
// SUCCESS TOAST
// =========================

export const successToast = (title: string) => {
  return Toast.fire({
    icon: "success",
    title,
  });
};

// =========================
// ERROR TOAST
// =========================

export const errorToast = (title: string) => {
  return Toast.fire({
    icon: "error",
    title,
  });
};

// =========================
// INFO TOAST
// =========================

export const infoToast = (title: string) => {
  return Toast.fire({
    icon: "info",
    title,
  });
};
