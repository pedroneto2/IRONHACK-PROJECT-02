import { useState } from "react";
import CalendarSecheduler from "../CalendarScheduler/CalendarScheduler";

export default function TesterComponent() {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      {console.log(value.toJSON())}
      <CalendarSecheduler
        value={value}
        setValue={setValue}
        clientID={"6158ca4746bd7200176c8b30"}
        professionalID={"61576abb2eaa7400179d9c36"}
      />
    </div>
  );
}
