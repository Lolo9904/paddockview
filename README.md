# PaddockView · visor de telemetría (PWA)

Visor ligero para echar un vistazo rápido a la telemetría en la tablet.
El análisis profundo se queda en KartLab (PC). Ambos leen el mismo CSV.

## Probar ya (sin nada)
Abre `index.html` en un navegador y pulsa **Datos demo**.
(En modo `file://` funciona todo MENOS instalarse como PWA / offline.)

## Esquema CSV que espera
- `time` (s)  ← obligatorio, eje X
- `lat`, `lon` ← opcional, activa el mapa GPS
- `lap` ← opcional, activa overlay de vueltas y tabla de tiempos
- cualquier otra columna numérica = canal (speed, rpm, throttle, ay, ...)

Haz que tu ESP32 y KartLab usen estos mismos nombres y todo encaja.

## Convertirla en PWA instalable (offline)
Necesita servirse por HTTPS. Lo más fácil y gratis:

1. Sube esta carpeta a un repo de GitHub.
2. Settings → Pages → activa Pages sobre la rama main.
3. Abre la URL `https://TUUSUARIO.github.io/repo/` en Safari (iPad).
4. Botón Compartir → "Añadir a pantalla de inicio".

Alternativas equivalentes: Netlify, Cloudflare Pages (arrastras la carpeta y listo).

## Offline de verdad (paddock sin internet)
El service worker (`sw.js`) cachea la app en la primera carga CON internet.
Después abre sin conexión. Para no depender del CDN, descarga uPlot a local:
- baja `uPlot.iife.min.js` y `uPlot.min.css`, ponlos en la carpeta,
- cambia las dos URLs de `index.html` por las locales,
- añádelas a la lista `ASSETS` de `sw.js` y sube la versión (`v1`→`v2`).

## Meter el log del ESP32 en el iPad
- Fácil: AirDrop del CSV, o lector microSD por USB-C → "Cargar CSV".
- Slick: el ESP32 sirve el último log por HTTP en su propio AP WiFi;
  la app hace fetch a `http://192.168.4.1/last.csv`. (Siguiente paso.)
