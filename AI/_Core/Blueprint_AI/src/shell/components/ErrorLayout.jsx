export function ErrorLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
