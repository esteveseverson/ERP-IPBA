export function initMap() {
  console.log('iniciou mapa');
  const mapContainer = document.getElementById('map-container');
  const churchDataElement = document.getElementById('church-data');
  const churches = JSON.parse(churchDataElement.textContent);

  // Cria o mapa com uma posição temporária
  const map = L.map('map-container').setView([0, 0], 13);

  // Adiciona o tile layer do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Ícone personalizado
  const churchIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/619/619064.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  const bounds = [];

  churches.forEach((church) => {
    const lat = parseFloat(church.lat);
    const lon = parseFloat(church.lon);
    bounds.push([lat, lon]);

    L.marker([lat, lon], { icon: churchIcon })
      .addTo(map)
      .bindPopup(`
        <strong>${church.name}</strong><br>
        <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank" class="text-blue-600 hover:underline">Ver no Google Maps</a>
      `);
  });

  // Ajusta o mapa para centralizar entre os pontos
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  console.log('terminou mapa');
}
