function NewsRow({ title, creator, country, description, imgUrl, sourceUrl }) {
  return (
    <div className="px-10 py-5 lg:max-w-[80%] flex flex-col items-center bg-white/5 m-10 text-stone-300 gap-3 text-center">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-stone-200 ">
        {title}
      </h2>
      <div className="text-sm sm:text-lg lg:text-xl">
        {creator} ({country.at(0)[0].toUpperCase() + country.at(0).slice(1)})
      </div>
      <img
        src={imgUrl}
        alt="Image not available"
        className="sm:h-80 lg:h-100"
      />
      <div className="text-sm lg:text-lg">
        {description || "No description (you can read the original article)"}
      </div>
      <a className="text-blue-200" href={sourceUrl} target="_blank">
        Orginal article
      </a>
    </div>
  );
}

export default NewsRow;
