import { SectionHeader } from "@/components/atoms";
import { DEAFAULT_TITLE } from "@/constants";
import { cn } from "@/lib/utils";
import { LevelInNumberEnum, SkillsPayload } from "@/types";
import { Star } from "lucide-react";

type Props = {
  data: SkillsPayload;
};

const Preview = (props: Props) => {
  const { data } = props;

  return (
    <div className="space-y-2">
      {data?.items?.length > 0 && (
        <>
          <SectionHeader title={data?.title} className="truncate" />
          {data?.items?.map((skill, index) => (
            <p key={index} className="text-sm flex justify-between gap-x-1">
              <span className="truncate">{skill.name || DEAFAULT_TITLE}</span>
              <span className="flex items-center space-x-0.5">
                {Array.from({
                  length: 5,
                }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    absoluteStrokeWidth
                    className={cn("h-3.5 w-3.5", {
                      "fill-black":
                        starIndex <
                        LevelInNumberEnum[
                          skill.level?.toUpperCase() as keyof typeof LevelInNumberEnum
                        ],
                    })}
                  />
                ))}
              </span>
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default Preview;
