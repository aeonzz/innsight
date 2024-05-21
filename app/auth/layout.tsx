import Image from "next/image";
import bg from "@/public/441878683_969706121316541_6659600609965985987_n.jpg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }
  return (
    <section className="w-full h-screen flex">
      <div className="flex-1">
        <Image
          src={bg}
          alt="bg"
          width={500}
          height={500}
          quality={100}
          className="w-full h-full object-cover object-left"
        />
      </div>
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </section>
  );
}
