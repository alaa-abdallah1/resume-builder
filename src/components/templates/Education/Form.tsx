import { FieldType, ComponentProps } from "@/types";
import { DatePickerField, TextEditorField } from "@/components/molecules";
import { SectionContainer } from "@/components/organisms";
import { formatDate } from "@/lib/utils";
import { DEFAULT_INITIAL_VALUES } from "@/constants";

export const Form = (_props: ComponentProps) => {
  const fields: FieldType[] = [
    {
      name: "title",
      label: "University",
      placeholder: "Harvard University",
    },
    {
      name: "location",
      label: "Degree",
      placeholder: "Bachelor of Sciences",
    },
    {
      name: "startDate",
      label: "Start Date",
      placeholder: "MM/DD/YYYY",
      component: DatePickerField,
      formatter: value => formatDate(value),
    },
    {
      name: "endDate",
      label: "End Date",
      placeholder: "MM/DD/YYYY",
      component: DatePickerField,
      formatter: value => formatDate(value),
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Summary",
      className: "col-span-2",
      component: TextEditorField,
    },
  ];

  return (
    <SectionContainer
      {..._props}
      title="Educations"
      description="A diverse educational background on your resume underscores the unique value and perspective you bring to a position."
      fields={fields}
      valueKey="location"
      defaultItem={DEFAULT_INITIAL_VALUES}
    />
  );
};

export default Form;
