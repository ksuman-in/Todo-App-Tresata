import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  headerTitle: {
    title: string;
    isArrow: boolean;
  };
};

const Header = ({ headerTitle }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="pl-4 h-12 space-y-2 bg-tresata-color flex items-center">
      <h1 className="flex items-center gap-2 text-white font-semibold tracking-tight">
        {headerTitle?.isArrow && (
          <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        )}
        {headerTitle?.title}
      </h1>
    </header>
  );
};

export default Header;
