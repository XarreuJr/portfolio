import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {render,escapeHTML as e} from '../javascript/render.js';

const root=fileURLToPath(new URL('../',import.meta.url));
const d=JSON.parse(await readFile(path.join(root,'lang/en.json'),'utf8'));
const profile={
 '@context':'https://schema.org','@type':'Person','name':d.fullName,'alternateName':d.name,
 'url':'https://xarreujr.github.io/portfolio/','image':'https://xarreujr.github.io/portfolio/assets/diogo.webp',
 'jobTitle':'Cybersecurity Analyst | SOC Analyst','worksFor':{'@type':'Organization','name':'Fujitsu'},
 'sameAs':[d.github,d.linkedin],'knowsAbout':['Security Operations','Splunk','Threat Intelligence','Software Development'],
 'homeLocation':{'@type':'Country','name':'Portugal'},
};
const html=`<!doctype html>
<html lang="en" data-theme="dark">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width,initial-scale=1">
 <title>${e(d.metaTitle)}</title>
 <meta name="description" content="${e(d.metaDescription)}">
 <meta name="theme-color" content="#0b1120">
 <link rel="canonical" href="https://xarreujr.github.io/portfolio/">
 <meta property="og:type" content="website">
 <meta property="og:url" content="https://xarreujr.github.io/portfolio/">
 <meta property="og:title" content="${e(d.metaTitle)}">
 <meta property="og:description" content="${e(d.metaDescription)}">
 <meta property="og:image" content="https://xarreujr.github.io/portfolio/assets/diogo.png">
 <meta property="og:image:alt" content="Diogo Vidazinha — Cybersecurity Analyst">
 <meta property="og:locale" content="en_GB">
 <meta property="og:locale:alternate" content="pt_PT">
 <meta name="twitter:card" content="summary_large_image">
 <meta name="twitter:title" content="${e(d.metaTitle)}">
 <meta name="twitter:description" content="${e(d.metaDescription)}">
 <meta name="twitter:image" content="https://xarreujr.github.io/portfolio/assets/diogo.png">
 <link rel="icon" type="image/svg+xml" href="./assets/favicon.svg">
 <script src="./javascript/theme-init.js"></script>
 <link rel="stylesheet" href="./css/portfolio.css">
 <link rel="preload" as="image" href="./assets/diogo.webp" fetchpriority="high">
 <script type="application/ld+json">${JSON.stringify(profile).replaceAll('<','\\u003c')}</script>
 <script type="module" src="./javascript/app.js"></script>
</head>
<body>
 <div id="portfolio">${render(d,'en')}</div>
</body>
</html>
`;
await writeFile(path.join(root,'index.html'),html);
const dist=path.resolve(root,'dist');
// Fixed path derived from this script's repository root, never user input.
if(path.dirname(dist)!==path.resolve(root)||path.basename(dist)!=='dist')throw new Error('Unexpected build path');
await rm(dist,{recursive:true,force:true});
await mkdir(dist,{recursive:true});
for(const name of ['index.html','robots.txt','sitemap.xml','.nojekyll','LICENSE'])await cp(path.join(root,name),path.join(dist,name));
for(const folder of ['lang','assets'])await cp(path.join(root,folder),path.join(dist,folder),{recursive:true});
for(const file of ['javascript/app.js','javascript/render.js','javascript/theme-init.js','css/portfolio.css']){
 await mkdir(path.dirname(path.join(dist,file)),{recursive:true});
 await cp(path.join(root,file),path.join(dist,file));
}
console.log('Built English HTML and static dist/ with Portuguese/English content.');
