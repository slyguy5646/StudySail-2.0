import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh]">
      <div className="flex w-full justify-center">
        <SignIn appearance={{ variables: { colorPrimary: "#06b6d4" } }} />
      </div>
    </div>
  );
}
