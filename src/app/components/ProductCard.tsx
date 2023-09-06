import { useState } from "react";
import { Trash2Icon, XIcon } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Image from "next/image";
import axios from "axios";
import Loader from "@/components/Loader";

interface IProductCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  price: number;
  onDelete: () => void;
}

function ProductCard(props: IProductCardProps) {
  const { url, title, description, price, onDelete, id } = props;
  const [openConsentModal, setOpenConsentModal] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteProduct = async (id: string) => {
    setIsDeleting(true);
    try {
      await axios.delete(`/product/${id}`);

      onDelete();
    } catch (err) {
      alert("Error Deleting Product");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="bg-white relative rounded-md overflow-hidden  hover:shadow-lg border-black border ">
      <div
        role="button"
        aria-label="Delete Icon"
        onClick={(e) => {
          e.stopPropagation();
          setOpenConsentModal(true);
        }}
        className="bg-white rounded-full absolute z-10 p-2 hover:scale-125 transition cursor-pointer top-5 right-5 text-red-400"
      >
        <Trash2Icon size={16} />
      </div>
      <Modal onClose={() => setOpenConsentModal(false)} open={openConsentModal}>
        <div className="max-w-lg pb-4">
          <div className="bg-black text-white font-semibold  p-2 flex justify-between items-center">
            <p> Are you sure?</p>
            <div
              role="button"
              className="flex items-center "
              onClick={() => setOpenConsentModal(false)}
            >
              <XIcon />
            </div>
          </div>
          <div className="p-2 text-md text-neutral-700">
            Once deleted, the product can not be recovered. All of its data will
            be removed. Please be sure before deleting the product.
          </div>
          <div className="flex justify-end gap-2 px-2">
            <Button variant="outlined">Cancel</Button>
            <Button onClick={() => onDeleteProduct(id)}>
              {isDeleting ? <Loader /> : "Yes, I am sure"}
            </Button>
          </div>
        </div>
      </Modal>
      <div
        style={{ position: "relative", height: "200px", overflow: "hidden" }}
      >
        <Image
          alt="Mountains"
          src={url}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>
      <div className="flex flex-col px-2 py-4 gap-4">
        <div className="flex justify-between">
          <p className="font-medium text-lg truncate flex-1">{title}</p>
          <p className="text-xl font-semibold pl-2">
            Rs. {Number(price)?.toLocaleString()}
          </p>
        </div>
        <p className="text-neutral-600 text-sm line-clamp-3">{description}</p>
      </div>
      <div className="flex justify-end p-2">
        <Button onClick={() => alert("Not Implemented")}> Add to card</Button>
      </div>
    </div>
  );
}

export default ProductCard;
