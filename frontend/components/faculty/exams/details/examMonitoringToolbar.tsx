"use client";

import { memo, useState } from "react";
import { Megaphone, Square, Zap, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormTextarea from "@/components/common/forms/formTextarea";

interface ExamMonitoringToolbarProps {
  examStatus: string;
  activeStudents: number;
  isEndingExam: boolean;
  isAnnouncing: boolean;
  onEndExam: (force: boolean) => Promise<void>;
  onSendAnnouncement: (message: string) => Promise<void>;
}

function ExamMonitoringToolbar({
  examStatus,
  activeStudents,
  isEndingExam,
  isAnnouncing,
  onEndExam,
  onSendAnnouncement,
}: ExamMonitoringToolbarProps) {
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isOngoing = examStatus === "ONGOING";

  if (!isOngoing) return null;

  const handleAnnouncement = async () => {
    setSubmitting(true);
    try {
      await onSendAnnouncement(announcement);
      setAnnouncementOpen(false);
      setAnnouncement("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAnnouncementOpen(true)}
          disabled={isAnnouncing}
        >
          {isAnnouncing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Megaphone className="h-4 w-4" />
          )}
          Announcement
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => void onEndExam(false)}
          disabled={isEndingExam}
        >
          {isEndingExam ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Square className="h-4 w-4" />
          )}
          End Exam
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => void onEndExam(true)}
          disabled={isEndingExam || activeStudents === 0}
          title={activeStudents === 0 ? "No active students" : "Auto-submit all in-progress students"}
        >
          {isEndingExam ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Zap className="h-4 w-4" />
          )}
          Force End ({activeStudents})
        </Button>
      </div>

      <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Announcement</DialogTitle>
            <DialogDescription>
              Broadcast a message to all students currently in this exam.
            </DialogDescription>
          </DialogHeader>
          <FormTextarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Enter announcement..."
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnnouncementOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={() => void handleAnnouncement()} disabled={submitting || !announcement.trim()}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send to All"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(ExamMonitoringToolbar);
