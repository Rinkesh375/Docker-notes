export default async function Home() {
  const res = await fetch("http://localhost:8000", { cache: "no-store" });
  const message = await res.text();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-xl text-blue-500 font-semibold flex flex-col space-y-2 text-center">
        <p>Response from server:</p>
        <h2>{message}</h2>
      </div>
    </div>
  );
}
