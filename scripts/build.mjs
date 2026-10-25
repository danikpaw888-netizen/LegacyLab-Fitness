import {build,transform} from 'esbuild';import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';
await fs.mkdir('public/assets',{recursive:true});await fs.mkdir('dist',{recursive:true});
await build({entryPoints:['src/client.js'],bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',outfile:'public/assets/app.js',define:{'process.env.NODE_ENV':'"production"'}});
await fs.writeFile('public/assets/app.css',(await transform(await fs.readFile('src/styles.css','utf8'),{loader:'css',minify:true})).code);
const version=createHash('sha256').update(await fs.readFile('public/assets/app.js')).update(await fs.readFile('public/assets/app.css')).digest('hex').slice(0,16),assets={};
async function scan(dir,prefix=''){for(const n of await fs.readdir(dir)){const p=path.join(dir,n);if((await fs.stat(p)).isDirectory())await scan(p,prefix+'/'+n);else assets[prefix+'/'+n]={type:({'.js':'application/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.txt':'text/plain;charset=utf-8'})[path.extname(n)]||'application/octet-stream',data:(await fs.readFile(p)).toString('base64')};}}
await scan('public');await fs.writeFile('src/assets.generated.js','export const assets='+JSON.stringify(assets)+';');
await build({stdin:{contents:(await fs.readFile('src/worker.js','utf8')).replaceAll('BUILD_VERSION',version),resolveDir:path.resolve('src'),loader:'js'},bundle:true,minify:true,format:'esm',platform:'browser',conditions:['workerd','worker','browser'],target:'es2022',external:['node:*','cloudflare:*'],outfile:'dist/worker.js',define:{'process.env.NODE_ENV':'"production"'}});
console.log(JSON.stringify({version,assets:Object.keys(assets).length}));
