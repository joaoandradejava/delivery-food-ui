import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  type: HTMLInputTypeAttribute;
  register: any;
  id: string;
  label: string;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  const { type, id, register, label, placeholder } = props;
  return (
    <div className="space-y-1">
      <label className="font-bold text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        {...register(id)}
        className="bg-gray-50 text-sm px-3 w-full h-11 rounded-xl p-2 border-gray-200 border-2 outline-blue-400"
      />
    </div>
  );
}
