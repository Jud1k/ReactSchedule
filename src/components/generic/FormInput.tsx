import { UseFormRegisterReturn } from "react-hook-form";
import { FormError } from "./FormError";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
}

export const FormInput = ({
  label,
  type = "text",
  placeholder,
  error,
  registration,
  className = "",
}: InputFieldProps) => {
  return (
    <div className={cn("form-control w-full", className)}>
      <label className="label">
        <span className="label-text text-lg font-bold">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "input input-bordered w-full mt-2",
          error && "input-error", // Правильное условие для ошибки
          className
        )}
        {...registration}
      ></input>
      <FormError message={error} />
    </div>
  );
};
