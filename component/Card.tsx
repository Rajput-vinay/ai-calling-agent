import Image from "next/image";

interface CardProps {
  imageurl: string;
  num: string;
  desc: string;
  rgba: string; // Used in gradient for circle
}

export function Card({ imageurl, desc, num, rgba }: CardProps) {
  return (
    <div className="relative w-full md:w-40 lg:w-60 rounded-[12px] overflow-hidden">
      {/* Circular Gradient Overlay with dynamic rgba */}
      <div
        className="absolute -top-[250px] -right-[200px] w-[400px] h-[400px] z-30 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${rgba} 0%, rgba(0,0,0,0.2) 60%, transparent 80%)`,
          filter: "blur(60px)",
          opacity: 0.6,
        }}
      />

      {/* Card Content */}
      <div className="relative z-20 flex flex-col justify-between gap-12 p-6 h-full border border-white/10 shadow-md bg-[#1C1C1C] rounded-[12px]">
        {/* Icon */}
        <div>
          <Image
            src={imageurl}
            width={32}
            height={32}
            alt="Card icon"
            className="object-contain"
          />
        </div>

        {/* Text Info */}
        <div>
          <h2 className="text-2xl font-semibold text-white">{num}</h2>
          <p className="text-sm text-[#A3A3A3]">{desc}</p>
        </div>
      </div>

      {/* Star Decorations */}
      <div
        className="absolute right-3 top-2 z-20"
        style={{
          width: "16px",
          height: "16px",
          background: "url('/assets/dashboard/star1.png') no-repeat center",
          backgroundSize: "contain",
        }}
      />
      <div
        className="absolute right-8 top-6 z-20"
        style={{
          width: "10px",
          height: "10px",
          background: "url('/assets/dashboard/star2.png') no-repeat center",
          backgroundSize: "contain",
        }}
      />
      <div
        className="absolute right-2 top-8 z-20"
        style={{
          width: "10px",
          height: "10px",
          background: "url('/assets/dashboard/star3.png') no-repeat center",
          backgroundSize: "contain",
        }}
      />
    </div>
  );
}
