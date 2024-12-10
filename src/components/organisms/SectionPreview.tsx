import { SectionHeader } from "@/components/atoms";
import { DescreiptionPreview } from "@/components/organisms";
import { DEAFAULT_TITLE } from "@/constants";
import { FormPayload, SectionPreviewType } from "@/types";

type Props = {
  data: FormPayload;
};

export const SectionPreview = (props: Props) => {
  const { data } = props;

  const subTitle = (item: SectionPreviewType) => {
    const dates = [item?.startDate, item?.present && "Present", item?.endDate]
      .filter(Boolean)
      .join(" - ");

    const value = [item?.location, dates].filter(Boolean).join(" | ");

    return value;
  };

  return (
    <div className="space-y-2">
      {data?.items?.length > 0 && (
        <>
          <SectionHeader title={data?.title} className="truncate" />
          {data?.items?.map((item, index) => (
            <div key={index} className="text-xs flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="truncate font-semibold">
                  {item.title || DEAFAULT_TITLE}
                </span>
                <span>{subTitle(item)}</span>
              </div>
              <DescreiptionPreview value={item.description} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SectionPreview;
