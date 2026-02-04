import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-dark-900/60 backdrop-blur-lg rounded-xl border border-primary-500/20 shadow-lg overflow-hidden ${className}`}>
      {title && (
        <div className="border-b border-dark-700/50 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;