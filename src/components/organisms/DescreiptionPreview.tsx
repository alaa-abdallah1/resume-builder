import React from "react";

type Props = {
  value: React.ReactNode;
};

export const DescreiptionPreview = (props: Props) => {
  const { value } = props;

  return (
    <p
      className="[&>ul]:list-disc [&>ul>li]:list-outside [&>ul>li]:ml-5 [&>ol]:list-decimal [&>ol>li]:list-outside [&>ol>li]:ml-5"
      dangerouslySetInnerHTML={{ __html: String(value ?? "") }}
    />
  );
};

export default DescreiptionPreview;
