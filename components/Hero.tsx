'use client'
import React, { useState } from 'react';
import { MapPin, Star, Users, Shield, Clock, Sparkle } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
import { SearchPharmacy } from './index'

const PharmacyHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Handle search logic here
  };

  const avatarColors = [
    'from-blue-400 to-purple-500',
    'from-pink-400 to-red-500',
    'from-cyan-400 to-blue-500',
    'from-green-400 to-teal-500',
    'from-yellow-400 to-orange-500'
  ];

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-white/50 opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-white/50 opacity-5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-white/5 0 opacity-5 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-[2rem] lg:px-[5rem] py-12 relative z-10">
        <div className='mb-8'>
          <Logo link='/'  />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-green-950/70">
                Find Your{' '}
                <span className="">
                  Nearest
                </span>{' '}
                Pharmacy
              </h1>
              <p className="lg:text-xl text-green-950/70 leading-relaxed max-w-lg">
                Locate trusted pharmacies near you in seconds. Get medications, health advice, 
                and emergency supplies whenever you need them.
              </p>
            </div>

            {/* Search Bar */}
            <SearchPharmacy />
            
            <Link href={'/purpose'} className='bg-black hover:bg-black/90 lg:hidden text-white w-sm justify-center px-4 flex text-sm mx-aut py-2.5 rounded-lg gap-2 items-center cursor-pointer'>
              <Sparkle size={18} />
              Get Started</Link>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-20">
              {/* User Avatars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {avatarColors.map((color, index) => (
                    <div
                      key={index}
                      className={`size-8 bg-gradient-to-br ${color} rounded-full border-3 border-white shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center text-white font-semibold cursor-pointer relative`}
                    >
                      {String.fromCharCode(65 + index)}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  ))}
                </div>
                <div className="text-green-950/70">
                  <div className="text-2xl font-bold text-green-950">50K+</div>
                  <div className="text-sm">Happy Users</div>
                </div>
              </div>

              {/* Trusted Badge */}
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-2 border border-white/30">
                <Shield className="text-green-400" size={24} />
                <div className="text-green-950">
                  <div className="font-semibold text-green-950">Trusted by</div>
                  <div className="text-sm text-green-950/70">Healthcare Professionals</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-950/70 mb-2">2.5K+</div>
                <div className="text-green-950/70 text-sm  tracking-wide">Pharmacies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-950/70 mb-2">24/7</div>
                <div className="text-green-950/70 text-sm tracking-wide">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-950/70 mb-2">4.9★</div>
                <div className="text-green-950/70 text-sm tracking-wide">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-bounce delay-100">
                <Clock className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-4 animate-bounce delay-300">
                <Users className="text-white" size={24} />
              </div>

              {/* Phone Mockup */}
              <div className="w-80 h-[600px] bg-gradient-to-b from-gray-100 to-gray-200 rounded-[3rem] p-3 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                <div className="w-full h-full bg-gradient-to-b from-indigo-500 to-purple-600 rounded-[2.5rem] relative overflow-hidden">
                  {/* Phone screen content */}
                  <div className="p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">💊</span>
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2">Pharmcam</h3>
                      <p className="text-blue-100 text-sm">Find nearby pharmacies</p>
                    </div>

                    {/* Mock Map */}
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 relative mb-6">
                      <div className="absolute inset-4 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-xl"></div>
                      
                      {/* Mock pharmacy pins */}
                      <div className="absolute top-12 left-8">
                        <div className="w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                        <div className="w-6 h-6 bg-red-500 rounded-full absolute top-0"></div>
                      </div>
                      <div className="absolute top-20 right-12">
                        <div className="w-6 h-6 bg-green-500 rounded-full animate-ping delay-300"></div>
                        <div className="w-6 h-6 bg-green-500 rounded-full absolute top-0"></div>
                      </div>
                      <div className="absolute bottom-16 left-12">
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping delay-500"></div>
                        <div className="w-6 h-6 bg-blue-500 rounded-full absolute top-0"></div>
                      </div>
                    </div>

                    {/* Mock pharmacy list */}
                    <div className="space-y-3">
                      {[
                        { name: "CVS Pharmacy", distance: "0.2 mi", status: "Open" },
                        { name: "Walgreens", distance: "0.5 mi", status: "Open" },
                        { name: "Rite Aid", distance: "0.8 mi", status: "Closes 9 PM" }
                      ].map((pharmacy, index) => (
                        <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex justify-between items-center">
                          <div>
                            <div className="text-white font-semibold text-sm">{pharmacy.name}</div>
                            <div className="text-blue-100 text-xs">{pharmacy.distance} away</div>
                          </div>
                          <div className="text-green-300 text-xs font-medium">{pharmacy.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 text-green-950/70 text-sm ">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={16} />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-green-400" size={16} />
              <span>Verified Pharmacies</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-400" size={16} />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-red-400" size={16} />
              <span>GPS Accurate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyHero;