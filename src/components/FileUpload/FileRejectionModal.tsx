import { AlertCircle } from "lucide-react";
import Modal from "@/components/Modal";
import { getHumanizedFileSize } from "@/components/FileUpload/function";
import Button from "@/components/Button";

interface IFileRejectionModal {
  open: boolean;
  onClose: () => void;
  file: File;
  reason: "NOT_SUPPORTED" | "TOO_LARGE";
}
function FileRejectionModal({
  open,
  onClose,
  reason,
  file,
}: IFileRejectionModal) {
  return (
    <Modal onClose={onClose} open={open}>
      <div className=" max-w-lg relative flex flex-col gap-4 bg-white rounded-md shadow overflow-hidden">
        <div className="w-full bg-black text-white p-6 py-3 flex gap-2 items-center">
          <AlertCircle />
          <p className=" font-medium">File you uploaded is rejected</p>
        </div>
        <div className="px-6 flex flex-col gap-4">
          <p className="text- text-sm font-semibold">
            File that you have selected{" "}
            {reason === "NOT_SUPPORTED"
              ? "is not supported"
              : "is  too large to upload."}
          </p>
          {reason === "NOT_SUPPORTED" && (
            <p className=" text-sm">
              Your File Type: <b className="text-sm">{file.type}</b>
            </p>
          )}
          {reason === "TOO_LARGE" && (
            <p className=" text-sm">
              Your File size:{" "}
              <b className="text-sm">{getHumanizedFileSize(file.size)}</b>
            </p>
          )}
          <div className="flex flex-col items-start gap-2 p-2 border border-neutral-500 rounded-lg">
            Acceptance Criteria:
            <ol>
              <li>
                <p className="text-sm  font-medium">
                  1. <b>Supported type: </b> .jpg .jpeg .png .webp
                </p>
              </li>
              <li>
                <p className="text-sm  font-medium">
                  2. Should be less than 10 MB
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end items-center space-x-4 px-6 pb-4">
          <Button onClick={() => onClose()}>Okay, Got it!</Button>
        </div>
      </div>
    </Modal>
  );
}

export default FileRejectionModal;
