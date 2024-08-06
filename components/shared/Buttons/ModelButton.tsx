"use client";
import { useModel } from "@/hooks/useModel";
import React, { useCallback } from "react";

const ModelButton = () => {
  const { open } = useModel();

  const modleHandler = useCallback(() => {
    open();
  }, [open]);

  return (
    <div>
      <button
        onClick={modleHandler}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded p-4"
      >
        Login
      </button>
    </div>
  );
};

export default ModelButton;
