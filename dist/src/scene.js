/* Original dependency-free WebGL clinic. All meshes are created locally. */
(function(root){
  'use strict';
  const mul=(a,b)=>{let o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o;};
  const norm=a=>{let n=Math.hypot(...a)||1;return a.map(v=>v/n);};
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  function look(eye,at){let z=norm(eye.map((v,i)=>v-at[i])),x=norm(cross([0,1,0],z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-x.reduce((s,v,i)=>s+v*eye[i],0),-y.reduce((s,v,i)=>s+v*eye[i],0),-z.reduce((s,v,i)=>s+v*eye[i],0),1]);}
  function ortho(l,r,b,t,n,f){return new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]);}
  function model(p,s,ry=0,rz=0){let c=Math.cos(ry),t=Math.sin(ry),d=Math.cos(rz),e=Math.sin(rz);return new Float32Array([c*d*s[0],e*s[0],-t*d*s[0],0,-c*e*s[1],d*s[1],t*e*s[1],0,t*s[2],0,c*s[2],0,...p,1]);}
  function normal(m){const a=m[0],b=m[4],c=m[8],d=m[1],e=m[5],f=m[9],g=m[2],h=m[6],i=m[10];const det=a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g),v=1/(det||1);return new Float32Array([(e*i-f*h)*v,(b*-i+c*h)*v,(b*f-c*e)*v,(f*g-d*i)*v,(a*i-c*g)*v,(c*d-a*f)*v,(d*h-e*g)*v,(b*g-a*h)*v,(a*e-b*d)*v]);}
  function rgb(hex){return[(hex>>16&255)/255,(hex>>8&255)/255,(hex&255)/255];}
  function boxGeo(){let p=[],n=[];const faces=[[[1,0,0],[[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5],[.5,-.5,.5]]],[[-1,0,0],[[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5],[-.5,-.5,-.5]]],[[0,1,0],[[-.5,.5,-.5],[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5]]],[[0,-1,0],[[-.5,-.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5]]],[[0,0,1],[[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,.5]]],[[0,0,-1],[[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5],[.5,-.5,-.5]]]];for(const [nn,v]of faces)for(const j of[0,1,2,0,2,3]){p.push(...v[j]);n.push(...nn);}return{p,n};}
  function sphereGeo(seg=18,rings=12){let p=[],n=[];const v=(u,j)=>{let a=u/seg*Math.PI*2,b=j/rings*Math.PI;return[Math.sin(b)*Math.cos(a),Math.cos(b),Math.sin(b)*Math.sin(a)];};for(let i=0;i<seg;i++)for(let j=0;j<rings;j++){let a=v(i,j),b=v(i+1,j),c=v(i+1,j+1),d=v(i,j+1);for(const w of[a,b,c,a,c,d]){p.push(...w);n.push(...w);}}return{p,n};}
  function cylinderGeo(){let p=[],n=[],N=20;for(let k=0;k<N;k++){let a=k/N*2*Math.PI,b=(k+1)/N*2*Math.PI,pa=[Math.cos(a),-.5,Math.sin(a)],pb=[Math.cos(b),-.5,Math.sin(b)],pc=[pb[0],.5,pb[2]],pd=[pa[0],.5,pa[2]];for(const w of[pa,pb,pc,pa,pc,pd]){p.push(...w);n.push(w[0],0,w[2]);}for(const [y,nn,verts]of[[.5,[0,1,0],[[0,.5,0],pd,pc]],[-.5,[0,-1,0],[[0,-.5,0],pb,pa]]])for(const w of verts){p.push(...w);n.push(...nn);}}return{p,n};}
  function torusGeo(){let p=[],n=[],N=32,M=7,v=(i,j)=>{let a=i/N*Math.PI*2,b=j/M*Math.PI*2;return{p:[(1+.1*Math.cos(b))*Math.cos(a),(1+.1*Math.cos(b))*Math.sin(a),.1*Math.sin(b)],n:[Math.cos(b)*Math.cos(a),Math.cos(b)*Math.sin(a),Math.sin(b)]};};for(let i=0;i<N;i++)for(let j=0;j<M;j++)for(const w of[v(i,j),v(i+1,j),v(i+1,j+1),v(i,j),v(i+1,j+1),v(i,j+1)]){p.push(...w.p);n.push(...w.n);}return{p,n};}
  class Clinic3D{
    constructor(canvas){
      this.canvas=canvas;this.yaw=.68;this.drag=0;this.zoom=1;this.target=[0,1.4,0];this.view='room';this.motion=true;this.active=true;this.mood='idle';this.tick=0;this.avatarIndex=0;this.items=[];this.geos={};this.disposed=false;
      const gl=canvas.getContext('webgl',{antialias:true,alpha:true,powerPreference:'low-power'});this.gl=gl;this.software=!gl;
      this.meshData={box:boxGeo(),sphere:this.software?sphereGeo(12,8):sphereGeo(),cylinder:cylinderGeo(),torus:torusGeo()};
      if(this.software){this.ctx=canvas.getContext('2d');if(!this.ctx)throw Error('Canvas unavailable');}else{
      const vs=`attribute vec3 aPosition;attribute vec3 aNormal;uniform mat4 uModel;uniform mat4 uVP;uniform mat3 uNormal;varying vec3 vNormal;varying vec3 vWorld;void main(){vec4 w=uModel*vec4(aPosition,1.0);vNormal=normalize(uNormal*aNormal);vWorld=w.xyz;gl_Position=uVP*w;}`;
      const fs=`precision mediump float;uniform vec3 uColor;uniform float uAlpha;varying vec3 vNormal;varying vec3 vWorld;void main(){vec3 n=normalize(vNormal);float light=max(dot(n,normalize(vec3(-3.0,7.0,5.0))),0.0);float side=max(dot(n,normalize(vec3(4.0,3.0,-3.0))),0.0);vec3 col=uColor*(0.69+0.25*light+0.08*side);col=mix(col,vec3(0.89,0.94,0.91),clamp((length(vWorld)-2.5)*0.018,0.0,0.09));gl_FragColor=vec4(col,uAlpha);}`;
      const shader=(type,code)=>{let s=gl.createShader(type);gl.shaderSource(s,code);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
      let v=shader(gl.VERTEX_SHADER,vs),f=shader(gl.FRAGMENT_SHADER,fs),program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);gl.deleteShader(v);gl.deleteShader(f);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);this.program=program;
      this.loc={};for(const k of['aPosition','aNormal'])this.loc[k]=gl.getAttribLocation(program,k);for(const k of['uModel','uVP','uNormal','uColor','uAlpha'])this.loc[k]=gl.getUniformLocation(program,k);
      for(const [k,geo]of Object.entries(this.meshData)){
        const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);const data=[];for(let i=0;i<geo.p.length;i+=3)data.push(...geo.p.slice(i,i+3),...geo.n.slice(i,i+3));gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);this.geos[k]={buffer:b,count:geo.p.length/3};
      }
      gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);}
      this.build();this.dirty=true;this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(canvas.parentElement);
      this.onDown=e=>{this.drag=e.clientX;this.isDown=true;canvas.setPointerCapture?.(e.pointerId);};
      this.onMove=e=>{if(this.isDown){this.yaw=Math.max(.05,Math.min(1.35,this.yaw+(e.clientX-this.drag)*.006));this.drag=e.clientX;this.dirty=true;}};
      this.onUp=()=>{this.isDown=false;};canvas.addEventListener('pointerdown',this.onDown);canvas.addEventListener('pointermove',this.onMove);canvas.addEventListener('pointerup',this.onUp);canvas.addEventListener('pointercancel',this.onUp);
      canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.active=false;canvas.dispatchEvent(new CustomEvent('scene-unavailable',{bubbles:true}));});
      this.animate=t=>{if(this.disposed)return;this.frame=requestAnimationFrame(this.animate);if(t-this.tick<(this.software?160:33)||!this.active||document.hidden||!canvas.clientWidth||((!this.motion||this.software)&&!this.dirty))return;this.tick=t;this.render(t/1000);};this.resize();this.frame=requestAnimationFrame(this.animate);
    }
    add(geo,p,s,color,ry=0,rz=0,parent=null,extra={}){let obj={geo,p,s,color:rgb(color),ry,rz,parent,alpha:1,...extra};this.items.push(obj);return obj;}
    box(p,s,c,ry=0,rz=0,parent=null){return this.add('box',p,s,c,ry,rz,parent);}
    ball(p,s,c,parent=null){return this.add('sphere',p,s,c,0,0,parent);}
    cyl(p,s,c,parent=null){return this.add('cylinder',p,s,c,0,0,parent);}
    build(){
      const cream=0xf5f0df,wood=0xd6b88a,jade=0x82b8a6,dark=0x244d44;
      this.box([0,-.16,0],[5.6,.32,4.7],0xd0dacc);this.box([0,.025,0],[5.5,.08,4.6],0xede8d9);
      for(let x=-2.3;x<=2.4;x+=.8)this.box([x,.072,0],[.012,.008,4.55],0xdcdacb);
      for(let z=-2;z<=2.2;z+=.8)this.box([0,.072,z],[5.45,.008,.012],0xdcdacb);
      this.box([0,1.5,-2.3],[5.6,3,.13],cream);this.box([-2.73,1.5,0],[.13,3,4.7],0xe1ebe0);
      this.box([0,.16,-2.2],[5.5,.16,.08],0xadc6b6);this.box([-2.63,.16,0],[.08,.16,4.6],0xadc6b6);
      // Round clinic sign. A simple cross stays legible from every language.
      this.cyl([-2.58,2.2,.4],[.38,.035,.38],0xe8eee4);
      this.box([-2.52,2.2,.4],[.06,.4,.11],0x5c9887);this.box([-2.51,2.2,.4],[.07,.11,.4],0x5c9887);
      // Window, sky, sun and distant soft hills.
      this.box([.98,1.92,-2.2],[2.3,1.7,.12],wood);this.box([.98,1.92,-2.11],[2.12,1.52,.04],0xc9e3db);
      this.ball([1.56,2.28,-2.045],[.2,.2,.025],0xf7dca2);
      this.ball([.4,1.47,-2.055],[.7,.25,.025],0xa8c9b0);this.ball([1.4,1.45,-2.05],[.8,.3,.025],0x8bb39b);
      this.box([.98,1.92,-2.0],[.055,1.6,.1],0xf9f4e8);this.box([.98,1.9,-1.99],[2.15,.055,.1],0xf9f4e8);
      this.box([.98,1.12,-1.92],[2.45,.1,.35],cream);
      // Apothecary drawers.
      this.box([-1.65,.85,-1.79],[1.45,1.6,.65],wood);this.box([-1.65,1.69,-1.78],[1.57,.1,.75],0xe5cca1);
      for(let row=0;row<4;row++)for(let col=0;col<3;col++){
        let x=-2.12+col*.47,y=.25+row*.36;this.box([x,y,-1.44],[.435,.32,.035],row%2?0xdabf94:0xe5ceaa);
        this.box([x,y+.04,-1.407],[.12,.05,.012],0xf4e4c3);this.ball([x,y-.055,-1.39],[.025,.022,.018],0x9c8358);
      }
      for(let i=0;i<3;i++){this.cyl([-2.12+i*.43,1.89,-1.78],[.13,.32,.13],i===1?0xa7c2a7:0xc8b48e);this.cyl([-2.12+i*.43,2.07,-1.78],[.14,.05,.14],0x8d9471);this.box([-2.12+i*.43,1.9,-1.64],[.12,.11,.012],0xf4e9cd);}
      // Warm rug and table.
      this.cyl([.05,.085,.6],[1.75,.018,1.25],0xc1d9c8);
      this.box([-.2,.95,.25],[2,.16,1],0xf3dec1);this.box([-.2,.83,.25],[1.94,.12,.94],wood);
      for(let x of[-.98,.58])for(let z of[-.06,.57])this.box([x,.46,z],[.1,.85,.1],wood);
      this.box([-.2,.69,.25],[1.65,.29,.75],jade);this.box([-.2,.69,.65],[1.56,.24,.02],0x90bdac);
      // Monitor, keyboard, paper, cup and pulse cushion.
      this.box([-.71,1.28,.15],[.64,.46,.07],dark,0);this.box([-.71,1.29,.194],[.55,.36,.012],0xd2ece4);
      this.box([-.71,1.04,.14],[.08,.18,.09],0x456c60);this.box([-.71,1.007,.2],[.4,.025,.26],0x456c60);
      this.box([-.72,1.044,.52],[.53,.025,.17],0xe0e7dc);for(let i=0;i<5;i++)this.box([-.92+i*.1,1.061,.52],[.06,.006,.05],0xa3beb0);
      for(let i=0;i<7;i++)this.box([-.94+i*.075,1.29+Math.sin(i*2)*.08,.21],[.02,.018,.006],0x59a88c);
      this.box([.06,1.044,.3],[.33,.018,.4],0xfffcf1,-.2);for(let i=0;i<4;i++)this.box([.04,1.056,.19+i*.065],[.21,.004,.012],0xb5c7b5,-.2);
      this.cyl([.5,1.13,.22],[.09,.19,.09],0xe1bc99);this.cyl([.5,1.232,.22],[.072,.006,.072],0x79634c);
      this.pulsePad=this.box([.46,1.09,.57],[.41,.11,.21],0x96c5b5);
      // Lamp.
      this.cyl([.54,1.057,-.05],[.14,.04,.14],dark);this.box([.54,1.34,-.05],[.035,.56,.035],dark);this.ball([.54,1.64,-.05],[.23,.14,.2],0xe3c78f);
      // Chairs and avatars.
      this.chair(-.95,-.5,jade);this.chair(1.24,.8,0xcaa177);
      this.doctor={p:[-.95,0,-.5],ry:.08,bob:0};this.patient={p:[1.24,0,.8],ry:-.2,bob:0};
      this.avatar(this.doctor,0xf8f7ec,true);this.avatar(this.patient,0xd88d75,false);
      // Side table with books.
      this.box([2.07,.52,-1.33],[.65,.9,.6],0xf1e2c6);this.box([2.07,1,-1.33],[.74,.08,.69],wood);
      for(let i=0;i<3;i++)this.box([2.03,.16+i*.12,-.99],[.43,.09,.26],[0x9fbbae,0xd7aa87,0xe4ce9f][i],.05*i);
      this.plant([2.08,1.04,-1.36],.55);this.plant([-2.16,.1,1.32],.96);
      // Framed scroll and soft pendant.
      this.box([-.48,2.26,-2.17],[.52,.8,.08],0xb69a72);this.box([-.48,2.26,-2.11],[.43,.7,.03],0xfff8e8);
      this.box([-.48,2.3,-2.08],[.025,.33,.012],0x648b72);this.ball([-.55,2.4,-2.06],[.1,.035,.018],0x8aa889);this.ball([-.4,2.23,-2.06],[.1,.035,.018],0x8aa889);
      this.box([1.8,2.98,.35],[.025,.55,.025],0xb9b7a0);this.ball([1.8,2.62,.35],[.34,.19,.29],0xf5d7a2);
      // Small contact shadows on the floor.
      for(const [x,z,rx,rz]of[[-.95,-.5,.48,.4],[1.24,.8,.47,.4],[-2.16,1.32,.4,.35],[2.07,-1.33,.45,.4]])this.add('cylinder',[x,.092,z],[rx,.005,rz],0x4c6c5c,0,0,null,{alpha:.08});
    }
    chair(x,z,c){this.box([x,.57,z],[.62,.15,.59],c);this.box([x,.96,z-.26],[.61,.77,.12],c);for(let i of[-1,1])for(let j of[-1,1])this.box([x+i*.22,.29,z+j*.2],[.055,.54,.055],0xad946d);}
    avatar(parent,shirt,doctor){
      const skin=doctor?0xf1c8a3:0xecc09b,hair=doctor?0x3e3935:0x493e38;
      this.ball([0,1.03,.04],[.28,.4,.21],shirt,parent);this.box([0,.78,.04],[.44,.2,.32],shirt,0,0,parent);
      for(let x of[-.15,.15]){this.box([x,.55,.17],[.18,.32,.2],doctor?0x5b8174:0x68868b,0,0,parent);this.ball([x,.28,.24],[.14,.08,.21],doctor?0xd6d7cd:0xefe4cf,parent);}
      this.cyl([0,1.38,.04],[.09,.16,.09],skin,parent);
      this.ball([0,1.74,0],[.355,.37,.315],hair,parent);this.ball([0,1.65,.105],[.31,.32,.285],skin,parent);
      this.ball([-.14,1.91,.12],[.23,.15,.22],hair,parent);this.ball([.14,1.92,.1],[.2,.135,.21],hair,parent);
      if(doctor){this.ball([-.28,1.57,-.025],[.12,.28,.2],hair,parent);this.ball([.28,1.57,-.025],[.12,.28,.2],hair,parent);}
      for(const x of[-.11,.11]){
        const eye=this.ball([x,1.69,.374],[.027,.039,.017],0x333b37,parent);eye.eye=true;this.ball([x+.007,1.705,.389],[.008,.01,.006],0xffffff,parent);
        this.ball([x*1.65,1.58,.34],[.053,.022,.012],0xe8a38e,parent);this.box([x,1.76,.365],[.071,.013,.014],hair,0,x<0?.08:-.08,parent);
      }
      this.ball([0,1.625,.396],[.035,.028,.025],0xdfac86,parent);this.box([0,1.55,.383],[.069,.013,.01],0xa76858,0,0,parent);
      if(doctor){
        this.box([0,1.14,.245],[.035,.23,.025],0xe3e8df,0,0,parent);this.box([.17,1.1,.235],[.11,.09,.02],0xd5e2d5,0,0,parent);
        this.box([-.13,1.3,.195],[.1,.2,.04],0xfcfbf4,0,-.5,parent);this.box([.13,1.3,.195],[.1,.2,.04],0xfcfbf4,0,.5,parent);
        const st=this.add('torus',[0,1.15,.265],[.105,.14,.1],0x537b6d,0,0,parent);this.ball([.06,1,.274],[.039,.039,.012],0x8ca69b,parent);
      }
      this.box([-.33,1.02,.12],[.15,.42,.18],shirt,0,-.36,parent);this.ball([-.39,.83,.2],[.085,.095,.09],skin,parent);
      this.box([.33,1.03,.13],[.15,.39,.18],shirt,0,.38,parent);this.ball([.39,.86,.22],[.085,.095,.09],skin,parent);
      if(!doctor){this.tongue=this.ball([0,1.525,.405],[.035,.035,.035],0xe39083,parent);this.tongue.hidden=true;this.patientClothes=this.items.filter(o=>o.parent===parent&&o.color.join()==rgb(shirt).join());}
    }
    plant(pos,size){const [x,y,z]=pos;this.cyl([x,y+.16*size,z],[.19*size,.32*size,.19*size],0xdcb48e);this.cyl([x,y+.33*size,z],[.2*size,.05*size,.2*size],0xe3c49f);this.box([x,y+.59*size,z],[.035,.55*size,.035],0x759771);
      for(let i=0;i<7;i++){let a=i*2.4,yy=y+(.46+i*.05)*size;let b=this.ball([x+Math.cos(a)*.15*size,yy,z+Math.sin(a)*.13*size],[.2*size,.08*size,.095*size],i%2?0x81a67c:0x628c70);b.ry=a;b.rz=.3*Math.sin(a);}}
    resize(){const box=this.canvas.parentElement.getBoundingClientRect();if(!box.width||!box.height)return;const pr=Math.min(root.devicePixelRatio||1,this.software?1:1.6);this.canvas.width=Math.round(box.width*pr);this.canvas.height=Math.round(box.height*pr);this.gl?.viewport(0,0,this.canvas.width,this.canvas.height);this.dirty=true;}
    setPatient(c){this.avatarIndex=c?.seed||0;const colors=[0xd88d75,0x96b5bb,0xc8ad7b,0x9aada0,0xb59ba9];for(const o of this.patientClothes||[])o.color=rgb(colors[this.avatarIndex%colors.length]);this.setView('room');}
    setMood(m){this.mood=m;this.moodStart=this.tick/1000;this.dirty=true;}
    setMotion(on){this.motion=on;this.dirty=true;}
    setView(view){this.view=view;this.zoom=view==='room'?1:view==='patient'?1.55:2.3;this.target=view==='room'?[0,1.4,0]:view==='pulse'?[.8,.9,.5]:[1.05,1.3,.7];this.tongue.hidden=view!=='tongue';this.dirty=true;}
    rotate(dir){this.yaw=Math.max(.05,Math.min(1.35,this.yaw+dir*.18));this.dirty=true;}
    render(time){
      const gl=this.gl;if(gl)gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);let aspect=this.canvas.width/this.canvas.height;let h=(aspect<1?3.8:3.15)/this.zoom,w=h*aspect;
      const eye=[this.target[0]+Math.sin(this.yaw)*9,this.target[1]+5.3,this.target[2]+Math.cos(this.yaw)*9];const vp=mul(ortho(-w,w,-h,h,.1,30),look(eye,this.target));if(gl){gl.useProgram(this.program);gl.uniformMatrix4fv(this.loc.uVP,false,vp);}
      const elapsed=time-(this.moodStart||0),moodScale=this.motion&&elapsed<.8?Math.sin(elapsed*9)*Math.exp(-elapsed*3):0;
      this.doctor.bob=this.motion?Math.sin(time*1.7)*.012:0;this.patient.bob=(this.motion?Math.sin(time*1.7+1)*.012:0)+(this.mood==='happy'?Math.abs(moodScale)*.14:0);
      let last=null;const faces=[];
      for(const o of this.items){if(o.hidden)continue;let p=[...o.p];let s=o.s;
        if(o.eye&&this.motion&&Math.sin(time*.73)>.998)s=[o.s[0],o.s[1]*.12,o.s[2]];
        let m=model(p,s,o.ry,o.rz);if(o.parent){let gp=[...o.parent.p];gp[1]+=o.parent.bob;m=mul(model(gp,[1,1,1],o.parent.ry+(this.mood==='wrong'&&o.parent===this.patient?moodScale*.08:0)),m);}
        if(this.software){this.projectObject(o,m,vp,eye,faces);continue;}
        const geo=this.geos[o.geo];if(last!==o.geo){gl.bindBuffer(gl.ARRAY_BUFFER,geo.buffer);gl.enableVertexAttribArray(this.loc.aPosition);gl.enableVertexAttribArray(this.loc.aNormal);gl.vertexAttribPointer(this.loc.aPosition,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(this.loc.aNormal,3,gl.FLOAT,false,24,12);last=o.geo;}
        gl.uniformMatrix4fv(this.loc.uModel,false,m);gl.uniformMatrix3fv(this.loc.uNormal,false,normal(m));gl.uniform3fv(this.loc.uColor,o.color);gl.uniform1f(this.loc.uAlpha,o.alpha);gl.drawArrays(gl.TRIANGLES,0,geo.count);
      }
      if(this.software)this.rasterize(faces);this.dirty=false;
    }
    projectObject(o,m,vp,eye,faces){
      const geo=this.meshData[o.geo],nm=normal(m),mv=mul(vp,m),W=this.canvas.width,H=this.canvas.height,light=norm([-3,7,5]),side=norm([4,3,-3]);
      const point=i=>{const x=geo.p[i],y=geo.p[i+1],z=geo.p[i+2];return[(mv[0]*x+mv[4]*y+mv[8]*z+mv[12]+1)*W/2,(1-mv[1]*x-mv[5]*y-mv[9]*z-mv[13])*H/2,mv[2]*x+mv[6]*y+mv[10]*z+mv[14]];};
      const eyeDir=norm([eye[0]-m[12],eye[1]-m[13],eye[2]-m[14]]);
      for(let i=0;i<geo.p.length;i+=9){let x=(geo.n[i]+geo.n[i+3]+geo.n[i+6])/3,y=(geo.n[i+1]+geo.n[i+4]+geo.n[i+7])/3,z=(geo.n[i+2]+geo.n[i+5]+geo.n[i+8])/3,n=norm([nm[0]*x+nm[3]*y+nm[6]*z,nm[1]*x+nm[4]*y+nm[7]*z,nm[2]*x+nm[5]*y+nm[8]*z]);
        if(n.reduce((s,v,j)=>s+v*eyeDir[j],0)<-.05)continue;
        let a=point(i),b=point(i+3),c=point(i+6);const l=.69+.25*Math.max(0,n.reduce((s,v,j)=>s+v*light[j],0))+.08*Math.max(0,n.reduce((s,v,j)=>s+v*side[j],0));
        const color=o.color.map(v=>Math.round(v*l*255));faces.push({a,b,c,z:(a[2]+b[2]+c[2])/3,color,alpha:o.alpha});
      }
    }
    rasterize(faces){
      const ctx=this.ctx,W=this.canvas.width,H=this.canvas.height;
      if(!this.pixels||this.pixels.width!==W||this.pixels.height!==H){this.pixels=ctx.createImageData(W,H);this.depth=new Float32Array(W*H);}
      const bytes=this.pixels.data,depth=this.depth;bytes.fill(0);depth.fill(Infinity);
      // The same meshes as WebGL, with a per-pixel depth buffer on CPU.
      // Transparent contact shadows are blended only after all opaque surfaces.
      faces.sort((a,b)=>b.alpha-a.alpha);
      for(const f of faces){const [a,b,c]=[f.a,f.b,f.c],den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(den)<.00001)continue;const inv=1/den;
        const x0=Math.max(0,Math.floor(Math.min(a[0],b[0],c[0]))),x1=Math.min(W-1,Math.ceil(Math.max(a[0],b[0],c[0]))),y0=Math.max(0,Math.floor(Math.min(a[1],b[1],c[1]))),y1=Math.min(H-1,Math.ceil(Math.max(a[1],b[1],c[1])));
        const da=(b[1]-c[1])*inv,db=(c[1]-a[1])*inv,dyA=(c[0]-b[0])*inv,dyB=(a[0]-c[0])*inv;
        let rowA=((b[1]-c[1])*(x0+.5-c[0])+(c[0]-b[0])*(y0+.5-c[1]))*inv,rowB=((c[1]-a[1])*(x0+.5-c[0])+(a[0]-c[0])*(y0+.5-c[1]))*inv;
        for(let y=y0;y<=y1;y++){let wa=rowA,wb=rowB,index=y*W+x0;for(let x=x0;x<=x1;x++,index++,wa+=da,wb+=db){const wc=1-wa-wb;if(wa<-.00001||wb<-.00001||wc<-.00001)continue;const z=wa*a[2]+wb*b[2]+wc*c[2];if(z>depth[index]+.000001)continue;const k=index*4;
            if(f.alpha===1){depth[index]=z;bytes[k]=f.color[0];bytes[k+1]=f.color[1];bytes[k+2]=f.color[2];bytes[k+3]=255;}else{const alpha=f.alpha;bytes[k]=bytes[k]*(1-alpha)+f.color[0]*alpha;bytes[k+1]=bytes[k+1]*(1-alpha)+f.color[1]*alpha;bytes[k+2]=bytes[k+2]*(1-alpha)+f.color[2]*alpha;}
          }rowA+=dyA;rowB+=dyB;}
      }ctx.putImageData(this.pixels,0,0);
    }
    dispose(){this.disposed=true;cancelAnimationFrame(this.frame);this.resizeObserver.disconnect();if(this.gl){for(const g of Object.values(this.geos))this.gl.deleteBuffer(g.buffer);this.gl.deleteProgram(this.program);}}
  }
  root.Clinic3D=Clinic3D;
})(typeof globalThis!=='undefined'?globalThis:this);
