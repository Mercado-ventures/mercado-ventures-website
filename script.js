// The identity moves briefly when it enters view, then returns to rest.
document.getElementById('year').textContent = new Date().getFullYear();
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const items = document.querySelectorAll('.hero-fish-alone,.header-shield,.house-shield-feature,.footer-brand img,.flag-display img');
  const active = new Map();
  const visible = new Set();
  function stop(img) {
    const state = active.get(img);
    if (!state) return;
    state.cancel();
    active.delete(img);
  }
  function wave(img) {
    const figure = img.closest('figure');
    let canvas = figure.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'flag-wave';
      canvas.setAttribute('aria-hidden','true');
      figure.insertBefore(canvas, img);
    }
    const rect = img.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1,2);
    const pad = 10;
    canvas.width = Math.round(rect.width*dpr);
    canvas.height = Math.round((rect.height+pad*2)*dpr);
    canvas.style.width = rect.width+'px';
    canvas.style.height = (rect.height+pad*2)+'px';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr,dpr);
    const source=document.createElement("canvas");
    source.width=Math.round(rect.width*dpr);
    source.height=Math.round(rect.height*dpr);
    source.getContext("2d").drawImage(img,0,0,source.width,source.height);
    let frame, start;
    const reset = () => { cancelAnimationFrame(frame); canvas.hidden=true; img.style.opacity=''; };
    canvas.hidden=false;
    img.style.opacity='0';
    active.set(img,{cancel:reset});
    function draw(now) {
      start ??= now;
      const t = (now-start)/4600;
      if(t>=1 || reduced.matches || document.hidden || !visible.has(img)){reset();active.delete(img);return;}
      ctx.clearRect(0,0,rect.width,rect.height+pad*2);
      const envelope = Math.sin(Math.PI*t);
      const strips = 64;
      for(let i=0;i<strips;i++) {
        const u=i/strips;
        const x=rect.width*u;
        const width=rect.width/strips;
        const displacement=Math.sin(u*Math.PI*3-t*Math.PI*7)*7*u*envelope;
        ctx.drawImage(source,source.width*u,0,source.width/strips,source.height,x,pad+displacement,width+.6,rect.height);
      }
      frame=requestAnimationFrame(draw);
    }
    frame=requestAnimationFrame(draw);
  }
  function play(img) {
    stop(img);
    if(reduced.matches || document.hidden || !visible.has(img)) return;
    if(img.closest('.flag-display')) { if(img.complete && img.naturalWidth)wave(img);return; }
    const fish=img.classList.contains('hero-fish-alone');
    const frames=fish ? [
      {transform:'translate(0,0) rotate(0deg)'},
      {transform:'translate(7px,-10px) rotate(-2deg)',offset:.4},
      {transform:'translate(-3px,-4px) rotate(1deg)',offset:.75},
      {transform:'translate(0,0) rotate(0deg)'}
    ] : [
      {transform:'perspective(700px) rotateY(0deg) rotateZ(0deg)'},
      {transform:'perspective(700px) rotateY(-9deg) rotateZ(-1deg)',offset:.4},
      {transform:'perspective(700px) rotateY(5deg) rotateZ(.5deg)',offset:.75},
      {transform:'perspective(700px) rotateY(0deg) rotateZ(0deg)'}
    ];
    const animation=img.animate(frames,{duration:fish?4000:2400,easing:'ease-in-out'});
    active.set(img,{cancel:()=>animation.cancel()});
    animation.onfinish=()=>active.delete(img);
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const img=entry.target;
    if(entry.isIntersecting){visible.add(img);if(!img.dataset.motionSeen){img.dataset.motionSeen='true';if(img.complete)play(img);else img.addEventListener('load',()=>play(img),{once:true});}}
    else{visible.delete(img);stop(img);}
  }),{threshold:.25});
  items.forEach(img=>{observer.observe(img);img.addEventListener('pointerenter',()=>play(img));img.addEventListener('pointerup',event=>{if(event.pointerType!=='mouse')play(img);});});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)items.forEach(stop);});
  reduced.addEventListener('change',()=>items.forEach(stop));
  addEventListener('resize',()=>items.forEach(stop));
})();
