import { Inbox } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Reusable empty state component for lists/tables that have no data.
 */
export function EmptyState({ 
  icon: Icon = Inbox, 
  title = "No data available", 
  description = "There are currently no items to display.",
  className
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-surface-on-variant mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-surface-on mb-1">{title}</h4>
      <p className="text-sm text-surface-on-variant max-w-sm">
        {description}
      </p>
    </div>
  );
}
