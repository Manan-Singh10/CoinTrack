function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center text-white h-20 w-full bg-white/10 text-[12px] sm:text-lg lg:text-xl">
      © {year} Cointrack | All rights reserved |&nbsp;
      <a
        className="text-green-200"
        href="https://github.com/Manan-Singh10"
        target="_blank"
      >
        Github
      </a>
    </footer>
  );
}

export default Footer;
