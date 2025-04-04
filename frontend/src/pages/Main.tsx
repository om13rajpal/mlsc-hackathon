import { LoginButton } from "@/components/Button";
import { Spotlight } from "../components/ui/spotlight-new";

const Main = () => {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center antialiased relative overflow-hidden">
      <Spotlight />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4">
          Hack MLSC <br />× Hacking is legal here ×
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Fire up your keyboards, breach limits, and build the future — one
          all-nighter at a time. Welcome to the playground of innovation.
        </p>
        <LoginButton />
      </div>
    </div>
  );
};

export default Main;
