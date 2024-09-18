import React from "react";
import { useState } from 'react';


interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is the best accounting method for my business?',
    answer: 'It depends on your business size, complexity, and legal requirements. Small businesses often start with cash basis, while larger businesses or those with inventory may need to use accrual basis.',
  },
  {
    question: 'How do I read an income statement?',
    answer: 'Focus on the main components: revenue, expenses, and net income. Analyze trends over time and compare to budgeted figures to assess profitability.',
  },
  {
    question: 'How do I create a business budget?',
    answer: ' Start by estimating revenue, then plan for fixed and variable expenses. Regularly compare your budget to actual performance and adjust as needed.',
  },
];

const Contact: React.FC = () => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <div className="max-w-5xl mx-auto p-8 my-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">FAQs</h1>
      </header>
        <p className="mt-4 text-gray-600 mb-8">
          Have questions? Here you'll find the answers most valued by our partners, along with access to step-by-step instructions and support.
        </p>
      <div className="max-w-2xl mx-auto p-8 mb-10">
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="w-full text-left flex justify-between items-center py-2 text-lg font-medium text-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
      
    </div>
    </>
  );
};

export default Contact;
