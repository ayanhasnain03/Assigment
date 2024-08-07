import ModelButton from "@/components/shared/Buttons/ModelButton";
import Image from "next/image";
import getCurrentUser from "./api/actions/getCurrentUser";
import ProfileButton from "@/components/shared/Buttons/ProfileButton";

const Home = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col justify-between items-center relative">
      <div className="flex items-center justify-center">
        <Image
          src="/Auth.svg"
          alt="Next.js Logo"
          width={500}
          height={500}
          priority
        />
      </div>
      {user ? (
        <ProfileButton text="Welcome" userId={user.id} />
      ) : (
        <ModelButton />
      )}
    </div>
  );
};

export default Home;
