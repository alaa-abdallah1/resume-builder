import { Mixed } from "@/types";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";

export const usePrint = (selectedTemplate: Mixed, previewRef: Mixed) => {
  console.log("selectedTemplate: ", selectedTemplate);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: "Resume",
    onBeforePrint: async () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    pageStyle: `
      @page {
        size: A4;
        padding-bottom: 15mm !important; 
      }
      @page :first {
        padding-top: 0px !important; /* No padding for the first page */
      }

      /* Apply padding from the second page onward */
      @page {
        padding-top: 50px !important;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background-color: ${selectedTemplate.color} !important;
      }
    `,
  });

  return {
    isLoading,
    handlePrint,
  };
};

export default usePrint;
