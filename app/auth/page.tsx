import Signin from "@/components/forms/signin";
import React from "react";

const Page = () => {
  return (
    <div className="flex-1 flex flex-col items-center space-y-10 justify-center">
      <h1 className="text-6xl font-semibold text-primary">
        Inn<span className="text-secondary">Sight</span>
      </h1>
      <div className="w-[50%]">
        <Signin />
      </div>
    </div>
  );
};

export default Page;
