import React from "react";
import { Spinner } from "@material-tailwind/react";
const Loading = () => {
  return (
    <div className="h-100 w-[45vw] flex justify-center">
      <Spinner className="h-16 w-16 text-green-900/50" />
    </div>
  );
};

export default Loading;
