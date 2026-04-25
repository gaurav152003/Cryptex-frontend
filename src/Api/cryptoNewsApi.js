export const fetchCryptoNews = async () => {
  try {
    const res = await fetch(
      "https://min-api.cryptocompare.com/data/v2/news/?lang=EN",
      {
        headers: {
          authorization: `Apikey ${import.meta.env.VITE_CRYPTO_API_KEY}`,
        },
      },
    );

    const data = await res.json();
    return (data.Data || []).slice(0, 30);
  } catch (err) {
    console.error("CryptoCompare fetch error", err);
    return [];
  }
};
