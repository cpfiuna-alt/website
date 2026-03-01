
import React from "react";

const EventDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-[300px] bg-muted/30"></div>
      <div className="container mx-auto px-6 py-12">
        <div className="h-10 bg-muted/50 w-3/4 rounded mb-4"></div>
        <div className="h-6 bg-muted/50 w-1/2 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="h-4 bg-muted/50 rounded mb-2 w-full"></div>
            <div className="h-4 bg-muted/50 rounded mb-2 w-full"></div>
            <div className="h-4 bg-muted/50 rounded mb-2 w-3/4"></div>
          </div>
          <div className="md:col-span-1">
            <div className="h-40 bg-muted/50 rounded-lg mb-4"></div>
            <div className="h-40 bg-muted/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailSkeleton;
