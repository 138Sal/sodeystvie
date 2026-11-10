import { useEffect, useRef } from 'react';
import L from 'leaflet';

const branches = [
  {
    coords: [55.191832, 61.380536] as [number, number],
    title: 'ул. 50-летия ВЛКСМ, 22',
    note: 'Металлургический район · 10:00–17:00',
  },
];

export const ContactsMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [55.157961, 61.429722],
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    const bounds = L.latLngBounds(branches.map((branch) => branch.coords));
    map.fitBounds(bounds, { padding: [24, 24], maxZoom: 12 });

    map.attributionControl.setPrefix(
      '<a href="https://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>',
    );

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      },
    ).addTo(map);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 16 },
    ).addTo(map);

    branches.forEach((branch) => {
      const marker = L.circleMarker(branch.coords, {
        radius: 7,
        color: '#edeef0',
        weight: 2,
        fillColor: '#101215',
        fillOpacity: 1,
      }).addTo(map);

      marker.bindPopup(
        `<strong>${branch.title}</strong><br/><span>${branch.note}</span>`,
        { closeButton: true },
      );
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      role="region"
      aria-label="Карта филиалов службы «Содействие» в Челябинске"
    />
  );
};
