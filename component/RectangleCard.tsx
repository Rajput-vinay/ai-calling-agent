interface RectangleCardProps {
    imageurl: string;
    title: string;
    description1: string;
    description2: string;
    description3?: string; // Optional prop
    onClick?: () => void;
  }
  
  export function RectangleCard({
    imageurl,
    title,
    description1,
    description2,
    description3,
    onClick
  }: RectangleCardProps) {
    return (
      <div className="bg-[#1C1C1C] w-full md:w-[20rem] lg:w-[22rem] xl:w-[33rem] max-w-full rounded-xl border-dashed border-[#A3A3A3] border-2">
        <div className="flex flex-col items-center justify-center p-6 sm:p-5" onClick={onClick}>
          <img
            src={imageurl}
            alt="Rectangle"
            className="w-10 h-10 mb-4 object-contain"
          />
          <h1 className="text-white text-md font-bold mb-2 text-center">{title}</h1>
          <p className="text-white text-sm text-center mb-1">{description1}</p>
          <p className="text-white text-sm text-center mb-1">{description2}</p>
          {description3 && (
            <p className="text-white text-sm text-center mb-4">{description3}</p>
          )}
        </div>
      </div>
    );
  }
  