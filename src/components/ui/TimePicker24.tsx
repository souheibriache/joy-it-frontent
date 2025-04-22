import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function TimePicker24({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const times = Array.from({ length: 24 * 2 }, (_, i) => {
    const h = String(Math.floor(i / 2)).padStart(2, "0");
    const m = String((i % 2) * 30).padStart(2, "0");
    return `${h}:${m}`;
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 h-64 p-0 overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="flex flex-col">
            {times.map((t) => (
              <Button
                key={t}
                variant={t === value ? "default" : "ghost"}
                className="justify-start focus:text-white"
                onClick={() => onChange(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
