import { useState } from "react";
import axios from "@/lib/axios";

export type FileDataType = {
  file: File;
  key?: string;
  remoteUrl?: string;
  name?: string;
};

// TODO: maybe add return urls in success
// TODO: maybe add reasons for failure
interface IUseFileUploader {
  onSuccess: () => void;
  onFailed: () => void;
}

const useFileUploader = (props: IUseFileUploader) => {
  const [file, setFile] = useState<FileDataType | null>(null);
  const [gettingKeys, setGettingKeys] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>();

  const [isFailed, setIsFailed] = useState(false);
  const uploadFile = async (put_url: string, file: File, key: string) => {
    const contentType = file.type;
    try {
      await axios.put(put_url, file, {
        headers: {
          "Content-Type": contentType,
        },
        onUploadProgress: (progress) => {
          if (progress.total) {
            const percentage = Math.round(
              (100 * progress.loaded) / progress.total,
            );
            setProgress(percentage);
          }
        },
      });
    } catch (e) {}
  };

  async function upload(file: File, name?: string) {
    setIsUploading(true);
    setGettingKeys(true);
    setIsFailed(false);

    const fileType = file.type.split("/")[1];

    const _files = { file, name };
    setFile(_files);

    try {
      const url = await axios.put<{ key: string; url: string; type: string }>(
        "/generate-put-url",
        { type: fileType },
      );

      setGettingKeys(false);
      setFile({ ..._files, key: url.data.key, remoteUrl: url.data.url });
      await uploadFile(url.data.url, file, name ?? url.data.key);
      props.onSuccess();
    } catch (err) {
      console.error(err);
      setIsFailed(true);
      props.onFailed();
    } finally {
      setIsUploading(false);
    }
  }

  const removeFile = (key: string | number) => {
    if (!file) return;
    setFile(null);
    setProgress(null);
  };

  const reset = () => {
    setFile(null);
    setIsUploading(false);
    setGettingKeys(false);
    setProgress(null);
  };

  return {
    upload,
    progress,
    isLoading: gettingKeys,
    file,
    isUploading,
    removeFile,
    reset,
    isFailed,
  };
};

export default useFileUploader;
