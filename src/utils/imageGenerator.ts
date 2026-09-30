/**
 * Client-side high-resolution poetry card image generator
 * Renders a 1080x1080 Instagram/WhatsApp ready graphic card
 */
export function generateShayariImageCanvas(title: string, text: string, category: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background Parchment Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
  bgGrad.addColorStop(0, '#FAF6F0');
  bgGrad.addColorStop(0.5, '#F5EDE2');
  bgGrad.addColorStop(1, '#ECE2D2');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1080);

  // Subtle Outer Gold/Bronze Border
  ctx.strokeStyle = '#D1B48C';
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 50, 980, 980);

  // Inner Hairline Border
  ctx.strokeStyle = 'rgba(163, 126, 75, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(65, 65, 950, 950);

  // Corner Ornaments
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#9B7238';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(25, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 25);
    ctx.stroke();
    ctx.restore();
  };
  drawCorner(50, 50, 0);
  drawCorner(1030, 50, Math.PI / 2);
  drawCorner(1030, 1030, Math.PI);
  drawCorner(50, 1030, -Math.PI / 2);

  // Top Category Subtitle
  ctx.fillStyle = '#9B7238';
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((category || 'SHAYARI').toUpperCase(), 540, 150);

  // Top Small Divider
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(460, 180);
  ctx.lineTo(620, 180);
  ctx.stroke();

  // Quotation Mark
  ctx.fillStyle = 'rgba(155, 114, 56, 0.2)';
  ctx.font = 'italic 120px "Cormorant Garamond", serif';
  ctx.fillText('“', 540, 310);

  // Poetry / Shayari Text Lines
  ctx.fillStyle = '#261C16';
  ctx.font = '600 38px "Noto Serif Devanagari", "Cormorant Garamond", serif';
  ctx.textAlign = 'center';

  const rawLines = text.split('\n');
  const wrappedLines: string[] = [];
  const maxLineWidth = 820;

  for (const rawLine of rawLines) {
    if (rawLine.trim() === '') {
      wrappedLines.push('');
      continue;
    }
    const words = rawLine.split(' ');
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxLineWidth && currentLine) {
        wrappedLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      wrappedLines.push(currentLine);
    }
  }

  // Calculate vertical center
  const lineHeight = 62;
  const totalTextHeight = wrappedLines.length * lineHeight;
  let startY = 460 - (totalTextHeight / 2) + 60;
  if (startY < 340) startY = 340;

  for (let i = 0; i < wrappedLines.length; i++) {
    ctx.fillText(wrappedLines[i], 540, startY + (i * lineHeight));
  }

  // Bottom Flourish & Brand Signature
  const footerY = 920;
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(380, footerY - 50);
  ctx.lineTo(700, footerY - 50);
  ctx.stroke();

  // Diamond center icon
  ctx.fillStyle = '#9B7238';
  ctx.beginPath();
  ctx.arc(540, footerY - 50, 4, 0, Math.PI * 2);
  ctx.fill();

  // Brand Name
  ctx.font = 'bold 32px "Cormorant Garamond", "Noto Serif Devanagari", serif';
  ctx.fillStyle = '#2A1E17';
  ctx.fillText('राज की कलम • Raj Ki Kalam', 540, footerY - 10);

  // Tagline & Domain
  ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#786C60';
  ctx.fillText('Alfaaz • Ehsaas • Poetry  |  RajKiKalam.in', 540, footerY + 28);

  return canvas;
}

export function downloadShayariCard(title: string, text: string, category: string, slug: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const canvas = generateShayariImageCanvas(title, text, category);
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `raj-ki-kalam-${slug || 'poetry'}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        resolve(true);
      }, 'image/png');
    } catch (err) {
      console.error('Image export failed:', err);
      resolve(false);
    }
  });
}
