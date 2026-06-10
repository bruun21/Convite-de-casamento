"use client";

interface MapLinksProps {
  lat: number;
  lng: number;
  name: string;
}

export function MapLinks({ lat, lng, name }: MapLinksProps) {
  const q = encodeURIComponent(name);
  const googleUrl = `https://maps.google.com/?q=${lat},${lng}`;
  const appleMapsUrl = `https://maps.apple.com/?ll=${lat},${lng}&q=${q}`;
  const geoUri = `geo:${lat},${lng}?q=${lat},${lng}(${q})`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  function handleMapClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const ua = navigator.userAgent;
    if (!/Android|iPhone|iPad|iPod/.test(ua)) return; // desktop: segue o href
    e.preventDefault();
    // iOS → Apple Maps  |  Android → app padrão via geo:
    window.location.href = /iPhone|iPad|iPod/.test(ua) ? appleMapsUrl : geoUri;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleMapClick}
        className="button-outline"
      >
        Abrir no mapa
      </a>
      <a
        href={wazeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs tracking-[0.16em] text-[var(--color-gold)] uppercase opacity-70 transition-opacity hover:opacity-100"
      >
        ou abrir no Waze
      </a>
    </div>
  );
}
