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
      name: "startDate",
      label: "Date",
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
      title="Certificates"
      description="List any certificates you have earned that are relevant to the job you are applying for."
      fields={fields}
      valueKey="startDate"
      defaultItem={DEFAULT_INITIAL_VALUES}
    />
  );
};

export default Form;
