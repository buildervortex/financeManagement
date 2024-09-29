import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-white">
      <div className="w-full max-w-lg p-8 text-gray-900 bg-white rounded-lg shadow-lg ">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Contact Us</h2>

        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name <span className="text-orange-400">*</span></label>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First"
                className="w-1/2 p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last"
                className="w-1/2 p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">Email <span className="text-orange-400">*</span></label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium">Leave us a few words <span className="text-orange-400">*</span></label>
            <textarea
              placeholder="Your message"
              className="w-full h-32 p-3 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className=" w-full px-5 py-3 font-semibold text-white rounded-md bg-[#FF8343] hover:bg-[#fd8b53] "
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
 
