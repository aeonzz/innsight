"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookingProps } from "@/types/booking";
import FetchDataError from "../ui/fetch-data-error";
import BookCard from "../ui/book-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";

interface ProfileScreenProps {
  currentUserData: UserType;
}

interface BookData {
  roomBooked: BookingProps[];
  bookHistory: BookingProps[];
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentUserData }) => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<BookData>({
    queryFn: async () => {
      const response = await axios.get(`/api/user/${currentUserData.id}`);
      return response.data.data;
    },
    queryKey: ["booked"],
  });

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Button
        variant="ghost"
        size="icon"
        className="text-secondary"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>
      <div className="w-full h-full flex">
        <div className="flex flex-col items-center w-[320px]">
          <Image
            src="https://jolfgowviyxdrvtelayh.supabase.co/storage/v1/object/public/static%20images/d2984ec4b65a8568eab3dc2b640fc58e.jpg"
            alt="profile"
            width={150}
            height={150}
            className="rounded-full"
          />
          <h3 className="text-4xl font-semibold text-secondary">
            {currentUserData.username}
          </h3>
        </div>
        <div className="flex-1">
          <Tabs defaultValue="reservation" className="w-full">
            <TabsList>
              <TabsTrigger value="reservation">Active Reservations</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="reservation" className="w-full">
              <h2 className="text-secondary text-2xl">Booked Rooms</h2>
              {isLoading ? (
                <div className="w-full h-[350px] flex items-center justify-center">
                  <LoaderCircle className="animate-spin text-secondary" />
                </div>
              ) : isError ? (
                <FetchDataError />
              ) : (
                <div className="h-[500px] overflow-y-scroll">
                  {data?.roomBooked.map((book, index) => (
                    <BookCard key={index} book={book} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="history" className="w-full">
              <h2 className="text-secondary text-2xl">Reservation History</h2>
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <LoaderCircle className="animate-spin text-secondary" />
                </div>
              ) : isError ? (
                <FetchDataError />
              ) : (
                <div className="h-[500px] overflow-y-scroll">
                  {data?.roomBooked.map((book, index) => (
                    <BookCard key={index} book={book} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
