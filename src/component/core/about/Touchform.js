import { useState } from "react";
import countryCodes from "../../../data/countrycode.json"; // Assuming country codes are stored in a data file
import { apiConnector } from "../../../services/apiconnector";
import { endPoints } from "../../../services/Apis";
import toast from "react-hot-toast";

export const TouchForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: countryCodes[0]?.code || "+1", // Default country code
    message: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const { firstName, lastName, email, phone, countryCode, message } = formData;

        // Await API response to ensure request completes before moving forward
        const response = await apiConnector("POST", endPoints.CONTACT_API, { 
            firstName, lastName, email, phone, countryCode, message 
        });

        console.log("Response for form submission:", response);

        // Show success toast only if API request is successful
        toast.success("Message sent successfully");
        console.log("Response shown after toast:");
        
    } catch (err) {
        console.error("Error occurred in frontend:", err);
        toast.error("Could not send the message. Please try again.");
    }
};


  return (
    <div className="bg-gray-800 p-8 mt-28 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-4xl text-white font-bold text-center mb-6">Get in Touch</h2>
        <p className="text-pure-greys-200 text-center mb-12">We’d love to here for you, Please fill out this form.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
        {/* First Name & Last Name */}
            <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                <label className="text-white text-sm mb-1">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Enter first name"
                    onChange={handleChange}
                    className="p-2 rounded bg-[#161D29] text-white border-b border-gray-600"
                    required
                />
                </div>
                <div className="flex flex-col w-1/2">
                <label className="text-white text-sm mb-1">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Enter first name"
                    onChange={handleChange}
                    className="p-2 rounded bg-[#161D29] text-white border-b border-gray-600"
                    required
                />
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
                <label className="text-white text-sm mb-1">Email Address</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email address"
                onChange={handleChange}
                className="p-2 rounded bg-[#161D29] text-white border-b border-gray-600"
                required
                />
            </div>

            {/* Phone Number with Country Code */}
            <div className="flex gap-4">
                <div className="flex flex-col w-1/4">
                <label className="text-white text-sm mb-1">Country Code</label>
                <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="p-2 rounded bg-[#161D29] text-white border-b border-gray-600"
                >
                    {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.code} ({country.country})
                    </option>
                    ))}
                </select>
                </div>
                <div className="flex flex-col w-3/4">
                <label className="text-white text-sm mb-1">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="12345 67890"
                    onChange={handleChange}
                    className="p-2 rounded bg-[#161D29] text-white border-b border-gray-600"
                    required
                />
                </div>
            </div>

            {/* Message Section */}
            <div className="flex flex-col">
                <label className="text-white text-sm mb-1">Your Message</label>
                <textarea
                name="message"
                value={formData.message}
                placeholder="Enter your concerns in detail"
                onChange={handleChange}
                rows="4"
                className="p-2 rounded bg-[#161D29] text-white border-b border-gray-600"
                required
                ></textarea>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-yellow-100 hover:bg-yellow-200 text-black font-bold py-2 rounded transition"
            >
                Send Message
            </button>
            </form>

    </div>
  );
};
