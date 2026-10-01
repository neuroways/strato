export function DebugScreen() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#faf8f3',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        border: '4px solid #3d6b54'
      }}>
        <h1 style={{ fontSize: '3rem', color: '#3d6b54', marginBottom: '20px' }}>
          ✨ NeuroQuest ✨
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#2d2420', marginBottom: '30px' }}>
          Die magischen 5
        </p>
        <p style={{ fontSize: '1.2rem', color: '#7d9b8d', marginBottom: '20px', lineHeight: '1.8' }}>
          Caspar geht durch den Wald und entdeckt einen golden leuchtenden Stein...
        </p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#3d6b54',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#7d9b8d'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3d6b54'}
        >
          Abenteuer beginnen
        </button>
      </div>
    </div>
  );
}
