#!/usr/bin/env node
/**
 * JavaScript Minifier Script
 * Minifica JS/scripts.js removendo comentários e espaços em branco
 * e gera JS/scripts.min.js
 */

const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "../JS/scripts.js");
const outputFile = path.join(__dirname, "../JS/scripts.min.js");

try {
  let js = fs.readFileSync(inputFile, "utf-8");

  // Remover comentários // ...
  js = js.replace(/\/\/.*$/gm, "");

  // Remover comentários /* ... */
  js = js.replace(/\/\*[\s\S]*?\*\//g, "");

  // Remover quebras de linha e espaços em branco extras
  js = js.replace(/\n\s*/g, " ");
  js = js.replace(/\s+/g, " ");

  // Remover espaços ao redor de operadores
  js = js.replace(/\s*([{}()[\];:,=+\-*/%<>!&|^?.])\s*/g, "$1");

  // Remover espaços após palavras-chave (exceto function, if, else, etc que precisam)
  js = js.replace(/\bfunction\s+/g, "function ");
  js = js.replace(/\b(if|else|for|while|switch|catch|return)\s+/g, "$1 ");

  // Trim
  js = js.trim();

  fs.writeFileSync(outputFile, js, "utf-8");

  const originalSize = Buffer.byteLength(fs.readFileSync(inputFile, "utf-8"));
  const minifiedSize = Buffer.byteLength(js);
  const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

  console.log(`✓ JavaScript minificado com sucesso`);
  console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`  Minificado: ${(minifiedSize / 1024).toFixed(2)} KB`);
  console.log(`  Redução: ${saved}%`);
  console.log(`  Arquivo: ${outputFile}`);
} catch (err) {
  console.error("✗ Erro ao minificar JS:", err.message);
  process.exit(1);
}
