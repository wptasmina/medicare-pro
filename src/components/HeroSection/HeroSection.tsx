import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-14">
      <div className="w-11/12 mx-auto  py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-center self-start md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none self-start  px-3 md:px-0">
              <h2 className="pt-3 lg:text-6xl text-4xl font-extrabold">
                Welcome to <span className="text-[#022dbb]">Medicare Pro</span>,
                <br />
                Where <span className="text-[#022dbb]">Care</span> Meets
                Excellence
              </h2>
              <p className="py-4 lg:w-[550px]">
                Medicare Por helps hospitals perform their daily operations
                quickly, accurately, and efficiently with the help of advanced
                technology.
              </p>
              <Link href="/doctor">
                <Button className="bg-[#022dbb] dark:text-white px-4 py-2 inline-flex cursor-pointer ">
                  Explorer
                  <ArrowUpRight />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image section */}
          <div>
            <Image
              src="/banner.png"
              width={600}
              height={400}
              className="rounded"
              alt="Doctor image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
