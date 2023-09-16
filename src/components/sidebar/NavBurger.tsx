"use client";
import { buttonVariants } from "../ui/Button";
import { FC, useState } from "react";

import SideBurger from "./SideBurger";
import { Icons } from "../Icons";

interface NavBurgerProps {}

const NavBurger: FC<NavBurgerProps> = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="cursor-pointer bg-slate-100 rounded hover:bg-slate-200 p-1"
        onClick={() => setShowModal(true)}
      >
        <Icons.burger />
      </button>

      <SideBurger isVisible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default NavBurger;
