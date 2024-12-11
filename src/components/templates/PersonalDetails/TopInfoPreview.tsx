import { Contact, FormPayload } from "@/types";

type Props = {
  data: FormPayload;
};

const Preview = (props: Props) => {
  const { data } = props;

  const values = data?.items?.[0] as Contact;

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">
        {values?.firstName} {values?.lastName}
      </h1>
      <p className="italic">{values?.jobTitle}</p>
    </div>
  );
};

export default Preview;
