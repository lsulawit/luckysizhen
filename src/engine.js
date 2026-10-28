(function(root){
  'use strict';
  const D=typeof module!=='undefined'&&module.exports?require('./data.js'):root.TCMData;
  const L=D.L;
  const names=['林','陈','王','李','周','苏','吴','赵','黄','许','张','刘'];
  const namePinyin=['Lín','Chén','Wáng','Lǐ','Zhōu','Sū','Wú','Zhào','Huáng','Xǔ','Zhāng','Liú'];
  function hash(s){let n=2166136261;for(const c of String(s)){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return n>>>0;}
  function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  function shuffle(list,seed){const a=[...list],r=typeof seed==='function'?seed:rng(hash(seed));for(let i=a.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function join(ids){return L(ids.map(x=>D.terms[x].zh).join('，'),ids.map(x=>D.terms[x].py).join(', '),ids.map(x=>D.terms[x].th).join(' • '),ids.map(x=>D.terms[x].en).join('; '));}
  const negatives={
    yin:L('没有明显的口舌生疮。','Méiyǒu míngxiǎn de kǒushé shēngchuāng.','ไม่มีแผลในปากหรือลิ้นเด่นชัด','No prominent mouth or tongue ulcers.'),
    qi:L('没有明显的口苦或口舌生疮。','Méiyǒu míngxiǎn de kǒukǔ huò kǒushé shēngchuāng.','ไม่มีปากขมหรือแผลในปากเด่นชัด','No prominent bitter taste or mouth ulcers.'),
    blood:L('没有明显的自汗。','Méiyǒu míngxiǎn de zìhàn.','ไม่มีเหงื่อออกเองเด่นชัด','No prominent spontaneous sweating.'),
    yang:L('没有明显的口渴喜冷饮。','Méiyǒu míngxiǎn de kǒukě xǐ lěngyǐn.','ไม่มีอาการกระหายน้ำและอยากดื่มเย็นเด่น','No prominent thirst with preference for cold drinks.'),
    cold:L('没有明显的口渴喜冷饮。','Méiyǒu míngxiǎn de kǒukě xǐ lěngyǐn.','ไม่มีอาการกระหายน้ำและอยากดื่มเย็นเด่น','No prominent thirst with preference for cold drinks.'),
    heat:L('没有明显的腰膝酸软。','Méiyǒu míngxiǎn de yāoxī suānruǎn.','ไม่มีเอวเข่าเมื่อยอ่อนแรงเด่น','No prominent soreness or weakness of the lower back and knees.'),
    stasis:L('不是游走不定的疼痛。','Bú shì yóuzǒu bù dìng de téngtòng.','ไม่ได้ปวดเคลื่อนตำแหน่งไปเรื่อย ๆ','The pain does not migrate.'),
    food:L('这次不适和进食有关系。','Zhè cì bùshì hé jìnshí yǒu guānxi.','ครั้งนี้อาการสัมพันธ์กับอาหาร','This episode is related to eating.'),
    essence:L('这些症状是慢慢出现的。','Zhèxiē zhèngzhuàng shì mànmàn chūxiàn de.','อาการเหล่านี้ค่อย ๆ เกิดขึ้น','These symptoms developed gradually.'),
    'external-cold':L('没有明显的咽喉肿痛。','Méiyǒu míngxiǎn de yānhóu zhǒngtòng.','ไม่มีเจ็บคอบวมเด่นชัด','No prominent swollen sore throat.'),
    'external-heat':L('没有大量清稀白痰。','Méiyǒu dàliàng qīngxī bái tán.','ไม่มีเสมหะขาวใสเหลวปริมาณมาก','No abundant thin white sputum.'),
    phlegm:L('没有明显的口舌生疮。','Méiyǒu míngxiǎn de kǒushé shēngchuāng.','ไม่มีแผลในปากหรือลิ้นเด่นชัด','No prominent mouth or tongue ulcers.'),
    dry:L('没有痰多清稀的表现。','Méiyǒu tán duō qīngxī de biǎoxiàn.','ไม่ได้มีเสมหะใสเหลวปริมาณมาก','No abundant thin sputum.'),
    dampheat:L('不以怕冷为主要不适。','Bù yǐ pà lěng wéi zhǔyào bùshì.','ความหนาวไม่ใช่อาการเด่น','Cold intolerance is not the main complaint.'),
    'qi-stag':L('不是固定的针刺样疼痛。','Bú shì gùdìng de zhēncì yàng téngtòng.','ไม่ใช่อาการปวดแทงตำแหน่งเดิม','The pain is not fixed and stabbing.')
  };
  const featureIds={
    1:['falling','dreams','waking','restless','insomnia'],
    2:['loose','dawn','urgentstool','sourstool','diarrhea','abdominal'],
    3:['heavyhead','headDistend','vertigo','dizzy','blurred'],
    4:['thinwhite','yellowphlegm','drycough','scantphlegm','weakcough','phlegm','cough','severecough'],
    5:['coldepi','epidistend','dullepi','burningepi','epifull'],
    6:['chestheavy','severeChest','chestback','chestdistend','chestpain','tightchest'],
    7:['flankdistend','flankburn','flankstab'],
    8:['coldabd','dullabd','abdDistend','stabbing','lowercold'],
    9:['neck','headDistend','dullhead','stabhead'],
    10:['awakesweat','sleepsweat','spontaneous','nightsweat'],
    11:['awakesweat','sleepsweat','yellowsweat','stained'],
    12:['palp','breath','fright','tightchest','chestpain'],
    13:['afterbloat','epifull','bloating','coldabd','epidistend'],
    14:['loudEar','longEar','roar','cicada','hearing'],
    15:['fatigue','heavy','pale'],
    16:['appetite','epifull','stuffy','nausea']
  };
  const catalogue=[];
  for(const group of D.groups)for(const pid of group.patternIds)for(let variant=0;variant<3;variant++){
    const p=D.patterns[pid],id=`g${String(group.id).padStart(2,'0')}-${pid}-${variant+1}`,seed=hash(id),idx=seed%names.length;
    let features=featureIds[group.id].filter(x=>p.symptoms.includes(x)).slice(0,2);
    if(!features.length)features=p.symptoms.slice(0,2);
    let extras=p.symptoms.filter(x=>!p.keys.includes(x)&&!features.includes(x));
    if(variant)extras=extras.filter((_,i)=>i%2===variant-1);
    let present=[...new Set([...features,...p.keys,...extras])];
    const mods=present.filter(x=>D.modifiers.has(x));
    const associated=present.filter(x=>!features.includes(x)&&!mods.includes(x));
    const tempo=['external-cold','external-heat','food','cold','dry'].includes(p.kind)?'acute':p.kind==='qi-stag'?'episodic':'chronic';
    catalogue.push({id,groupId:group.id,patternId:pid,variant,seed,features,present,mods,associated,
      duration:D.durations[tempo][variant],age:22+seed%49,sex:seed%2?'female':'male',
      patient:L(names[idx]+(seed%2?'女士':'先生'),namePinyin[idx]+(seed%2?' nǚshì':' xiānsheng'),'คุณ'+namePinyin[idx],(seed%2?'Ms. ':'Mr. ')+namePinyin[idx]),
      negative:variant===2?negatives[p.kind]:null,
      style:['Core presentation','Focused history','Differential clues'][variant]
    });
  }
  const caseById=Object.fromEntries(catalogue.map(c=>[c.id,c]));
  const stepDefs=[
    {id:'open',label:'เปิดการสนทนา',en:'Chief complaint',goal:'เริ่มด้วยคำถามปลายเปิด เพื่อทราบอาการสำคัญ'},
    {id:'duration',label:'ระยะเวลา',en:'Timeline',goal:'ค้นระยะเวลาและลักษณะการเริ่มมีอาการ'},
    {id:'features',label:'ลักษณะอาการ',en:'Character',goal:'เจาะลักษณะอาการสำคัญก่อนหาตัวแยก'},
    {id:'modifiers',label:'ปัจจัยกระตุ้น',en:'Modifiers',goal:'ค้นสิ่งที่ทำให้อาการมากขึ้นหรือลดลง'},
    {id:'associated',label:'อาการร่วม',en:'Associated clues',goal:'ค้นอาการร่วมที่ช่วยแยกกลุ่มอาการ'},
    {id:'tongue',label:'ตรวจลิ้น',en:'Tongue',goal:'ขออนุญาตดูลิ้นและฝ้าลิ้น'},
    {id:'pulse',label:'ตรวจชีพจร',en:'Pulse',goal:'ขออนุญาตจับชีพจรเพื่อประกอบภาพรวม'}
  ];
  const bads={
    assume:{id:'assume',...L('您一定是上火了，对吧？','Nín yídìng shì shànghuǒ le, duì ba?','คุณต้องเป็นเพราะร้อนในแน่ ๆ ใช่ไหมครับ','It must be internal heat, right?'),why:'เป็นคำถามชี้นำและสรุปสาเหตุก่อนเก็บข้อมูล'},
    treat:{id:'treat',...L('先不用问了，直接决定治疗吧。','Xiān bú yòng wèn le, zhíjiē juédìng zhìliáo ba.','ไม่ต้องซักก่อน ตัดสินใจรักษาเลยครับ','Skip the history and decide treatment immediately.'),why:'ยังมีข้อมูลไม่พอสำหรับการวิเคราะห์ ไม่ควรข้ามประวัติ'},
    ignore:{id:'ignore',...L('舌象和脉象都不需要看。','Shéxiàng hé màixiàng dōu bù xūyào kàn.','ไม่ต้องดูลิ้นและชีพจรก็ได้ครับ','There is no need to assess tongue or pulse.'),why:'ข้ามหลักฐานที่เป็นส่วนหนึ่งของการสอบนี้'},
    force:{id:'force',...L('不需要征求同意，马上检查。','Bù xūyào zhēngqiú tóngyì, mǎshàng jiǎnchá.','ตรวจทันทีโดยไม่ขออนุญาตครับ','Examine without asking permission.'),why:'ควรอธิบายและขออนุญาตก่อนตรวจ'}
  };
  function getCase(id){return typeof id==='string'&&Object.hasOwn(caseById,id)?caseById[id]:null;}
  function getPattern(c){return D.patterns[c.patternId];}
  function getGroup(c){return D.groups.find(g=>g.id===c.groupId);}
  function newSession(caseId,mode='practice'){
    if(!getCase(caseId))throw Error('Unknown case');
    return{caseId,mode,stage:0,cleared:false,score:100,errors:0,hints:0,failedChoices:[],hinted:false,revealed:[],log:[],completed:false,startedAt:Date.now(),endedAt:null};
  }
  function questionFor(c,step){const p=getPattern(c);return step==='features'?getGroup(c).feature:step==='associated'?p.focus:step;}
  const focusGoals={kidney:'สำรวจเอวเข่า หู และความจำ เพื่อค้นอาการที่สัมพันธ์กับไต',blood:'สำรวจหน้าซีด เวียนหัว และใจสั่น เพื่อประเมินการหล่อเลี้ยง',qi:'สำรวจกำลังร่างกาย การหายใจ และเหงื่อ เพื่อค้นอาการชี่พร่อง',yin:'สำรวจเหงื่อขณะหลับ ความร้อนฝ่ามือฝ่าเท้า และปากแห้ง',phlegm:'สำรวจแน่นอก คลื่นไส้ เสมหะ และความหนักตัว',fire:'สำรวจอาการร้อน ปาก ตา และการกระหายน้ำ',cold:'สำรวจความหนาว มือเท้าเย็น และการตอบสนองต่อความอุ่น',food:'สำรวจเรอเหม็น น้ำเปรี้ยวย้อน และลักษณะอุจจาระ',emotion:'สำรวจความสัมพันธ์กับอารมณ์ แน่นชายโครง เรอ และถอนหายใจ',stasis:'สำรวจอาการปวดแทง ตำแหน่งคงที่ และเวลากลางคืน',water:'สำรวจอาการบวม ปัสสาวะ และความหนาว',dampheat:'สำรวจปากขมปากเหนียว หนักตัว และสีปัสสาวะ',dry:'สำรวจความแห้งของคอ จมูก ปาก และผิว',genital:'สำรวจแนวปวดร้าวจากท้องน้อยไปขาหนีบหรืออวัยวะเพศ'};
  function getStep(s){if(s.completed)return{id:'complete',label:'ผ่านเคสแล้ว',index:8};if(s.stage===7)return{id:'diagnosis',label:'วินิจฉัยกลุ่มอาการ',en:'Pattern differentiation',index:7,goal:'เลือก证型ที่อธิบายหลักฐานรวมได้ดีที่สุด'};const step={...stepDefs[s.stage],index:s.stage};if(step.id==='associated')step.goal=focusGoals[getPattern(getCase(s.caseId)).focus]||step.goal;return step;}
  function options(s){
    const c=getCase(s.caseId),step=getStep(s);if(step.id==='complete')return[];
    if(step.id==='diagnosis')return shuffle(getGroup(c).patternIds.map(id=>({id,...D.patterns[id].name})),c.id+'dx');
    const right=questionFor(c,step.id);let distractors;
    if(step.id==='open')distractors=[D.questions.fire,D.questions.stool,bads.assume];
    else if(step.id==='duration')distractors=[D.questions.modifiers,D.questions.tongue,bads.treat];
    else if(step.id==='tongue')distractors=[D.questions.pulse,bads.force,bads.ignore];
    else if(step.id==='pulse')distractors=[D.questions.tongue,bads.ignore,bads.treat];
    else{
      const pool=Object.values(D.questions).filter(q=>!['open','duration','modifiers','tongue','pulse',right,getGroup(c).feature,getPattern(c).focus].includes(q.id));
      distractors=shuffle(pool,c.id+step.id).slice(0,2).concat(bads.assume);
    }
    return shuffle([D.questions[right],...distractors],c.id+step.id+'order');
  }
  function answerText(c,step){
    const p=getPattern(c),g=getGroup(c);
    if(step==='open')return L('主要是'+g.name.zh.replace(/（.*）/g,'')+'。','Zhǔyào shì '+g.name.py.replace(/\(.*\)/g,'')+'.','อาการสำคัญคือ '+g.name.th,'My main complaint is '+g.name.en.toLowerCase()+'.');
    if(step==='duration')return c.duration;
    if(step==='features')return join(c.features);
    if(step==='modifiers')return c.mods.length?join(c.mods):L('目前没有提供更明确的加重或缓解因素。','Mùqián méiyǒu tígōng gèng míngquè de jiāzhòng huò huǎnjiě yīnsù.','โจทย์ไม่ได้ระบุปัจจัยกระตุ้นหรือบรรเทาที่ชัดเจนเพิ่มเติม','No further clear aggravating or relieving factors are specified in this case.');
    if(step==='associated')return join(c.associated.length?c.associated:p.keys);
    if(step==='tongue')return D.tongues[p.tongue];
    return D.pulses[p.pulse];
  }
  function penalize(s,n){s.score=Math.max(0,s.score-n);s.errors++;}
  function chooseQuestion(s,id){
    if(s.completed||s.stage>=7||s.cleared)return{ok:false,blocked:true};
    const offered=options(s).find(x=>x.id===id);if(!offered||s.failedChoices.includes(id))return{ok:false,blocked:true};
    const c=getCase(s.caseId),step=getStep(s),right=questionFor(c,step.id);
    if(id!==right){penalize(s,8);s.failedChoices.push(id);const reason=offered.why&&bads[id]?offered.why:'คำถามนี้อาจมีประโยชน์ในประวัติเต็ม แต่ยังไม่ตอบเป้าหมายของรอบนี้: '+step.goal;s.log.push({type:'question-error',stage:step.id,selected:id,reason});return{ok:false,penalty:8,reason};}
    s.cleared=true;const text=answerText(c,step.id),record={step:step.id,label:step.label,text};
    if(step.id==='associated'&&c.negative)record.negative=c.negative;
    s.revealed.push(record);s.log.push({type:'question-correct',stage:step.id,selected:id});
    return{ok:true,text,negative:record.negative||null,reason:D.questions[right].why};
  }
  function advance(s){if(!s.cleared||s.completed||s.stage>=7)return false;s.stage++;s.cleared=false;s.failedChoices=[];s.hinted=false;return true;}
  function hint(s){if(s.completed||s.cleared||s.hinted)return null;s.hinted=true;s.hints++;s.score=Math.max(0,s.score-5);const c=getCase(s.caseId);return s.stage===7?c.patternId:questionFor(c,getStep(s).id);}
  function wrongDiagnosis(c,selected){
    const p=getPattern(c),other=D.patterns[selected],available=new Set(c.present),missing=other.keys.filter(x=>!available.has(x));
    const collected=p.keys.filter(x=>available.has(x));
    return 'คำตอบที่เลือกมักต้องพิจารณา '+join(other.keys).th+' แต่ในเคสนี้หลักฐานเด่นคือ '+join(collected).th+(missing.length?' และยังไม่มีหลักฐานสนับสนุน '+join(missing).th:'')+' จึงควรชั่งน้ำหนักอาการร่วมกับลิ้นและชีพจรใหม่ ไม่ใช่เลือกจากอาการสำคัญเพียงข้อเดียว';
  }
  function diagnose(s,id){
    if(s.stage!==7||s.completed||s.revealed.length!==7)return{ok:false,blocked:true};
    const c=getCase(s.caseId),g=getGroup(c);if(!g.patternIds.includes(id)||s.failedChoices.includes(id))return{ok:false,blocked:true};
    if(id!==c.patternId){penalize(s,15);s.failedChoices.push(id);let reason=wrongDiagnosis(c,id);s.log.push({type:'diagnosis-error',selected:id,reason});return{ok:false,penalty:15,reason};}
    s.completed=true;s.endedAt=Date.now();s.log.push({type:'diagnosis-correct',selected:id});return{ok:true,reason:getPattern(c).why,stars:stars(s)};
  }
  function stars(s){return s.score>=90&&s.hints===0?3:s.score>=65?2:1;}
  function formula(c){
    const p=getPattern(c),t=D.tongues[p.tongue],u=D.pulses[p.pulse],e=join([...new Set([...c.features,...p.keys])]);
    let zh=p.name.zh,py=p.name.py;
    if(zh.includes('（')){zh=zh.match(/（(.+)）/)[1];py=py.match(/\((.+)\)/)[1];}
    return L('初步辨证为'+zh+'。依据是：'+e.zh+'，'+t.zh+'，'+u.zh+'。','Chūbù biànzhèng wéi '+py+'. Yījù shì: '+e.py+', '+t.py+', '+u.py+'.','เบื้องต้นวิเคราะห์เป็น '+p.name.th+' หลักฐานคือ '+e.th+' • '+t.th+' • '+u.th,'My preliminary pattern is '+p.name.en+'. Supporting evidence: '+e.en+'; '+t.en+'; '+u.en+'.');
  }
  function contrast(a,b){const p=D.patterns[a],q=D.patterns[b];return{shared:p.symptoms.filter(x=>q.symptoms.includes(x)),onlyA:p.keys.filter(x=>!q.symptoms.includes(x)),onlyB:q.keys.filter(x=>!p.symptoms.includes(x))};}
  function randomQueue({groupId=0,count=5,weakIds=[],seed=Date.now()}={}){
    const pool=catalogue.filter(c=>!groupId||c.groupId===Number(groupId));
    const shuffled=shuffle(pool,seed);const prioritized=weakIds.length?shuffled.filter(c=>weakIds.includes(c.patternId)).concat(shuffled.filter(c=>!weakIds.includes(c.patternId))):shuffled;
    const chosen=[],seen=new Set();for(const c of prioritized)if(!seen.has(c.patternId)){chosen.push(c.id);seen.add(c.patternId);if(chosen.length===count)return chosen;}
    for(const c of prioritized)if(!chosen.includes(c.id)){chosen.push(c.id);if(chosen.length===count)break;}return chosen;
  }
  function validSession(s){
    if(!s||!getCase(s.caseId)||!['practice','exam'].includes(s.mode)||!Number.isInteger(s.stage)||s.stage<0||s.stage>7||!Number.isFinite(s.score)||s.score<0||s.score>100)return false;
    if(!Array.isArray(s.revealed)||!Array.isArray(s.failedChoices)||!Array.isArray(s.log)||s.revealed.length!==s.stage+(s.cleared?1:0)||typeof s.completed!=='boolean'||typeof s.cleared!=='boolean')return false;
    if(s.completed&&(s.stage!==7||s.cleared))return false;
    if(!Number.isInteger(s.errors)||s.errors<0||!Number.isInteger(s.hints)||s.hints<0||!Number.isFinite(s.startedAt))return false;
    return s.revealed.every((r,i)=>r&&stepDefs[i]&&r.step===stepDefs[i].id&&r.text&&['zh','py','th','en'].every(k=>typeof r.text[k]==='string'));
  }
  const api={catalogue,caseById,stepDefs,shuffle,hash,getCase,getPattern,getGroup,newSession,getStep,options,chooseQuestion,advance,hint,diagnose,stars,formula,join,contrast,randomQueue,validSession};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;root.ClinicEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
