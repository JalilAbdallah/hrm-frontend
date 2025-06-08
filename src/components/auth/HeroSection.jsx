// src/components/auth/HeroSection.jsx
import React from 'react';

const HeroSection = ({ 
  title, 
  subtitle, 
  className = "" 
}) => {
  // Default title with line breaks
  const defaultTitle = (
    <>
      Protect Rights,<br />
      Document Truth,<br />
      Seek Justice
    </>
  );

  return (
    <div className={`mb-8 lg:mb-12 ${className}`}>
      <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 leading-tight">
        {title || defaultTitle}
      </h2>
      <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
        {subtitle || "A comprehensive platform for documenting human rights violations, managing cases, and supporting victims through data-driven insights."}
      </p>
    </div>
  );
};

export default HeroSection;