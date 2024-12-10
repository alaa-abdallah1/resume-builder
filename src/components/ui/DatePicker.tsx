"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type InputType = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

type DatePickerProps = InputType & {
  onChange: (date?: Date | string) => void;
};

export function DatePicker(props: DatePickerProps) {
  const [date, setDate] = React.useState<Date | string | undefined>(
    props.value as string
  );

  function onSelect(date?: Date | string) {
    setDate(date);
    props?.onChange(date); // Directly pass the date
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date as Date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
