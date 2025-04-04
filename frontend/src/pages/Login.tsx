import { LoginForm } from "@/components/Loginform";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg border-1 border-zinc-700 p-20 rounded-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
