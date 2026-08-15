// Komponente für fehlende Bilder mit ruhigem Fallback
export function ImageFallback({ alt, width = 'full' }) {
  return (
    <div className={`w-${width} bg-gradient-to-b from-nq-line to-nq-cream rounded-2xl border-2 border-nq-sage p-8 flex items-center justify-center min-h-48 text-center`}>
      <div>
        <p className="text-nq-sage text-lg font-semibold mb-2">🌿</p>
        <p className="text-nq-text text-sm">Illustration folgt</p>
        {alt && <p className="text-nq-wood text-xs mt-2 italic">{alt}</p>}
      </div>
    </div>
  );
}

// Komponente für sichere Bildanzeige mit Fallback
export function SafeImage({ 
  src, 
  alt = "Illustration", 
  className = "w-full h-auto rounded-2xl",
  showFallback = true,
  onError = null
}) {
  if (!src) {
    return showFallback ? <ImageFallback alt={alt} /> : null;
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      onError={(e) => {
        if (showFallback && e.target.parentElement) {
          e.target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.innerHTML = `<div class="w-full bg-gradient-to-b from-nq-line to-nq-cream rounded-2xl border-2 border-nq-sage p-8 flex items-center justify-center min-h-48 text-center"><div><p class="text-nq-sage text-lg font-semibold mb-2">🌿</p><p class="text-nq-text text-sm">Illustration folgt</p><p class="text-nq-wood text-xs mt-2 italic">${alt}</p></div></div>`;
          e.target.parentElement.appendChild(fallback.firstChild);
        }
        onError?.(e);
      }}
    />
  );
}
