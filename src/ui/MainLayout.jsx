function MainLayout({ children }) {
  return (
    <div className="min-h w-[90%] bg-white/5 rounded-4xl px-2 py-1 text-[12px] sm:text-lg lg:text-xl text-stone-300 overflow-y-scroll custom-scrollbar flex items-center justify-center  m-2.5">
      {children}
    </div>
  );
}

export default MainLayout;
