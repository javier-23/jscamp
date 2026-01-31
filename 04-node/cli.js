//Programa de línea de comandos
import { readdir, stat } from 'node:fs/promises'; 
import { join } from 'node:path';

// Argumentos que nos interesan (los dos primeros son: ruta ejecutable de node y ruta del archivo)
// 1. Recuperar carpeta a listar
const dir = process.argv[2] ?? '.';

// 2. Formateo simple de los tamaños
const formatBytes = (size) => {
    if(size < 1024) return size + ' B';
    return (size / 1024).toFixed(2) + ' KB';
}

// 3. Leer los nombres
const files = await readdir(dir);

// 4. Recuperar info de cada file
const entries = await Promise.all(
  files.map(async (name) => {
    const filePath = join(dir, name);
    const info = await stat(filePath);

    return {
        name,
        isDir: info.isDirectory(),
        size: info.size
    }
  })
);

for (const entry of entries) {
    //Renderizar la info
    const icon = entry.isDir ? '📁' : '📄';
    const size = entry.isDir ? '' : ` ${entry.size}`;
    console.log(`${icon} ${entry.name.padEnd(20)} ${size}`);
}