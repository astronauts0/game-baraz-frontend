import { useState, useCallback } from "react";
import type {
  UserProfile,
  Session,
  PasswordForm,
  ProfileTab,
  NotificationState,
} from "./types";
import { MOCK_USER, MOCK_SESSIONS } from "./data";

export function useProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationState>(null);

  // User & edit form state
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [editForm, setEditForm] = useState<UserProfile>(MOCK_USER);

  // Security state
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  // Password form
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // 2FA setup
  const [otpCode, setOtpCode] = useState("");
  const [qrStep, setQrStep] = useState(true);

  // --- Helpers ---
  const showNotification = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
    },
    [],
  );

  // --- Handlers ---
  const handleSaveProfile = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
        setUser(editForm);
        setIsLoading(false);
        setActiveTab("overview");
        showNotification("Profile updated successfully");
      }, 800);
    },
    [editForm, showNotification],
  );

  const handleResetForm = useCallback(() => {
    setEditForm(user);
  }, [user]);

  const handleRevokeSession = useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      showNotification("Session revoked successfully");
    },
    [showNotification],
  );

  const handleRevokeAllSessions = useCallback(() => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    showNotification("All other sessions revoked");
  }, [showNotification]);

  const handleUpdatePassword = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordForm.new !== passwordForm.confirm) {
        showNotification("New passwords do not match", "error");
        return;
      }
      if (passwordForm.new.length < 8) {
        showNotification("Password must be at least 8 characters", "error");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsPasswordModalOpen(false);
        setPasswordForm({ current: "", new: "", confirm: "" });
        showNotification("Security credentials updated");
      }, 1000);
    },
    [passwordForm, showNotification],
  );

  const handleToggle2FA = useCallback(() => {
    if (twoFactorEnabled) {
      if (
        confirm(
          "Are you sure you want to disable 2FA? This will lower your account security.",
        )
      ) {
        setTwoFactorEnabled(false);
        showNotification("Two-Factor Authentication disabled", "error");
      }
    } else {
      setQrStep(true);
      setOtpCode("");
      setIs2FAModalOpen(true);
    }
  }, [twoFactorEnabled, showNotification]);

  const handleVerify2FA = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (otpCode.length !== 6) {
        showNotification("Invalid code. Please enter 6 digits.", "error");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTwoFactorEnabled(true);
        setIs2FAModalOpen(false);
        showNotification("Two-Factor Authentication enabled");
      }, 1000);
    },
    [otpCode, showNotification],
  );

  const handleOtpChange = useCallback((val: string) => {
    setOtpCode(val.replace(/[^0-9]/g, "").slice(0, 6));
  }, []);

  return {
    // State
    activeTab,
    setActiveTab,
    isLoading,
    notification,
    user,
    editForm,
    setEditForm,
    sessions,
    twoFactorEnabled,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    is2FAModalOpen,
    setIs2FAModalOpen,
    passwordForm,
    setPasswordForm,
    showPassword,
    setShowPassword,
    otpCode,
    qrStep,
    setQrStep,
    // Handlers
    handleSaveProfile,
    handleResetForm,
    handleRevokeSession,
    handleRevokeAllSessions,
    handleUpdatePassword,
    handleToggle2FA,
    handleVerify2FA,
    handleOtpChange,
  };
}
