"use client";
import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { Calendar } from "@/components/ui/calendar";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

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

const Journal = ({ date }: { date: Date }) => {
  const { getToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onSelect = (date: Date | undefined) => {
    router.push(
      pathname +
        "?" +
        createQueryString("date", (date || new Date()).toISOString())
    );
  };

  const fetchJournal = async () => {
    const token = await getToken();
    const response = await axios
      .get(process.env.PUBLIC_APP_API_URL || "http://localhost:3030", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return response.data;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/3 m-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelect}
            className="rounded-lg border mx-auto w-[278px]"
          />
        </div>
        <div className="w-full lg:w-2/3 m-4">
          <button className="w-50 h-10 bg-red-300" onClick={fetchJournal}>
            Fetch Journal
          </button>
          <Editor initialContent={initial} />
        </div>
      </div>
    </div>
  );
};

export default Journal;
