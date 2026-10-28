'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../src/data.js'),E=require('../src/engine.js');
const rightId=s=>{const c=E.getCase(s.caseId),step=E.getStep(s);return step.id==='features'?E.getGroup(c).feature:step.id==='associated'?E.getPattern(c).focus:step.id;};
function fullInterview(s,errors=false){
  for(let step=0;step<7;step++){
    assert.equal(s.stage,step);assert.equal(E.advance(s),false);
    assert.equal(E.diagnose(s,E.getCase(s.caseId).patternId).blocked,true);
    const opts=E.options(s),right=rightId(s);assert.equal(opts.length,4);assert.equal(new Set(opts.map(o=>o.id)).size,4);assert.ok(opts.some(o=>o.id===right));
    if(errors){for(const o of opts.filter(o=>o.id!==right)){const old=s.score;const r=E.chooseQuestion(s,o.id);assert.equal(r.ok,false);assert.equal(s.score,Math.max(0,old-8));assert.equal(s.stage,step);assert.equal(s.cleared,false);assert.ok(r.reason.length>10);assert.equal(E.advance(s),false);assert.equal(E.chooseQuestion(s,o.id).blocked,true);}}
    assert.equal(E.chooseQuestion(s,right).ok,true);assert.equal(s.cleared,true);assert.equal(s.revealed.length,step+1);assert.ok(E.validSession(s));
    const score=s.score;assert.equal(E.chooseQuestion(s,right).blocked,true);assert.equal(s.score,score);assert.equal(E.advance(s),true);assert.ok(E.validSession(s));
  }
}
test('curriculum coverage: all 16 groups, 65 slots, 56 distinct names, 195 cases',()=>{
  assert.equal(D.groups.length,16);assert.equal(D.groups.reduce((s,g)=>s+g.patternIds.length,0),65);assert.equal(Object.keys(D.patterns).length,56);assert.equal(E.catalogue.length,195);assert.equal(new Set(E.catalogue.map(c=>c.id)).size,195);
  for(const g of D.groups)for(const pid of g.patternIds){const p=D.patterns[pid];assert.ok(p,`${g.id}/${pid}`);const cases=E.catalogue.filter(c=>c.groupId===g.id&&c.patternId===pid);assert.equal(cases.length,3);assert.deepEqual(cases.map(c=>c.variant),[0,1,2]);assert.equal(new Set(cases.map(c=>c.duration.zh)).size,3);}
});
test('every medical label has Chinese, pinyin, Thai, English and referenced terms',()=>{
  for(const table of[D.terms,D.tongues,D.pulses])for(const [id,t]of Object.entries(table))for(const k of['zh','py','th','en'])assert.ok(typeof t[k]==='string'&&t[k].length,`${id}/${k}`);
  for(const p of Object.values(D.patterns)){for(const k of['zh','py','th','en'])assert.ok(p.name[k]);assert.ok(D.tongues[p.tongue]);assert.ok(D.pulses[p.pulse]);assert.ok(D.questions[p.focus]);for(const id of p.symptoms)assert.ok(D.terms[id],id);for(const id of p.keys)assert.ok(p.symptoms.includes(id),`${p.id}/${id}`);assert.ok(p.why.length>20);}
});
test('all 195 cases: full flawless interview, diagnosis gate, completion cannot be farmed',()=>{
  for(const c of E.catalogue){const s=E.newSession(c.id);fullInterview(s);assert.equal(E.getStep(s).id,'diagnosis');assert.equal(s.score,100);assert.ok(E.options(s).some(o=>o.id===c.patternId));assert.equal(E.diagnose(s,c.patternId).ok,true);assert.equal(s.completed,true);assert.equal(E.stars(s),3);assert.ok(E.validSession(s));assert.equal(E.diagnose(s,c.patternId).blocked,true);assert.equal(E.advance(s),false);assert.equal(E.chooseQuestion(s,'open').blocked,true);assert.ok(E.formula(c).zh.includes(D.patterns[c.patternId].name.zh.includes('（')?'证':D.patterns[c.patternId].name.zh));}
});
test('all 195 cases: every wrong option subtracts once; zero score still allows completion',()=>{
  for(const c of E.catalogue){const s=E.newSession(c.id,'exam');fullInterview(s,true);assert.equal(s.score,0);for(const o of E.options(s).filter(o=>o.id!==c.patternId)){const r=E.diagnose(s,o.id);assert.equal(r.ok,false);assert.equal(r.penalty,15);assert.ok(r.reason.length>30);assert.equal(s.completed,false);assert.equal(E.diagnose(s,o.id).blocked,true);assert.equal(s.score,0);}assert.equal(E.diagnose(s,c.patternId).ok,true);assert.equal(E.stars(s),1);}
});
test('diagnosis penalty is 15 and hint costs 5 only once per stage',()=>{
  const c=E.catalogue[0],s=E.newSession(c.id);assert.equal(E.hint(s),'open');assert.equal(s.score,95);assert.equal(E.hint(s),null);assert.equal(s.score,95);assert.equal(E.chooseQuestion(s,'open').ok,true);assert.equal(E.hint(s),null);E.advance(s);assert.equal(E.hint(s),'duration');assert.equal(s.score,90);
  const n=E.newSession(c.id);fullInterview(n);const wrong=E.options(n).find(o=>o.id!==c.patternId).id;assert.equal(E.diagnose(n,wrong).penalty,15);assert.equal(n.score,85);assert.equal(n.completed,false);assert.equal(E.diagnose(n,c.patternId).ok,true);assert.equal(E.stars(n),2);
});
test('serialized sessions resume with gating and previously eliminated options',()=>{
  const s=E.newSession(E.catalogue[0].id);const wrong=E.options(s).find(o=>o.id!=='open').id;E.chooseQuestion(s,wrong);const loaded=JSON.parse(JSON.stringify(s));assert.ok(E.validSession(loaded));assert.equal(E.chooseQuestion(loaded,wrong).blocked,true);assert.equal(E.advance(loaded),false);assert.equal(E.chooseQuestion(loaded,'open').ok,true);assert.ok(E.validSession(loaded));
  for(const x of[null,{},[],{...s,caseId:'__proto__'},{...s,stage:8},{...s,score:-1},{...s,score:NaN},{...s,revealed:[null]}])assert.equal(E.validSession(x),false);
  assert.equal(E.getCase('__proto__'),null);assert.equal(E.getCase('toString'),null);
});
test('random shifts filter correctly, prioritize weaknesses, and avoid duplicate patterns',()=>{
  for(const g of D.groups){const ids=E.randomQueue({groupId:g.id,count:5,seed:12});assert.ok(ids.length>0);assert.ok(ids.every(id=>E.getCase(id).groupId===g.id));if(g.patternIds.length>=5)assert.equal(new Set(ids.map(id=>E.getCase(id).patternId)).size,5);}
  const ids=E.randomQueue({count:5,weakIds:['heart-fire'],seed:77});assert.equal(E.getCase(ids[0]).patternId,'heart-fire');assert.deepEqual(ids,E.randomQueue({count:5,weakIds:['heart-fire'],seed:77}));
});
test('each disclosed fictional case includes all defining evidence and coherent contrasts',()=>{
  for(const c of E.catalogue){const p=E.getPattern(c);for(const k of p.keys)assert.ok(c.present.includes(k));const collected=new Set([...c.features,...c.mods,...c.associated]);for(const k of p.keys)assert.ok(collected.has(k),`${c.id}: missing ${k}`);if(c.negative?.zh.includes('没有明显的腰膝酸软'))assert.ok(!c.present.includes('kidney'));if(c.negative?.zh.includes('没有明显的自汗'))assert.ok(!c.present.includes('spontaneous'));}
});
