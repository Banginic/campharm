'use client'
import React from "react";

interface MedyroLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "color" | "white" | "dark";
}

const MedyroLogo: React.FC<MedyroLogoProps> = ({
  size = "md",
  variant = "color",
}) => {
  const sizeClasses = {
    sm: "w-32 h-12",
    md: "w-48 h-16",
    lg: "w-64 h-20",
    xl: "w-80 h-24",
  };

  const getColors = () => {
    switch (variant) {
      case "white":
        return { primary: "#ffffff", secondary: "#f3f4f6", text: "#ffffff" };
      case "dark":
        return { primary: "#1f2937", secondary: "#374151", text: "#1f2937" };
      default:
        return { primary: "#1e40af", secondary: "#0d9488", text: "#1e40af" };
    }
  };

  const colors = getColors();

  return (
    <div className={`flex items-center ${sizeClasses[size]} cur`}>
      <svg
        viewBox="0 0 200 40"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
        </defs>

        {/* Cross Icon */}
        <g>
          <rect
            x="16"
            y="8"
            width="8"
            height="24"
            rx="2"
            fill="url(#crossGradient)"
          />
          <rect
            x="8"
            y="16"
            width="24"
            height="8"
            rx="2"
            fill="url(#crossGradient)"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </g>

        {/* Single-line Text, vertically aligned with cross */}
        <text
          x="50"
          y="27"
          className="font-bold tracking-tight"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="20"
          fill="url(#logoGradient)"
        >
          Medyro
        </text>
      </svg>
    </div>
  );
};

export default MedyroLogo;
