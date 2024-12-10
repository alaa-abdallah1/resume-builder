import { Input } from "@/components/ui";
import { FieldWrapper } from "./FieldWrapper";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
}

export function InputField(props: InputFieldProps) {
  const { label, ...rest } = props;

  return (
    <FieldWrapper label={label}>
      {id => <Input id={id} {...rest} />}
    </FieldWrapper>
  );
}
