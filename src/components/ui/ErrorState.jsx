import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Reusable error state component for failed API requests.
 */
export function ErrorState({ 
  title = "Failed to load data", 
  message = "An error occurred while fetching information. Please try again.",
  onRetry,
  className
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-surface-on mb-1">{title}</h4>
      <p className="text-sm text-surface-on-variant max-w-sm mb-4">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary-container/10 rounded-md transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}
