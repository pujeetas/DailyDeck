import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  // State to track which question is open
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is DailyDeck free to use?",
      answer:
        "Yes, DailyDeck provides all core features (notes, tasks, calendar) for free forever. We plan to introduce a 'Pro' plan later for teams and advanced AI features, but your personal workspace will remain free.",
    },
    {
      question: "Do I need an account?",
      answer:
        "Yes. To ensure your data syncs securely between your laptop and phone, you need an account. We don't sell your data, and we don't spam your email.",
    },
    {
      question: "Where is my data stored?",
      answer:
        "All your data is encrypted at rest and stored in secure cloud servers (AWS). Your information remains private and is accessible only by you via your login credentials.",
    },
    {
      question: "Can I use this on mobile?",
      answer:
        "Absolutely. DailyDeck is fully responsive. You can open it in any mobile browser, or install it as a PWA (Progressive Web App) to use it just like a native app on iOS and Android.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500">
          Everything you need to know about the product and billing.
        </p>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
        {faqs.map((item, index) => (
          <div key={index} className="group">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
            >
              <span
                className={`text-lg font-medium transition-colors duration-300 ${
                  openIndex === index
                    ? "text-blue-600"
                    : "text-slate-900 group-hover:text-blue-600"
                }`}
              >
                {item.question}
              </span>
              <span className="ml-6 shrink-0">
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-blue-600" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                )}
              </span>
            </button>

            {/* Answer (conditionally rendered) */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-48 opacity-100 pb-6"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-slate-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support Link */}
      <div className="mt-12 text-center">
        <p className="text-slate-500">
          Still have questions?{" "}
          <a
            href="mailto:support@dailydeck.com"
            className="text-slate-900 font-semibold underline underline-offset-2 hover:text-blue-600 transition"
          >
            Chat with us
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
