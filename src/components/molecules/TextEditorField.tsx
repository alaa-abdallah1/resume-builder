import React, { useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";
import { FieldWrapper } from "./FieldWrapper";

const ReactQuill = React.lazy(() => import("react-quill"));

interface TextEditorFieldProps
  extends Pick<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label?: string | undefined;
  value: React.ReactNode;
  onChange: (value: React.ReactNode) => void;
}

export function TextEditorField(props: TextEditorFieldProps) {
  const { label, value, onChange, ...rest } = props;
  const [editorValue, setEditorValue] = useState<React.ReactNode>(value);

  const handleChange = (val: React.ReactNode) => {
    setEditorValue(val);
    onChange(val);
  };

  return (
    <FieldWrapper label={label}>
      {id => (
        <Suspense fallback={<div>Loading editor...</div>}>
          <ReactQuill
            placeholder="Start typing..."
            {...rest}
            id={id}
            className={cn(
              "[&>.ql-snow>.ql-editor]:min-h-32 [&>:first-child.ql-snow]:border-transparent  rounded-md border [&>:first-child.ql-snow]:!border-b-gray-200 [&>:last-child.ql-snow]:border-none"
            )}
            value={editorValue}
            onChange={handleChange}
            modules={{
              toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
          />
        </Suspense>
      )}
    </FieldWrapper>
  );
}

export default TextEditorField;
