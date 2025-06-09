

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
      text: "„Вкусът на този хляб е като прегръдка от детството. Благодаря ви!“",
      author: "Иван Георгиев",
      date: "09.05.2025",
      image: "images/food_icon01.jpg"
    },
    {
      text: "„Никога не съм очаквала, че един хляб може да бъде толкова ароматен и жив!“",
      author: "Мария Тонева",
      date: "08.05.2025",
      image: "images/food_icon02.jpg"
    },
    {
      text: "„Честно, не купувам хляб от друго място откакто опитах този. Уникален!“",
      author: "Стоян Илиев",
      date: "07.05.2025",
      image: "images/food_icon03.jpg"
    },
    {
      text: "„Сутрин започва добре само с вашия хляб. Сърдечно благодаря!“",
      author: "Десислава Петрова",
      date: "06.05.2025",
      image: "images/food_icon04.jpg"
    },
    {
      text: "„Истинска наслада. Всичко е както трябва да бъде.“",
      author: "Георги Андреев",
      date: "05.05.2025",
      image: "images/food_icon05.jpg"
    },
    {
      text: "„Много топлина, вкус и уют има в този хляб. Купуваме го редовно!“",
      author: "Анелия Маринова",
      date: "04.05.2025",
      image: "images/food_icon06.jpg"
    },
	    {
      text: "„Вкусът на този хляб е като прегръдка от детството. Благодаря ви!“",
      author: "1111111111",
      date: "09.05.2025",
      image: "images/food_icon01.jpg"
    },
    {
      text: "„Никога не съм очаквала, че един хляб може да бъде толкова ароматен и жив!“",
      author: "222222222",
      date: "08.05.2025",
      image: "images/food_icon02.jpg"
    },
    {
      text: "„Честно, не купувам хляб от друго място откакто опитах този. Уникален!“",
      author: "33333333",
      date: "07.05.2025",
      image: "images/food_icon03.jpg"
    }
  ];

  const slider = document.getElementById("testimonial-slider");

  testimonials.forEach(t => {
    const box = document.createElement("div");
    box.className = "testimonial-box";
    box.style.flex = "0 0 calc(33.333% - 13.33px)"; // 3 на ред
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

  let index = 0;
  const itemsPerGroup = 3;
  const totalGroups = Math.ceil(testimonials.length / itemsPerGroup);

  function slideTestimonials() {
    const translateX = -(100 * index);
    slider.style.transform = `translateX(${translateX}%)`;
    index = (index + 1) % totalGroups;
  }

  // Задай ширината на вътрешния контейнер спрямо броя елементи
  slider.style.width = `${(100 / itemsPerGroup) * testimonials.length}%`;

  setInterval(slideTestimonials, 4000); // смяна на 6 секунди
});