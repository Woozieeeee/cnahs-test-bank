"use client";

import { memo, useEffect, useRef, useState } from "react";

import { AlertCircle, Camera, CheckCircle, Loader2, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/settings/userAvatar";
import {
  deleteAvatar,
  updateProfile,
  uploadAvatar,
} from "@/services/profile_service";
import type { AuthUser } from "@/types/auth/auth";
import { formatRoleLabel } from "@/lib/userSettings";

interface Props {
  user: AuthUser;
  onUserUpdated: (user: AuthUser) => void;
}

function ProfileSettings({ user, onUserUpdated }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username ?? "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setName(user.name);
    setUsername(user.username ?? "");
  }, [user.name, user.username]);

  const canEditUsername = user.role !== "STUDENT";
  const profileChanged =
    name.trim() !== user.name ||
    (canEditUsername && username.trim() !== (user.username ?? ""));

  const handleAvatarSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setUploadingAvatar(true);
    setMessage(null);

    try {
      const result = await uploadAvatar(file);
      onUserUpdated(result.user);
      setMessage({ type: "success", text: "Profile picture updated" });
    } catch (error: any) {
      setAvatarPreview(null);
      setMessage({
        type: "error",
        text: error?.response?.data?.message ?? "Failed to upload avatar",
      });
    } finally {
      setUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    setRemovingAvatar(true);
    setMessage(null);

    try {
      const result = await deleteAvatar();
      setAvatarPreview(null);
      onUserUpdated(result.user);
      setMessage({ type: "success", text: "Profile picture removed" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message ?? "Failed to remove avatar",
      });
    } finally {
      setRemovingAvatar(false);
    }
  };

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingProfile(true);
    setMessage(null);

    try {
      const payload: { name?: string; username?: string } = {
        name: name.trim(),
      };

      if (canEditUsername) {
        payload.username = username.trim();
      }

      const result = await updateProfile(payload);
      onUserUpdated(result.user);
      setName(result.user.name);
      setUsername(result.user.username ?? "");
      setMessage({ type: "success", text: "Profile details updated" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message ?? "Failed to update profile",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 rounded-lg border p-6">
        <h3 className="text-foreground mb-4 text-lg font-semibold">
          Profile Picture
        </h3>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {avatarPreview ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <UserAvatar
              name={user.name}
              hasAvatar={user.hasAvatar}
              avatarVersion={user.updatedAt}
              size="lg"
            />
          )}

          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleAvatarSelect}
            />

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={uploadingAvatar || removingAvatar}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadingAvatar ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="mr-2 h-4 w-4" />
                )}
                {uploadingAvatar ? "Uploading..." : "Upload Photo"}
              </Button>

              {user.hasAvatar && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingAvatar || removingAvatar}
                  onClick={handleRemoveAvatar}
                >
                  {removingAvatar ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Remove
                </Button>
              )}
            </div>

            <p className="text-muted-foreground text-xs">
              JPEG, PNG, WebP, or GIF. Max 2MB. Stored securely as a blob.
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-border/50 rounded-lg border p-6">
        <h3 className="text-foreground mb-4 text-lg font-semibold">
          Personal Details
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="profile-name"
                className="text-muted-foreground mb-1 block text-sm font-medium"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border-border bg-background focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            {canEditUsername ? (
              <div>
                <label
                  htmlFor="profile-username"
                  className="text-muted-foreground mb-1 block text-sm font-medium"
                >
                  Username
                </label>
                <input
                  id="profile-username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="border-border bg-background focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                  required
                  minLength={3}
                  maxLength={50}
                />
              </div>
            ) : (
              <div>
                <label className="text-muted-foreground mb-1 block text-sm font-medium">
                  Student ID
                </label>
                <input
                  type="text"
                  value={user.studentId ?? "N/A"}
                  disabled
                  className="border-border bg-muted text-muted-foreground w-full cursor-not-allowed rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            )}

            <div>
              <label className="text-muted-foreground mb-1 block text-sm font-medium">
                Role
              </label>
              <input
                type="text"
                value={formatRoleLabel(user.role)}
                disabled
                className="border-border bg-muted text-muted-foreground w-full cursor-not-allowed rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block text-sm font-medium">
                Account Status
              </label>
              <input
                type="text"
                value={user.status}
                disabled
                className="border-border bg-muted text-muted-foreground w-full cursor-not-allowed rounded-lg border px-3 py-2 text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!profileChanged || savingProfile}
          >
            {savingProfile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Card>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {message.text}
        </div>
      )}
    </div>
  );
}

export default memo(ProfileSettings);
