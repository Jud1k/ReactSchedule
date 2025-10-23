import { cn } from '@/lib/utils';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormError } from './FormError';

interface SelectProps {
  label: string;
  className?: string;
  children: React.ReactNode;
  registration?: Partial<UseFormRegisterReturn>;
  error?: string;
}

export default function FormSelect({
  className,
  label,
  children,
  registration,
  error,
  ...props
}: SelectProps) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-lg font-bold">{label}</span>
      </label>
      <select
        className={cn(
          'select select-bordered w-full mt-2',
          error && 'select-error',
          className,
        )}
        {...registration}
        {...props}
      >
        {children}
      </select>
      {error && <FormError message={error} />}
    </div>
  );
}
