"use client";

import { BookingProps } from "@/types/booking";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { BookStatus, CheckIn } from "@prisma/client";
import { updateCheckInStatus } from "@/lib/actions/book.actions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface GuestTableActionsProps {
  row: BookingProps;
}

const GuestTableActions: React.FC<GuestTableActionsProps> = ({ row }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function handleCheckIn(value: CheckIn, status?: BookStatus) {
    setIsLoading(true);

    const response = await updateCheckInStatus(value, row.id, status);

    if (response.status === 200) {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["guests-data"] });
    } else {
      setIsLoading(false);
      toast.error("Uh oh! Something went wrong.", {
        description:
          "An error occurred while making the request. Please try again later",
      });
    }
  }

  return (
    <div>
      {row.checkInStatus === CheckIn.PENDING ? (
        <Button
          variant="secondary"
          onClick={() => handleCheckIn(CheckIn.CHECKEDIN)}
          disabled={isLoading}
        >
          Check in
        </Button>
      ) : row.checkInStatus === CheckIn.CHECKEDIN ? (
        <Button
          onClick={() => handleCheckIn(CheckIn.CHECKOUT, BookStatus.COMPLETED)}
          disabled={isLoading}
        >
          Check out
        </Button>
      ) : (
        <Button disabled>Checked out</Button>
      )}
    </div>
  );
};

export default GuestTableActions;
