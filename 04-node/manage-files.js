import { readFile} from 'node:fs/promises';

const content = await readFile('./archivo.txt', 'utf-8');
console.log(content);