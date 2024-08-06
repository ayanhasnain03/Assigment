import ModelButton from "@/components/shared/Buttons/ModelButton";
import Image from "next/image";

const Home = () => {
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
      <div className="absolute bottom-20">
        <ModelButton />
      </div>
    </div>
  );
};

export default Home;
