"use client";

import { defaultImages } from "@/data/images";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FormPickerProps {
  id: string;
}

export const FormPicker = ({ id }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const data = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        console.log(data);

        if (data && data.response) {
          const result = data.response;
          setImages(result as Array<Record<string, any>>);
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2">
        {images?.map((image) => (
          <div
            key={image.id}
            className="cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted"
            onClick={() => {
              setSelectedImage(image.id);
            }}
          >
            <input
              type="radio"
              name={id}
              id={id}
              className="hidden"
              checked={selectedImage === image.id}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt="board image from unsplash"
              className="object-cover rounded-sm"
              fill
            />
            {selectedImage === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
