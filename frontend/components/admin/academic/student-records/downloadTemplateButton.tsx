"use client";

export default function DownloadTemplateButton() {
  const handleDownload = () => {
    const csvContent =
      `studentId,fullName,program\n` +
      `22-03123,Juan Dela Cruz,BSN`;

    const blob = new Blob(
      [csvContent],

      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",

      "student-records-template.csv"
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="
        w-full
        rounded-lg
        border
        border-slate-200
        bg-white
        px-4
        py-3
        text-left
        text-sm
        font-medium
        text-slate-700
        transition
        hover:bg-slate-50
      "
    >
      Download Template
    </button>
  );
}
