"use client";

import { memo, useCallback } from "react";

const CSV_TEMPLATE = `studentId,firstName,middleName,lastName,suffix,program
22-03123,Juan,Santos,Dela Cruz,,BSN
22-04567,Maria,,Reyes,,BSN`;

function DownloadTemplateButton() {
  const handleDownload = useCallback(() => {
    const blob = new Blob([CSV_TEMPLATE], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "student-records-template.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }, []);

  return (
    <button
      onClick={handleDownload}
      className="border-border bg-muted text-foreground hover:bg-muted/80 w-full cursor-pointer rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all duration-200"
    >
      Download CSV Template
    </button>
  );
}

export default memo(DownloadTemplateButton);
