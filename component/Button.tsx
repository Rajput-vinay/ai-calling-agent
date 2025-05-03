interface ButtonProps {
    text: string;
    
    className?: string;
    onClick ?: () => void
  }
  
  export function Button({ text, className = "", onClick }: ButtonProps) {
    const hasMaxW = /\bmax-w-[^\s]+\b/.test(className);
  const defaultMaxW = hasMaxW ? "" : "max-w-md";
    return (
      <button
        onClick={onClick}
        className={`w-full ${defaultMaxW} h-12 rounded-xl bg-[#63FBEF] hover:bg-[#40eedf] text-[#0E0E0E] font-semibold text-lg transition-all duration-200 ease-in-out ${className} cursor-pointer`}
      >
        {text}
      </button>
    );
  }
  