import { Icon, SectionHeader } from "@/components/atoms";
import { DatePickerField } from "@/components/molecules";
import { AppForm } from "@/components/organisms";
import { DEFAULT_INITIAL_INFO_VALUES } from "@/constants";
import { formatDate, getSavedData } from "@/lib/utils";
import { ComponentProps, FieldType, FormDataType, Mixed } from "@/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { useCallback, useState } from "react";

const FORM_TITLE = "Personal Details";

type Props = ComponentProps & {
  onChange: (data: FormDataType) => void;
};

const Form = (props: Props) => {
  const { dataKey, onChange } = props;
  const savedData = getSavedData(dataKey);

  const [info, setInfo] = useState<Record<string, Mixed>>(
    savedData?.items?.[0] ?? DEFAULT_INITIAL_INFO_VALUES
  );

  const contactFields: FieldType[] = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "John",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Doe",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "b6E0E@example.com",
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "(123) 456-7890",
    },
    {
      name: "country",
      label: "Country",
      placeholder: "United States",
    },
    {
      name: "city",
      label: "City",
      placeholder: "New York",
    },
    {
      name: "jobTitle",
      label: "Job Title",
      placeholder: "Software Engineer",
    },
  ];

  const addressFields: FieldType[] = [
    {
      name: "address",
      label: "Address",
      placeholder: "123 Main St",
    },
    {
      type: "number",
      name: "postalCode",
      label: "Postal Code",
      placeholder: "10001",
    },
    {
      name: "drivingLicense",
      label: "Driving License",
      placeholder: "123-45-6789",
    },
    {
      name: "nationality",
      label: "Nationality",
      placeholder: "United States",
    },
    {
      name: "placeOfBirth",
      label: "Place of Birth",
      placeholder: "New York",
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      placeholder: "MM/DD/YYYY",
      component: DatePickerField,
      formatter: value => formatDate(value, true),
    },
  ];

  // Memoizing the onChange handler to prevent unnecessary re-renders
  const handleChange = useCallback(
    (newInfo: Record<string, string | number>) => {
      console.log("hhhii");
      setInfo({ ...info, ...newInfo });
      onChange({
        title: FORM_TITLE,
        items: [{ ...info, ...newInfo }],
      });
    },
    [info, onChange]
  );

  return (
    <div className="space-y-4">
      <SectionHeader size="lg" title={FORM_TITLE} />
      <AppForm data={info} fields={contactFields} onChange={handleChange} />

      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="text-blue-500 font-semibold flex items-center gap-x-2">
          Edit additional details
          <Icon name="arrows" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <AppForm data={info} fields={addressFields} onChange={handleChange} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Form;
