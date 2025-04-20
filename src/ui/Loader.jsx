import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <img src="/loader.svg" alt="Loading..." className="w-30 h-30" />
    </div>
  );
};

export default Loader;
