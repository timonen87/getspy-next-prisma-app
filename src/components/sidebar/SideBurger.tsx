import { FC } from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { signOut } from "next-auth/react";
import {
  ChevronLeft,
  BookMarked,
  Menu,
  MenuSquare,
  ArrowDownUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import Link from "next/link";
import { buttonVariants } from "../ui/Button";
// import SearchBar from "../SearchBar";

const menu = [
  { text: "Лента", icon: <Menu />, path: "/" },
  { text: "Все", icon: <MenuSquare />, path: "/all" },
  { text: "Закладки", icon: <BookMarked />, path: "/bookmarks" },
  { text: "Подписки", icon: <ArrowDownUp />, path: "/follows" },
];

interface SideBurgerProps {
  isVisible: boolean;
  onClose: () => void;
}

const SideBurger: FC<SideBurgerProps> = ({ isVisible, onClose }) => {
  const pathname = usePathname();
  if (!isVisible) return null;

  const hendleClose = (event) => {
    if (event.target.id == "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-zinc-900/20 z-10"
      id="wrapper"
      onClick={hendleClose}
    >
      <div className="p-6 w-80 h-screen bg-white z-50 fixed top-0 -left-0 peer:transition peer-focus:left-0  ease-out delay-150 duration-200">
        <div className="flex flex-col justify-start item-center">
          <div className="flex justify-between items-center gap-4 pb-5">
            <h1 className="text-2xl cursor-pointer font-bold text-grey-900 w-full">
              GetSpy.ru
            </h1>
            <button className="cursor-pointer bg-slate-100 rounded hover:bg-slate-200">
              <X
                aria-label="close sidebar"
                className="h-6 w-6"
                onClick={() => onClose()}
              />
            </button>
          </div>
          <div className="my-2 border-b border-gray-100 pb-5">
            {/* <SearchBar /> */}
          </div>

          {/* setting  */}

          <div className="my-2 border-b border-gray-100">
            <ul className="flex flex-col justify-start gap-4 mb-2">
              {menu.map((obj) => (
                <li key={obj.path}>
                  <Link
                    href={obj.path}
                    // className={buttonVariants({
                    //   variant: pathname == obj.path ? "subtle" : "ghost",
                    // })}
                  >
                    <div className="flex mb-2 justify-start items-center gap-4 pl-5   hover:bg-zinc-100 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <div className="text-2xl  text-gray-600">{obj.icon}</div>
                      <h3 className="text-base text-gray-800">{obj.text}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* logout */}
          <div className=" my-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineLogout
                className="text-2xl text-gray-600 group-hover:text-white "
                onSelect={(event) => {
                  event.preventDefault();
                  signOut({
                    callbackUrl: `${window.location.origin}/sign-in`,
                  });
                }}
              />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Выход
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBurger;
