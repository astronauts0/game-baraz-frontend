import React from "react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionTop from "@/components/global/SectionTop";
import { useProfile } from "./useProfile";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSidebar from "./components/ProfileSidebar";
import OverviewTab from "./components/OverviewTab";
import SettingsTab from "./components/SettingsTab";
import SecurityTab from "./components/SecurityTab";
import PasswordModal from "./components/PasswordModal";
import TwoFAModal from "./components/TwoFAModal";
import ToastNotification from "./components/ToastNotification";

const ProfilePage: React.FC = () => {
  const {
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
    handleSaveProfile,
    handleResetForm,
    handleRevokeSession,
    handleRevokeAllSessions,
    handleUpdatePassword,
    handleToggle2FA,
    handleVerify2FA,
    handleOtpChange,
  } = useProfile();

  return (
    <ContainerDiv className="py-10 sm:py-20 relative">

      <SectionTop
        title="Operative Profile"
        description="Manage your identity, credentials, and security settings."
        className="mb-8"
      />

      <ProfileHeader user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProfileSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            user={user}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "overview" && (
            <OverviewTab
              user={user}
              onEditClick={() => setActiveTab("settings")}
            />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              editForm={editForm}
              isLoading={isLoading}
              onFormChange={setEditForm}
              onSave={handleSaveProfile}
              onReset={handleResetForm}
            />
          )}

          {activeTab === "security" && (
            <SecurityTab
              twoFactorEnabled={twoFactorEnabled}
              sessions={sessions}
              onChangePassword={() => setIsPasswordModalOpen(true)}
              onToggle2FA={handleToggle2FA}
              onRevokeSession={handleRevokeSession}
              onRevokeAll={handleRevokeAllSessions}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        isLoading={isLoading}
        form={passwordForm}
        showPassword={showPassword}
        onClose={() => setIsPasswordModalOpen(false)}
        onFormChange={setPasswordForm}
        onToggleShowPassword={() => setShowPassword((p) => !p)}
        onSubmit={handleUpdatePassword}
      />

      <TwoFAModal
        isOpen={is2FAModalOpen}
        isLoading={isLoading}
        qrStep={qrStep}
        otpCode={otpCode}
        onClose={() => setIs2FAModalOpen(false)}
        onOtpChange={handleOtpChange}
        onGoNext={() => setQrStep(false)}
        onGoBack={() => setQrStep(true)}
        onSubmit={handleVerify2FA}
      />

      {/* Toast */}
      <ToastNotification notification={notification} />
    </ContainerDiv>
  );
};

export default ProfilePage;
