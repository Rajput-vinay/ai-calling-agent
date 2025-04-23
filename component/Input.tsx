interface InputProps {
    placeholder: string;
    logo?: string;
    logo2?:string;
    value?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export function Input({ logo, placeholder ,logo2, value,onChange}: InputProps) {
    return (
      <div className="relative w-full max-w-md">
        {logo && (
          <img
            src={logo}
            alt="input icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain"
          />
        )}
        <input
          type="text"
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
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain"
          />
        )}
      </div>
    );
  }
  