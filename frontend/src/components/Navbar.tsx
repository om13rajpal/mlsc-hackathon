import { LucideLogOut } from "lucide-react";
import { ScoreDrawer } from "./Score";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = ({score}: any) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <div className="w-screen h-16 border-b-2 flex text-xl items-center px-10 font-semibold justify-between absolute">
      <h1>Hack MLSC</h1>
      <div className="flex items-center space-x-4">
        <ScoreDrawer score={score}/>
        <Button variant={"outline"} size={"icon"} onClick={handleLogout}>
          <LucideLogOut />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
