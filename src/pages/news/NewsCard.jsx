const NewsCard = ({ item, onView }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-black hover:border-white/20 transition">
      <div className="h-44 overflow-hidden rounded-t-xl">
        <img
          src={
            item.imageurl
              ? `https://www.cryptocompare.com${item.imageurl}`
              : "/news-placeholder.png"
          }
          onError={(e) => (e.target.src = "/news-placeholder.png")}
          className="w-full h-full object-cover"
          alt={item.title}
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>

        <p className="text-sm text-gray-400 line-clamp-2 mt-2">{item.body}</p>

        <button
          onClick={onView}
          className="mt-4 text-blue-500 hover:underline text-sm"
        >
          View more →
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
