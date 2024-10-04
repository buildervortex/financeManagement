import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = "Query for our Financial Tracking System";
    const body = `Full Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:kulasoooriyaa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="flex flex-col justify-center min-h-screen -mb-6 p-6">
      <div className="flex flex-col w-full max-w-6xl mx-auto space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-6">
        
        {/* Image Section */}
        <div className="flex-1 mx-16">
          <img
            src="/customer_service.png" 
            alt="Contact us illustration"
            className="object-cover w-full h-auto rounded-lg" // Keep the image responsive
          />
        </div>

        {/* Contact Form Section */}
        <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-center text-gray-900">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name <span className="text-orange-400">*</span>
              </label>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  placeholder="First"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded-md sm:w-1/2 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded-md sm:w-1/2 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Email <span className="text-orange-400">*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Leave us a few words <span className="text-orange-400">*</span>
              </label>
              <textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-24 p-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white rounded-md bg-[#FF8343] hover:bg-[#fd8b53]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
