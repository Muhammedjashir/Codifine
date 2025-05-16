import React, { useState } from "react";
import axios from "axios";

export default function SignUpSimple() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await axios.post("http://localhost:3001/users", formData);
        console.log(formData);
        
        setSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          phone: "",
        });
        setErrors({});
        setTimeout(() => setSubmitted(false), 3000);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-300 p-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-600 to-blue-400 p-8 sm:p-10 text-white flex flex-col justify-center relative">
          <div className="absolute w-40 h-40 bg-blue-500 rounded-full -left-10 -top-10 opacity-40 blur-3xl"></div>
          <div className="absolute w-28 h-28 bg-blue-800 rounded-full -bottom-10 -right-10 opacity-50 blur-2xl"></div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center md:text-left">WELCOME</h2>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center md:text-left">CodiFine</h3>
          <p className="text-sm text-center md:text-left">
            Join us to unlock the best experiences and exclusive features.
          </p>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitted && (
              <div className="text-green-600 text-sm mb-2">Form submitted successfully!</div>
            )}
            {["firstName", "lastName", "email", "dob", "phone"].map((field) => (
              <div key={field}>
                <input
                  type={field === "email" ? "email" : field === "dob" ? "date" : "text"}
                  name={field}
                  placeholder={
                    field === "firstName"
                      ? "First name"
                      :  field === "dob"
                      ? "Date of Birth"
                      : field === "lastName"
                      ? "Last name"
                      : field === "phone"
                      ? "Phone number"
                      : field === "email"
                      ? "Email"
                      : ""
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${
                    errors[field] ? "border-red-500" : "focus:ring-blue-400"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
              
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
