#!/usr/bin/env node
/**
 * CSS Minifier Script
 * Minifica CSS/style.css removendo comentários, espaços em branco
 * e gera CSS/style.min.css
 */

const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "../CSS/style.css");
const outputFile = path.join(__dirname, "../CSS/style.min.css");

try {
  let css = fs.readFileSync(inputFile, "utf-8");

  // Remover comentários /* ... */
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");

  // Remover espaços em branco extras
  css = css.replace(/\s+/g, " ");
  css = css.replace(/\s*([{}:;,>+~])\s*/g, "$1");

  // Remover trailing semicolon antes de }
  css = css.replace(/;}/g, "}");

  // Remover espaços dentro de valores de propriedades
  css = css.replace(/:\s+/g, ":");

  fs.writeFileSync(outputFile, css, "utf-8");

  const originalSize = Buffer.byteLength(fs.readFileSync(inputFile, "utf-8"));
  const minifiedSize = Buffer.byteLength(css);
  const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

  console.log(`✓ CSS minificado com sucesso`);
  console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`  Minificado: ${(minifiedSize / 1024).toFixed(2)} KB`);
  console.log(`  Redução: ${saved}%`);
  console.log(`  Arquivo: ${outputFile}`);
} catch (err) {
  console.error("✗ Erro ao minificar CSS:", err.message);
  process.exit(1);
}
