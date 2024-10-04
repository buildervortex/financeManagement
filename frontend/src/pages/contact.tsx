import React, { useState } from "react";
import ContactForm from "../components/ContactForm";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the best accounting method for my business?",
    answer: "It depends on your business size, complexity, and legal requirements. Small businesses often start with cash basis, while larger businesses or those with inventory may need to use accrual basis.",
  },
  {
    question: "How do I read an income statement?",
    answer: "Focus on the main components: revenue, expenses, and net income. Analyze trends over time and compare to budgeted figures to assess profitability.",
  },
  {
    question: "How do I create a business budget?",
    answer: "Start by estimating revenue, then plan for fixed and variable expenses. Regularly compare your budget to actual performance and adjust as needed.",
  },
];

const Contact: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl p-8 mx-auto my-16">
      {/* FAQ Section */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center sm:text-left">FAQs</h1>
      </header>
      <p className="mt-4 mb-8 text-center text-gray-600 sm:text-left">
        Have questions? Here you'll find the answers most valued by our partners, along with access to step-by-step instructions and support.
      </p>
      <div className="max-w-2xl mx-auto mb-10 space-y-4 sm:space-y-6">
        {faqData.map((faq, index) => (
          <div key={index} className="pb-4 border-b border-gray-200">
            <button
              className="flex items-center justify-between w-full py-2 text-lg font-medium text-left text-gray-800 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="px-4">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
