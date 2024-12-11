import { ChangeEvent } from "react";
import { InputField } from "../molecules";
import { FieldType, FormDataType } from "@/types";

type Props = {
  data: FormDataType;
  fields: FieldType[];
  onChange: (data: FormDataType) => void;
};

export const AppForm = (props: Props) => {
  const { fields, data, onChange } = props;

  return (
    <div className="grid w-full grid-cols-2 items-center gap-4">
      {fields.map((field, index) => {
        const {
          name,
          label,
          type,
          placeholder,
          formatter,
          component: FieldComponent,
          ...rest
        } = field;

        return (
          <div className={field.className} key={index + "-" + name}>
            {!FieldComponent ? (
              <InputField
                {...rest}
                label={label}
                type={type ?? "text"}
                value={data[name]}
                placeholder={placeholder}
                onChange={e => onChange({ ...data, [name]: e.target.value })}
              />
            ) : (
              <FieldComponent
                {...field}
                value={data[name]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange({ ...data, [name]: formatter ? formatter(e) : e })
                }
                onValueChange={(e: string) =>
                  onChange({ ...data, [name]: formatter ? formatter(e) : e })
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppForm;
