interface ButtonProps {
    text: string;
    
    className?: string;
    onClick ?: () => void
  }
  
  export function Button({ text, className = "", onClick }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`w-full max-w-md h-12 rounded-xl bg-[#63FBEF] text-[#0E0E0E] font-semibold text-lg hover:bg-[#4ee0d4] transition-all duration-200 ease-in-out ${className}`}
      >
        {text}
      </button>
    );
  }
  