"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Loader2,
  Lock,
  Pencil,
  UserIcon,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useUpdateCompany,
  useUpdateCompanyLogo,
} from "@/utils/api/company-api";
import { UpdateCompanyDto } from "@/types/company";
import { fetchCompanySuccess } from "@/redux/auth/company-slice";
import { useUpdatePassword, useUpdateUserProfile } from "@/utils/api/user-api";
import { fetchUserSuccess } from "@/redux/auth/user-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AccountSettings = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { updateUserProfile, loading: updateUserLoading } =
    useUpdateUserProfile();
  const [userForm, setUserForm] = useState<any>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });

  const { updateCompany, loading: updateCompanyLoading } = useUpdateCompany();
  const dispatch = useDispatch();
  const [companyForm, setCompanyForm] = useState<UpdateCompanyDto>({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    phoneNumber: "",
    siretNumber: "",
    employeesNumber: 0,
  });
  const { currentCompany } = useSelector((state: RootState) => state.company);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleCompanyChange = (name: string, value: string) => {
    setCompanyForm((companyForm) => ({
      ...companyForm,
      [name]: value,
    }));
  };

  const handleUserChange = (name: string, value: string) => {
    setUserForm((userForm: any) => ({
      ...userForm,
      [name]: value,
    }));
  };

  const handlePasswordChange = (name: string, value: string) => {
    setPasswordForm((passwordForm) => ({
      ...passwordForm,
      [name]: value,
    }));
  };

  const { updatePassword, loading: updatePasswordLoading } =
    useUpdatePassword();
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setCompanyForm({ ...currentCompany });
    setUserForm({
      email: currentUser?.email,
      userName: currentUser?.userName,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
    });
  }, [currentCompany, currentUser]);

  const handleEdit = (section: string) => {
    setEditingSection(section);
    if (section === "company" && currentCompany) {
      setCompanyForm({
        name: currentCompany?.name,
        address: currentCompany?.address,
        postalCode: currentCompany?.postalCode,
        city: currentCompany?.city,
        phoneNumber: currentCompany?.phoneNumber,
        siretNumber: currentCompany?.siretNumber,
        employeesNumber: currentCompany?.employeesNumber,
      });
    }
    if (section === "personal" && currentUser) {
      setUserForm({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        userName: currentUser.userName,
      });
    }
    if (section === "password") {
      setPasswordForm({ oldPassword: "", newPassword: "" });
    }
  };

  const handleCancel = () => setEditingSection(null);

  const handleSave = async () => {
    if (editingSection === "company") {
      try {
        const res = await updateCompany(companyForm);
        dispatch(fetchCompanySuccess({ ...currentCompany, ...res }));
      } catch (err) {
        console.error("Failed to update company", err);
      }
    }
    if (editingSection === "personal") {
      try {
        const updated = await updateUserProfile(userForm);
        dispatch(fetchUserSuccess({ ...currentUser, ...updated }));
      } catch (err) {
        console.error("Failed to update user", err);
      }
    }

    if (editingSection === "password") {
      try {
        await updatePassword(passwordForm);
      } catch (err) {
        console.error("Failed to update user", err);
      }
    }
    setEditingSection(null);
  };

  const { updateLogo } = useUpdateCompanyLogo();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewLogo(objectUrl);
    setUploading(true);

    try {
      const res = await updateLogo(file);
      dispatch(fetchCompanySuccess({ ...currentCompany, ...res }));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  const isLoading =
    updateUserLoading || updateCompanyLoading || updatePasswordLoading;

  return (
    <div className="flex flex-col  bg-gray-50">
      {/* Top Header */}
      <div
        className="bg-gradient-to-r from-teal-700 to-teal-600 w-full py-8 px-4 sm:px-6 lg:px-8 mb-6"
        style={{
          backgroundImage: "url(/src/assets/landingpage_background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white mb-2">
            Paramètres du compte
          </h1>
          <ul className="flex flex-wrap items-center gap-2 text-white text-sm">
            <li className="flex items-center">Espace Client</li>
            <li className="flex items-center before:content-['/'] before:mx-2">
              Paramètres
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header with Logo */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative">
              <div
                className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer group"
                onClick={handleLogoClick}
              >
                <img
                  src={
                    previewLogo ||
                    currentCompany?.logo?.fullUrl ||
                    "/placeholder.svg?height=112&width=112"
                  }
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="text-white h-8 w-8" />
                </div>
              </div>
              {uploading && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-xs text-teal-600 font-medium px-2 py-1 rounded-full shadow flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Uploading...
                </div>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentCompany?.name || "Company Name"}
              </h2>
              <p className="text-gray-500">
                {currentUser?.email || "user@example.com"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {currentCompany?.address}, {currentCompany?.postalCode}{" "}
                {currentCompany?.city}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Personal Info */}
            <EditableCard
              title="Informations Personnelles"
              icon={<UserIcon className="h-5 w-5 text-teal-600" />}
              section="personal"
              isEditing={editingSection === "personal"}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              isLoading={isLoading && editingSection === "personal"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <EditableField
                  label="Prénom"
                  name="firstName"
                  value={userForm?.firstName}
                  isEditing={editingSection === "personal"}
                  onChange={handleUserChange}
                />
                <EditableField
                  label="Nom"
                  name="lastName"
                  value={userForm?.lastName}
                  isEditing={editingSection === "personal"}
                  onChange={handleUserChange}
                />
                <EditableField
                  label="Nom d'utilisateur"
                  name="userName"
                  value={userForm?.userName}
                  isEditing={editingSection === "personal"}
                  onChange={handleUserChange}
                />
                <EditableField
                  label="Email"
                  value={currentUser?.email}
                  isEditing={false}
                />
              </div>
            </EditableCard>

            {/* Company Info */}
            <EditableCard
              title="Informations de l'entreprise"
              icon={
                <svg
                  className="h-5 w-5 text-teal-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 21V5C19 3.9 18.1 3 17 3H7C5.9 3 5 3.9 5 5V21M19 21H5M19 21H21M5 21H3M9 7H15M9 11H15M9 15H13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              section="company"
              isEditing={editingSection === "company"}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              isLoading={isLoading && editingSection === "company"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <EditableField
                  label="Nom"
                  name="name"
                  value={companyForm?.name}
                  isEditing={editingSection === "company"}
                  onChange={handleCompanyChange}
                />
                <EditableField
                  label="Téléphone"
                  name="phoneNumber"
                  value={companyForm?.phoneNumber}
                  isEditing={editingSection === "company"}
                  onChange={handleCompanyChange}
                />
                <EditableField
                  label="Adresse"
                  name="address"
                  value={companyForm?.address}
                  isEditing={editingSection === "company"}
                  onChange={handleCompanyChange}
                  className="md:col-span-2"
                />
                <EditableField
                  label="Code Postal"
                  name="postalCode"
                  value={companyForm?.postalCode}
                  isEditing={editingSection === "company"}
                  onChange={handleCompanyChange}
                />
                <EditableField
                  label="Ville"
                  name="city"
                  value={companyForm?.city}
                  isEditing={editingSection === "company"}
                  onChange={handleCompanyChange}
                />
                <EditableField
                  label="SIRET"
                  name="siretNumber"
                  value={companyForm?.siretNumber}
                  isEditing={editingSection === "company"}
                  onChange={handleCompanyChange}
                />
                <EditableField
                  label="Nombre d'employés"
                  name="employeesNumber"
                  value={companyForm?.employeesNumber}
                  isEditing={editingSection === "company"}
                  onChange={handleCompanyChange}
                />
              </div>
            </EditableCard>

            {/* Password Info */}
            <EditableCard
              title="Sécurité"
              icon={<Lock className="h-5 w-5 text-teal-600" />}
              section="password"
              isEditing={editingSection === "password"}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              isLoading={isLoading && editingSection === "password"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {editingSection === "password" ? (
                  <>
                    <EditableField
                      label="Mot de passe actuel"
                      type="password"
                      name="oldPassword"
                      value={passwordForm.oldPassword}
                      isEditing={true}
                      onChange={handlePasswordChange}
                    />
                    <EditableField
                      label="Nouveau mot de passe"
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      isEditing={true}
                      onChange={handlePasswordChange}
                    />
                  </>
                ) : (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">
                      Vous pouvez modifier votre mot de passe ici. Nous vous
                      recommandons d'utiliser un mot de passe fort et unique.
                    </p>
                  </div>
                )}
              </div>
            </EditableCard>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EditableCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  section: string;
  isEditing: boolean;
  isLoading?: boolean;
  onEdit: (section: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const EditableCard = ({
  title,
  icon,
  children,
  section,
  isEditing,
  isLoading = false,
  onEdit,
  onCancel,
  onSave,
}: EditableCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden transition-all duration-200">
      <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(section)}
            className="text-gray-500 hover:text-teal-600 hover:bg-gray-100"
          >
            <Pencil size={16} className="mr-1" />
            <span className="hidden sm:inline">Modifier</span>
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="text-gray-700"
              disabled={isLoading}
            >
              <X size={16} className="mr-1" />
              <span className="hidden sm:inline">Annuler</span>
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              className="bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={16} className="mr-1 animate-spin" />
              ) : (
                <Check size={16} className="mr-1" />
              )}
              <span className="hidden sm:inline">Enregistrer</span>
            </Button>
          </div>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

interface EditableFieldProps {
  label: string;
  value?: string | number;
  isEditing: boolean;
  name?: string;
  onChange?: (name: string, value: string) => void;
  type?: string;
  className?: string;
}

const EditableField = ({
  label,
  value,
  isEditing,
  name,
  onChange,
  type = "text",
  className,
}: EditableFieldProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      {isEditing ? (
        <Input
          type={type}
          value={value || ""}
          name={name}
          onChange={(e) => onChange && name && onChange(name, e.target.value)}
          className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
        />
      ) : (
        <p className="text-gray-900 py-1.5">{value || "-"}</p>
      )}
    </div>
  );
};

export default AccountSettings;
