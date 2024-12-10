import { Mixed } from "./form";

export interface FieldType extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerClass?: string;
  options?: Mixed;
  formatter?: (value: Mixed) => Mixed;
  component?: (value: Mixed) => React.ReactNode;
  onValueChange?(value: string): void;
}
