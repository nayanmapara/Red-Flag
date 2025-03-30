
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { Flag } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div 
          className="flex items-center gap-3 font-bold transition-all hover:text-primary" 
          onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}
        >
          <div className="p-2 rounded-lg bg-primary/10 shadow-sm">
            <Flag className="text-primary" size={24} />
          </div>
          <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Red Flag</span>
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
