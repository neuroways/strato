import type { PropsWithChildren } from 'react';

type AppShellProps = PropsWithChildren<{ appName: string; version: string }>;

export default function AppShell({ appName, version, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">NeuroPlay · Development</p>
          <h1>{appName}</h1>
        </div>
        <span className="version-badge">v{version}</span>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <span>{appName}</span>
        <span>Build {version}</span>
      </footer>
    </div>
  );
}
