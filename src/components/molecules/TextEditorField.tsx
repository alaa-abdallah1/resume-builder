import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FieldWrapper } from "./FieldWrapper";

interface TextEditorFieldProps
  extends Pick<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label?: string | undefined;
  value: React.ReactNode;
  onChange: (value: React.ReactNode) => void;
}

export function TextEditorField(props: TextEditorFieldProps) {
  const { label, ...rest } = props;

  const [editorValue, setEditorValue] = useState<React.ReactNode>(props.value);

  const handleChange = (value: React.ReactNode) => {
    setEditorValue(value);
    props.onChange(value);
  };

  return (
    <FieldWrapper label={label}>
      {id => (
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
      )}
    </FieldWrapper>
  );
}

export default TextEditorField;
