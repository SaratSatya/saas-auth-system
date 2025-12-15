export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-semibold text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}
