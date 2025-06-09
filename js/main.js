

	$(document).ready(function () {
		$(document).on("scroll", onScroll);
 
		$('a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");
 
			$('a').each(function () {
				$(this).removeClass('navactive');
			})
			$(this).addClass('navactive');
 
			var target = this.hash;
			$target = $(target);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top+2
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
		});
	});
 
	function onScroll(event){
		var scrollPosition = $(document).scrollTop();
		$('.nav li a').each(function () {
			var currentLink = $(this);
			var refElement = $(currentLink.attr("href"));
			if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
				$('ul.nav li a').removeClass("navactive");
				currentLink.addClass("navactive");
			}
			else{
				currentLink.removeClass("navactive");
			}
		});
	
       
        $(function(){
            $('#portfolio').mixitup({
                targetSelector: '.item',
                transitionSpeed: 350
            });
        });

          $(function() {
            $( "#datepicker" ).datepicker();
        });
    
    };






document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      text: "„Вкусът на Спомена ме върна в детството. Истинска магия!“",
      author: "Стоян Колев",
      date: "09.05.2025",
      image: "images/stoyan.webp"
    },
    {
      text: "„Забравата е като пухкав спомен, който не искаш да пуснеш.“",
      author: "Мария Тонева",
      date: "08.05.2025",
      image: "images/food_icon02.jpg"
    },
    {
      text: "„Честно, не купувам хляб от друго място откакто опитах този. Уникален!“",
      author: "Ивайло Мусчев",
      date: "07.05.2025",
      image: "images/food_icon03.jpg"
    },
    {
      text: "Хляб на Края – груб отвън, нежен отвътре. Уникален контраст.“",
      author: "Десислава Петрова",
      date: "06.05.2025",
      image: "images/food_icon04.jpg"
    },
    {
      text: "„Тишината има вкус. И този хляб го носи.“",
      author: "Георги Андреев",
      date: "05.05.2025",
      image: "images/food_icon05.jpg"
    },
    {
      text: "„Скръбта е хляб, който те кара да чувстваш. Красиво и дълбоко.“",
      author: "Анелия Маринова",
      date: "04.05.2025",
      image: "images/food_icon06.jpg"
    },
    {
      text: "„Пепелта казва повече от хиляда думи. Текстура със смисъл.“",
      author: "Николай Бранев",
      date: "09.05.2025",
      image: "images/food_icon01.jpg"
    },
    {
      text: "„Ям Спомена всяка сутрин. Не от навик, а от нужда.“",
      author: "Теди",
      date: "08.05.2025",
      image: "images/tedi.jpg"
    },
    {
      text: "„Този хляб не просто се яде — той се усеща. Истинско преживяване.“",
      author: "Асен Тодоров",
      date: "07.05.2025",
      image: "images/food_icon03.jpg"
    }
  ];

  const slider = document.getElementById("testimonial-slider");
  const container = document.querySelector(".testimonial-container");  

   let gap = 22;         // вътрешен gap
  let groupGap = 22;    // gap между всяка 3-та кутия (група) 
  let index = 0;
  let itemsPerGroup = 3;
  let groupWidth = 0;
  let interval;

  function getItemsPerGroup() {
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    if (width >= 768) return 2;
    return 1;
  }

 function updateSlider() {
    slider.innerHTML = "";
    itemsPerGroup = getItemsPerGroup();
    const containerWidth = container.clientWidth;
    const boxWidth = (containerWidth - gap * (itemsPerGroup - 1)) / itemsPerGroup;
    groupWidth = boxWidth * itemsPerGroup + gap * (itemsPerGroup - 1);

    testimonials.forEach((t, i) => {
      const box = document.createElement("div");
      box.className = "testimonial-box";
      box.style.flex = `0 0 ${boxWidth}px`;
if ((i + 1) % itemsPerGroup === 0 && i !== testimonials.length - 1) {
  box.style.marginRight = `${groupGap}px`; // между групите
} else {
  box.style.marginRight = `${gap}px`; // вътре в групата
}
      box.innerHTML = `
        <div class="testimonial-text">${t.text}</div>
        <div class="testimonial-author">
          <img src="${t.image}" alt="Avatar">
          <div>
            <strong>${t.author}</strong><br>
            <span>${t.date}</span>
          </div>
        </div>
      `;
      slider.appendChild(box);
    });

    slider.style.width = `${(boxWidth + gap) * testimonials.length - gap}px`;
    index = 0;
    slider.style.transform = `translateX(0px)`;
  }

  function slideTestimonials() {
    const totalGroups = Math.ceil(testimonials.length / itemsPerGroup);
    const translateX = -(groupWidth * index);
    slider.style.transform = `translateX(${translateX}px)`;
    index = (index + 1) % totalGroups;
  }

  function startInterval() {
    if (!interval) {
      interval = setInterval(slideTestimonials, 4000);
    }
  }

  function stopInterval() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  updateSlider();
  startInterval();

  window.addEventListener("resize", () => {
    stopInterval();
    updateSlider();
    startInterval();
  });

  // 🟢 Пауза при hover:
  container.addEventListener("mouseenter", stopInterval);
  container.addEventListener("mouseleave", startInterval);

    // 🟢 Drag-to-slide със snap и ограничение
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let currentTranslate = 0;

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    stopInterval();
    slider.style.transition = "none";
    const match = slider.style.transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
    currentTranslate = match ? parseFloat(match[1]) : 0;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const diff = currentX - startX;
    let newTranslate = currentTranslate + diff;

    // Ограничение (не позволявай да излезе вляво/дясно извън контейнера)
    const maxTranslate = 0;
    const minTranslate = -((slider.offsetWidth - container.offsetWidth));
    if (newTranslate > maxTranslate) newTranslate = maxTranslate;
    if (newTranslate < minTranslate) newTranslate = minTranslate;

    slider.style.transform = `translateX(${newTranslate}px)`;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    slider.style.transition = "transform 0.6s ease-in-out";

    const diff = currentX - startX;
    const totalGroups = Math.ceil(testimonials.length / itemsPerGroup);
    const draggedTranslate = currentTranslate + diff;

    // snap до най-близка група
    index = Math.round(Math.abs(draggedTranslate) / groupWidth);
    if (index < 0) index = 0;
    if (index >= totalGroups) index = totalGroups - 1;

    const finalTranslate = -(index * groupWidth);
    slider.style.transform = `translateX(${finalTranslate}px)`;

    startInterval();
  });

  window.addEventListener("mouseleave", () => {
    if (!isDragging) return;
    isDragging = false;
    slider.style.transition = "transform 0.6s ease-in-out";

    const diff = currentX - startX;
    const totalGroups = Math.ceil(testimonials.length / itemsPerGroup);
    const draggedTranslate = currentTranslate + diff;

    index = Math.round(Math.abs(draggedTranslate) / groupWidth);
    if (index < 0) index = 0;
    if (index >= totalGroups) index = totalGroups - 1;

    const finalTranslate = -(index * groupWidth);
    slider.style.transform = `translateX(${finalTranslate}px)`;

    startInterval();
  });




});