import { SvgIconName } from "@/assets/icons/paths.svg";
import { Icon } from "@/components/atoms";
import { Contact, FormPayload } from "@/types";

type Props = {
  data: FormPayload;
};

const Preview = (props: Props) => {
  const { data } = props;

  const values = data?.items?.[0] as Contact;

  const location = [values?.city, values?.country].filter(Boolean).join(", ");

  const addressLine = [values?.address, values?.postalCode]
    .filter(Boolean)
    .join(", ");

  const formattedData = {
    location,
    address: addressLine,
    email: values?.email,
    phone: values?.phone,
    dateOfBirth: values?.dateOfBirth,
  };

  return (
    <div className="space-y-2">
      <div className="gap-2 flex flex-wrap">
        {Object.entries(formattedData).map(([key, value], index) => {
          if (!value) return null;

          return (
            <p key={index} className="text-sm flex gap-x-1">
              <Icon
                name={key as SvgIconName}
                className="shrink-0 relative top-0.5"
              />
              {value}
            </p>
          );
        })}
      </div>

      <hr className="my-4" />
    </div>
  );
};

export default Preview;
