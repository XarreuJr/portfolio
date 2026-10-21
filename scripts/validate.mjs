import assert from 'node:assert/strict';
import {readFile,access,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {render} from '../javascript/render.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const translations=await Promise.all(['en','pt'].map(async lang=>JSON.parse(await readFile(path.join(root,`lang/${lang}.json`),'utf8'))));
function shape(value){if(Array.isArray(value))return value.map(shape);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,shape(v)]));return typeof value;}
assert.deepEqual(shape(translations[0]),shape(translations[1]),'Both languages must have equivalent content structure');
for(const d of translations){
 const html=render(d,d.locale);
 assert(!html.includes('undefined'),'No missing content');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,'One primary heading');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(new Set(ids).size,ids.length,'Unique IDs');
 for(const m of html.matchAll(/\bhref="#([^"]+)"/g))assert(ids.includes(m[1]),`Unknown anchor ${m[1]}`);
 for(const m of html.matchAll(/(?:href|src)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g))await access(path.join(root,m[1]));
 assert.equal(d.projects.items.filter(p=>p.featured).length,1,'One featured project');
 for(const project of d.projects.items){
  assert(project.category.every(key=>d.projects.categories[key]),'Recognised filter categories');
  if(project.id==='bigdata')assert(!/CISTI/i.test(JSON.stringify(project)),'BigData Helper must remain separate from the CISTI article');
 }
 assert(d.education.items.some(item=>item.institution==='CISTI 2026'),'Scientific presentation belongs in education');
 assert(d.education.certificates.every(c=>/^THM-/.test(c.id)),'Only supplied training credentials');
 assert(!/\bTODO\b/.test(html)&&!/lorem ipsum|coming soon/i.test(html),'No placeholder content');
 console.log(`Validated ${d.locale}: sections, links, training, project filters and content accuracy constraints.`);
}
for(const file of ['javascript/app.js','javascript/render.js','javascript/theme-init.js','scripts/build.mjs']){
 const result=spawnSync(process.execPath,['--check',path.join(root,file)],{encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);
}
const html=await readFile(path.join(root,'dist/index.html'),'utf8');
assert(html.startsWith('<!doctype html>'));
assert(html.includes('application/ld+json')&&html.includes('rel="canonical"'));
for(const m of html.matchAll(/(?:href|src)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g))await access(path.join(root,'dist',m[1]));
assert((await stat(path.join(root,'assets/diogo.webp'))).size<(await stat(path.join(root,'assets/diogo.png'))).size,'Optimised portrait smaller than original');
console.log('JavaScript syntax, generated metadata, production asset paths and portrait size validated.');
