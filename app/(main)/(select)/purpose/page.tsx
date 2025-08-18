'use client'
import React, { useState } from 'react';
import { Store, Search, MapPin, ArrowRight, CheckCircle, Clock, Shield, Heart } from 'lucide-react';
import Link from 'next/link';

interface UserTypeOption {
  id: 'pharmacy' | 'customer';
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  buttonText: string;
  buttonColor: string;
  link: string;
  bgGradient: string;
}

const UserTypeSelection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'pharmacy' | 'customer' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const userTypes: UserTypeOption[] = [
    {
      id: 'customer',
      title: 'Find Medicines',
      subtitle: 'Customer / Patient',
      link: '/select-location',
      description: 'Search and locate pharmacies, compare services, and access the healthcare products you need.',
      icon: <Search className="w-6 h-6" />,
      features: ['Search medicines', 'Nearby pharmacies', 'Check availability', 'Compare services', 'Get directions'],
      buttonText: 'Start Searching',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      bgGradient: 'from-green-50 via-white to-emerald-50'
    },
    {
      id: 'pharmacy',
      title: 'Manage My Pharmacy',
      subtitle: 'Pharmacy Owner',
      link: '/pharmacy/login',
      description: 'Update inventory, manage your profile, and connect with customers online.',
      icon: <Store className="w-6 h-6" />,
      features: ['Manage profile', 'Update stock', 'Receive orders', 'Track sales', 'Set hours & services'],
      buttonText: 'Set Up Pharmacy',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      bgGradient: 'from-blue-50 via-white to-indigo-50'
    }
  ];

  const handleSelection = (type: 'pharmacy' | 'customer') => {
    setSelectedType(type);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  if (selectedType && isAnimating) {
    const selectedOption = userTypes.find(type => type.id === selectedType)!;
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center mx-auto mb-4 animate-bounce">
            <div className="text-blue-600">{selectedOption.icon}</div>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Perfect Choice!</h2>
          <p className="text-gray-600 text-sm mb-3">Setting up your {selectedType} experience...</p>
          <div className="w-28 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to PharmaCare</h1>
        <p className="text-gray-600 text-sm">Your trusted healthcare companion</p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6">
        {userTypes.map((userType) => (
          <div
            key={userType.id}
            className="group relative cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleSelection(userType.id)}
          >
            <div className={`bg-gradient-to-br ${userType.bgGradient} rounded-2xl p-6 shadow-lg border border-gray-100 backdrop-blur-sm`}>
              {/* Icon */}
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                  {userType.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{userType.title}</h2>
                <p className="text-xs text-gray-500">{userType.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 text-center mb-4 leading-relaxed">{userType.description}</p>

              {/* Features */}
              <div className="space-y-2 mb-5">
                {userType.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Button */}
              <Link href={userType.link}
                className={`block w-full ${userType.buttonColor} text-white py-2.5 rounded-lg text-sm font-medium text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
              >
                {userType.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="text-center text-base font-semibold text-gray-900 mb-8">Why Choose PharmaCare?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <MapPin className="w-5 h-5 text-blue-600" />, title: "Find Nearby", desc: "Locate pharmacies instantly" },
            { icon: <Clock className="w-5 h-5 text-green-600" />, title: "Real-time Updates", desc: "Live stock & hours" },
            { icon: <Shield className="w-5 h-5 text-purple-600" />, title: "Trusted Network", desc: "Verified pharmacies" },
            { icon: <Heart className="w-5 h-5 text-orange-600" />, title: "Healthcare Focus", desc: "Patient-first approach" },
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-xl hover:bg-gray-50 transition">
              <div className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center mx-auto mb-3">
                {f.icon}
              </div>
              <h4 className="text-sm font-medium text-gray-900">{f.title}</h4>
              <p className="text-xs text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
