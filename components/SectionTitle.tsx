
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <p className="text-brand-green font-semibold mb-2">{subtitle}</p>
      <h2 className="text-3xl font-bold text-brand-gray-600 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-brand-green"></span>
      </h2>
    </div>
  );
};

export default SectionTitle;
