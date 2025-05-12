import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const typeClasses: Record<AlertType, string> = {
    success: 'bg-success-50 text-success-700 border-success-500',
    error: 'bg-error-50 text-error-700 border-error-500',
    warning: 'bg-warning-50 text-warning-700 border-warning-500',
    info: 'bg-primary-50 text-primary-700 border-primary-500',
  };

  const icons: Record<AlertType, React.ReactNode> = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  return (
    <div className={`rounded-md border-l-4 p-4 mb-4 ${typeClasses[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div className="flex-1">
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button 
            type="button" 
            className="ml-auto -mr-1.5 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;