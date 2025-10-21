// src/component/Loader.jsx
import React from "react";
import { Loader2 } from "lucide-react"; // shadcn uses lucide-react icons

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="text-lg font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
