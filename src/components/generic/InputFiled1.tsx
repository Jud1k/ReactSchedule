import { UseFormRegisterReturn } from "react-hook-form";
import { FormError } from "./FormError";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  registration: Partial<UseFormRegisterReturn>;
  classname?: string;
}

export const InputFiled1 = ({
  label,
  type = "text",
  placeholder,
  error,
  registration,
  classname = "",
}: InputFieldProps) => {
  return (
    <div className={`form-control w-full max-w-xs ${classname}`}>
      <label className="label">
        <span className="label-text text-lg font-bold">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
        {...registration}
      ></input>
      <FormError message={error} />
    </div>
  );
};
