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
    <>
      <SectionHeader title={DEAFAULT_ABOUT_TITLE} />
      <DescreiptionPreview value={value} />
    </>
  );
};

export default Preview;
