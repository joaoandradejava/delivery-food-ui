import { Info } from "lucide-react";
import CurrencyInput from "react-currency-input-field";
interface InputCurrencyProps {
  register: any;
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: any;
  defaultValue?: number;
}

export default function InputCurrency(props: InputCurrencyProps) {
  const { register, id, label, placeholder, required, error, defaultValue } =
    props;
  return (
    <div className="space-y-1">
      <label className="font-bold text-sm" htmlFor={id}>
        {label} {required && <span className="text-red-600 text-sm">*</span>}
      </label>
      <CurrencyInput
        {...register(id)}
        defaultValue={defaultValue?.toString()}
        name={id}
        placeholder={placeholder}
        decimalsLimit={2}
        prefix="R$"
        decimalSeparator=","
        onValueChange={(e) => console.log(e)}
        className="w-full px-2 py-3 border-2 placeholder-gray-400 rounded-md shadow-sm focus:outline-none text-gray-700"
      />
      {error && (
        <span className="text-red-500 text-xs flex gap-2 items-center">
          <Info width={15} /> {error.message}
        </span>
      )}
    </div>
  );
}
