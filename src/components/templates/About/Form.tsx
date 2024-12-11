import { TextEditorField } from "@/components/molecules";
import { DEAFAULT_ABOUT_TITLE } from "@/constants";
import { getSavedDataitems } from "@/lib/utils";
import React, { useCallback, useState } from "react";

type Props = {
  dataKey: string;
  onChange: (data: { title: string; items: React.ReactNode[] }) => void;
};

const Form = (props: Props) => {
  const { dataKey, onChange } = props;

  const savedData = getSavedDataitems(dataKey);

  const [about, setAbout] = useState<React.ReactNode>(
    (savedData?.items?.[0] as React.ReactNode) || ""
  );

  const handleEditorChange = useCallback(
    (value: React.ReactNode) => {
      setAbout(value);
      if (value !== about) {
        onChange({
          title: DEAFAULT_ABOUT_TITLE,
          items: [value],
        });
      }
    },
    [about, onChange]
  );

  return (
    <TextEditorField
      label={DEAFAULT_ABOUT_TITLE}
      value={about}
      placeholder="Summary"
      onChange={handleEditorChange}
    />
  );
};

export default Form;
