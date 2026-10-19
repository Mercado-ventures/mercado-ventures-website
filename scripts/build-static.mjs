import {readFileSync,existsSync,mkdirSync,rmSync,copyFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=resolve(root,'dist');
const files=['index.html','styles.css','fonts.css','script.js','robots.txt','sitemap.xml','llms.txt'];
const source=files.map(f=>readFileSync(resolve(root,f),'utf8')).join('\n');
files.push(...new Set(source.match(/assets\/[A-Za-z0-9_.-]+/g)||[]));
for(const file of files)if(!existsSync(resolve(root,file)))throw new Error('Missing asset: '+file);
rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});
for(const file of files){const target=resolve(out,file);mkdirSync(dirname(target),{recursive:true});copyFileSync(resolve(root,file),target);}
console.log(`Built ${files.length} static files in dist/.`);
