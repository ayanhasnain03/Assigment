import LogoutButton from "./Buttons/LogoutButton";
import { CgProfile } from "react-icons/cg";
const Navbar = ({ currentUser }: { currentUser: string | undefined }) => {
  return (
    <header className="flex items-center justify-between p-8 text-zinc-200">
      <div className="text-3xl font-bold">
        <a href="/">Home</a>
      </div>

      <div>{currentUser ? <LogoutButton /> : <></>}</div>
    </header>
  );
};
export default Navbar;
