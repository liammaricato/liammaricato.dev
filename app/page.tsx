import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div id="hero" className="w-full md:w-[80%] min-h-[80vh] p-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-10">
        <div className="flex flex-col justify-center gap-1">
          <h2 className="text-4xl font-bold">Hey, I'm</h2>
          <h1 className="text-blue-500 text-6xl font-bold">Liam Maricato</h1>
          <p className="text-lg mt-4">
            I'm a software engineer with a passion for building web applications and mobile apps.
            I'm a software engineer with a passion for building web applications and mobile apps.
            I'm a software engineer with a passion for building web applications and mobile apps.
            I'm a software engineer with a passion for building web applications and mobile apps.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center min-w-[35%]">
          <Image src="/img/eu.jpeg" alt="Liam" width={500} height={500} className="rounded-4xl border-r-12 border-b-12 border-blue-500" />
        </div>
      </div>
    </div>
  );
}
