import { Logo } from "../components/Logo";
import { twMerge } from "tailwind-merge";
import { signOut } from "@/auth";
import { FaPowerOff } from "react-icons/fa6";
import AncorsSideNav from "../helpers/Ancors";

function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <a
        href="#"
        className="mb-2 flex items-end justify-start bg-slate-900 p-2 md:h-40 rounded-md"
      >
        <div className="w-32 text-white mid:w-40">
          <Logo />
        </div>
      </a>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <AncorsSideNav />
        <div className="hidden h-auto w-full grow md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "http://localhost:3000" });
          }}
        >
          <button
            type="submit"
            className={twMerge(
              "flex w-full h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-lg text-white font-bold hover:bg-slate-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
            )}
          >
            <FaPowerOff className="w-6" />
            <p className="hidden md:block">Logout</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SideNav;
