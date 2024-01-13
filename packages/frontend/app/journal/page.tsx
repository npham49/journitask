import Journal from "@/components/journal/Journal";
import { useSearchParams } from "next/navigation";

const Page = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  // get query params date and set it to date
  // if no query params, set date to today
  // if invalid query params, set date to today
  const date = searchParams?.date
    ? new Date(String(searchParams?.date))
    : new Date();

  return (
    <div className="container min-h-screen">
      <div className="text-center m-4">
        <h1>Daily Journal</h1>
        <h2>Date: {date.toLocaleDateString()}</h2>
      </div>
      <Journal date={date} />
    </div>
  );
};

export default Page;
