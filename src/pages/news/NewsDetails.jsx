import { useLocation, useNavigate } from "react-router-dom";

const NewsDetails = () => {
  const navigate = useNavigate();
  const { state: news } = useLocation();

  if (!news) {
    navigate("/news");
    return null;
  }

  const fullText = `
${news.body}


`;

  return (
    <div className="max-w-4xl mx-auto  mt-10 px-6 py-8">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-6">
        ← Back
      </button>

      <img
        src={news.imageurl || "/news-placeholder.jpg"}
        alt={news.title}
        className="w-full h-80 object-cover border border-white/20 p-2 rounded-lg mb-5"
      />
      <h1 className="text-3xl font-bold mb-3">{news.title}</h1>

      <p className="text-gray-400 mb-6">
        {new Date(news.published_on * 1000).toDateString()}
      </p>

      <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
        {fullText}
      </p>

      <a
        href={news.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-8 text-blue-500"
      >
        Read full article →
      </a>
    </div>
  );
};

export default NewsDetails;
