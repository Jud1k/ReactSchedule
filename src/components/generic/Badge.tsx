import { cn } from "@/lib/utils";
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}
export default function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <div
      className={cn("badge badge-lg bg-green-600 self-start", className)}
      {...props}
    >
      {children}
    </div>
  );
}
