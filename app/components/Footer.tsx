import Link from "next/link";

import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row gap-10 justify-between items-center lg:items-start bg-white text-black px-8 sm:px-20 py-8">
      <div className="flex-1 flex w-full justify-center sm:justify-start sm:w-auto lg:px-10 lg:py-12">
        <span className="text-[2.5em] font-black text-black">
          Liam Maricato
        </span>
      </div>
      <div className="w-full sm:w-auto flex-1 lg:flex-auto flex flex-col gap-8 lg:flex-row lg:gap-4">
        <div className="flex-1 flex flex-col items-start gap-4">
          <h3 className="font-black text-l">CONTACT ME</h3>
          <p className="text-l">Does my skillset match your needs? Get in touch!</p>
          <Link
            className="py-2 px-5 text-l font-black bg-violet-900 text-white w-auto rounded-full"
            href="mailto:liammaricato@gmail.com"
          >
            E-mail me
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-4 lg:p-8">
          <div className="flex gap-4">
            <a href="https://www.instagram.com/liammaricato/" target="_blank">
              <FaInstagram className="w-8 h-8 text-violet-900" />
            </a>
            <a href="https://github.com/liammaricato" target="_blank">
              <FaGithub className="w-8 h-8 text-violet-900" />
            </a>
            <a href="https://www.linkedin.com/in/liammaricato/" target="_blank">
              <FaLinkedin className="w-8 h-8 text-violet-900" />
            </a>
          </div>
          <p className="text-l">&copy; 2025 Liam Maricato</p>
        </div>
      </div>
    </footer>
  );
}
