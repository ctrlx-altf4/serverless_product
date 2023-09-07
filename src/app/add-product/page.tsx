"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ArrowLeftCircle } from "lucide-react";

import FileUpload from "@/components/FileUpload";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Loader from "@/components/Loader";

import axios from "@/lib/axios";

type FieldNames = "description" | "price" | "title" | "imageKey";
export default function Home() {
  const [description, setDescription] = useState("");

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFileUploaded) {
      alert("Please wait for the file to be uploaded successfully");
      return;
    }
    const _formData = new FormData(e.currentTarget);
    const title = _formData.get("title");
    const description = _formData.get("description");
    const price = _formData.get("price");
    const imageKey = _formData.get("imageKey");

    const data = {
      title,
      description,
      price,
      imageKey,
    };
    setIsSubmitting(true);
    try {
      await axios.post("/product", data);
      alert("created successfully");
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkValidity = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const _err = error;
    const name = e.currentTarget.name as FieldNames;

    const validity = e.currentTarget.validity;
    if (validity.valid) {
      _err.delete(name);
    }
    if (validity.tooShort) {
      _err.set(name, "Min. 100 characters are required");
    }
    if (validity.valueMissing) {
      _err.set(name, "Required");
    }
    setError(new Map(_err));
  };

  const [error, setError] = useState<Map<FieldNames, string>>(new Map());

  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div>
        <Link
          href="/"
          className="flex gap-4 items-center my-4 hover:underline w-fit"
        >
          <ArrowLeftCircle />
          Go Back
        </Link>
      </div>
      <h1 className="text-lg font-semibold">Add Product</h1>

      <p className="text-sm text-neutral-600">
        This information will be displayed publicly so be careful what you
        share.
      </p>
      <form
        className=" md:p-4 rounded-md  my-4 md:shadow-md"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-6 ">
          <div>
            <label htmlFor="name" className="text-neutral-800 font-medium">
              Title
            </label>
            <Input
              id="name"
              placeholder="Enter Product title"
              required
              name="title"
              onInvalid={(err) => {
                checkValidity(err);
              }}
              onChange={(e) => {
                if (error.has("title")) {
                  checkValidity(e);
                }
              }}
            />
            <span className="text-xs text-red-400">{error.get("title")}</span>
          </div>
          <div>
            <div className="flex gap-8 items-center justify-between">
              <label
                htmlFor="description"
                className="text-neutral-800 font-medium"
              >
                Description{" "}
                <span className="text-xs font-light">
                  ( Min. 100 Characters)
                </span>
              </label>
              <span className="text-sm">{description.length ?? 0}</span>
            </div>
            <Textarea
              id="description"
              required
              name="description"
              minLength={100}
              onInvalid={(err) => {
                checkValidity(err);
              }}
              placeholder="Enter Product description"
              onChange={(e) => {
                if (error.has("description")) {
                  checkValidity(e);
                }
                setDescription(e.target.value);
              }}
              rows={5}
            />

            <span className="text-xs text-red-400">
              {error.get("description")}
            </span>
          </div>
          <div>
            <label htmlFor="price" className="text-neutral-800 font-medium">
              Price
            </label>
            <Input
              id="price"
              required
              name="price"
              type="number"
              onKeyDown={(e) => {
                if (["+", "-", "e"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onInvalid={(err) => {
                checkValidity(err);
              }}
              onChange={(e) => {
                if (error.has("price")) {
                  checkValidity(e);
                }
              }}
            />
            <span className="text-xs text-red-400">{error.get("price")}</span>
          </div>
          <div>
            <label>Image</label>
            {/*TODO: Delete Image Feature Not Implemented*/}
            <FileUpload
              onUploadSuccess={() => setIsFileUploaded(true)}
              onUploadFailed={() => setIsFileUploaded(false)}
              onChange={(e) => {
                if (error.has("imageKey")) {
                  checkValidity(e);
                }
              }}
              onInvalid={(err) => {
                checkValidity(err);
              }}
            />
            <span className="text-xs text-red-400">
              {error.get("imageKey")}
            </span>
          </div>
        </div>

        <div className="flex mt-4 justify-between md:justify-end gap-4">
          <Button variant="outlined" type="reset">
            Reset
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loader /> : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
}
