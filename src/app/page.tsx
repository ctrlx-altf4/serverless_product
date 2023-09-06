"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { PlusIcon } from "lucide-react";

import Button from "@/components/Button";
import ProductCard from "@/app/components/ProductCard";
import ProductSkeleton from "@/app/components/ProductSkeleton";
import axios from "@/lib/axios";

interface IProductDataType {
  title: string;
  imageKey: string;
  imageUrl: string;
  description: string;
  id: string;
  price: number;
}
export default function Home() {
  const [data, setData] = useState<IProductDataType[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState("IDLE");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setStatus("LOADING");
    try {
      const _data = await axios.get<IProductDataType[]>("/product");
      setStatus("SUCCESS");
      setData(_data.data);
    } catch (err) {
      setStatus("FAILED");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex mt-4 pb-1 items-center justify-between ">
        <div className="flex gap-1 flex-col mt-4 pb-1">
          <h1 className="text-xl font-bold">Products</h1>
          <p className="text-sm">Top picks for today</p>
        </div>
        <div>
          <Link href="add-product">
            <Button>
              <div className="flex gap-3 items-center">
                <PlusIcon size={16} />
                Add product
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridGap: "16px",
          rowGap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, auto))",
        }}
      >
        {isLoading && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}

        {data?.map((d) => {
          return (
            <ProductCard
              key={d.id}
              id={d.id}
              url={d.imageUrl}
              title={d.title}
              description={d.description}
              price={d.price}
              onDelete={() => fetchData()}
            />
          );
        })}
        {status === "FAILED" && (
          <div className="mt-4 flex flex-col items-center justify-center py-20 w-full bg-red-100 rounded-md">
            <p>Something went wrong</p>
          </div>
        )}
        {data && data.length < 1 && (
          <div className="mt-4 flex flex-col items-center justify-center py-20 w-full bg-neutral-100 rounded-md">
            <p>No products added to display</p>
            <Link href="add-product">
              <Button>Add Products</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
