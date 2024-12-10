import { FieldWrapper } from "./FieldWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  value?: string | readonly string[] | number | undefined;
  options: [string, string][];
  onValueChange?(value: string): void;
}

export function SelectField(props: SelectFieldProps) {
  const { label, value, onValueChange, options } = props;

  return (
    <FieldWrapper label={label}>
      {() => (
        <Select value={value as string} onValueChange={onValueChange}>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder={value} />
          </SelectTrigger>
          <SelectContent>
            {options.map(([key, value]) => (
              <SelectItem key={key} value={value} className="capitalize">
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FieldWrapper>
  );
}
