import { InputField } from "@/components/molecules";
import { AppForm, AppAlertDialog } from "@/components/organisms";
import { FieldType, FormDataType, FormPayload } from "@/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, PlusIcon, Trash2 } from "lucide-react";
import { DEAFAULT_TITLE, DEAFAULT_VALUE } from "@/constants";
import { getSavedData } from "@/lib/utils";

type Props = {
  dataKey: string;
  title?: string;
  titleKey?: string;
  valueKey?: string;
  description?: string;
  fields?: FieldType[];
  defaultItem?: FormDataType;
  onChange?: (data: FormPayload) => void;
};

export const SectionContainer = (props: Props) => {
  const {
    dataKey,
    onChange,
    fields = [],
    description = "",
    title = "Title",
    defaultItem = {},
    valueKey = "location",
    titleKey = "title",
  } = props;

  const savedData = getSavedData(dataKey);

  const [sectionTitle, setSectionTitle] = useState(savedData?.title ?? title);
  const [data, setData] = useState<FormDataType[]>(savedData?.items ?? []);

  useEffect(() => {
    onChange?.({
      title: sectionTitle,
      items: data,
    } as FormPayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sectionTitle]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <InputField
          type="text"
          value={sectionTitle}
          className="max-w-[320px] font-medium capitalize border-none"
          onChange={e => setSectionTitle(e.target.value)}
        />
        <p className="text-sm text-muted-foreground ">{description}</p>
      </div>

      <div className="space-y-4">
        {data?.map((item, index) => (
          <Collapsible key={index} className="space-y-4">
            <div className="flex justify-between">
              <div className="flex flex-col capitalize">
                <span className="font-semibold">
                  {item[titleKey] || DEAFAULT_TITLE}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item[valueKey] || DEAFAULT_VALUE}
                </span>
              </div>
              <div className="flex gap-x-2 items-center">
                <CollapsibleTrigger className="text-blue-500 font-semibold flex items-center gap-x-2">
                  <ChevronsUpDown className="h-4 w-4 text-black" />
                </CollapsibleTrigger>

                <AppAlertDialog
                  triggerText={<Trash2 className="h-4 w-4 cursor-pointer" />}
                  title="Would you like to delete this item?"
                  cancelText="No, go back"
                  actionText="Yes, proceed"
                  onAction={() => setData(data.filter((_, i) => i !== index))}
                />
              </div>
            </div>

            <CollapsibleContent>
              <AppForm
                data={item}
                fields={fields}
                onChange={value => {
                  const updatedItems = [...data];
                  updatedItems[index] = value;
                  setData(updatedItems);
                }}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
        <Button
          variant="outline"
          onClick={() => setData([...data, defaultItem])}
        >
          <PlusIcon className="h-4 w-4" /> Add more
        </Button>
      </div>
    </div>
  );
};

export default SectionContainer;
