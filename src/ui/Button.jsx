function Button({ children }) {
  return (
    <button className="text-stone-100 text-lg sm:text-xl  bg-[#5200C5] p-4 rounded-4xl font-semibold mt-5">
      {children}
    </button>
  );
}

export default Button;
