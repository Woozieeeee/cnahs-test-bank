"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/common/passwordInput";
import { Loader2 } from "lucide-react";
import { createFaculty } from "@/services/admin_service";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AddFacultyModal({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createFaculty({
        name,
        username,
        password,
      });

      onSuccess();

      onOpenChange(false);

      setName("");

      setUsername("");

      setPassword("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Faculty</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Faculty Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Password"
          />

          <Button
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
            "
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {loading ? "Creating..." : "Create Faculty"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
