  const slides = [
    { bg:"#000000", fg:"#ffffff", video:"assets/videos/video1_web.mp4", logo:"assets/iconos/MDW_PRINCIPAL.png", title:'Montería<span class="thin">Design Week</span>', desc:"Es una iniciativa que nace para impulsar el talento joven de la ciudad, creando un espacio donde el diseño, el arte y la creatividad se convierten en herramientas de encuentro, aprendizaje y proyección." },
    { bg:"#34cc67", fg:"#ffffff", video:"assets/videos/video4_web.mp4", logo:"assets/iconos/MDW_DISEÑO_GRAFICO.png", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño Gráfico</span>', catSize:"0.66em", desc:"El diseño gráfico es la herramienta que traduce ideas en identidades visuales memorables. En esta categoría se destacan los profesionales que construyen marcas, editorial, señalética y comunicación visual con un enfoque estratégico y creativo." },
    { bg:"#fe0000", fg:"#ffffff", video:"assets/videos/video7_web.mp4", logo:"assets/iconos/MDW_ARQUITECTURA.png", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Arquitectura</span>', catSize:"0.77em", desc:"La arquitectura define cómo vivimos, nos movemos y convivimos en el espacio. Esta categoría reúne a profesionales que diseñan edificaciones, espacios públicos y paisajismo con visión sostenible, innovadora y arraigada en la realidad local." },
    { bg:"#ff6600", fg:"#ffffff", video:"assets/videos/video5_web.mp4", logo:"assets/iconos/MDW_DISEÑO_INDUSTRIAL.png", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño Industrial</span>', catSize:"0.6em", desc:"El diseño industrial piensa en el usuario final y transforma problemas cotidianos en soluciones funcionales y estéticas. Esta categoría abarca el diseño de productos, mobiliario, empaques y prototipos que mejoran la experiencia de vida en la ciudad." },
    { bg:"#9900cc", fg:"#ffffff", video:"assets/videos/video6_web.mp4", logo:"assets/iconos/MDW_DISEÑO_MODAS.png", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño de Moda</span>', catSize:"0.62em", desc:"La moda es expresión, identidad y cultura. Esta categoría celebra a los diseñadores textiles y de vestuario que combinan tradición artesanal con tendencias contemporáneas, creando propuestas que redefinen la estética y el consumo responsable." },
    { bg:"#ffff00", fg:"#000000", video:"assets/videos/video2_web.mp4", logo:"assets/iconos/MDW_ARTES.png", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Artes</span>', catSize:"1em", desc:"Las artes visuales, performáticas y plásticas son el pulso creativo de Montería. Esta categoría reúne a artistas, curadores y gestores culturales que transforman espacios, narrativas y comunidades a través de la expresión artística." },
    { bg:"#6599ff", fg:"#ffffff", video:"assets/videos/video3_web.mp4", logo:"assets/iconos/MDW_DISEÑO_AUDIOVISUAL.png", title:'<span class="cat-thin">Categoría</span> <span class="cat-medium">Diseño Audiovisual</span>', catSize:"0.56em", desc:"El diseño audiovisual combina imagen, sonido y movimiento para contar historias que conectan con las personas. Desde la producción audiovisual hasta la dirección de arte, esta categoría impulsa a los creadores que dan forma a la comunicación visual contemporánea." },
  ];

  const hero = document.getElementById('hero');
  const h1El = document.querySelector('.hero-text h1');
  const pEl = document.querySelector('.hero-text p');
  const hintEl = document.querySelector('.hero-hint');
  const colorBar = document.getElementById('colorBar');
  const heroVideoA = document.getElementById('heroVideoA');
  const heroVideoB = document.getElementById('heroVideoB');
  const logoA = document.getElementById('logoA');
  const logoB = document.getElementById('logoB');

  let currentIndex = -1;
  let activeLogo = logoA;
  let hiddenLogo = logoB;
  let activeVideo = heroVideoA;
  let hiddenVideo = heroVideoB;

  function goToSlide(index){
    if(index === currentIndex) return;
    const s = slides[index];
    const isFirst = (currentIndex === -1);
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

    hiddenLogo.src = s.logo;
    hiddenLogo.onload = function(){
      if(isFirst){
        hiddenLogo.style.transition = 'none';
        hiddenLogo.classList.remove('logo-hidden');
        activeLogo.classList.add('logo-hidden');
        void hiddenLogo.offsetHeight;
        hiddenLogo.style.transition = '';
      } else {
        hiddenLogo.classList.remove('logo-hidden');
        activeLogo.classList.add('logo-hidden');
      }
      const tmp = activeLogo;
      activeLogo = hiddenLogo;
      hiddenLogo = tmp;
    };

    hiddenVideo.src = s.video;
    hiddenVideo.currentTime = 0;
    hiddenVideo.oncanplaythrough = function(){
      this.oncanplaythrough = null;
      this.play().catch(()=>{});
      activeVideo.pause();
      this.style.opacity = '1';
      activeVideo.style.opacity = '0';
      var tmp = activeVideo;
      activeVideo = this;
      hiddenVideo = tmp;
    };

    var swatches = colorBar.querySelectorAll('.color-swatch');
    swatches.forEach(function(sw, i){
      sw.classList.toggle('active', i === index);
    });
  }

  slides.forEach(function(s, idx){
    var swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = s.bg;
    swatch.addEventListener('click', function(){ goToSlide(idx); });
    colorBar.appendChild(swatch);
  });

  goToSlide(0);

  var hintColors = ['#34cc67','#fe0000','#ff6600','#9900cc','#ffff00','#6599ff'];
  var hintColorIndex = hintColors.length - 1;
  var hintColorEl = document.getElementById('hintColor');
  setInterval(function(){
    hintColorIndex = (hintColorIndex + 1) % hintColors.length;
    hintColorEl.style.color = hintColors[hintColorIndex];
  }, 2000);
  hintColorEl.style.color = hintColors[0];

  var alliesGroups = [
    { label: 'Organizan', logos: ['assets/iconos/alcaldia_monteria.png','assets/iconos/semana_juventud.png','assets/iconos/pmjm.png','assets/iconos/consejo_juventud.png','assets/iconos/auvirlab.png'] },
    { label: 'Patrocinador oficial y sede asociada', logos: ['assets/iconos/unisinu.png','assets/iconos/flow.png'] },
    { label: 'Aliados institucionales', logos: ['assets/iconos/chadia.png','assets/iconos/arq_unisinu.png','assets/iconos/cec.png','assets/iconos/san_agustin.png','assets/iconos/upb.png','assets/iconos/unicor.png'] },
    { label: 'Apoyan', logos: ['assets/iconos/cesca.png','assets/iconos/pintando_4_historias.png','assets/iconos/tres_pesos_pesados.png','assets/iconos/caua.png','assets/iconos/fablab.png','assets/iconos/the_set_architects.png','assets/iconos/alerta_roja.png'] }
  ];

  var alliesLabel = document.getElementById('alliesLabel');
  var alliesLogos = document.getElementById('alliesLogos');
  var groupIdx = 0;
  var fadeDelay = 4000;

  function renderGroup(idx){
    var html = '';
    alliesGroups[idx].logos.forEach(function(src){
      html += '<img src="' + src + '" alt="Aliado">';
    });
    alliesLogos.innerHTML = html;
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
