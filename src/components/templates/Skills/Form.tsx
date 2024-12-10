import { LevelEnum } from "@/types/skills";
import { ComponentProps, FieldType } from "@/types";
import { SelectField } from "@/components/molecules";
import { SectionContainer } from "@/components/organisms";

type Props = ComponentProps & {
  title?: string;
  description?: string;
};

export const Form = (props: Props) => {
  const {
    title = "Skills",
    description = "List your skills.",
    ...restProps
  } = props;

  const skillFields: FieldType[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Skill",
    },
    {
      name: "level",
      label: "Level",
      placeholder: "level",
      options: Object.entries(LevelEnum),
      component: SelectField,
    },
  ];

  return (
    <SectionContainer
      {...restProps}
      valueKey="level"
      titleKey="name"
      title={title}
      description={description}
      fields={skillFields}
      defaultItem={{ name: "", level: LevelEnum.EXPERT }}
    />
  );
};

export default Form;
