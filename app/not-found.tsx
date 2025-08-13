'use client'
import { Home, ArrowLeft, Pill, Search, MapPin } from "lucide-react";

export default function PharmacyNotFound() {
  const handleGoHome = () => {
    // In a real app, you'd use your router's navigation
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* Animated Pill Icon */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-green-100 rounded-full border-4 border-green-200 shadow-lg animate-pulse">
            <Pill className="w-16 h-16 text-green-600" />
          </div>
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-300/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. 
            Don't worry, our pharmacy is still here to help with all your health needs.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center px-6 py-3 bg-white text-green-600 rounded-lg font-medium border-2 border-green-600 hover:bg-green-50 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 cursor-pointer">
              <Search className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Search Products</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 cursor-pointer">
              <Pill className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Medications</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 cursor-pointer">
              <MapPin className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Find Locations</span>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 mt-6">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@pharmacy.com" className="text-green-600 hover:text-green-700 font-medium">
            support@pharmacy.com
          </a>
        </p>
      </div>
    </div>
  );
}