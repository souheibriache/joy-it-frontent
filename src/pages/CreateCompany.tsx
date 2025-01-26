import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useState, useRef } from "react";
import { useCreateCompany } from "@/utils/api/company-api"; // Adjust the path
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const { mutateAsync: createCompany, isLoading } = useCreateCompany();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    phoneNumber: "",
    siretNumber: "",
    employeesNumber: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Ref for the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleLogoClick = () => {
    // Trigger file input click when the logo preview is clicked
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    if (logo) {
      data.append("logo", logo);
    }

    try {
      await createCompany(data);
      navigate("/"); // Redirect to home after successful creation
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <form
      className="flex flex-col items-center container mx-auto py-20 gap-10"
      onSubmit={handleSubmit}
    >
      <p className="text-4xl text-purple font-bold border-l-4 pl-5 border-l-purple">
        Renseignez quelques informations !
      </p>

      <div className="grid grid-cols-2 gap-x-20 gap-y-10">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="name">
            Nom de l’entreprise <span className="font-bold text-purple">*</span>
          </label>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Joy-it"
              className="border-none outline-none w-full"
              required
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="flex flex-col items-start gap-2">
          <p>
            Logo d'entreprise <span className="font-bold text-purple">*</span>
          </p>
          <div
            className="flex flex-col justify-center items-center h-16 w-16 border border-gray-300 rounded-lg cursor-pointer"
            onClick={handleLogoClick} // Open file explorer when clicked
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <Image className="text-gray-600" size={40} strokeWidth={1} />
            )}
          </div>
          <input
            id="logo"
            type="file"
            name="logo"
            ref={fileInputRef} // Attach the ref
            accept="image/*" // Accept only image files
            onChange={handleFileChange}
            className="hidden" // Hide the file input
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="city">
            Ville <span className="font-bold text-purple">*</span>
          </label>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Paris"
              className="border-none outline-none w-full"
              required
            />
          </div>
        </div>

        {/* Other input fields */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="address">
            Address <span className="font-bold text-purple">*</span>
          </label>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="33 rue du pont neuf..."
              className="border-none outline-none w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="postalCode">
            Code postale <span className="font-bold text-purple">*</span>
          </label>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="75000"
              className="border-none outline-none w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="phoneNumber">
            Numéro de téléphone <span className="font-bold text-purple">*</span>
          </label>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+33 1 23 45 67 89"
              className="border-none outline-none w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="employeesNumber">
            Nombre d'employés <span className="font-bold text-purple">*</span>
          </label>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
            <input
              type="number"
              name="employeesNumber"
              value={formData.employeesNumber}
              onChange={handleChange}
              placeholder="33"
              className="border-none outline-none w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="siretNumber">
            Numéro SIRET<span className="font-bold text-purple">*</span>
          </label>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
            <input
              type="text"
              name="siretNumber"
              value={formData.siretNumber}
              onChange={handleChange}
              placeholder="123 456 789 00012"
              className="border-none outline-none w-full"
              required
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="font-semibold z-50 bg-purple hover:bg-secondarypurple text-lg p-5 px-10"
      >
        {isLoading ? "Chargement..." : "Soumettre"}
      </Button>
    </form>
  );
};

export default CreateCompany;
