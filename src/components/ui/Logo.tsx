
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
}

const Logo = ({ className = "", variant = "full" }: LogoProps) => {
  return (
    <Link
      to="/"
      className={`font-bold flex items-center gap-1.5 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {variant === "full" ? (
        <img 
          src="/lovable-uploads/0917dd1a-52c0-48f9-8df8-7ac2546d2955.png" 
          alt="Club de Programación FIUNA" 
          className="h-10"
        />
      ) : (
        <div className="text-2xl flex items-center">
          <span className="text-cpf-blue border-2 border-cpf-blue p-1 rounded-md flex items-center justify-center w-8 h-8">
            &lt;
          </span>
          <span className="gradient-text font-extrabold">cpf</span>
          <span className="text-cpf-blue border-2 border-cpf-blue p-1 rounded-md flex items-center justify-center w-8 h-8">
            &gt;
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
