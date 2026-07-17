const slides = [
  { bg:"#000000", fg:"#ffffff", logo:"assets/iconos/MDW_PRINCIPAL.webp", title:'Montería<span class="thin">Design Week</span>', desc:"Es una iniciativa que nace para impulsar el talento joven de la ciudad, creando un espacio donde el diseño, el arte y la creatividad se convierten en herramientas de encuentro, aprendizaje y proyección." },
  { bg:"#34cc67", fg:"#ffffff", logo:"assets/iconos/MDW_DISEÑO_GRAFICO.webp", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño Gráfico</span>', catSize:"0.85em", desc:"El diseño gráfico es la herramienta que traduce ideas en identidades visuales memorables. En esta categoría se destacan los profesionales que construyen marcas, editorial, señalética y comunicación visual con un enfoque estratégico y creativo." },
  { bg:"#fe0000", fg:"#ffffff", logo:"assets/iconos/MDW_ARQUITECTURA.webp", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Arquitectura</span>', catSize:"0.9em", desc:"La arquitectura define cómo vivimos, nos movemos y convivimos en el espacio. Esta categoría reúne a profesionales que diseñan edificaciones, espacios públicos y paisajismo con visión sostenible, innovadora y arraigada en la realidad local." },
  { bg:"#ff6600", fg:"#ffffff", logo:"assets/iconos/MDW_DISEÑO_INDUSTRIAL.webp", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño Industrial</span>', catSize:"0.85em", desc:"El diseño industrial piensa en el usuario final y transforma problemas cotidianos en soluciones funcionales y estéticas. Esta categoría abarca el diseño de productos, mobiliario, empaques y prototipos que mejoran la experiencia de vida en la ciudad." },
  { bg:"#9900cc", fg:"#ffffff", logo:"assets/iconos/MDW_DISEÑO_MODAS.webp", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño de Moda</span>', catSize:"0.85em", desc:"La moda es expresión, identidad y cultura. Esta categoría celebra a los diseñadores textiles y de vestuario que combinan tradición artesanal con tendencias contemporáneas, creando propuestas que redefinen la estética y el consumo responsable." },
  { bg:"#ffff00", fg:"#000000", logo:"assets/iconos/MDW_ARTES.webp", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Artes</span>', catSize:"1em", desc:"Las artes visuales, performáticas y plásticas son el pulso creativo de Montería. Esta categoría reúne a artistas, curadores y gestores culturales que transforman espacios, narrativas y comunidades a través de la expresión artística." },
  { bg:"#6599ff", fg:"#ffffff", logo:"assets/iconos/MDW_DISEÑO_AUDIOVISUAL.webp", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño Audiovisual</span>', catSize:"0.75em", desc:"El diseño audiovisual combina imagen, sonido y movimiento para contar historias que conectan con las personas. Desde la producción audiovisual hasta la dirección de arte, esta categoría impulsa a los creadores que dan forma a la comunicación visual contemporánea." },
];

const hero = document.getElementById('hero');
const h1El = document.querySelector('.hero-text h1');
const pEl = document.querySelector('.hero-text p');
const hintEl = document.querySelector('.hero-hint');
const colorBar = document.getElementById('colorBar');
const logoA = document.getElementById('logoA');
const logoB = document.getElementById('logoB');
const videos = document.querySelectorAll('.hero-video');

let currentIndex = -1;
let activeLogo = logoA;
let hiddenLogo = logoB;

function preloadAssets(){
  slides.forEach(function(s){
    var img = new Image();
    img.src = s.logo;
  });
}

preloadAssets();

function goToSlide(index){
  if(index === currentIndex) return;
  var s = slides[index];
  var isFirst = (currentIndex === -1);
  var prevIndex = currentIndex;
  currentIndex = index;

  hero.style.backgroundColor = s.bg;
  hero.style.color = s.fg;
  h1El.innerHTML = s.title;
  if(s.catSize){
    var catName = h1El.querySelector('.cat-medium');
    if(catName) catName.style.fontSize = s.catSize;
  }
  pEl.textContent = s.desc;
  hintEl.style.display = (index === 0) ? '' : 'none';

  if(!isFirst){
    hiddenLogo.src = s.logo;
    hiddenLogo.onload = function(){
      hiddenLogo.classList.remove('logo-hidden');
      activeLogo.classList.add('logo-hidden');
      var tmp = activeLogo;
      activeLogo = hiddenLogo;
      hiddenLogo = tmp;
    };
  }

  var swatches = colorBar.querySelectorAll('.color-swatch');
  swatches.forEach(function(sw, i){
    sw.classList.toggle('active', i === index);
  });

  if(!isFirst){
    videos[prevIndex].pause();
    videos[prevIndex].style.opacity = '0';
  }
  videos[index].style.opacity = '1';
  videos[index].play().catch(function(){});
}

slides.forEach(function(s, idx){
  var swatch = document.createElement('div');
  swatch.className = 'color-swatch';
  swatch.style.backgroundColor = s.bg;
  swatch.addEventListener('click', function(){ goToSlide(idx); });
  colorBar.appendChild(swatch);
});

var loader = document.getElementById('loader');
var allLoaded = false;
var gifLooped = false;

function tryHideLoader(){
  if(allLoaded && gifLooped){
    loader.classList.add('hidden');
    setTimeout(function(){ loader.remove(); }, 600);
  }
}

window.addEventListener('load', function(){
  allLoaded = true;
  tryHideLoader();
});

setTimeout(function(){
  gifLooped = true;
  tryHideLoader();
}, 3000);

videos[0].play().catch(function(){});
goToSlide(0);

var hintColors = ['#34cc67','#fe0000','#ff6600','#9900cc','#ffff00','#6599ff'];
var hintColorIndex = 0;
var hintColorEl = document.getElementById('hintColor');
hintColorEl.style.color = hintColors[0];
setInterval(function(){
  hintColorIndex = (hintColorIndex + 1) % hintColors.length;
  hintColorEl.style.color = hintColors[hintColorIndex];
}, 2000);

var alliesGroups = [
  { label: 'Organizan', logos: ['assets/iconos/alcaldia_monteria.webp','assets/iconos/semana_juventud.webp','assets/iconos/pmjm.webp','assets/iconos/consejo_juventud.webp','assets/iconos/auvirlab.webp'] },
  { label: 'Patrocinador oficial y sede asociada', logos: ['assets/iconos/unisinu.webp','assets/iconos/flow.webp'] },
  { label: 'Aliados institucionales', logos: ['assets/iconos/chadia.webp','assets/iconos/arq_unisinu.webp','assets/iconos/cec.webp','assets/iconos/san_agustin.webp','assets/iconos/upb.webp','assets/iconos/unicor.webp'] },
  { label: 'Apoyan', logos: ['assets/iconos/cesca.webp','assets/iconos/pintando_4_historias.webp','assets/iconos/tres_pesos_pesados.webp','assets/iconos/caua.webp','assets/iconos/fablab.webp','assets/iconos/the_set_architects.webp','assets/iconos/alerta_roja.webp'] }
];

var alliesLabel = document.getElementById('alliesLabel');
var alliesLogos = document.getElementById('alliesLogos');
var groupIdx = 0;
var fadeDelay = 4000;

var allyImgs = [];
var groupRanges = [];
var cursor = 0;
alliesGroups.forEach(function(group){
  var start = cursor;
  group.logos.forEach(function(src){
    var img = document.createElement('img');
    img.src = src;
    img.alt = 'Aliado';
    img.classList.add('hidden');
    alliesLogos.appendChild(img);
    allyImgs.push(img);
    cursor++;
  });
  groupRanges.push({ start: start, end: cursor });
});

function renderGroup(idx){
  allyImgs.forEach(function(img){ img.classList.add('hidden'); });
  var range = groupRanges[idx];
  for(var i = range.start; i < range.end; i++){
    allyImgs[i].classList.remove('hidden');
  }
}

function nextGroup(){
  alliesLabel.classList.add('fade');
  alliesLogos.classList.add('fade');
  setTimeout(function(){
    groupIdx = (groupIdx + 1) % alliesGroups.length;
    alliesLabel.textContent = alliesGroups[groupIdx].label;
    renderGroup(groupIdx);
    alliesLabel.classList.remove('fade');
    alliesLogos.classList.remove('fade');
  }, 400);
}

renderGroup(0);
alliesLabel.textContent = alliesGroups[0].label;
var alliesInterval = setInterval(nextGroup, fadeDelay);

alliesLogos.addEventListener('mouseenter', function(){
  clearInterval(alliesInterval);
});
alliesLogos.addEventListener('mouseleave', function(){
  alliesInterval = setInterval(nextGroup, fadeDelay);
});

var infoBtn = document.getElementById('infoBtn');
var infoTooltip = document.getElementById('infoTooltip');
infoBtn.addEventListener('click', function(){
  infoTooltip.classList.toggle('show');
});
document.addEventListener('click', function(e){
  if(!infoBtn.contains(e.target) && !infoTooltip.contains(e.target)){
    infoTooltip.classList.remove('show');
  }
});
