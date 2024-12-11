import React, { useMemo, useRef } from "react";
import { ComponentSection, Mixed } from "@/types";
import { usePrint } from "@/hooks";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button-variants";

interface ResumePreviewProps {
  data: Mixed;
  sections: ComponentSection[];
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  sections,
}) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const { isLoading, handlePrint } = usePrint(
    { color: "#FFFFFF", textColor: "#000000" },
    previewRef
  );

  const sectionsBlock = useMemo(() => {
    return sections.map((section, index) => {
      const { id, preview: FieldComponent } = section;
      return (
        <div key={`${id}-${index}`} className="mb-4">
          {FieldComponent && <FieldComponent data={data[id]} />}
        </div>
      );
    });
  }, [sections, data]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant={"outline"}
        size={"lg"}
        onClick={() => handlePrint()}
        disabled={isLoading}
      >
        {isLoading ? "Preparing PDF..." : "Download PDF"}
      </Button>

      <div
        ref={previewRef}
        className="shadow-md print:shadow-none rounded-lg mb-4 lg:w-a4 hidden print:block lg:block"
        style={{
          padding: "15mm",
          backgroundColor: "#FFFFFF", // White background for simplicity
          color: "#000000", // Black text for contrast
          minHeight: "297mm", // A4 page size
        }}
      >
        {sectionsBlock}
      </div>

      <Dialog>
        <DialogTrigger
          className={cn(
            buttonVariants({
              variant: "default",
            }),
            "w-full lg:hidden"
          )}
        >
          Preview
        </DialogTrigger>
        <DialogContent className="max-h-full screen:max-w-screen overflow-y-scroll">
          <DialogTitle>Preview Resume</DialogTitle>
          {sectionsBlock}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumePreview;
