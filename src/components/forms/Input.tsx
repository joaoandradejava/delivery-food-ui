import { Info } from "lucide-react";
import { HTMLInputTypeAttribute, useRef } from "react";
import InputMask from "react-input-mask";

interface InputProps {
  type: HTMLInputTypeAttribute;
  register: any;
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: any;
  maskFormat?: string;
  disabled?: boolean;
}

export default function Input(props: InputProps) {
  const {
    type,
    id,
    register,
    label,
    placeholder,
    required,
    error,
    maskFormat,
    disabled,
  } = props;

  return (
    <div className="space-y-1">
      <label className="font-bold text-sm" htmlFor={id}>
        {label} {required && <span className="text-red-600 text-sm">*</span>}
      </label>

      {maskFormat ? (
        <InputMask
          id={id}
          mask={maskFormat}
          placeholder={placeholder}
          {...register(id)}
          type={type}
          className={`w-full px-2 py-3 placeholder-gray-400 border-2 rounded-md shadow-sm focus:outline-none text-gray-700
            ${
              error?.message
                ? "border-red-400 outline-red-500 focus:ring-red-500 focus:border-red-500"
                : " border-gray-200 outline-blue-400 focus:ring-indigo-500 focus:border-indigo-500"
            }
          `}
        />
      ) : (
        <input
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={`w-full px-2 py-3 border-2 placeholder-gray-400 rounded-md shadow-sm focus:outline-none text-gray-700 ${
            error?.message
              ? "border-red-400 outline-red-500 focus:ring-red-500 focus:border-red-500"
              : " border-gray-200 outline-blue-400 focus:ring-indigo-500 focus:border-indigo-500"
          } `}
        />
      )}

      {error && (
        <span className="text-red-500 text-xs flex gap-2 items-center">
          <Info width={15} /> {error.message}
        </span>
      )}
    </div>
  );
}
