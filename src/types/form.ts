// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mixed = any;

export type FormDataType = Record<string, Mixed>;

export type SectionContainerDataType = {
  title: string;
  value: string;
};

export type SectionContainerType = {
  title: string;
  data: SectionContainerDataType[];
};

export type FormPayload = {
  title: string;
  items: Record<string, Mixed>[];
};

export type SectionPreviewType = {
  title: string;
  description: string;
  present: boolean;
  location: string;
  startDate: string;
  endDate: string;
};

export type SortedComponentSection = {
  id: string;
  noDrag?: boolean;
  title?: string;
  description?: string;
};

export type ComponentSection = SortedComponentSection & {
  component?: React.ComponentType<Mixed>;
  preview?: React.ComponentType<Mixed>;
};

export type ComponentProps = {
  dataKey: string;
  title?: string;
  description?: string;
  onChange?: (data: FormPayload) => void;
  onDelete?: (dataKey: string) => void;
};
