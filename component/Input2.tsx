interface InputProps {
    placeholder: string;
    logo?: string;
    logo2?:string;
    value?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string | "text";
    onIcon2Click?: () => void;
    
  }
  
  export function Input2({ logo, placeholder ,logo2, value,onChange,type ,onIcon2Click}: InputProps) {
    return (
      <div className="relative w-full max-w-lg">
        {logo && (
          <img
            src={logo}
            alt="input icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain"
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-[#272727] text-[#A3A3A3] w-full h-12 rounded-xl font-medium text-base outline-none pr-4 ${
            logo ? "pl-12" : "pl-4"
          }`}
        />

{logo2 && (
          <img
            src={logo2}
            alt="input icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain cursor-pointer"
            onClick={onIcon2Click}
          />
        )}
      </div>
    );
  }
  