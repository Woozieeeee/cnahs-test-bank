"use client";

export default function DownloadTemplateButton() {
  const handleDownload = () => {
    const csvContent =
      `studentId,firstName,middleName,lastName,suffix,program\n` +
      `22-03123,Juan,Santos,Dela Cruz,,BSN\n` +
      `22-04567,Maria,,Reyes,,BSN`;

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
  border-border
  bg-muted
  px-4
  py-3
  text-left
  text-sm
  font-medium
  text-foreground
  transition
  hover:bg-muted/80
  cursor-pointer
"
    >
      Download CSV Template
    </button>
  );
}
