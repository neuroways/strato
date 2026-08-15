import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf8f3',
          padding: '20px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '20px',
            border: '4px solid #3d6b54'
          }}>
            <h1 style={{ fontSize: '2rem', color: '#3d6b54', marginBottom: '20px' }}>
              ⚠️ Etwas ist schiefgelaufen
            </h1>
            <p style={{ fontSize: '1rem', color: '#7d9b8d', marginBottom: '20px', lineHeight: '1.6' }}>
              Die App konnte nicht vollständig geladen werden.
            </p>
            {this.state.error && (
              <div style={{
                backgroundColor: '#f0f4e8',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'left',
                fontSize: '0.85rem',
                color: '#2d2420',
                marginBottom: '20px',
                fontFamily: 'monospace',
                overflow: 'auto',
                maxHeight: '150px'
              }}>
                {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#3d6b54',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                fontSize: '1rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
