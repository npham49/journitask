"use client";
import React from "react";
import dynamic from "next/dynamic";

import { Calendar } from "@/components/ui/calendar";

const initial = [
  {
    id: "c4f824af-c4ea-4620-a4d8-6408c3480648",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 1,
    },
    content: [
      {
        type: "text",
        text: "Hello",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "c1087b12-a328-43a6-8097-5b7e0a304a51",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "das is so interesting hmmm",
        styles: {},
      },
    ],
    children: [],
  },
];

const Editor = dynamic(() => import("./Editor"), { ssr: false });

const Journal = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col w-full">
      <div className=" text-center m-4">
        <p className="text-4xl">Daily Journal</p>
        <p className="text-xl">current selected date</p>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border mx-auto w-[278px]"
          />
        </div>
        <div className="w-full lg:w-2/3">
          <div className="border rounded-lg p-4">
            <Editor initialContent={initial} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
