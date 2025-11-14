#!/usr/bin/env node
/**
 * HTML Minifier Script
 * Minifica HTML removendo comentários, espaços em branco e quebras de linha
 */

const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'projetos.html', 'Cadastro.html'];
const projectRoot = path.join(__dirname, '..');

htmlFiles.forEach(file => {
  const inputFile = path.join(projectRoot, file);
  const outputFile = path.join(projectRoot, file.replace('.html', '.min.html'));

  try {
    let html = fs.readFileSync(inputFile, 'utf-8');

    // Remover comentários HTML <!-- ... -->
    html = html.replace(/<!--[\s\S]*?-->/g, '');

    // Remover quebras de linha (preservar espaços dentro de tags/atributos)
    html = html.replace(/>\s+</g, '><');

    // Remover espaços em branco múltiplos (mas preservar 1 espaço)
    html = html.replace(/\s{2,}/g, ' ');

    // Remover espaços ao redor de atributos
    html = html.replace(/\s*=\s*/g, '=');

    // Trim final
    html = html.trim();

    fs.writeFileSync(outputFile, html, 'utf-8');

    const originalSize = Buffer.byteLength(fs.readFileSync(inputFile, 'utf-8'));
    const minifiedSize = Buffer.byteLength(html);
    const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

    console.log(`✓ ${file} minificado com sucesso`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`  Minificado: ${(minifiedSize / 1024).toFixed(2)} KB`);
    console.log(`  Redução: ${saved}%`);
    console.log(`  Arquivo: ${outputFile}\n`);
  } catch (err) {
    console.error(`✗ Erro ao minificar ${file}:`, err.message);
    process.exit(1);
  }
});
