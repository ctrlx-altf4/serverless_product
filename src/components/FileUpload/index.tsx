import { useState } from "react";
import Image from "next/image";
import ProgressIndicator from "@/components/FileUpload/ProgressIndicator";
import useFileUploader from "@/components/FileUpload/useFileUploader";
import FileRejectionModal from "@/components/FileUpload/FileRejectionModal";

const getImageUrl = (image: string | File) => {
  return typeof image == "string" ? image : URL.createObjectURL(image);
};

const acceptedFiles = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

type FileRejectionType = "NOT_SUPPORTED" | "TOO_LARGE";
function isFileRejected(file: File): FileRejectionType | false {
  const extensions = file.type;

  if (!acceptedFiles.includes(extensions)) {
    return "NOT_SUPPORTED";
  }

  // if greater than 10MB
  if (file.size > 10 * 1000 * 1000) {
    return "TOO_LARGE";
  }
  return false;
}

//TODO: maybe return key on success
//TODO: maybe return reason on failure
interface IFileUpload {
  onUploadSuccess: () => void;
  onUploadFailed: () => void;
}
function FileUpload({ onUploadSuccess, onUploadFailed }: IFileUpload) {
  const { file, upload, progress, isFailed } = useFileUploader({
    onSuccess: () => {
      onUploadSuccess();
    },
    onFailed: () => {
      onUploadFailed();
    },
  });
  const [rejectedFiles, setRejectedFiles] = useState<{
    file: File;
    reason: FileRejectionType;
  } | null>(null);
  const fileUrl = file ? getImageUrl(file.file) : null;

  if (fileUrl) {
    return (
      <div className="relative">
        <div
          className="border border-black rounded-md py-4"
          style={{
            position: "relative",
            height: "300px",
            overflow: "hidden",
          }}
        >
          <Image
            alt="Mountains"
            src={fileUrl}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: "contain", // cover, contain, none
              overflow: "hidden",
            }}
          />
        </div>
        {!!progress && (
          <ProgressIndicator
            size={file?.file.size ?? 0}
            name={file?.file.name ?? "N/A"}
            progress={progress}
            hasFailed={isFailed}
          />
        )}
        <input
          className="opacity-0 absolute w-0 h-0"
          id="imageKey"
          value={file?.key}
          name="imageKey"
        />
      </div>
    );
  }
  return (
    <>
      <label
        htmlFor="image"
        className="border-neutral-400 cursor-pointer relative border hover:bg-slate-50 border-dashed rounded-md w-full  h-40 flex items-center justify-center"
      >
        <p className="text-neutral-600 text-center text-sm">
          Upload a file or drag and drop <br /> PNG, JPG, GIF up to 10MB
        </p>
        <input
          className="opacity-0 absolute w-0 h-0"
          id="image"
          type="file"
          accept={acceptedFiles.join(",")}
          onChange={async (f) => {
            const file = f.target.files?.[0];
            if (file) {
              const isRejected = isFileRejected(file);
              if (!isRejected) await upload(file);
              else {
                setRejectedFiles({ file, reason: isRejected });
              }
            }
          }}
        />
      </label>
      {rejectedFiles && (
        <FileRejectionModal
          open={!!rejectedFiles}
          onClose={() => setRejectedFiles(null)}
          file={rejectedFiles.file}
          reason={rejectedFiles.reason}
        />
      )}
    </>
  );
}

export default FileUpload;
