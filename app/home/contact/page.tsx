import NotFound from "@/app/not-found";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FetchDataError from "@/components/ui/fetch-data-error";
import { getUserById } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  const currentUser = await getUserById(session.user.id);

  if (!currentUser.data) {
    return <NotFound />;
  }

  if (currentUser.error) {
    return <FetchDataError />;
  }

  return (
    <Card className="z-50 w-[60%] h-[55%] flex items-center justify-center flex-col space-y-4 p-16">
      <h1 className="text-xl text-secondary">
        For further details, feel free to reach out to us via email:{" "}
      </h1>
      <Link
        href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwfJhbmtbjHwFGlGNNfFLGJMVtvwtHgxCTlDdXQTDgzVFkpdGXSXsLLLJPvNdDHTZJcrZC"
        target="_blank"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-4xl text-yellow-500 border-none"
        )}
      >
        InnSightHotel@email.com
      </Link>
    </Card>
  );
};

export default page;
