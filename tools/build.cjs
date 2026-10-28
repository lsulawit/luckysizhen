'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
fs.mkdirSync(dist,{recursive:true});
fs.cpSync(path.join(root,'src'),path.join(dist,'src'),{recursive:true});
fs.cpSync(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
fs.writeFileSync(path.join(dist,'index.html'),html);
let standalone=html.replace(/\s*<script defer src="src\/[^\"]+"><\/script>/g,'')
 .replace('<link rel="stylesheet" href="src/styles.css">','<style>'+fs.readFileSync(path.join(root,'src/styles.css'),'utf8')+'</style>')
 .replace(/\s*<link rel="icon"[^>]+>/,'');
const js=['data.js','engine.js','scene.js','app.js'].map(f=>fs.readFileSync(path.join(root,'src',f),'utf8')).join('\n');
standalone=standalone.replace('</body>','<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>\n</body>');
fs.writeFileSync(path.join(root,'PLAY.html'),standalone);
const D=require('../src/data.js'),E=require('../src/engine.js');
const coverage=D.groups.map(g=>({group:g.id,zh:g.name.zh,pinyin:g.name.py,thai:g.name.th,english:g.name.en,templates:g.patternIds.length,cases:g.patternIds.length*3,patterns:g.patternIds.map(id=>({id,...D.patterns[id].name,cases:E.catalogue.filter(c=>c.groupId===g.id&&c.patternId===id).map(c=>c.id)}))}));
fs.writeFileSync(path.join(root,'CASE-COVERAGE.json'),JSON.stringify({groups:16,templates:65,distinctNames:Object.keys(D.patterns).length,fictionalCases:E.catalogue.length,coverage},null,2));
console.log('Built dist/ and offline PLAY.html; '+E.catalogue.length+' fictional cases across '+D.groups.length+' groups.');
