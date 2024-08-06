"use client";
import LogoutButton from "./Buttons/LogoutButton";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const user = false;
  return (
    <header className="flex items-center justify-between p-8">
      <div>
        <LogoutButton />
      </div>
      <div>
        <CgProfile className="w-10 h-10" />
      </div>
    </header>
  );
};
export default Navbar;
