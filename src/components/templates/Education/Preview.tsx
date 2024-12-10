import { SectionPreview } from "@/components/organisms";
import { FormPayload } from "@/types";

type Props = {
  data: FormPayload;
};

const Preview = (props: Props) => {
  const { data } = props;

  return <SectionPreview data={data} />;
};

export default Preview;
