import Select from "react-select";
import { Controller, Control } from "react-hook-form";

type Option = { label: string; value: string };

type RSelectProps = {
  control: Control<any>;
  name: string;
  options: Option[];
  placeholder?: string;
};

export function RSelect({ control, name, options, placeholder }: RSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          options={options}
          placeholder={placeholder}
          value={options.find((o) => o.value === field.value) ?? null}
          onChange={(v) => field.onChange(v?.value)}
        />
      )}
    />
  );
}
