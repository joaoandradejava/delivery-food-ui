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
          className="bg-gray-50 text-sm px-3 w-full h-11 rounded-xl p-2 border-gray-200 border-2 outline-blue-400"
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={`bg-gray-50 text-sm px-3 w-full h-11 rounded-xl p-2 ${
            error?.message
              ? "border-red-400 border-2 outline-red-500"
              : "border-gray-200 border-2 outline-blue-400"
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
