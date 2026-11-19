import { PortalStatsState, formatDuration } from '../hooks/usePortalStats';
import { Language } from '../i18n/translations';

export function exportStatsToPdf(stats: PortalStatsState, language: Language): void {
  const isEs = language === 'es';
  const now = new Date().toLocaleString(isEs ? 'es-VE' : 'en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const title = isEs
    ? 'REPORTE OFICIAL DE ESTADÍSTICAS · CENDIS Y CANAL CULTURA'
    : 'OFFICIAL STATISTICS REPORT · CENDIS & CANAL CULTURA';

  const countriesRows = stats.countries
    .map(
      (c) => `
      <tr>
        <td>${isEs ? c.countryEs : c.countryEn} (${c.code})</td>
        <td style="text-align:right;font-weight:600;">${c.visits.toLocaleString()}</td>
        <td style="text-align:right;font-weight:700;color:#153684;">${c.percent}%</td>
      </tr>`
    )
    .join('');

  const contentRows = stats.topContent
    .map(
      (item, idx) => `
      <tr>
        <td>#${idx + 1} ${isEs ? item.titleEs : item.titleEn}</td>
        <td style="text-align:right;font-weight:700;color:#B12722;">${item.views.toLocaleString()}</td>
        <td style="text-align:right;">${item.avgTime}</td>
      </tr>`
    )
    .join('');

  const letterheadUrl = `${window.location.origin}/logos/cintillo-reporte.png`;

  const html = `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>
    @page {
      size: letter portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
    }
    .page {
      position: relative;
      width: 215.9mm;
      min-height: 279.4mm;
      margin: 0 auto;
      overflow: hidden;
    }
    .letterhead-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      z-index: 0;
      pointer-events: none;
    }
    .content {
      position: relative;
      z-index: 1;
      padding: 36mm 18mm 34mm 18mm;
    }
    .report-header {
      border-bottom: 2px solid #153684;
      padding-bottom: 8px;
      margin-bottom: 14px;
    }
    .report-header h1 {
      margin: 0;
      font-size: 16px;
      color: #153684;
      letter-spacing: 0.3px;
    }
    .report-header p {
      margin: 4px 0 0 0;
      font-size: 11px;
      color: #475569;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 18px;
    }
    .kpi-card {
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 10px;
      background: rgba(248, 250, 252, 0.92);
    }
    .kpi-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 4px;
    }
    .kpi-value {
      font-size: 16px;
      font-weight: 800;
      color: #0F172A;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #153684;
      margin: 14px 0 8px 0;
      text-transform: uppercase;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
      background: rgba(255, 255, 255, 0.94);
    }
    th {
      background: #153684;
      color: #FFFFFF;
      text-align: left;
      padding: 7px 10px;
      font-weight: 700;
    }
    td {
      padding: 6px 10px;
      border-bottom: 1px solid #E2E8F0;
    }
  </style>
</head>
<body>
  <div class="page">
    <img src="${letterheadUrl}" alt="Cintillo Institucional" class="letterhead-bg" />
    <div class="content">
      <div class="report-header">
        <h1>${title}</h1>
        <p>${isEs ? 'Fecha de emisión:' : 'Issued on:'} ${now}</p>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">${isEs ? 'Visitas Totales' : 'Total Visits'}</div>
          <div class="kpi-value">${stats.totalVisits.toLocaleString()}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${isEs ? 'Tiempo en Página' : 'Viewing Time'}</div>
          <div class="kpi-value">${formatDuration(stats.sessionSeconds)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${isEs ? 'Tiempo Promedio' : 'Average Time'}</div>
          <div class="kpi-value">${stats.avgViewTime}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${isEs ? 'Región Detectada' : 'Detected Region'}</div>
          <div class="kpi-value" style="font-size:12px;">${stats.currentVisitorRegion}</div>
        </div>
      </div>

      <div class="section-title">${isEs ? 'Visitas por País' : 'Visits by Country'}</div>
      <table>
        <thead>
          <tr>
            <th>${isEs ? 'País' : 'Country'}</th>
            <th style="text-align:right;">${isEs ? 'Visitas' : 'Visits'}</th>
            <th style="text-align:right;">${isEs ? 'Porcentaje' : 'Share'}</th>
          </tr>
        </thead>
        <tbody>${countriesRows}</tbody>
      </table>

      <div class="section-title">${isEs ? 'Contenido Más Visto' : 'Most Viewed Content'}</div>
      <table>
        <thead>
          <tr>
            <th>${isEs ? 'Módulo / Sección' : 'Module / Section'}</th>
            <th style="text-align:right;">${isEs ? 'Vistas' : 'Views'}</th>
            <th style="text-align:right;">${isEs ? 'Tiempo Promedio' : 'Avg. Time'}</th>
          </tr>
        </thead>
        <tbody>${contentRows}</tbody>
      </table>
    </div>
  </div>
</body>
</html>`;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(html);
  doc.close();

  const triggerPrint = () => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    window.setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 1500);
  };

  const img = doc.querySelector('img');
  if (img && !img.complete) {
    img.onload = triggerPrint;
    img.onerror = triggerPrint;
  } else {
    window.setTimeout(triggerPrint, 250);
  }
}
