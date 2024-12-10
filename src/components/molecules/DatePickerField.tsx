import { DatePicker } from "@/components/ui";
import { FieldWrapper } from "./FieldWrapper";

interface DatePickerFieldProps
  extends Omit<React.ComponentProps<typeof DatePicker>, "onChange"> {
  label?: string | undefined;
  onChange: (date?: Date | string) => void;
}

export function DatePickerField(props: DatePickerFieldProps) {
  const { label, onChange, ...rest } = props;

  function handleChange(date?: Date | string) {
    onChange?.(date);
  }

  return (
    <FieldWrapper label={label}>
      {id => <DatePicker id={id} {...rest} onChange={handleChange} />}
    </FieldWrapper>
  );
}
