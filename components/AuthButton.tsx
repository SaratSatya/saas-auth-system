export function AuthButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}
