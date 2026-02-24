import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
        </span>
      </div>
    </div>
  );
};

export default Ping;
