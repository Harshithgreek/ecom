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
    success: 'bg-success-600/20 text-success-400 border-success-500/50',
    error: 'bg-error-600/20 text-error-400 border-error-500/50',
    warning: 'bg-warning-600/20 text-warning-400 border-warning-500/50',
    info: 'bg-primary-600/20 text-primary-400 border-primary-500/50',
  };

  const icons: Record<AlertType, React.ReactNode> = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  return (
    <div className={`rounded-lg border-l-4 p-4 mb-4 backdrop-blur-sm ${typeClasses[type]}`}>
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
            className="ml-auto -mr-1.5 inline-flex text-gray-400 hover:text-white focus:outline-none transition-colors"
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