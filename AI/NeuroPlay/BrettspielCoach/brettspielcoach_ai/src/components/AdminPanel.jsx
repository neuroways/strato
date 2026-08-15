import { useState } from 'react';
import { Settings, Database, ArrowLeft, Upload, Users } from 'lucide-react';
import { AdminDataBrowser } from './AdminDataBrowser';
import { AdminExcelUpload } from './AdminExcelUpload';
import { AdminUserManagement } from './AdminUserManagement';

export function AdminPanel({ onBack, currentUser }) {
  const [activeTab, setActiveTab] = useState('data-browser');

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Admin Header */}
      <div style={{
        borderBottom: `1px solid var(--nw-border)`,
        padding: '1.5rem',
        background: 'linear-gradient(135deg, var(--nw-primary) 0%, var(--nw-secondary) 100%)'
      }}>
        <div style={{
          maxWidth: '90rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings className="w-8 h-8" style={{ color: '#ffffff' }} />
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              color: '#ffffff'
            }}>
              Verwaltung
            </h1>
          </div>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              color: '#ffffff',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'background 150ms'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        borderBottom: `2px solid var(--nw-secondary)`,
        background: '#f9fafb',
        overflowX: 'auto'
      }}>
        <div style={{
          maxWidth: '90rem',
          margin: '0 auto',
          padding: '0',
          display: 'flex',
          gap: '0'
        }}>
          <button
            onClick={() => setActiveTab('data-browser')}
            style={{
              padding: '1rem 1.5rem',
              fontWeight: 600,
              borderBottom: activeTab === 'data-browser' ? `3px solid var(--nw-primary)` : 'none',
              color: activeTab === 'data-browser' ? 'var(--nw-primary)' : 'var(--nw-text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 150ms',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => !['data-browser'].includes(activeTab) && (e.target.style.color = 'var(--nw-primary)')}
            onMouseLeave={(e) => !['data-browser'].includes(activeTab) && (e.target.style.color = 'var(--nw-text-secondary)')}
          >
            <Database className="w-4 h-4" />
            Datenbank
          </button>

          <button
            onClick={() => setActiveTab('excel-upload')}
            style={{
              padding: '1rem 1.5rem',
              fontWeight: 600,
              borderBottom: activeTab === 'excel-upload' ? `3px solid var(--nw-primary)` : 'none',
              color: activeTab === 'excel-upload' ? 'var(--nw-primary)' : 'var(--nw-text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 150ms',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => !['excel-upload'].includes(activeTab) && (e.target.style.color = 'var(--nw-primary)')}
            onMouseLeave={(e) => !['excel-upload'].includes(activeTab) && (e.target.style.color = 'var(--nw-text-secondary)')}
          >
            <Upload className="w-4 h-4" />
            Excel-Import
          </button>

          <button
            onClick={() => setActiveTab('user-management')}
            style={{
              padding: '1rem 1.5rem',
              fontWeight: 600,
              borderBottom: activeTab === 'user-management' ? `3px solid var(--nw-primary)` : 'none',
              color: activeTab === 'user-management' ? 'var(--nw-primary)' : 'var(--nw-text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 150ms',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => !['user-management'].includes(activeTab) && (e.target.style.color = 'var(--nw-primary)')}
            onMouseLeave={(e) => !['user-management'].includes(activeTab) && (e.target.style.color = 'var(--nw-text-secondary)')}
          >
            <Users className="w-4 h-4" />
            Benutzer & Rollen
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', maxWidth: '90rem', margin: '0 auto' }}>
        {activeTab === 'data-browser' && <AdminDataBrowser />}
        {activeTab === 'excel-upload' && <AdminExcelUpload />}
        {activeTab === 'user-management' && <AdminUserManagement currentUser={currentUser} />}
      </div>
    </div>
  );
}
