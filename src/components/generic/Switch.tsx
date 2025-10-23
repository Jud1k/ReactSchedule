import { cn } from '@/lib/utils';
import React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Switch({ className, ...props }: SwitchProps) {
  return (
    <input type="checkbox" className={cn('toggle', className)} {...props} />
  );
}
