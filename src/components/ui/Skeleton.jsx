import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * A basic loading skeleton component.
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-dim/30", className)}
      {...props}
    />
  );
}

/**
 * Standard table row skeleton
 */
export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr className="border-b border-outline">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

/**
 * Standard activity log skeleton
 */
export function ActivitySkeleton() {
  return (
    <div className="relative pl-6 mb-6 last:mb-0">
      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface-lowest border-2 border-outline"></span>
      <Skeleton className="h-4 w-full max-w-[200px] mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}
