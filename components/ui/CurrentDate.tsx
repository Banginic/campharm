import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";

function CurrentDate() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="text-green-950/70  mb-4 lg:mb-0 liquid-glass p-3">
      <div className="flex items-center space-x-3 ">
        <Calendar className="size-4 text-green-950/70 " />
        <h2 className="text-xs lg:text-sm ">{formatDate(currentTime)}</h2>
      </div>
    </div>
  );
}

export default CurrentDate;
