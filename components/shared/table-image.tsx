"use client";

import { Room } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface TableImageProps {
  row: Room;
}

const TableImage: React.FC<TableImageProps> = ({ row }) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={
          row.image
            ? row.image
            : "https://jolfgowviyxdrvtelayh.supabase.co/storage/v1/object/public/static%20images/Group%2052%20(1).png"
        }
        alt="room-image"
        height={120}
        width={120}
        className="aspect-square object-cover"
      />
      <div>
        <p className="text-xl text-yellow-500">
          Php. {row.price} <span className="text-secondary">per night</span>
        </p>
        <h3 className="text-2xl reak-all whitespace-pre-wrap text-secondary">
          {row.roomType}
        </h3>
      </div>
    </div>
  );
};

export default TableImage;
