"use client";
import { useRouter } from "next/navigation";
interface ProfileButtonProps {
  text: string;
  userId: string;
}
const ProfileButton: React.FC<ProfileButtonProps> = ({ text, userId }) => {
  const router = useRouter();
  return (
    /* From Uiverse.io by Javierrocadev */
    <button
      onClick={() => router.push(`/profile/${userId}`)}
      className="overflow-hidden  w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
    >
      Profile
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom" />
      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
        {text}
      </span>
    </button>
  );
};
export default ProfileButton;
