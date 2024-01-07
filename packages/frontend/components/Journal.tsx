"use client";
import React from "react";

import { Calendar } from "@/components/ui/calendar";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";

const editor = new EditorJS({
  /**
   * Id of Element that should contain the Editor
   */
  holder: "editorjs",

  /**
   * Available Tools list.
   * Pass Tool's class or Settings object for each Tool you want to use
   */
  tools: {
    header: Header,
    list: List,
  },
});

const Journal = () => {
  const editorRef = React.createRef();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [content, setContent] = React.useState<string>("");

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
          <h2>Editor</h2>
          <div id="editorjs"></div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
