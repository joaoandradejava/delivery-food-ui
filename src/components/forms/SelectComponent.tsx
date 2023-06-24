import { Info } from "lucide-react";
import Select from "react-select";
import { Controller, DeepMap, FieldError } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  control: any;
  options: { value: number; label: string; id: number }[] | undefined;
  error: DeepMap<any, FieldError> | undefined;
  required?: boolean;
}

export default function SelectComponent(props: SelectProps) {
  const { name, label, control, options, required, error } = props;
  return (
    <div className="space-y-1">
      <label className="font-bold text-sm" htmlFor={name}>
        {label} {required && <span className="text-red-600 text-sm">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            name={name}
            options={options}
            value={
              options
                ? options.filter((option) =>
                    field.value?.some((val: any) => val.id === option.id)
                  )
                : []
            }
            onChange={(selectedOptions) => {
              const selectedOptionIds = selectedOptions.map((option) => ({
                id: option.id,
              }));
              field.onChange(selectedOptionIds);
            }}
            isMulti
          />
        )}
      />
      {error && (
        <span className="text-red-500 text-xs flex gap-2 items-center">
          <Info width={15} /> {error.message}
        </span>
      )}
    </div>
  );
}
