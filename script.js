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
  // Animate the SVG itself so contours stay vector-sharp at every pixel density.
  function wave(img) {
    const animation = img.animate([
      {transform:'perspective(1000px) rotateY(0deg) skewY(0deg)'},
      {transform:'perspective(1000px) rotateY(-5deg) skewY(-.6deg)',offset:.28},
      {transform:'perspective(1000px) rotateY(3deg) skewY(.4deg)',offset:.6},
      {transform:'perspective(1000px) rotateY(-1deg) skewY(-.2deg)',offset:.82},
      {transform:'perspective(1000px) rotateY(0deg) skewY(0deg)'}
    ],{duration:4600,easing:'ease-in-out'});
    active.set(img,{cancel:()=>animation.cancel()});
    animation.onfinish=()=>active.delete(img);
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
