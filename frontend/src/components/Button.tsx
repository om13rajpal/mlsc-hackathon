import { useNavigate } from "react-router-dom";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function LoginButton() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  return (
    <div className="mt-6 flex justify-center text-center">
      <HoverBorderGradient
        onClick={handleClick}
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>Start Hacking</span>
      </HoverBorderGradient>
    </div>
  );
}
