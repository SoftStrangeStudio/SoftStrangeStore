import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';

test('local HTTP server serves project paths and a nested 404',async()=>{
 const server=spawn(process.execPath,['tools/serve.mjs'],{cwd:new URL('../',import.meta.url),stdio:['ignore','pipe','pipe']});
 try{
  await Promise.race([once(server.stdout,'data'),once(server,'error').then(([error])=>Promise.reject(error)),once(server,'exit').then(([code])=>Promise.reject(new Error(`Server exited: ${code}`)))]);
  for(const route of ['', 'index.html','product.html?slug=moss-little-companion','shipping.html','policies.html','data/products.json','store.js','catalog.js','assets/products/studio-960.webp','missing/deep/page']){
   const response=await fetch(`http://127.0.0.1:4173/SoftStrangeStore/${route}`);
   assert.equal(response.status,route==='missing/deep/page'?404:200,route);
   assert.ok((await response.arrayBuffer()).byteLength>0,route);
  }
 }finally{server.kill();}
});
