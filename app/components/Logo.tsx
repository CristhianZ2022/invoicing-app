import { FaReact } from "react-icons/fa";
import { bebas_neue } from "../ui/fonts";

export function Logo() {
  return (
    <div
      className={`${bebas_neue.className} w-40 flex flex-row items-center leading-none text-white`}
    >
      <FaReact className="h-20 w-20 rotate-[15deg]" />
      <p className="text-[30px] ml-3">CrisftWare</p>
    </div>
  );
};
