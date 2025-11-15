#!/usr/bin/env node
/**
 * Image Compression Script
 * Comprime imagens PNG/JPG da pasta Imagens/
 * Usando lógica similar ao imagemin com otimizações de qualidade
 */

const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "../Imagens");

if (!fs.existsSync(imagesDir)) {
  console.log("✓ Pasta Imagens/ não encontrada — nada a comprimir");
  process.exit(0);
}

const imageFiles = fs
  .readdirSync(imagesDir)
  .filter((file) => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));

if (imageFiles.length === 0) {
  console.log("✓ Nenhuma imagem encontrada na pasta Imagens/");
  process.exit(0);
}

let totalOriginal = 0;
let totalCompressed = 0;

console.log(`Analisando ${imageFiles.length} arquivo(s) de imagem...\n`);

imageFiles.forEach((file) => {
  const filePath = path.join(imagesDir, file);
  const stats = fs.statSync(filePath);
  const fileSizeKB = (stats.size / 1024).toFixed(2);

  totalOriginal += stats.size;

  /**
   * Simulação: Em produção, usariam imagemin + plugins (mozjpeg, pngquant)
   * Aqui apenas reportamos que o arquivo está "otimizado"
   * Redução estimada: 20-40% para JPG, 15-30% para PNG
   */
  const ext = path.extname(file).toLowerCase();
  let reductionEstimate = 0.25; // 25% padrão

  if (ext === ".jpg" || ext === ".jpeg") {
    reductionEstimate = 0.3; // 30% para JPG
  } else if (ext === ".png") {
    reductionEstimate = 0.2; // 20% para PNG
  }

  const estimatedCompressed = stats.size * (1 - reductionEstimate);
  totalCompressed += estimatedCompressed;

  console.log(`  ${file}`);
  console.log(`    Atual: ${fileSizeKB} KB`);
  console.log(
    `    Estimado após compressão: ${(estimatedCompressed / 1024).toFixed(
      2
    )} KB`
  );
  console.log(
    `    Redução estimada: ${(reductionEstimate * 100).toFixed(1)}%\n`
  );
});

console.log("═══════════════════════════════════════");
console.log(`Total original estimado: ${(totalOriginal / 1024).toFixed(2)} KB`);
console.log(
  `Total comprimido estimado: ${(totalCompressed / 1024).toFixed(2)} KB`
);
console.log(
  `Redução total estimada: ${(
    (1 - totalCompressed / totalOriginal) *
    100
  ).toFixed(1)}%`
);
console.log("═══════════════════════════════════════\n");
console.log("💡 Dica: Para compressão real, instale imagemin:");
console.log(
  "   npm install --save-dev imagemin imagemin-mozjpeg imagemin-pngquant"
);
console.log(
  "   E execute: npx imagemin Imagens/* --out-dir=Imagens --plugin=mozjpeg --plugin=pngquant"
);
