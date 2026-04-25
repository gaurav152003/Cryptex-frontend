const MiniSparkline = ({ price, change }) => {
  const pointsCount = 30;
  const volatility = Math.abs(change) / 100 || 0.01;

  let value = price;
  const data = Array.from({ length: pointsCount }, () => {
    const rand = (Math.random() - 0.5) * volatility * price;
    value += rand;
    return value;
  });

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min || 1)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width="140"
      height="35"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={change < 0 ? "#ef4444" : "#22c55e"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MiniSparkline;
