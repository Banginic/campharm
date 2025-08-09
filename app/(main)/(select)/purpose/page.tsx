'use client'
import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Users, 
  MapPin, 
  ShoppingBag, 
  Building2,
  ArrowRight,
  CheckCircle,
  Pill,
  Heart,
  Clock,
  Shield
} from 'lucide-react';
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
      title: 'I Need to Find Medicines',
      subtitle: 'Customer / Patient',
      link: '/select-location',
      description: 'Search for medicines, find nearby pharmacies, and get the healthcare products you need.',
      icon: <Search className="w-8 h-8" />,
      features: [
        'Search for specific medicines',
        'Find nearby pharmacies',
        'Check medicine availability',
        'Compare prices & services',
        'Get directions & contact info'
      ],
      buttonText: 'Start Searching',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      bgGradient: 'from-green-50 to-emerald-100'
    },
    {
      id: 'pharmacy',
      title: 'I Own a Pharmacy',
       link: '/pharmacy/login',
      subtitle: 'Pharmacy Owner / Manager',
      description: 'Manage your pharmacy inventory, connect with customers, and grow your business online.',
      icon: <Store className="w-8 h-8" />,
      features: [
        'Manage your pharmacy profile',
        'Update inventory & stock levels',
        'Receive customer orders',
        'Track sales & analytics',
        'Manage opening hours & services'
      ],
      buttonText: 'Set Up My Pharmacy',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      bgGradient: 'from-blue-50 to-indigo-100'
    }
   
  ];

  const handleSelection = (type: 'pharmacy' | 'customer') => {
    setSelectedType(type);
    setIsAnimating(true);
    
    // Simulate navigation after animation
    setTimeout(() => {
      console.log(`Navigating to ${type} flow...`);
      // Here you would typically navigate to the next page
      // e.g., router.push(`/${type}/setup`) or similar
    }, 800);
  };

  const resetSelection = () => {
    setSelectedType(null);
    setIsAnimating(false);
  };

  if (selectedType && isAnimating) {
    const selectedOption = userTypes.find(type => type.id === selectedType)!;
    
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 animate-bounce">
            <div className="text-blue-600">
              {selectedOption.icon}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Perfect Choice!</h2>
          <p className="text-gray-600 mb-4">Setting up your {selectedType} experience...</p>
          <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
          </div>
          <button
            onClick={resetSelection}
            className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className=" pb-6 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            
          </div>
          <p className="text-xl text-green-950 mb-2">Welcome to your healthcare companion</p>
          <p className="text-green-950/60">Choose how you'd like to get started</p>
        </div>
      </div>

      {/* Main Selection Cards */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {userTypes.map((userType) => (
            <div
              key={userType.id}
              className={`relative group cursor-pointer transition-all duration-300 transform lg:hover:scale-105 ${
                selectedType === userType.id ? 'scale-105' : ''
              }`}
              onClick={() => handleSelection(userType.id)}
            >
              <div className={`bg-gradient-to-br ${userType.bgGradient} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-gray-700">
                      {userType.icon}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {userType.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-600 bg-white/50 rounded-full px-4 py-1 inline-block">
                    {userType.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-center mb-6 leading-relaxed">
                  {userType.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {userType.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Link href={userType.link}
                  className={`w-full ${userType.buttonColor} text-white py-2.5 rounded-xl font-semibold text-lg transition-all duration-300 transform lg:group-hover:translate-y-1 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl`}
                >
                  <span>{userType.buttonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Choose PharmaCare?</h3>
          <p className="text-gray-600">Connecting healthcare providers and patients seamlessly</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Find Nearby</h4>
            <p className="text-sm text-gray-600">Locate pharmacies in your area quickly</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Real-time Updates</h4>
            <p className="text-sm text-gray-600">Live inventory and opening hours</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Trusted Network</h4>
            <p className="text-sm text-gray-600">Verified pharmacies and medicines</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Healthcare Focus</h4>
            <p className="text-sm text-gray-600">Dedicated to your health needs</p>
          </div>
        </div>
      </div>

      {/* Footer */}
     
    </div>
  );
};

export default UserTypeSelection;