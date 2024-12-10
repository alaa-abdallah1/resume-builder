import { SectionHeader } from "@/components/atoms";
import { DescreiptionPreview } from "@/components/organisms";
import { DEAFAULT_ABOUT_TITLE } from "@/constants";
import { FormPayload } from "@/types";
import React from "react";

type Props = {
  data: FormPayload;
};

const Preview = (props: Props) => {
  const { data } = props;

  const value = data?.items?.[0] as React.ReactNode;
  return (
    <div className="space-y-2">
      <SectionHeader title={DEAFAULT_ABOUT_TITLE} />
      <DescreiptionPreview value={value} />
    </div>
  );
};

export default Preview;
