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
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-white">
      <div className="w-full max-w-lg p-8 text-gray-900 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Full Name <span className="text-orange-400">*</span>
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
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
              className="w-full p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
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
              className="w-full h-32 p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-5 py-3 font-semibold text-white rounded-md bg-[#FF8343] hover:bg-[#fd8b53]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
