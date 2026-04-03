import Link from "next/link";

export default function Home() {
  const years = ["2025", "2024", "2023"];

  return (
    <div>
      <h1>PYQ Quiz App</h1>

      {years.map(y => (
        <Link key={y} href={`/year/${y}`}>
          <button>{y}</button>
        </Link>
      ))}
    </div>
  );
}
