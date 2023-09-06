import { Check } from "lucide-react";
import React from "react";
import { getHumanizedFileSize } from "@/components/FileUpload/function";

interface IProgressProps {
  size: number;
  name: string;
  hasFailed?: boolean;
  progress: number;
}
function ProgressIndicator(props: IProgressProps) {
  const { size, name, hasFailed = false, progress } = props;

  if (progress > 100 && progress < 0) {
    throw new Error("Progress shouldn't be more than 100 and less than 0");
  }
  return (
    <div className="w-full absolute bottom-0  flex items-end  rounded-md h-20  overflow-hidden">
      <div
        className="w-full h-full bg-gradient-to-t from-neutral-600 from-4% to-transparent  opacity-80 absolute"
        style={{ zIndex: 1 }}
      />
      <div className=" w-full flex flex-col gap-2" style={{ zIndex: 2 }}>
        <div className="w-full flex flex-col gap-1 px-2">
          <div className="flex justify-between text-white items-center">
            <div className="flex flex-col overflow-hidden">
              <p className="text-white font-medium truncate">{name}</p>
              <p className="text-sm">{getHumanizedFileSize(size)}</p>
            </div>
            <div>
              {progress === 100 ? (
                <Check
                  className="text-green-500 font-extrabold ml-4"
                  size={24}
                  strokeWidth={3}
                />
              ) : (
                <button className="flex px-4 py-2 bg-white rounded-lg text-xs items-center justify-center text-black">
                  {hasFailed ? "Re Upload" : "Cancel"}
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center text-white gap-2">
            <div className="bg-white w-full h-1 rounded-md flex-1">
              <div
                className={` h-1 ${
                  hasFailed
                    ? "bg-error-500"
                    : progress === 100
                    ? "bg-green-500"
                    : "bg-black"
                } rounded-md`}
                style={{
                  width: `${hasFailed ? 100 : progress}%`,
                  transition: "ease-out width",
                }}
              />
            </div>
            <p className="text-white text-sm">
              {hasFailed ? "Failed" : `${progress}%`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
