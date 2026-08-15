export function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="border-b border-slate-200 bg-white px-4 py-4 md:px-6">
        <h1 className="text-xl font-bold text-slate-900">Administration</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}
