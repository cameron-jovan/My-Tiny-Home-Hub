export default function NewsTicker() {
  return (
    <div
      style={{
        background: '#0D1214',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        height: '44px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 16px',
          background: '#8CC540',
          height: '100%',
          zIndex: 2,
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#fff',
            animation: 'tickerPulse 1.5s ease-in-out infinite',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          Live
        </span>
      </div>
      <iframe
        src="https://rss.app/embed/v1/ticker/tuB9HkNFwQBKpqib"
        frameBorder="0"
        style={{
          flex: 1,
          height: '44px',
          border: 'none',
          display: 'block',
          background: 'transparent',
        }}
        title="Tiny home and housing news"
        loading="lazy"
      />
      <style>{`
        @keyframes tickerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
