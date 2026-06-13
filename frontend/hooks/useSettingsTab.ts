"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useSettingsTab<T extends string>(
  defaultTab: T,
  validTabs: readonly T[]
) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const resolveTab = (param: string | null): T => {
    if (param && validTabs.includes(param as T)) {
      return param as T;
    }

    return defaultTab;
  };

  const [activeTab, setActiveTab] = useState<T>(() =>
    resolveTab(tabParam)
  );

  useEffect(() => {
    setActiveTab(resolveTab(tabParam));
  }, [tabParam]);

  return [activeTab, setActiveTab] as const;
}
