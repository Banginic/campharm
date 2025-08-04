"use client";
import React from "react";
import { Boxes, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const ComingSoonInventory = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full"
      >
        {/* Inventory Icon */}
        <div className="flex justify-center mb-4">
          <Boxes className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Inventory Management – Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          We're building a smarter inventory management system to help you keep
          track of your pharmacy stock effortlessly. Stay tuned for updates!
        </p>

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Wrench className="text-green-500" />
          <span className="text-gray-700 font-medium">Under development...</span>
        </div>

        <button
          onClick={() => (window.location.href = "/pharmacy")}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600 transition"
        >
          Go Home
        </button>
      </motion.div>

      <p className="mt-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Pharmacy App
      </p>
    </div>
  );
};

export default ComingSoonInventory;
