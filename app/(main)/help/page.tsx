'use client'
import { useState } from "react";
import { 
  Search, ChevronDown, ChevronUp, Phone, Mail, MapPin, 
  Pill, CreditCard, Truck, User, Shield, FileText, MessageCircle,
   AlertCircle, Info, HelpCircle, ExternalLink
} from "lucide-react";

export default function PharmacyHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const helpCategories = [
    { id: 'All', name: 'All Topics', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'prescriptions', name: 'Prescriptions', icon: <Pill className="w-5 h-5" /> },
    { id: 'orders', name: 'Orders & Delivery', icon: <Truck className="w-5 h-5" /> },
    { id: 'payments', name: 'Payments & Insurance', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'account', name: 'Account & Profile', icon: <User className="w-5 h-5" /> },
    { id: 'privacy', name: 'Privacy & Security', icon: <Shield className="w-5 h-5" /> }
  ];

  const faqs = [
    {
      id: 1,
      category: 'prescriptions',
      question: "How do I transfer my prescription to your pharmacy?",
      answer: "You can transfer your prescription by calling us at (555) 123-4567, visiting our store, or using our online transfer form. We'll need your current pharmacy's information, your prescription details, and your insurance information. The transfer process typically takes 30 minutes to 2 hours."
    },
    {
      id: 2,
      category: 'prescriptions',
      question: "Can I get a 90-day supply of my medication?",
      answer: "Yes, we offer 90-day supplies for most maintenance medications. This option may save you money and reduce trips to the pharmacy. Check with your insurance plan as some may require prior authorization for extended supplies."
    },
    {
      id: 3,
      category: 'prescriptions',
      question: "What should I do if my medication looks different?",
      answer: "Don't worry - medications can look different due to different manufacturers or generic versions. However, always verify with our pharmacists if you have concerns. Never take medication you're unsure about. We're here to help confirm your medication is correct."
    },
    {
      id: 4,
      category: 'orders',
      question: "How does prescription delivery work?",
      answer: "We offer free local delivery within 10 miles for orders over $25. Delivery typically takes 2-4 hours during business hours. You can track your delivery through our app or website. For urgent medications, we also offer same-day delivery for an additional fee."
    },
    {
      id: 5,
      category: 'orders',
      question: "Can I set up automatic refills?",
      answer: "Absolutely! Our auto-refill program ensures you never run out of your maintenance medications. We'll automatically refill your prescriptions and notify you when they're ready for pickup or delivery. You can enroll online, through our app, or by speaking with our pharmacists."
    },
    {
      id: 6,
      category: 'payments',
      question: "What insurance plans do you accept?",
      answer: "We accept most major insurance plans including Medicare, Medicaid, and most private insurance. If you're unsure about your coverage, bring your insurance card and we'll verify your benefits. We also offer competitive cash prices for uninsured customers."
    },
    {
      id: 7,
      category: 'payments',
      question: "How can I save money on my prescriptions?",
      answer: "We offer several ways to save: generic substitutions when available, our prescription savings program, manufacturer coupons, and patient assistance programs. Our pharmacists can help you find the most cost-effective options for your medications."
    },
    {
      id: 8,
      category: 'account',
      question: "How do I create an online account?",
      answer: "Visit our website and click 'Create Account'. You'll need your email address, phone number, and date of birth. Once registered, you can manage prescriptions, view order history, and update your information online."
    },
    {
      id: 9,
      category: 'account',
      question: "How do I update my contact information?",
      answer: "You can update your information online through your account dashboard, call us, or visit the pharmacy. It's important to keep your contact information current so we can reach you about your prescriptions and health information."
    },
    {
      id: 10,
      category: 'privacy',
      question: "How is my health information protected?",
      answer: "We follow strict HIPAA guidelines to protect your health information. Your data is encrypted, stored securely, and only accessible to authorized personnel involved in your care. We never share your information without your consent except as required by law."
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Phone Support",
      description: "Speak with our pharmacy team",
      contact: "(+237) 672 64 09 14",
      availability: "Mon-Sat: 8AM-10PM, Sun: 9AM-6PM"
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Support",
      description: "Get help via email",
      contact: "banginic.007@egmail.com",
      availability: "Response within 24 hours"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      availability: "Mon-Fri: 8AM-8PM"
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Visit Our Store",
      description: "Get in-person assistance",
      contact: "123 Health Street, City, State 12345",
      availability: "Mon-Sat: 8AM-10PM, Sun: 9AM-6PM"
    }
  ];

  const quickLinks = [
    { title: "Prescription Transfer Form", icon: <FileText className="w-5 h-5" />, url: "#" },
    { title: "Insurance Verification", icon: <Shield className="w-5 h-5" />, url: "#" },
    { title: "Medication Guide", icon: <Pill className="w-5 h-5" />, url: "#" },
    { title: "Store Locations", icon: <MapPin className="w-5 h-5" />, url: "#" },
    { title: "Pharmacy App Download", icon: <ExternalLink className="w-5 h-5" />, url: "#" }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  interface HelpCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
  }

  interface Faq {
    id: number;
    category: string;
    question: string;
    answer: string;
  }

  interface ContactMethod {
    icon: React.ReactNode;
    title: string;
    description: string;
    contact: string;
    availability: string;
  }

  interface QuickLink {
    title: string;
    icon: React.ReactNode;
    url: string;
  }

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to your questions about prescriptions, orders, and pharmacy services
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Topics</h3>
                <div className="space-y-2">
                  {helpCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeCategory === category.id
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {category.icon}
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors"
                    >
                      {link.icon}
                      <span className="text-sm font-medium">{link.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Emergency Alert */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Medical Emergency</h3>
                  <p className="text-red-700 text-sm">
                    If you're experiencing a medical emergency, call 911 immediately. 
                    For poison emergencies, call Poison Control at 1-800-222-1222.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                  <span className="text-lg font-normal text-gray-500 ml-2">({filteredFaqs.length})</span>
                </h2>
              </div>

              <div className="p-6">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map(faq => (
                      <div
                        key={faq.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="p-4 pt-0 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
                <p className="text-gray-600">
                  Our pharmacy team is here to assist you with any questions or concerns
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                        <p className="font-medium text-green-600 mb-1">{method.contact}</p>
                        <p className="text-xs text-gray-500">{method.availability}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-12 bg-gradient-to-r from-green-950/60 to-green-900/80 rounded-xl p-8 text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
                <p className="text-green-100 mb-6">
                  Access helpful tools and information to manage your health and medications
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    Download Our App
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
                    Medication Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}