/* Curriculum supplied by the learner. Fictional cases, not a clinical decision tool. */
(function (root) {
  'use strict';
  const L = (zh, py, th, en) => ({ zh, py, th, en });
  const terms = {};
  function term(id, text) { terms[id] = L(...text.split('|')); }
  const rawTerms = {
    insomnia:'失眠|shīmián|นอนไม่หลับ|Insomnia',
    restless:'心烦|xīnfán|ร้อนรนใจ กระสับกระส่าย|Mental restlessness',
    falling:'入睡困难|rùshuì kùnnan|หลับยาก|Difficulty falling asleep',
    dreams:'多梦|duōmèng|ฝันมาก|Frequent dreams',
    waking:'容易醒|róngyì xǐng|ตื่นง่าย|Easy awakening',
    palp:'心悸|xīnjì|ใจสั่น|Palpitations',
    forget:'健忘|jiànwàng|ขี้ลืม|Forgetfulness',
    fatigue:'神疲乏力|shénpí fálì|อ่อนเพลีย ไม่มีแรง|Fatigue and lack of strength',
    appetite:'食欲不振|shíyù bùzhèn|เบื่ออาหาร|Poor appetite',
    sallow:'面色萎黄|miànsè wěihuáng|ใบหน้าเหลืองซีดหมอง|Sallow complexion',
    pale:'面色苍白|miànsè cāngbái|หน้าซีด|Pallor',
    kidney:'腰膝酸软|yāoxī suānruǎn|เอวและเข่าเมื่อยอ่อนแรง|Soreness and weakness of the lower back and knees',
    tinnitus:'耳鸣|ěrmíng|มีเสียงในหู|Tinnitus',
    fiveheat:'五心烦热|wǔxīn fánrè|ร้อนฝ่ามือ ฝ่าเท้า และกลางอก|Heat in the palms, soles and chest',
    nightsweat:'盗汗|dàohàn|เหงื่อออกขณะหลับ|Sweating during sleep',
    drymouth:'口干|kǒugān|ปากแห้ง|Dry mouth',
    fright:'容易受惊|róngyì shòujīng|ตกใจง่าย|Easily startled',
    tightchest:'胸闷|xiōngmèn|แน่นหน้าอก|Chest tightness',
    nausea:'恶心|ěxīn|คลื่นไส้|Nausea',
    bitter:'口苦|kǒukǔ|ปากขม|Bitter taste',
    dizzy:'头晕|tóuyūn|เวียนศีรษะ|Dizziness',
    phlegm:'痰多|tán duō|เสมหะมาก|Abundant sputum',
    epifull:'胃脘胀满|wèiwǎn zhàngmǎn|แน่นลิ้นปี่|Epigastric fullness',
    afterfood:'食后加重|shí hòu jiāzhòng|อาการมากขึ้นหลังอาหาร|Worse after eating',
    foulbelch:'嗳腐|ǎifǔ|เรอมีกลิ่นอาหารบูด|Foul belching',
    acid:'吞酸|tūnsuān|มีน้ำรสเปรี้ยวย้อนขึ้นมา|Acid regurgitation',
    agitation:'烦躁不安|fánzào bù ān|หงุดหงิด กระวนกระวาย|Agitation',
    ulcers:'口舌生疮|kǒushé shēngchuāng|แผลในปากหรือลิ้น|Mouth or tongue ulcers',
    thirst:'口渴|kǒukě|กระหายน้ำ|Thirst',
    darkurine:'小便短赤|xiǎobiàn duǎn chì|ปัสสาวะน้อยสีเข้ม|Scanty dark urine',
    redface:'面红|miànhóng|หน้าแดง|Facial redness',
    diarrhea:'腹泻|fùxiè|ท้องเสีย|Diarrhea',
    recurrent:'反复发作|fǎnfù fāzuò|เป็นซ้ำ ๆ|Recurrent episodes',
    loose:'大便稀溏|dàbiàn xītáng|อุจจาระเหลวไม่เป็นรูป|Loose stools',
    bloating:'腹胀|fùzhàng|ท้องอืด|Abdominal bloating',
    stress:'情绪紧张时加重|qíngxù jǐnzhāng shí jiāzhòng|เครียดแล้วอาการมากขึ้น|Worse with emotional stress',
    abdominal:'腹痛|fùtòng|ปวดท้อง|Abdominal pain',
    abdDistend:'腹部胀痛|fùbù zhàngtòng|ปวดแน่นท้อง|Distending abdominal pain',
    afterstool:'排便后疼痛减轻|páibiàn hòu téngtòng jiǎnqīng|หลังถ่ายแล้วปวดลดลง|Pain relieved after defecation',
    flankfull:'胸胁胀满|xiōngxié zhàngmǎn|แน่นหน้าอกและชายโครง|Chest and flank fullness',
    sigh:'善太息|shàn tàixī|ถอนหายใจบ่อย|Frequent sighing',
    sourstool:'大便酸臭|dàbiàn suānchòu|อุจจาระกลิ่นเปรี้ยวเหม็น|Sour, foul-smelling stools',
    urgentstool:'泻下急迫|xièxià jípò|ท้องเสียแบบปวดถ่ายเร่งด่วน|Urgent diarrhea',
    foulstool:'大便臭秽|dàbiàn chòuhuì|อุจจาระเหม็นรุนแรง|Foul-smelling stools',
    analburn:'肛门灼热|gāngmén zhuórè|แสบร้อนทวารหนัก|Anal burning',
    yellowurine:'小便短黄|xiǎobiàn duǎn huáng|ปัสสาวะน้อยสีเหลืองเข้ม|Scanty yellow urine',
    dawn:'五更泄泻|wǔgēng xièxiè|ท้องเสียเช้ามืด|Early-morning diarrhea',
    coldabd:'腹部冷痛|fùbù lěngtòng|ปวดท้องลักษณะเย็น|Cold abdominal pain',
    cold:'畏寒|wèihán|ขี้หนาว กลัวหนาว|Cold intolerance',
    limbs:'肢冷|zhīlěng|แขนขาเย็น|Cold limbs',
    heavyhead:'头重如裹|tóu zhòng rú guǒ|หนักศีรษะเหมือนมีสิ่งห่อหุ้ม|Head feels heavy as if wrapped',
    vomiting:'呕吐|ǒutù|อาเจียน|Vomiting',
    heavy:'身体困重|shēntǐ kùnzhòng|หนักตัว|Body heaviness',
    headache:'头痛|tóutòng|ปวดศีรษะ|Headache',
    redeyes:'面红目赤|miànhóng mùchì|หน้าแดง ตาแดง|Red face and eyes',
    anger:'烦躁易怒|fánzào yì nù|หงุดหงิด โกรธง่าย|Irritability',
    vertigo:'头晕目眩|tóuyūn mùxuàn|เวียนศีรษะ ตาลาย|Dizziness and visual disturbance',
    headDistend:'头部胀痛|tóubù zhàngtòng|ปวดศีรษะแน่นตึง|Distending headache',
    breath:'气短|qìduǎn|หายใจสั้น เหนื่อยง่าย|Shortness of breath',
    exertion:'劳累后加重|láolèi hòu jiāzhòng|เหนื่อยแล้วอาการมากขึ้น|Worse after exertion',
    memory:'记忆力减退|jìyìlì jiǎntuì|ความจำลดลง|Memory decline',
    cough:'咳嗽|késou|ไอ|Cough',
    heavycough:'咳嗽声重|késou shēng zhòng|ไอเสียงหนัก|Heavy-sounding cough',
    thinwhite:'痰白清稀|tán bái qīngxī|เสมหะขาวใสเหลว|Thin white sputum',
    clearnose:'鼻塞流清涕|bísè liú qīngtì|คัดจมูก น้ำมูกใส|Blocked nose with clear discharge',
    chills:'恶寒|wùhán|หนาวสะท้าน|Aversion to cold / chills',
    fever:'发热|fārè|มีไข้หรือรู้สึกร้อน|Fever / heat sensation',
    nosweat:'无汗|wú hàn|ไม่มีเหงื่อ|Absence of sweating',
    yellowphlegm:'痰黄黏稠|tán huáng niánchóu|เสมหะเหลืองเหนียวข้น|Thick sticky yellow sputum',
    throat:'咽喉肿痛|yānhóu zhǒngtòng|คอบวมเจ็บ|Sore swollen throat',
    wind:'恶风|wùfēng|ไม่ทนต่อลม|Aversion to wind',
    drycough:'干咳无痰|gānké wú tán|ไอแห้ง ไม่มีเสมหะ|Dry cough without sputum',
    scantphlegm:'痰少而黏|tán shǎo ér nián|เสมหะน้อยเหนียว|Scanty sticky sputum',
    drythroat:'咽干|yāngān|คอแห้ง|Dry throat',
    drynose:'鼻燥|bízào|จมูกแห้ง|Dry nose',
    dryskin:'皮肤干燥|pífū gānzào|ผิวแห้ง|Dry skin',
    severecough:'咳嗽剧烈|késou jùliè|ไอรุนแรง|Severe cough',
    highheat:'发热明显|fārè míngxiǎn|มีไข้เด่นชัด|Marked fever',
    chestpain:'胸痛|xiōngtòng|เจ็บหน้าอก|Chest pain',
    rapidbreath:'呼吸急促|hūxī jícù|หายใจเร็ว|Rapid breathing',
    wheeze:'气喘|qìchuǎn|หอบ หายใจลำบาก|Breathlessness / wheezing',
    worsecold:'遇寒加重|yù hán jiāzhòng|เย็นแล้วอาการมากขึ้น|Worse with cold',
    weakcough:'咳嗽无力|késou wúlì|ไอไม่มีแรง|Weak cough',
    lowvoice:'声音低弱|shēngyīn dīruò|เสียงพูดเบาไม่มีแรง|Weak low voice',
    spontaneous:'自汗|zìhàn|เหงื่อออกเองขณะตื่น|Spontaneous sweating',
    frequentcolds:'容易感冒|róngyì gǎnmào|เป็นหวัดง่าย|Susceptibility to colds',
    coldepi:'胃脘冷痛|wèiwǎn lěngtòng|ปวดเย็นบริเวณลิ้นปี่|Cold epigastric pain',
    warmth:'得温减轻|dé wēn jiǎnqīng|อุ่นแล้วอาการลดลง|Relieved by warmth',
    warmdrink:'喜热饮|xǐ rèyǐn|ชอบน้ำอุ่น|Prefers warm drinks',
    nothirst:'口不渴|kǒu bù kě|ไม่กระหายน้ำ|Absence of thirst',
    epidistend:'胃脘胀痛|wèiwǎn zhàngtòng|ปวดแน่นลิ้นปี่|Distending epigastric pain',
    belch:'嗳气频繁|ǎiqì pínfán|เรอบ่อย|Frequent belching',
    burningepi:'胃脘灼热疼痛|wèiwǎn zhuórè téngtòng|ปวดแสบร้อนลิ้นปี่|Burning epigastric pain',
    sticky:'口黏|kǒunián|ปากเหนียว|Sticky mouth',
    dullepi:'胃脘隐痛|wèiwǎn yǐntòng|ปวดลิ้นปี่ตื้อ ๆ|Dull epigastric pain',
    pressure:'喜温喜按|xǐ wēn xǐ àn|อุ่นหรือกดเบา ๆ แล้วสบายขึ้น|Relieved by warmth and gentle pressure',
    chestheavy:'胸部沉重|xiōngbù chénzhòng|รู้สึกหนักหน้าอก|Chest heaviness',
    severeChest:'胸痛剧烈|xiōngtòng jùliè|เจ็บหน้าอกรุนแรง|Severe chest pain',
    chestback:'胸痛彻背|xiōngtòng chè bèi|เจ็บหน้าอกร้าวไปหลัง|Chest pain radiating to the back',
    chestdistend:'胸部胀痛|xiōngbù zhàngtòng|ปวดแน่นหน้าอก|Distending chest pain',
    flankdistend:'胁肋胀痛|xiélèi zhàngtòng|ปวดแน่นชายโครง|Distending flank pain',
    flankburn:'胁肋灼痛|xiélèi zhuótòng|ปวดแสบร้อนชายโครง|Burning flank pain',
    flankstab:'胁肋刺痛|xiélèi cìtòng|ปวดชายโครงเหมือนเข็มแทง|Stabbing flank pain',
    fixed:'疼痛固定不移|téngtòng gùdìng bù yí|ปวดตำแหน่งเดิมไม่เคลื่อน|Pain fixed in location',
    nightworse:'夜间加重|yèjiān jiāzhòng|อาการมากขึ้นกลางคืน|Worse at night',
    dullabd:'腹痛隐隐|fùtòng yǐnyǐn|ปวดท้องตื้อ ๆ|Dull abdominal pain',
    stabbing:'刺痛|cìtòng|ปวดเหมือนเข็มแทง|Stabbing pain',
    resistpressure:'拒按|jù àn|กดแล้วปวดมาก ไม่ชอบให้กด|Pain aggravated by pressure',
    lowercold:'少腹冷痛|shàofù lěngtòng|ปวดเย็นบริเวณท้องน้อยด้านข้าง|Cold lower lateral abdominal pain',
    genital:'疼痛牵引睾丸或阴部|téngtòng qiānyǐn gāowán huò yīnbù|ปวดร้าวไปอัณฑะหรืออวัยวะเพศ|Pain radiating to the testes or genital region',
    neck:'头痛连及项背|tóutòng liánjí xiàngbèi|ปวดศีรษะร้าวไปต้นคอและหลัง|Headache extending to the neck and back',
    dullhead:'头痛隐隐|tóutòng yǐnyǐn|ปวดศีรษะตื้อ ๆ|Dull headache',
    blurred:'头晕眼花|tóuyūn yǎnhuā|เวียนศีรษะ ตาพร่า|Dizziness and blurred vision',
    stabhead:'头痛如刺|tóutòng rú cì|ปวดศีรษะเหมือนเข็มแทง|Stabbing headache',
    persistent:'日久不愈|rì jiǔ bù yù|เป็นมานานไม่หาย|Persistent symptoms',
    awakesweat:'白天容易出汗|báitiān róngyì chūhàn|เหงื่อออกง่ายขณะตื่นในตอนกลางวัน|Easy sweating during the day',
    activity:'活动后加重|huódòng hòu jiāzhòng|ทำกิจกรรมแล้วอาการมากขึ้น|Worse after activity',
    sleepsweat:'入睡后出汗，醒后汗止|rùshuì hòu chūhàn, xǐng hòu hàn zhǐ|เหงื่อออกขณะหลับและหยุดเมื่อตื่น|Sweating during sleep, stopping on waking',
    tidal:'潮热|cháorè|ร้อนเป็นช่วงเวลา|Tidal heat',
    yellowsweat:'汗液发黄|hànyè fāhuáng|เหงื่อมีสีเหลือง|Yellow-colored sweat',
    stained:'衣服被汗液染黄|yīfu bèi hànyè rǎn huáng|เหงื่อทำให้เสื้อเป็นคราบเหลือง|Sweat stains clothing yellow',
    darkface:'面色晦暗|miànsè huì’àn|ใบหน้าหมองคล้ำ|Dusky complexion',
    edema:'身体浮肿|shēntǐ fúzhǒng|ตัวบวม|Edema',
    urine:'小便不利|xiǎobiàn bù lì|ปัสสาวะไม่คล่องหรือออกน้อย|Impaired urination',
    afterbloat:'饭后腹胀|fàn hòu fùzhàng|ท้องอืดหลังอาหาร|Post-meal bloating',
    fewwords:'少气懒言|shǎoqì lǎnyán|พูดน้อยเพราะไม่มีแรง|Weak breath and reluctance to speak',
    loudEar:'耳鸣突然发生，声音响亮|ěrmíng tūrán fāshēng, shēngyīn xiǎngliàng|มีเสียงในหูฉับพลันและเสียงดัง|Sudden loud tinnitus',
    roar:'耳中轰鸣|ěr zhōng hōngmíng|เสียงในหูคล้ายเสียงคำราม|Roaring tinnitus',
    longEar:'耳鸣日久，声音细小|ěrmíng rì jiǔ, shēngyīn xìxiǎo|เสียงในหูเรื้อรังและค่อนข้างเบา|Chronic faint tinnitus',
    cicada:'如蝉鸣|rú chánmíng|คล้ายเสียงจักจั่น|Resembling cicadas',
    hearing:'听力下降|tīnglì xiàjiàng|การได้ยินลดลง|Reduced hearing',
    stuffy:'胃脘痞闷|wèiwǎn pǐmèn|แน่นอึดอัดลิ้นปี่|Epigastric stuffiness',
    stickystool:'大便黏滞|dàbiàn niánzhì|อุจจาระเหนียว|Sticky stools',
    badtaste:'口中有异味|kǒu zhōng yǒu yìwèi|รสหรือกลิ่นผิดปกติในปาก|Unpleasant taste or odor in the mouth'
  };
  Object.entries(rawTerms).forEach(([id,s])=>term(id,s));
  const tongues = {
    redScant:L('舌红少苔','shé hóng shǎo tāi','ลิ้นแดง ฝ้าน้อย','Red tongue with scanty coating'),
    paleThin:L('舌淡，苔薄白','shé dàn, tāi bó bái','ลิ้นซีด ฝ้าบางขาว','Pale tongue with thin white coating'),
    yellowGreasy:L('苔黄腻','tāi huáng nì','ฝ้าเหลืองเหนียว','Yellow greasy coating'),
    thickGreasy:L('苔厚腻','tāi hòu nì','ฝ้าหนาเหนียว','Thick greasy coating'),
    redTip:L('舌尖红，苔黄','shéjiān hóng, tāi huáng','ปลายลิ้นแดง ฝ้าเหลือง','Red tongue tip with yellow coating'),
    teeth:L('舌淡，有齿痕','shé dàn, yǒu chǐhén','ลิ้นซีด มีรอยฟัน','Pale tongue with teeth marks'),
    thinWhite:L('苔薄白','tāi bó bái','ฝ้าบางขาว','Thin white coating'),
    redYellowGreasy:L('舌红，苔黄腻','shé hóng, tāi huáng nì','ลิ้นแดง ฝ้าเหลืองเหนียว','Red tongue with yellow greasy coating'),
    paleSwollenWhite:L('舌淡胖，苔白','shé dàn pàng, tāi bái','ลิ้นซีดบวม ฝ้าขาว','Pale swollen tongue with white coating'),
    whiteGreasy:L('苔白腻','tāi bái nì','ฝ้าขาวเหนียว','White greasy coating'),
    redYellow:L('舌红，苔黄','shé hóng, tāi huáng','ลิ้นแดง ฝ้าเหลือง','Red tongue with yellow coating'),
    red:L('舌红','shé hóng','ลิ้นแดง','Red tongue'),
    pale:L('舌淡','shé dàn','ลิ้นซีด','Pale tongue'),
    either:L('舌淡或舌红少苔','shé dàn huò shé hóng shǎo tāi','อาจซีดหรือแดงฝ้าน้อย ขึ้นกับภาวะพร่องร่วม','Pale, or red with scanty coating, depending on associated deficiency'),
    tipThinYellow:L('舌尖红，苔薄黄','shéjiān hóng, tāi bó huáng','ปลายลิ้นแดง ฝ้าบางเหลือง','Red tip with thin yellow coating'),
    dry:L('舌干少津','shé gān shǎo jīn','ลิ้นแห้ง สารน้ำบนลิ้นน้อย','Dry tongue with reduced moisture'),
    whiteSlippery:L('苔白滑','tāi bái huá','ฝ้าขาวลื่นชุ่ม','White slippery coating'),
    paleWhite:L('舌淡，苔白','shé dàn, tāi bái','ลิ้นซีด ฝ้าขาว','Pale tongue with white coating'),
    paleSwollen:L('舌淡胖','shé dàn pàng','ลิ้นซีดบวม','Pale swollen tongue'),
    paleDark:L('舌淡暗，苔白','shé dàn àn, tāi bái','ลิ้นซีดคล้ำ ฝ้าขาว','Pale dusky tongue with white coating'),
    thin:L('苔薄','tāi bó','ฝ้าบาง','Thin coating'),
    purple:L('舌质紫暗','shézhì zǐ’àn','เนื้อลิ้นม่วงคล้ำ','Purplish-dark tongue body'),
    white:L('苔白','tāi bái','ฝ้าขาว','White coating'),
    thinYellow:L('苔薄黄','tāi bó huáng','ฝ้าบางเหลือง','Thin yellow coating'),
    swollenSlippery:L('舌淡胖，苔白滑','shé dàn pàng, tāi bái huá','ลิ้นซีดบวม ฝ้าขาวลื่นชุ่ม','Pale swollen tongue with white slippery coating'),
    swollenGreasy:L('舌淡胖，苔白腻','shé dàn pàng, tāi bái nì','ลิ้นซีดบวม ฝ้าขาวเหนียว','Pale swollen tongue with white greasy coating')
  };
  const pulses = {
    fineRapid:L('脉细数','mài xì shuò','ชีพจรเล็กเร็ว','Fine rapid pulse'),
    fineWeak:L('脉细弱','mài xì ruò','ชีพจรเล็กอ่อน','Fine weak pulse'),
    wirySlippery:L('脉弦滑','mài xián huá','ชีพจรตึงลื่น','Wiry slippery pulse'),
    slippery:L('脉滑','mài huá','ชีพจรลื่น','Slippery pulse'),
    rapid:L('脉数','mài shuò','ชีพจรเร็ว','Rapid pulse'),
    wiry:L('脉弦','mài xián','ชีพจรตึง','Wiry pulse'),
    slipperyRapid:L('脉滑数','mài huá shuò','ชีพจรลื่นเร็ว','Slippery rapid pulse'),
    deepSlow:L('脉沉迟','mài chén chí','ชีพจรจมช้า','Deep slow pulse'),
    wiryRapid:L('脉弦数','mài xián shuò','ชีพจรตึงเร็ว','Wiry rapid pulse'),
    floatingTight:L('脉浮紧','mài fú jǐn','ชีพจรลอยแน่น','Floating tight pulse'),
    floatingRapid:L('脉浮数','mài fú shuò','ชีพจรลอยเร็ว','Floating rapid pulse'),
    dryEither:L('脉浮数或浮紧','mài fú shuò huò fú jǐn','ลอยเร็วเมื่อแห้งร่วมร้อน หรือลอยแน่นเมื่อแห้งร่วมเย็น','Floating rapid with warm dryness, or floating tight with cool dryness'),
    rapidStrong:L('脉数有力','mài shuò yǒulì','ชีพจรเร็วมีแรง','Rapid forceful pulse'),
    deficientWeak:L('脉虚弱','mài xūruò','ชีพจรพร่องอ่อน','Deficient weak pulse'),
    wiryTight:L('脉弦紧','mài xián jǐn','ชีพจรตึงแน่น','Wiry tight pulse'),
    deepFineWeak:L('脉沉细无力','mài chén xì wúlì','ชีพจรจมเล็กไม่มีแรง','Deep fine weak pulse'),
    deepTight:L('脉沉紧','mài chén jǐn','ชีพจรจมแน่น','Deep tight pulse'),
    rough:L('脉涩','mài sè','ชีพจรฝืด','Choppy pulse'),
    deepFine:L('脉沉细','mài chén xì','ชีพจรจมเล็ก','Deep fine pulse'),
    wiryRough:L('脉弦涩','mài xián sè','ชีพจรตึงฝืด','Wiry choppy pulse'),
    deepWiry:L('脉沉弦','mài chén xián','ชีพจรจมตึง','Deep wiry pulse'),
    deficient:L('脉虚','mài xū','ชีพจรพร่อง','Deficient pulse'),
    water:L('脉沉弦或沉弱','mài chén xián huò chén ruò','ชีพจรจมตึงหรือจมอ่อน','Deep wiry or deep weak pulse'),
    weak:L('脉弱','mài ruò','ชีพจรอ่อน','Weak pulse'),
    fine:L('脉细','mài xì','ชีพจรเล็ก','Fine pulse'),
    soggy:L('脉濡','mài rú','ชีพจรนุ่มลอยเล็กไม่มีแรง','Soggy pulse')
  };
  const questions = {};
  function q(id,zh,py,th,en,why) { questions[id]={id,...L(zh,py,th,en),why}; }
  q('open','请问您哪里不舒服？','Qǐngwèn nín nǎlǐ bù shūfu?','ไม่สบายตรงไหน เล่าให้ฟังได้ไหมครับ','What is troubling you?','เริ่มด้วยคำถามปลายเปิด ให้ผู้ป่วยเล่าอาการสำคัญโดยไม่ชี้นำ');
  q('duration','这种情况多久了？是突然出现还是慢慢出现的？','Zhè zhǒng qíngkuàng duō jiǔ le? Shì tūrán chūxiàn háishì mànmàn chūxiàn de?','เป็นมานานเท่าไร เริ่มทันทีหรือค่อย ๆ เป็นครับ','How long has this been happening? Was onset sudden or gradual?','ระยะเวลาและรูปแบบการเริ่มป่วยช่วยแยกอาการเฉียบพลันกับเรื้อรัง แต่ไม่ใช้ตัดสินพร่องหรือแกร่งเพียงข้อเดียว');
  q('modifiers','什么情况下会加重或减轻？','Shénme qíngkuàng xià huì jiāzhòng huò jiǎnqīng?','อะไรทำให้อาการมากขึ้นหรือลดลงครับ','What makes it worse or better?','ความสัมพันธ์กับอาหาร อารมณ์ ความเย็น ความอุ่น การออกแรง หรือเวลากลางคืนช่วยแยกกลไกที่คล้ายกัน');
  q('tongue','我想看一下您的舌头，可以吗？','Wǒ xiǎng kàn yíxià nín de shétou, kěyǐ ma?','ขอดูลิ้นได้ไหมครับ','May I examine your tongue?','ลิ้นและฝ้าช่วยประกอบการแยกร้อน เย็น พร่อง ชื้น และเลือดคั่ง ต้องเชื่อมกับประวัติที่ซักมา');
  q('pulse','我想给您把脉，可以吗？','Wǒ xiǎng gěi nín bǎmài, kěyǐ ma?','ขอจับชีพจรได้ไหมครับ','May I take your pulse?','ชีพจรเป็นหลักฐานประกอบสุดท้ายในแบบฝึกนี้ ใช้ยืนยันภาพรวม ไม่ใช้ชีพจรหนึ่งชนิดแทนข้อมูลทั้งหมด');
  q('sleep','是难以入睡、容易醒，还是多梦？','Shì nányǐ rùshuì, róngyì xǐng, háishì duōmèng?','หลับยาก ตื่นง่าย หรือฝันมากครับ','Is it difficulty falling asleep, waking easily, or frequent dreams?','แยกลักษณะการนอนไม่หลับก่อน แล้วค้นอาการร่วมที่ชี้ตำแหน่งและภาวะพร่องหรือแกร่ง');
  q('stool','大便是什么样的？有没有臭味或肛门灼热？','Dàbiàn shì shénme yàng de? Yǒu méiyǒu chòuwèi huò gāngmén zhuórè?','อุจจาระเป็นอย่างไร มีกลิ่นแรงหรือแสบทวารไหมครับ','What are the stools like? Any foul smell or anal burning?','ลักษณะ กลิ่น ความเร่งด่วน และอาการแสบทวารช่วยแยกความชื้นร้อน อาหารสะสม และภาวะพร่อง');
  q('dizzy','头晕时有没有头重、头痛或眼花？','Tóuyūn shí yǒu méiyǒu tóuzhòng, tóutòng huò yǎnhuā?','เวียนหัวร่วมกับหนักหัว ปวดหัว หรือตาพร่าไหมครับ','Does dizziness come with head heaviness, headache, or blurred vision?','หนักศีรษะสัมพันธ์กับเสมหะชื้น ส่วนปวดแน่นหรือหน้าซีดต้องถามต่อเพื่อแยกร้อน หยาง และพร่อง');
  q('sputum','有痰吗？痰的颜色、多少和稀稠怎么样？','Yǒu tán ma? Tán de yánsè, duōshǎo hé xīchóu zěnmeyàng?','มีเสมหะไหม สี ปริมาณ และความข้นเป็นอย่างไรครับ','Is there sputum? What color, amount and consistency?','สี ปริมาณ และความข้นของเสมหะช่วยแยกเย็น ร้อน แห้ง และเสมหะคั่ง ร่วมกับอาการทั่วร่างกาย');
  q('pain','请描述疼痛的位置和性质。','Qǐng miáoshù téngtòng de wèizhi hé xìngzhì.','ช่วยบอกตำแหน่งและลักษณะการปวดครับ','Please describe the location and character of the pain.','ตำแหน่งช่วยกำหนดอวัยวะหรือเส้นลมปราณ ลักษณะปวดแน่น แทง เย็น แสบ หรือตื้อช่วยวางแนว辨证');
  q('sweat','什么时候出汗？睡醒后会停止吗？汗是什么颜色？','Shénme shíhou chūhàn? Shuì xǐng hòu huì tíngzhǐ ma? Hàn shì shénme yánsè?','เหงื่อออกเวลาใด ตื่นแล้วหยุดไหม และสีอะไรครับ','When do you sweat? Does it stop on waking, and what color is it?','ต้องรู้เวลาและลักษณะเหงื่อก่อน การเหงื่อออกกลางคืนหรือคราบเหลืองอย่างเดียวไม่ยืนยัน证型');
  q('palp','心慌是怎样的感觉？发作时还有什么不舒服？','Xīnhuāng shì zěnyàng de gǎnjué? Fāzuò shí hái yǒu shénme bù shūfu?','ใจสั่นรู้สึกอย่างไร ตอนเป็นมีอาการอะไรอีกครับ','What do the palpitations feel like? What else happens during an episode?','อาการร่วมกับใจสั่นช่วยแยกพร่อง เสมหะ เลือดคั่ง และสารน้ำคั่ง ก่อนเชื่อมกับลิ้นและชีพจร');
  q('bloat','胀在什么位置？吃饭以后有什么变化？','Zhàng zài shénme wèizhi? Chīfàn yǐhòu yǒu shénme biànhuà?','อืดตรงไหน หลังอาหารเปลี่ยนอย่างไรครับ','Where is the bloating? How does it change after eating?','ท้องอืดหลังอาหารพบได้ทั้งม้ามพร่องและอาหารสะสม ต้องถามกำลังร่างกาย เรอ และอุจจาระต่อ');
  q('ear','耳鸣是突然发生的吗？声音响不响？听力有变化吗？','Ěrmíng shì tūrán fāshēng de ma? Shēngyīn xiǎng bu xiǎng? Tīnglì yǒu biànhuà ma?','เสียงในหูเริ่มทันทีไหม ดังมากไหม การได้ยินเปลี่ยนไหมครับ','Was tinnitus sudden? How loud is it? Has hearing changed?','เวลาเริ่ม ความดัง และการได้ยินช่วยตั้งแนว แต่ระดับเสียงไม่ใช้ตัดสินสูงต่ำของเสียงหรือ证型เพียงอย่างเดียว');
  q('energy','是没有力气，还是身体沉重？活动后怎样？','Shì méiyǒu lìqi, háishì shēntǐ chénzhòng? Huódòng hòu zěnyàng?','ไม่มีแรงหรือหนักตัว ทำกิจกรรมแล้วเป็นอย่างไรครับ','Is it weakness or body heaviness? What happens after activity?','ความอ่อนแรงกับความหนักตัวช่วยแยกชี่เลือดพร่องและความชื้น โดยยังต้องดูอาหาร อุจจาระ ลิ้น และชีพจร');
  q('appetite','是吃不下，还是吃后胃胀？有没有嗳气、恶心？','Shì chī bu xià, háishì chī hòu wèizhàng? Yǒu méiyǒu ǎiqì, ěxīn?','ไม่อยากอาหารหรือกินแล้วแน่น มีเรอหรือคลื่นไส้ไหมครับ','Is appetite poor, or is there post-meal fullness? Any belching or nausea?','เบื่ออาหารร่วมแน่นหลังอาหารและเรอเหม็นชี้อาหารสะสม ส่วนปากเหนียวหรือชายโครงปวดช่วยแยกชื้นร้อน');
  q('yin','有没有盗汗、手脚心发热或口干？','Yǒu méiyǒu dàohàn, shǒujiǎoxīn fārè huò kǒugān?','มีเหงื่อขณะหลับ ร้อนฝ่ามือฝ่าเท้า หรือปากแห้งไหมครับ','Any sweating during sleep, palm/sole heat, or dry mouth?','ค้นชุดอาการร้อนพร่อง ไม่สรุปจากปากแห้งหรือเหงื่อกลางคืนเพียงอาการเดียว');
  q('qi','有没有乏力、气短、自汗或声音低弱？','Yǒu méiyǒu fálì, qìduǎn, zìhàn huò shēngyīn dīruò?','มีอ่อนเพลีย หายใจสั้น เหงื่อออกเอง หรือเสียงเบาไหมครับ','Any fatigue, shortness of breath, spontaneous sweating, or weak voice?','อ่อนเพลียร่วมกับหายใจสั้น เหงื่อออกเอง และเสียงเบาช่วยสนับสนุนชี่พร่อง');
  q('blood','有没有头晕、面色苍白或心悸？','Yǒu méiyǒu tóuyūn, miànsè cāngbái huò xīnjì?','มีเวียนหัว หน้าซีด หรือใจสั่นไหมครับ','Any dizziness, pallor, or palpitations?','หน้าซีด เวียนหัว และใจสั่นเป็นชุดอาการหล่อเลี้ยงไม่พอ ใช้แยกร่วมกับอาการชี่พร่องและผลตรวจ');
  q('kidney','有没有腰膝酸软、耳鸣或记忆力下降？','Yǒu méiyǒu yāoxī suānruǎn, ěrmíng huò jìyìlì xiàjiàng?','มีเอวเข่าเมื่อยอ่อนแรง เสียงในหู หรือความจำลดลงไหมครับ','Any lower back/knee weakness, tinnitus, or memory decline?','อาการเอวเข่าและหูช่วยชี้ความเกี่ยวข้องกับไต ต้องดูร้อนพร่อง เย็นพร่อง หรือสารจิงพร่องต่อ');
  q('phlegm','有没有胸闷、恶心、痰多或身体困重？','Yǒu méiyǒu xiōngmèn, ěxīn, tán duō huò shēntǐ kùnzhòng?','มีแน่นอก คลื่นไส้ เสมหะมาก หรือหนักตัวไหมครับ','Any chest tightness, nausea, abundant sputum, or body heaviness?','แน่นอก คลื่นไส้ หนักตัว ร่วมฝ้าเหนียวช่วยสนับสนุนเสมหะหรือความชื้น');
  q('fire','有没有口苦、口渴、目赤或口舌生疮？','Yǒu méiyǒu kǒukǔ, kǒukě, mùchì huò kǒushé shēngchuāng?','มีปากขม กระหายน้ำ ตาแดง หรือแผลในปากไหมครับ','Any bitter taste, thirst, red eyes, or mouth ulcers?','ค้นอาการร้อนเด่นและตำแหน่ง เช่น แผลในปากกับปลายลิ้นแดง หรือปากขมตาแดงร่วมชายโครงปวด');
  q('cold','有没有怕冷、手脚冷？热敷后会好些吗？','Yǒu méiyǒu pà lěng, shǒujiǎo lěng? Rèfū hòu huì hǎo xiē ma?','ขี้หนาว มือเท้าเย็นไหม อุ่นแล้วดีขึ้นไหมครับ','Do you feel cold or have cold hands/feet? Does warmth help?','ความหนาวและอุ่นแล้วดีขึ้นสนับสนุนลักษณะเย็น ต้องใช้ความเรื้อรัง กำลัง และชีพจรแยกพร่องเย็นกับเย็นแกร่ง');
  q('food','有没有嗳腐、吞酸、腹胀或大便酸臭？','Yǒu méiyǒu ǎifǔ, tūnsuān, fùzhàng huò dàbiàn suānchòu?','มีเรอเหม็น น้ำเปรี้ยวย้อน ท้องอืด หรืออุจจาระเปรี้ยวเหม็นไหมครับ','Any foul belching, acid regurgitation, bloating, or sour-smelling stools?','ชุดอาหารคั่งต่างจากพร่องตรงเรอเหม็น แน่นมากหลังอาหาร และฝ้าหนาเหนียว');
  q('emotion','和情绪有关系吗？有没有胸胁胀满、嗳气或叹气？','Hé qíngxù yǒu guānxi ma? Yǒu méiyǒu xiōngxié zhàngmǎn, ǎiqì huò tànqì?','สัมพันธ์กับอารมณ์ไหม มีแน่นชายโครง เรอ หรือถอนหายใจไหมครับ','Is it related to emotions? Any flank fullness, belching or sighing?','ความสัมพันธ์กับอารมณ์ร่วมปวดแน่น เรอ และถอนหายใจสนับสนุนชี่ตับติดขัด');
  q('stasis','疼痛像针刺吗？位置固定吗？晚上会加重吗？','Téngtòng xiàng zhēncì ma? Wèizhi gùdìng ma? Wǎnshang huì jiāzhòng ma?','ปวดเหมือนเข็มแทงไหม อยู่จุดเดิมไหม กลางคืนมากขึ้นไหมครับ','Is pain stabbing, fixed in location, or worse at night?','ปวดแทงตำแหน่งเดิมร่วมลิ้นม่วงคล้ำและชีพจรฝืดช่วยชี้เลือดคั่ง');
  q('water','有没有浮肿、小便不利或怕冷？','Yǒu méiyǒu fúzhǒng, xiǎobiàn bù lì huò pà lěng?','มีบวม ปัสสาวะไม่คล่อง หรือขี้หนาวไหมครับ','Any edema, impaired urination, or cold intolerance?','บวมและปัสสาวะผิดปกติเป็นตัวแยกสำคัญของน้ำคั่งรบกวนหัวใจจากกลุ่มใจสั่นอื่น');
  q('dampheat','有没有口苦口黏、身体困重或小便黄？','Yǒu méiyǒu kǒukǔ kǒunián, shēntǐ kùnzhòng huò xiǎobiàn huáng?','ปากขมปากเหนียว หนักตัว หรือปัสสาวะเหลืองไหมครับ','Any bitter sticky mouth, body heaviness or yellow urine?','ชื้นร่วมร้อนต้องมีหลักฐานทั้งความชื้น เช่น หนักตัวฝ้าเหนียว และความร้อน เช่น ขม เหลือง แสบ');
  q('dry','有没有咽干、鼻燥、口干或皮肤干燥？','Yǒu méiyǒu yāngān, bízào, kǒugān huò pífū gānzào?','คอ จมูก ปาก หรือผิวแห้งไหมครับ','Any dryness of throat, nose, mouth or skin?','ไอแห้งร่วมจมูกคอแห้งชี้ความแห้ง ต้องแยกจากหยินพร่องด้วยระยะเวลาและอาการร้อนพร่อง');
  q('genital','疼痛会牵引到腹股沟或阴部吗？遇冷会加重吗？','Téngtòng huì qiānyǐn dào fùgǔgōu huò yīnbù ma? Yù lěng huì jiāzhòng ma?','ปวดร้าวไปขาหนีบหรืออวัยวะเพศไหม เย็นแล้วมากขึ้นไหมครับ','Does pain radiate to the groin/genitals and worsen with cold?','ตำแหน่งท้องน้อยและแนวร้าวร่วมความเย็นช่วยแยกเย็นคั่งในเส้นลมปราณตับ');
  const patterns = {};
  function p(id,title,symptoms,keys,tongue,pulse,focus,kind,why) {
    patterns[id]={id,name:L(...title.split('|')),symptoms:symptoms.split(' '),keys:keys.split(' '),tongue,pulse,focus,kind,why};
  }
  p('heart-kidney','心肾不交证|xīn shèn bù jiāo zhèng|หัวใจและไตไม่ประสานกัน|Heart–Kidney disharmony','insomnia restless falling kidney tinnitus fiveheat nightsweat drymouth','kidney fiveheat nightsweat','redScant','fineRapid','kidney','yin','นอนไม่หลับร่วมอาการร้อนพร่องและเอวเข่าเมื่อยอ่อนแรง เชื่อมอาการหัวใจกับไต ต่างจากไฟหัวใจแกร่งที่แผลในปากและฝ้าเหลืองเด่น');
  p('heart-spleen','心脾两虚证|xīn pí liǎng xū zhèng|หัวใจและม้ามพร่อง|Heart–Spleen deficiency','insomnia dreams waking palp forget fatigue appetite sallow','palp fatigue appetite','paleThin','fineWeak','blood','qi','ใจสั่นและนอนหลับไม่ดีร่วมอ่อนเพลีย เบื่ออาหาร ลิ้นซีด สื่อถึงการหล่อเลี้ยงหัวใจไม่พอร่วมหน้าที่ม้ามพร่อง');
  p('gall-phlegm','胆郁痰扰证|dǎn yù tán rǎo zhèng|ถุงน้ำดีติดขัดและเสมหะรบกวน|Gallbladder constraint with phlegm disturbance','insomnia restless fright tightchest nausea bitter dizzy phlegm palp dreams','fright tightchest nausea','yellowGreasy','wirySlippery','phlegm','phlegm','ตกใจง่าย แน่นอก คลื่นไส้ ร่วมฝ้าเหนียวและชีพจรตึงลื่น ชี้เสมหะรบกวน มากกว่าการพร่องอย่างเดียว');
  p('food-inner','食滞内停证|shízhì nèi tíng zhèng|อาหารคั่งสะสมภายใน|Internal food stagnation','insomnia epifull afterfood foulbelch acid nausea appetite','afterfood foulbelch epifull','thickGreasy','slippery','food','food','นอนไม่หลับสัมพันธ์กับแน่นลิ้นปี่หลังอาหารและเรอเหม็น ร่วมฝ้าหนาเหนียว ชี้อาหารคั่งทำให้กระเพาะไม่สงบ');
  p('heart-fire','心火亢盛证|xīnhuǒ kàngshèng zhèng|ไฟหัวใจกำเริบ|Exuberant Heart fire','insomnia agitation restless ulcers thirst darkurine redface','ulcers agitation darkurine','redTip','rapid','fire','heat','แผลปากลิ้น ปลายลิ้นแดง ปัสสาวะน้อยเข้ม และกระสับกระส่ายเด่น ช่วยแยกไฟหัวใจจากร้อนพร่อง');
  p('spleen-qi','脾气虚证|píqì xū zhèng|ชี่ม้ามพร่อง|Spleen qi deficiency','diarrhea recurrent loose appetite bloating fatigue sallow','recurrent appetite fatigue','teeth','fineWeak','qi','qi','ท้องเสียซ้ำร่วมเบื่ออาหาร อ่อนเพลีย ลิ้นซีดรอยฟัน และชีพจรอ่อน สนับสนุนหน้าที่ม้ามพร่อง โดยไม่มีเย็นไตเด่น');
  p('liver-spleen','肝郁乘脾证|gān yù chéng pí zhèng|ชี่ตับติดขัดและข่มม้าม|Liver constraint overacting on the Spleen','diarrhea abdominal stress abdDistend afterstool flankfull sigh','stress afterstool sigh','thinWhite','wiry','emotion','qi-stag','ปวดท้องท้องเสียเมื่อเครียด ร่วมแน่นชายโครง ถอนหายใจ และชีพจรตึง เชื่อมตับกับม้าม ต่างจากอาหารคั่งที่เรอเหม็นเด่น');
  p('food-diarrhea','饮食积滞证|yǐnshí jīzhì zhèng|อาหารสะสม|Food accumulation','diarrhea abdominal bloating foulbelch acid sourstool appetite afterstool afterfood','foulbelch sourstool bloating','thickGreasy','slippery','food','food','ท้องเสียร่วมเรอเหม็น อุจจาระเปรี้ยวเหม็น แน่นท้อง และฝ้าหนาเหนียว เป็นหลักฐานอาหารสะสม ไม่ใช่ความชื้นร้อนจากกลิ่นเพียงอย่างเดียว');
  p('intestine-dampheat','大肠湿热证|dàcháng shīrè zhèng|ลำไส้ใหญ่ชื้นร้อน|Large Intestine damp-heat','abdominal diarrhea urgentstool foulstool analburn thirst yellowurine','urgentstool analburn foulstool','redYellowGreasy','slipperyRapid','dampheat','dampheat','ท้องเสียเร่งด่วน แสบทวาร อุจจาระเหม็น ร่วมลิ้นแดงฝ้าเหลืองเหนียว เป็นชุดอาการชื้นร้อน');
  p('kidney-yang','肾阳虚证|shènyáng xū zhèng|หยางไตพร่อง|Kidney yang deficiency','dawn diarrhea coldabd cold limbs kidney fatigue','dawn cold kidney','paleSwollenWhite','deepSlow','kidney','yang','ท้องเสียเช้ามืดร่วมหนาว แขนขาเย็น และเอวเข่าอ่อนแรง ช่วยแยกหยางไตพร่องจากชี่ม้ามพร่อง');
  p('phlegm-damp','痰湿内阻证|tánshī nèi zǔ zhèng|เสมหะชื้นอุดกั้นภายใน|Internal phlegm-dampness obstruction','dizzy heavyhead tightchest nausea vomiting appetite heavy','heavyhead nausea heavy','whiteGreasy','slippery','phlegm','phlegm','เวียนหัวแบบหนักเหมือนห่อ แน่นอก คลื่นไส้ หนักตัว ร่วมฝ้าขาวเหนียวและชีพจรลื่น ชี้เสมหะชื้น');
  p('liver-fire','肝火上炎证|gānhuǒ shàngyán zhèng|ไฟตับลุกขึ้นด้านบน|Liver fire flaming upward','dizzy headache redeyes anger bitter drymouth tinnitus insomnia','redeyes bitter anger','redYellow','wiryRapid','fire','heat','หน้าและตาแดง ปากขม หงุดหงิด ร่วมฝ้าเหลืองและชีพจรตึงเร็ว แสดงร้อนแกร่งเด่นกว่าหยางกำเริบร่วมฐานพร่อง');
  p('liver-yang','肝阳上亢证|gānyáng shàngkàng zhèng|หยางตับกำเริบขึ้นบน|Hyperactive Liver yang','vertigo dizzy headDistend tinnitus redface anger kidney insomnia','headDistend tinnitus kidney','red','wiry','kidney','yin','ปวดหัวแน่น เวียนหัว หูมีเสียง ร่วมเอวเข่าอ่อนแรง ช่วยชี้หยางขึ้นบนบนฐานพร่อง ควรถามอาการฐานพร่องเพิ่มเพื่อแยกจากไฟตับ');
  p('qi-blood','气血亏虚证|qìxuè kuīxū zhèng|ชี่และเลือดพร่อง|Qi and blood deficiency','dizzy pale fatigue palp breath appetite exertion insomnia','pale fatigue palp breath','pale','fineWeak','blood','qi','หน้าซีด เวียนหัว ใจสั่น ร่วมอ่อนเพลียหายใจสั้น และชีพจรเล็กอ่อน สนับสนุนชี่และเลือดพร่องร่วมกัน');
  p('kidney-essence','肾精亏虚证|shènjīng kuīxū zhèng|สารจิงไตพร่อง|Kidney essence deficiency','dizzy tinnitus kidney forget memory fatigue','tinnitus kidney memory','either','fineWeak','kidney','essence','เวียนหัวเรื้อรัง หูมีเสียง เอวเข่าอ่อนแรง และความจำลดลงช่วยชี้สารจิงไตพร่อง ลิ้นอาจต่างกันตามหยินหรือหยางพร่องร่วม');
  p('windcold-lung','风寒犯肺证|fēnghán fàn fèi zhèng|ลมเย็นรุกรานปอด|Wind-cold invading the Lung','cough heavycough thinwhite clearnose chills fever nosweat headache','thinwhite clearnose chills','thinWhite','floatingTight','cold','external-cold','ไอเสมหะขาวใส น้ำมูกใส หนาวสะท้าน ไม่มีเหงื่อ ร่วมชีพจรลอยแน่น ชี้ลมเย็นภายนอกรุกรานปอด');
  p('windheat-lung','风热犯肺证|fēngrè fàn fèi zhèng|ลมร้อนรุกรานปอด|Wind-heat invading the Lung','cough yellowphlegm throat fever thirst wind','yellowphlegm throat wind','tipThinYellow','floatingRapid','fire','external-heat','ไอเสมหะเหลือง เจ็บคอ มีไข้ กลัวลม และชีพจรลอยเร็ว ชี้ลมร้อนภายนอก ต่างจากร้อนสะสมในปอดที่ร้อนและหอบเด่น');
  p('dry-lung','燥邪犯肺证|zàoxié fàn fèi zhèng|ความแห้งรุกรานปอด|Dryness invading the Lung','drycough scantphlegm drythroat drynose drymouth dryskin','drycough drythroat drynose','dry','dryEither','dry','dry','ไอแห้งร่วมคอจมูกแห้งและสารน้ำน้อยเด่น ตำรานี้รวมแห้งร่วมร้อนกับแห้งร่วมเย็น จึงไม่บังคับชีพจรแบบเดียวทุกเคส');
  p('lung-heat','肺热壅盛证|fèirè yōngshèng zhèng|ความร้อนสะสมรุนแรงในปอด|Exuberant Lung heat','severecough yellowphlegm highheat thirst chestpain rapidbreath','highheat yellowphlegm rapidbreath','redYellow','rapidStrong','fire','heat','ไอรุนแรง ไข้เด่น เสมหะเหลืองข้น ร่วมชีพจรเร็วมีแรง ชี้ร้อนสะสมในปอด ต้องประเมินความรุนแรงทางระบบหายใจในคนไข้จริง');
  p('coldphlegm-lung','寒痰阻肺证|hántán zǔ fèi zhèng|เสมหะเย็นอุดกั้นปอด|Cold-phlegm obstructing the Lung','cough wheeze phlegm thinwhite tightchest cold worsecold','phlegm thinwhite worsecold','whiteSlippery','wirySlippery','cold','cold','เสมหะขาวเหลวปริมาณมาก ไอหอบ แน่นอก และเย็นแล้วมากขึ้น ร่วมฝ้าขาวลื่น สนับสนุนเสมหะเย็นภายใน มากกว่าลมเย็นภายนอก');
  p('lung-qi','肺气不足证|fèiqì bùzú zhèng|ชี่ปอดไม่เพียงพอ|Lung qi deficiency','weakcough breath lowvoice fatigue spontaneous frequentcolds','weakcough lowvoice spontaneous','pale','deficientWeak','qi','qi','ไอไม่มีแรง เสียงเบา เหนื่อยง่าย เหงื่อออกเอง และเป็นหวัดง่าย ร่วมลิ้นซีดชีพจรอ่อน ชี้ชี่ปอดไม่พอ');
  p('stomach-cold','寒邪客胃证|hánxié kè wèi zhèng|ความเย็นรุกรานกระเพาะ|Cold invading the Stomach','coldepi worsecold warmth warmdrink nothirst','coldepi worsecold warmth','thinWhite','wiryTight','cold','cold','ปวดเย็นลิ้นปี่ค่อนข้างเฉียบพลัน เย็นแล้วมาก อุ่นแล้วดี ร่วมชีพจรตึงแน่น ชี้เย็นแกร่ง มากกว่าปวดตื้อเรื้อรังจากพร่อง');
  p('stomach-food','饮食停滞证|yǐnshí tíngzhì zhèng|อาหารคั่งค้าง|Food stagnation','epidistend afterfood foulbelch acid nausea vomiting appetite','afterfood foulbelch epidistend','thickGreasy','slippery','food','food','ปวดแน่นลิ้นปี่หลังอาหารร่วมเรอเหม็น น้ำเปรี้ยวย้อน และฝ้าหนาเหนียว ชี้อาหารคั่ง');
  p('liver-stomach','肝气犯胃证|gānqì fàn wèi zhèng|ชี่ตับรุกรานกระเพาะ|Liver qi invading the Stomach','epidistend epifull stress belch flankfull sigh','stress belch flankfull','thinWhite','wiry','emotion','qi-stag','อาการกระเพาะสัมพันธ์กับอารมณ์ ร่วมเรอบ่อย แน่นชายโครง ถอนหายใจ และชีพจรตึง ช่วยแยกชี่ติดขัดจากอาหารสะสม');
  p('spleenstomach-dampheat','脾胃湿热证|píwèi shīrè zhèng|ม้ามและกระเพาะชื้นร้อน|Spleen–Stomach damp-heat','burningepi stuffy bitter sticky nausea appetite heavy stickystool','sticky heavy bitter','yellowGreasy','slipperyRapid','dampheat','dampheat','อาการแน่นหรือแสบบริเวณกระเพาะร่วมปากเหนียว หนักตัว ปากขม และฝ้าเหลืองเหนียว สนับสนุนชื้นร้อนที่ม้ามกระเพาะ');
  p('spleenstomach-cold','脾胃虚寒证|píwèi xūhán zhèng|ม้ามและกระเพาะพร่องเย็น|Spleen–Stomach deficiency-cold','dullepi dullabd pressure appetite fatigue loose cold limbs','pressure fatigue loose cold','paleWhite','deepFineWeak','cold','yang','ปวดตื้อเรื้อรัง อุ่นหรือกดแล้วดี ร่วมอ่อนเพลีย ถ่ายเหลว ลิ้นซีด ชีพจรไม่มีแรง ชี้พร่องเย็น');
  p('heart-phlegm','痰阻心脉证|tán zǔ xīnmài zhèng|เสมหะอุดกั้นหลอดชีพจรหัวใจ|Phlegm obstructing Heart vessels','tightchest chestpain chestheavy phlegm breath heavy','chestheavy phlegm heavy','whiteGreasy','slippery','phlegm','phlegm','แน่นหนักหน้าอกเด่น เสมหะมาก หนักตัว และฝ้าขาวเหนียวชีพจรลื่น ช่วยชี้เสมหะอุดกั้นในกรอบ辨证ของโจทย์');
  p('heart-yang','心阳不振证|xīnyáng bùzhèn zhèng|หยางหัวใจอ่อนกำลัง|Heart yang deficiency','tightchest chestpain palp breath cold limbs fatigue spontaneous','palp cold fatigue','paleSwollen','deepFineWeak','cold','yang','เจ็บแน่นอกร่วมใจสั่น หนาว แขนขาเย็น อ่อนเพลีย และชีพจรจมไม่มีแรง ชี้หยางหัวใจพร่อง');
  p('heart-cold','寒凝心脉证|hánníng xīnmài zhèng|ความเย็นคั่งในหลอดชีพจรหัวใจ|Cold congealing in Heart vessels','severeChest worsecold warmth chestback limbs','severeChest worsecold chestback','paleDark','deepTight','cold','cold','ปวดหน้าอกรุนแรงสัมพันธ์ความเย็น ร้าวหลัง อุ่นแล้วลด ร่วมชีพจรจมแน่น ชี้เย็นคั่งในโจทย์ ต้องประเมินฉุกเฉินในคนไข้จริง');
  p('heart-qistag','气滞心脉证|qìzhì xīnmài zhèng|ชี่ติดขัดในหลอดชีพจรหัวใจ|Qi stagnation in Heart vessels','chestdistend tightchest stress sigh flankfull','stress sigh chestdistend','thin','wiry','emotion','qi-stag','ปวดแน่นอกร่วมอารมณ์ ถอนหายใจ และชีพจรตึง ชี้ชี่ติดขัด ไม่ได้ใช้ความสัมพันธ์อารมณ์ตัดโรคหัวใจจริงออก');
  p('liver-qistag','肝郁气滞证|gān yù qìzhì zhèng|ชี่ตับติดขัด|Liver qi stagnation','flankdistend stress tightchest sigh anger','flankdistend stress sigh','thinWhite','wiry','emotion','qi-stag','ปวดชายโครงแบบแน่นและมากเมื่ออารมณ์ไม่ดี ร่วมถอนหายใจและชีพจรตึง ชี้ชี่ตับติดขัด');
  p('livergall-dampheat','肝胆湿热证|gāndǎn shīrè zhèng|ตับและถุงน้ำดีชื้นร้อน|Liver–Gallbladder damp-heat','flankdistend bitter nausea appetite yellowurine heavy','flankdistend bitter heavy','yellowGreasy','wiryRapid','dampheat','dampheat','ปวดแน่นชายโครงร่วมปากขม คลื่นไส้ หนักตัว ปัสสาวะเหลือง และฝ้าเหลืองเหนียว ชี้ตำแหน่งตับถุงน้ำดีร่วมชื้นร้อน');
  p('livergall-fire','肝胆火旺证|gāndǎn huǒwàng zhèng|ไฟตับและถุงน้ำดีกำเริบ|Liver–Gallbladder fire','flankburn anger redeyes bitter headache tinnitus','flankburn redeyes anger','redYellow','wiryRapid','fire','heat','ปวดแสบร้อนชายโครง ตาแดงหน้าแดง หงุดหงิด และชีพจรตึงเร็ว มีร้อนเด่น ส่วนชื้นร้อนจะมีหนักตัวและฝ้าเหนียวเด่น');
  p('liver-stasis','肝血瘀阻证|gānxuè yūzǔ zhèng|เลือดตับคั่งอุดกั้น|Liver blood stasis','flankstab fixed nightworse','flankstab fixed nightworse','purple','rough','stasis','stasis','ปวดชายโครงแทงตำแหน่งเดิมและมากกลางคืน ร่วมลิ้นม่วงชีพจรฝืด เป็นชุดเลือดคั่ง');
  p('cold-damp','寒湿阻滞证|hánshī zǔzhì zhèng|เย็นชื้นอุดกั้น|Cold-dampness obstruction','coldabd worsecold warmth bloating loose heavy','coldabd heavy loose','whiteGreasy','deepTight','cold','cold','ปวดเย็นร่วมหนักตัว ท้องอืด ถ่ายเหลว ฝ้าขาวเหนียวและชีพจรจมแน่น สื่อเย็นชื้นอุดกั้น');
  p('qi-bloodstasis','气滞血瘀证|qìzhì xuèyū zhèng|ชี่ติดขัดและเลือดคั่ง|Qi stagnation with blood stasis','abdDistend stabbing fixed stress resistpressure','stabbing fixed resistpressure','purple','wiryRough','stasis','stasis','ปวดแน่นร่วมปวดแทงตำแหน่งเดิม ไม่ชอบให้กด ลิ้นม่วงและชีพจรตึงฝืด สื่อทั้งชี่ติดขัดและเลือดคั่ง');
  p('liverchannel-cold','寒凝肝脉证|hánníng gānmài zhèng|ความเย็นคั่งในเส้นลมปราณตับ|Cold congealing in the Liver channel','lowercold genital worsecold warmth','lowercold genital worsecold','white','deepWiry','genital','cold','ปวดเย็นท้องน้อยร้าวสู่อวัยวะเพศหรือขาหนีบและมากเมื่อเย็น ชี้แนวเส้นลมปราณตับ ต่างจากปวดท้องเย็นทั่วไป');
  p('wind-cold','风寒证|fēnghán zhèng|ลมเย็น|Wind-cold','neck chills fever clearnose nosweat worsecold','neck chills clearnose','thinWhite','floatingTight','cold','external-cold','ปวดศีรษะร้าวต้นคอ หนาวสะท้าน น้ำมูกใส ไม่มีเหงื่อ และชีพจรลอยแน่น เป็นชุดลมเย็นภายนอก');
  p('wind-heat','风热证|fēngrè zhèng|ลมร้อน|Wind-heat','headDistend fever wind thirst throat redface','fever throat thirst','thinYellow','floatingRapid','fire','external-heat','ปวดหัวแน่นร่วมไข้ เจ็บคอ กระหายน้ำ กลัวลม และชีพจรลอยเร็ว สนับสนุนลมร้อนภายนอก');
  p('blood-nourish','血虚不荣证|xuèxū bù róng zhèng|เลือดพร่องไม่พอหล่อเลี้ยง|Blood deficiency failing to nourish','dullhead blurred pale palp insomnia fatigue','pale blurred palp','pale','fineWeak','blood','blood','ปวดหัวตื้อร่วมหน้าซีด ตาพร่า ใจสั่น และชีพจรเล็กอ่อน เน้นเลือดหล่อเลี้ยงไม่พอ ต่างจากชี่พร่องที่หายใจสั้นเหงื่อเองเด่น');
  p('bloodstasis','瘀血阻滞证|yūxuè zǔzhì zhèng|เลือดคั่งอุดกั้น|Blood stasis obstruction','stabhead fixed persistent nightworse','stabhead fixed nightworse','purple','rough','stasis','stasis','ปวดหัวแทงจุดเดิมเรื้อรัง มากกลางคืน ลิ้นม่วงชีพจรฝืด สนับสนุนเลือดคั่ง');
  p('qi-nourish','气虚不荣证|qìxū bù róng zhèng|ชี่พร่องไม่พอหล่อเลี้ยง|Qi deficiency failing to nourish','dullhead exertion fatigue breath spontaneous appetite','exertion breath spontaneous','pale','deficientWeak','qi','qi','ปวดหัวตื้อหลังเหนื่อย ร่วมไม่มีแรง หายใจสั้น เหงื่อออกเอง ลิ้นซีดชีพจรอ่อน ชี้ชี่พร่อง');
  p('qi-sweat','自汗（气虚证）|zìhàn (qìxū zhèng)|เหงื่อออกเองจากชี่พร่อง|Spontaneous sweating / qi deficiency','awakesweat spontaneous activity breath fatigue lowvoice','awakesweat activity breath','pale','deficient','qi','qi','เหงื่อออกขณะตื่นโดยไม่ได้ร้อนหรือออกแรงมาก ร่วมเหนื่อย เสียงเบาและชีพจรพร่อง สนับสนุนชี่พร่องในโจทย์');
  p('yin-sweat','盗汗（阴虚证）|dàohàn (yīnxū zhèng)|เหงื่อออกขณะหลับจากหยินพร่อง|Sleep sweating / yin deficiency','sleepsweat nightsweat fiveheat drymouth drythroat tidal','sleepsweat fiveheat drymouth','redScant','fineRapid','yin','yin','เหงื่อขณะหลับหยุดเมื่อตื่นร่วมร้อนฝ่ามือฝ่าเท้า ปากคอแห้ง ลิ้นแดงฝ้าน้อย ชี้หยินพร่อง ไม่ใช้เหงื่อกลางคืนเพียงอย่างเดียว');
  p('yellow-sweat','黄汗（湿热证）|huánghàn (shīrè zhèng)|เหงื่อเหลืองตามแบบฝึกชื้นร้อน|Yellow sweating / curriculum damp-heat pattern','yellowsweat stained heavy sticky yellowurine','yellowsweat heavy sticky','yellowGreasy','slipperyRapid','dampheat','dampheat','ยึดแบบฝึกนี้: เหงื่อเหลืองร่วมหนักตัว ปากเหนียว ฝ้าเหลืองเหนียว จัดเป็นชื้นร้อน คราบเหลืองเพียงอย่างเดียวมีหลายสาเหตุ และ黄汗ในคัมภีร์มีการจำแนกอื่นได้');
  p('qi-blood-palp','气血两虚证|qìxuè liǎng xū zhèng|ชี่และเลือดพร่อง|Qi and blood deficiency','palp breath fatigue pale dizzy insomnia','pale fatigue breath','pale','fineWeak','blood','qi','ใจสั่นร่วมหน้าซีด เวียนหัว เหนื่อยและหายใจสั้น ลิ้นซีดชีพจรเล็กอ่อน สนับสนุนชี่เลือดพร่อง');
  p('heart-yin','心阴不足证|xīnyīn bùzú zhèng|หยินหัวใจไม่เพียงพอ|Heart yin deficiency','palp restless insomnia fiveheat nightsweat drymouth','palp fiveheat nightsweat','redScant','fineRapid','yin','yin','ใจสั่นนอนหลับไม่ดีร่วมเหงื่อขณะหลับ ร้อนฝ่ามือฝ่าเท้า ลิ้นแดงฝ้าน้อยชีพจรเล็กเร็ว ชี้หยินหัวใจพร่อง');
  p('heart-stasis','心脉瘀阻证|xīnmài yūzǔ zhèng|เลือดคั่งอุดกั้นหลอดชีพจรหัวใจ|Blood stasis obstructing Heart vessels','palp chestpain fixed stabbing darkface','fixed stabbing chestpain','purple','rough','stasis','stasis','ใจสั่นร่วมเจ็บอกแทงจุดเดิม ลิ้นม่วงและชีพจรฝืด สนับสนุนเลือดคั่งในกรอบ辨证 ต้องประเมินโรคหัวใจในคนไข้จริง');
  p('heart-water','水气凌心证|shuǐqì líng xīn zhèng|น้ำคั่งรบกวนหัวใจ|Water qi harassing the Heart','palp dizzy tightchest cold limbs edema urine','edema urine cold','swollenSlippery','water','water','yang','ใจสั่นร่วมบวม ปัสสาวะไม่คล่อง หนาว และลิ้นซีดบวมฝ้าขาวลื่น ช่วยแยกน้ำคั่งจากพร่องหรือเสมหะอย่างเดียว');
  p('spleenstomach-qi','脾胃气虚证|píwèi qìxū zhèng|ชี่ม้ามกระเพาะพร่อง|Spleen–Stomach qi deficiency','afterbloat appetite fatigue loose fewwords','afterbloat fatigue loose','pale','weak','qi','qi','ท้องอืดหลังอาหารร่วมกินได้น้อย เหนื่อย ถ่ายเหลว เสียงพูดไม่มีแรง ลิ้นซีดชีพจรอ่อน ชี้ชี่ม้ามกระเพาะพร่อง');
  p('spleenstomach-yang','脾胃阳虚证|píwèi yángxū zhèng|หยางม้ามกระเพาะพร่อง|Spleen–Stomach yang deficiency','bloating coldabd pressure cold limbs loose fatigue','coldabd pressure cold','paleSwollen','deepSlow','cold','yang','ท้องอืดร่วมปวดเย็น อุ่นหรือกดแล้วสบาย หนาวและถ่ายเหลว ลิ้นซีดบวมชีพจรจมช้า เพิ่มลักษณะเย็นจากชี่พร่องทั่วไป');
  p('food-gut','食积胃肠证|shíjī wèicháng zhèng|อาหารสะสมในกระเพาะและลำไส้|Food accumulation in the Stomach and intestines','bloating afterfood foulbelch acid nausea sourstool appetite','afterfood foulbelch sourstool','thickGreasy','slippery','food','food','ท้องอืดมากหลังอาหาร เรอเหม็นและอุจจาระเปรี้ยวเหม็นร่วมฝ้าหนาเหนียว ชี้อาหารสะสม ต่างจากพร่องที่เหนื่อยถ่ายเหลวเด่น');
  p('livergall-excessheat','肝胆实热证|gāndǎn shírè zhèng|ตับและถุงน้ำดีร้อนแกร่ง|Liver–Gallbladder excess heat','loudEar roar anger bitter redeyes','loudEar bitter redeyes','redYellow','wiryRapid','fire','heat','เสียงในหูเกิดเร็วและดังร่วมปากขม ตาแดง หงุดหงิด ลิ้นแดงฝ้าเหลืองชีพจรตึงเร็ว ชี้ร้อนแกร่งในโจทย์ การได้ยินลดฉับพลันต้องเร่งตรวจ');
  p('liverkidney-def','肝肾不足证|gānshèn bùzú zhèng|ตับและไตไม่เพียงพอ|Liver–Kidney deficiency','longEar cicada hearing dizzy kidney','longEar kidney hearing','either','fine','kidney','essence','เสียงในหูเรื้อรังค่อนข้างเบา ร่วมเอวเข่าเมื่อยอ่อนแรงและเวียนหัว ชี้ตับไตพร่อง ความดังเบาไม่ได้หมายถึงระดับเสียงสูงต่ำ');
  p('spleen-damp','脾虚湿困证|píxū shīkùn zhèng|ม้ามพร่องและความชื้นรบกวน|Spleen deficiency with dampness','fatigue heavy appetite bloating loose heavyhead','heavy appetite bloating','swollenGreasy','soggy','phlegm','phlegm','อ่อนเพลียร่วมหนักตัว หนักหัว ท้องอืด ถ่ายเหลว ลิ้นซีดบวมฝ้าขาวเหนียวและชีพจร濡 ชี้ม้ามพร่องร่วมชื้น');
  p('food-stomachloss','食滞胃脘证|shízhì wèiwǎn zhèng|อาหารคั่งบริเวณกระเพาะ|Food stagnation in the Stomach','appetite epifull afterfood foulbelch acid nausea badtaste','epifull afterfood foulbelch','thickGreasy','slippery','food','food','เบื่ออาหารร่วมแน่นหลังอาหาร เรอเหม็น น้ำเปรี้ยวย้อน และฝ้าหนาเหนียว ชี้อาหารคั่ง มากกว่าชื้นร้อนที่ปากเหนียวหนักตัวเด่น');
  const groups = [];
  function g(id,title,icon,feature,ids,note='') {groups.push({id,name:L(...title.split('|')),icon,feature,patternIds:ids.split(' '),note});}
  g(1,'失眠|shīmián|นอนไม่หลับ|Insomnia','moon','sleep','heart-kidney heart-spleen gall-phlegm food-inner heart-fire');
  g(2,'腹泻|fùxiè|ท้องเสีย|Diarrhea','waves','stool','spleen-qi liver-spleen food-diarrhea intestine-dampheat kidney-yang');
  g(3,'头晕|tóuyūn|เวียนศีรษะ|Dizziness','orbit','dizzy','phlegm-damp liver-fire liver-yang qi-blood kidney-essence');
  g(4,'咳嗽|késou|ไอ|Cough','lungs','sputum','windcold-lung windheat-lung dry-lung lung-heat coldphlegm-lung lung-qi');
  g(5,'胃痛|wèitòng|ปวดกระเพาะ|Stomach pain','stomach','pain','stomach-cold stomach-food liver-stomach spleenstomach-dampheat spleenstomach-cold');
  g(6,'胸痛|xiōngtòng|เจ็บหน้าอก|Chest pain','heart','pain','heart-phlegm heart-yang heart-cold heart-qistag','คงชื่อไม่ซ้ำ 4 รายการตามข้อความที่ให้มา; ไม่เพิ่ม证型แทนบรรทัดที่ซ้ำ');
  g(7,'胁痛|xiétòng|ปวดชายโครง|Flank pain','ribs','pain','liver-qistag livergall-dampheat livergall-fire liver-stasis');
  g(8,'腹痛|fùtòng|ปวดท้อง|Abdominal pain','stomach','pain','cold-damp spleenstomach-cold qi-bloodstasis liverchannel-cold');
  g(9,'头痛|tóutòng|ปวดศีรษะ|Headache','head','pain','wind-cold wind-heat blood-nourish bloodstasis qi-nourish liver-yang');
  g(10,'出汗异常（一）|chūhàn yìcháng (yī)|เหงื่อผิดปกติ 1|Sweating I','drop','sweat','qi-sweat yin-sweat');
  g(11,'出汗异常（二）|chūhàn yìcháng (èr)|เหงื่อผิดปกติ 2|Sweating II','drop','sweat','qi-sweat yin-sweat yellow-sweat','คงกลุ่ม 10–11 แยกตามเอกสาร แม้自汗และ盗汗ซ้ำกัน');
  g(12,'心悸|xīnjì|ใจสั่น|Palpitations','pulse','palp','qi-blood-palp heart-yin gall-phlegm heart-stasis heart-water');
  g(13,'腹胀|fùzhàng|ท้องอืด|Bloating','stomach','bloat','spleenstomach-qi spleenstomach-yang liver-stomach food-gut');
  g(14,'耳鸣|ěrmíng|เสียงในหู|Tinnitus','ear','ear','livergall-excessheat liverkidney-def');
  g(15,'乏力|fálì|อ่อนเพลีย|Fatigue','leaf','energy','qi-blood spleen-damp');
  g(16,'厌食|yànshí|เบื่ออาหาร|Poor appetite','bowl','appetite','food-stomachloss spleenstomach-dampheat livergall-dampheat');
  const durations = {
    acute:[L('三天前突然出现。','Sān tiān qián tūrán chūxiàn.','เริ่มค่อนข้างทันทีเมื่อ 3 วันก่อน','It started suddenly three days ago.'),L('五天前开始，这几天比较明显。','Wǔ tiān qián kāishǐ, zhè jǐ tiān bǐjiào míngxiǎn.','เริ่มเมื่อ 5 วันก่อน ช่วงนี้อาการเด่นขึ้น','It started five days ago and is noticeable this week.'),L('两天前开始，以前没有这次这么明显。','Liǎng tiān qián kāishǐ, yǐqián méiyǒu zhè cì zhème míngxiǎn.','เริ่มเมื่อ 2 วันก่อน ครั้งนี้ชัดกว่าที่เคย','It started two days ago, more noticeably than before.')],
    chronic:[L('已经半年了，是慢慢出现的。','Yǐjīng bàn nián le, shì mànmàn chūxiàn de.','เป็นมาครึ่งปี ค่อย ๆ เริ่มมีอาการ','It developed gradually over six months.'),L('大约三个月，反反复复。','Dàyuē sān ge yuè, fǎnfǎnfùfù.','ประมาณ 3 เดือน เป็นซ้ำ ๆ','About three months, with recurrent symptoms.'),L('有一年左右，最近比较明显。','Yǒu yì nián zuǒyòu, zuìjìn bǐjiào míngxiǎn.','ประมาณหนึ่งปี ช่วงนี้ชัดขึ้น','About a year, more noticeable recently.')],
    episodic:[L('近两个月反复发作。','Jìn liǎng ge yuè fǎnfù fāzuò.','ช่วงสองเดือนนี้เป็น ๆ หาย ๆ','Recurrent over the last two months.'),L('这个月出现过好几次。','Zhè ge yuè chūxiàn guo hǎo jǐ cì.','เดือนนี้เกิดขึ้นหลายครั้งแล้ว','It has happened several times this month.'),L('近三个星期时轻时重。','Jìn sān ge xīngqī shí qīng shí zhòng.','สามสัปดาห์นี้อาการมากน้อยสลับกัน','It has fluctuated over the last three weeks.')]
  };
  const modifiers = new Set(['afterfood','stress','exertion','activity','worsecold','warmth','pressure','nightworse','dawn','sleepsweat','awakesweat','afterstool']);
  const meta = {
    title:'Lucky Clinic 3D',version:'1.0.0',
    note:'แบบฝึกสอบจากรายการที่ผู้เรียนให้มา ผู้ป่วยและประวัติเป็นเรื่องสมมติ ไม่ใช่เครื่องมือวินิจฉัยหรือคำแนะนำการรักษา',
    source:'User-supplied 16-group curriculum, 28 October 2026; source images were not independently re-read.',
    terminology:'https://www.who.int/publications/i/item/9789240042322'
  };
  const api={L,terms,tongues,pulses,questions,patterns,groups,durations,modifiers,meta};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.TCMData=api;
})(typeof globalThis!=='undefined'?globalThis:this);
