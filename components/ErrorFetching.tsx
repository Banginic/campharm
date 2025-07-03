import React from "react";

function ErrorFetching({
  message,
  refetch,
}: {
  message: string;
  refetch: () => void;
}) {
  return (
    <section className=" flex flex-col justify-center items-center gap-2">
      <h1 className="text-lg font-semibold lg:text-2xl">
        Error Fetching {message}
      </h1>
      <button
        onClick={refetch}
        className="px-4 w-24 py-2 cursor-pointer hover:bg-gray-300 rounded border border-gray-300"
      >
        Retry
      </button>
    </section>
  );
}

export default ErrorFetching;
