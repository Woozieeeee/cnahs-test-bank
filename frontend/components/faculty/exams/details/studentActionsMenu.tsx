"use client";

import { memo, useState } from "react";
import {
  Flag,
  Unlock,
  MessageSquare,
  MoreHorizontal,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormTextarea from "@/components/common/forms/formTextarea";

interface StudentActionsMenuProps {
  studentName: string;
  status: "ACTIVE" | "COMPLETED" | "FLAGGED";
  isLoading?: boolean;
  onFlag: (reason?: string) => Promise<void>;
  onUnlock: () => Promise<void>;
  onNotify: (message: string) => Promise<void>;
}

function StudentActionsMenu({
  studentName,
  status,
  isLoading = false,
  onFlag,
  onUnlock,
  onNotify,
}: StudentActionsMenuProps) {
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canFlag = status === "ACTIVE";
  const canUnlock = status === "FLAGGED";
  const canNotify = status !== "COMPLETED";

  if (!canFlag && !canUnlock && !canNotify) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  const handleFlag = async () => {
    setSubmitting(true);
    try {
      await onFlag(flagReason.trim() || undefined);
      setFlagDialogOpen(false);
      setFlagReason("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNotify = async () => {
    setSubmitting(true);
    try {
      await onNotify(notifyMessage);
      setNotifyDialogOpen(false);
      setNotifyMessage("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={isLoading}
            aria-label={`Actions for ${studentName}`}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {canFlag && (
            <DropdownMenuItem onClick={() => setFlagDialogOpen(true)}>
              <Flag className="h-4 w-4" />
              Flag for review
            </DropdownMenuItem>
          )}
          {canUnlock && (
            <DropdownMenuItem onClick={() => void onUnlock()}>
              <Unlock className="h-4 w-4" />
              Unlock student
            </DropdownMenuItem>
          )}
          {canNotify && (
            <>
              {(canFlag || canUnlock) && <DropdownMenuSeparator />}
              <DropdownMenuItem onClick={() => setNotifyDialogOpen(true)}>
                <MessageSquare className="h-4 w-4" />
                Send message
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Flag {studentName}</DialogTitle>
            <DialogDescription>
              This will mark the student as flagged and record a violation. They may be blocked from continuing the exam.
            </DialogDescription>
          </DialogHeader>
          <FormTextarea
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
            placeholder="Reason for flagging (optional)"
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setFlagDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => void handleFlag()} disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Flag Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message {studentName}</DialogTitle>
            <DialogDescription>
              Send an in-app notification to this student during the exam.
            </DialogDescription>
          </DialogHeader>
          <FormTextarea
            value={notifyMessage}
            onChange={(e) => setNotifyMessage(e.target.value)}
            placeholder="Enter your message..."
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotifyDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={() => void handleNotify()} disabled={submitting || !notifyMessage.trim()}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(StudentActionsMenu);
