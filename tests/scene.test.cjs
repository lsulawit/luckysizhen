'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
test('software 3D projects finite shaded triangles and supports camera, inspection and motion',()=>{
  let frames=0,pixels=0;const ctx={createImageData(w,h){return{width:w,height:h,data:new Uint8ClampedArray(w*h*4)};},putImageData(image){frames++;pixels=image.data.filter((v,i)=>i%4===3&&v>0).length;}};
  const canvas={width:0,height:0,clientWidth:600,parentElement:{getBoundingClientRect:()=>({width:600,height:420})},getContext:t=>t==='2d'?ctx:null,addEventListener(){}};
  const scope={Float32Array,Math,Array,Object,Error,document:{hidden:false},ResizeObserver:class{observe(){}disconnect(){}},requestAnimationFrame:()=>1,cancelAnimationFrame(){},devicePixelRatio:1};
  vm.createContext(scope);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/scene.js'),'utf8'),scope);const scene=new scope.Clinic3D(canvas);assert.equal(scene.software,true);assert.ok(scene.items.length>150);scene.render(0);assert.ok(pixels>10000);assert.ok(scene.depth.some(Number.isFinite));
  for(const view of['patient','tongue','pulse','room']){scene.setView(view);scene.render(1);}scene.rotate(1);scene.setMood('happy');scene.render(2);scene.setPatient({seed:55});scene.setMotion(false);scene.render(3);assert.equal(frames,7);assert.ok(pixels>10000);assert.equal(scene.tongue.hidden,true);scene.dispose();assert.equal(scene.disposed,true);
});
