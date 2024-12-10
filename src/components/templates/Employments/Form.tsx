import { ComponentProps, FieldType } from "@/types";
import { DatePickerField, TextEditorField } from "@/components/molecules";
import { SectionContainer } from "@/components/organisms";
import { formatDate } from "@/lib/utils";
import { DEFAULT_INITIAL_VALUES } from "@/constants";

export const Form = (_props: ComponentProps) => {
  const fields: FieldType[] = [
    {
      name: "title",
      label: "Job Title",
      placeholder: "Job Title",
    },
    {
      name: "location",
      label: "Company",
      placeholder: "Company",
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
      title="Employments"
      description="A varied work history on your resume highlights the distinct expertise and insights you offer to a role."
      fields={fields}
      valueKey="location"
      defaultItem={DEFAULT_INITIAL_VALUES}
    />
  );
};

export default Form;
