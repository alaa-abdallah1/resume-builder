import { Label } from "@/components/ui/label";

interface FieldWrapperProps {
  label?: string | undefined;
  children: (id?: string) => React.ReactNode;
}

export function FieldWrapper(props: FieldWrapperProps) {
  const { label, children } = props;
  return (
    <div className="grid w-full items-center gap-2">
      {label && <Label htmlFor={label}>{label}</Label>}

      {children(label)}
    </div>
  );
}

export default FieldWrapper;
