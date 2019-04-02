// Custom Script
// Developed by: Samson.Onna
var customScripts = {
    profile: function () {
        // portfolio
        if ($('.isotopeWrapper').length) {
            var $container = $('.isotopeWrapper');
            var $resize = $('.isotopeWrapper').attr('id');
            // initialize isotope
            $container.isotope({
                itemSelector: '.isotopeItem',
                resizable: false, // disable normal resizing
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
            $("a[href='#top']").click(function () {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });
            $('.navbar-inverse').on('click', 'li a', function () {
                $('.navbar-inverse .in').addClass('collapse').removeClass('in').css('height', '1px');
            });
            $('#filter a').click(function () {
                $('#filter a').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 1000,
                        easing: 'easeOutQuart',
                        queue: false
                    }
                });
                return false;
            });
            $(window).smartresize(function () {
                $container.isotope({
                    // update columnWidth to a percentage of container width
                    masonry: {
                        columnWidth: $container.width() / $resize
                    }
                });
            });
        }
    },
    fancybox: function () {
        // fancybox
        $(".fancybox").fancybox();
    },
    onePageNav: function () {

        		if($('#main-nav ul li:first-child').hasClass('active')){
					$('#main-nav').css('background','none');
		}
        $('#mainNav').onePageNav({        
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 950,
            scrollThreshold: 0.2,
            filter: '',
            easing: 'swing',
            begin: function () {
                //I get fired when the animation is starting
				
            },
            end: function () {
                //I get fired when the animation is ending
				if(!$('#main-nav ul li:first-child').hasClass('active')){
					$('.header').addClass('addBg');					
				}else{
						$('.header').removeClass('addBg');
				}
				
            },
            scrollChange: function ($currentListItem) {
                //I get fired when you enter a section and I pass the list item of the section
				if(!$('#main-nav ul li:first-child').hasClass('active')){
					$('.header').addClass('addBg');
				}else{
						$('.header').removeClass('addBg');
				}
            }
        });
    },
    slider: function () {
        $('#da-slider').cslider({
            autoplay: true,
            bgincrement: 0
        });
    },
    owlSlider: function () {
        var owl = $("#owl-demo");
        owl.owlCarousel();
        // Custom Navigation Events
        $(".next").click(function () {
            owl.trigger('owl.next');
        })
        $(".prev").click(function () {
            owl.trigger('owl.prev');
        })
    },
    bannerHeight: function () {
        var bHeight = $(".banner-container").height();
        $('#da-slider').height(bHeight);
        $(window).resize(function () {
            var bHeight = $(".banner-container").height();
            $('#da-slider').height(bHeight);
        });
    },
    init: function () {
        customScripts.onePageNav();
        customScripts.profile();
        customScripts.fancybox();
        customScripts.slider();
        customScripts.owlSlider();
        customScripts.bannerHeight();
    }
}
$('document').ready(function () {
    customScripts.init();
	$('#diagram-id-1').diagram({ 
			size: "190",
			borderWidth: "10",
			bgFill: "#95a5a6",
			frFill: "#ffba00",
			textSize: 54,
			textColor: '#1a1a1a'
		}); 
		$('#diagram-id-2').diagram({ 
			size: "190",
			borderWidth: "10",
			bgFill: "#95a5a6",
			frFill: "#2ecc71",
			textSize: 54,
			textColor: '#333'
		});

		$('#diagram-id-3').diagram({ 
			size: "190",
			borderWidth: "10",
			bgFill: "#95a5a6",
			frFill: "#3498db",
			textSize: 54,
			textColor: '#1a1a1a'
		});
		$(window).load(function() { 
			  $('#filter .current').trigger('click');
		});
});



var c, cx,
    width,
    height,
    balls,
    numBalls = 80,
    separationThreshold = 220,
    tau = Math.PI * 2,
    resetSwitch = document.getElementById('reset');

resetSwitch.onclick = function(e) {
    e.preventDefault();
    init();
};

function newColours() {
    let r = Math.floor(Math.random() * 128) + 127;
    let g = Math.floor(Math.random() * 8) + 64;
    let b = Math.floor(Math.random() * 32) + 64;
    return {r, g, b};
}

class Ball {

    constructor(id, x, y, radius, speed) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colours = newColours();
        this.speed = speed;
        let initialVector = {x: Math.random() * 2 - 1, y: Math.random() * 2 - 1};
        let vectorX = initialVector.x / Math.sqrt((initialVector.x * initialVector.x) + (initialVector.y * initialVector.y));
        let vectorY = initialVector.y / Math.sqrt((initialVector.x * initialVector.x) + (initialVector.y * initialVector.y));
        this.vector = {x: vectorX, y: vectorY};
    }

    draw() {
        cx.beginPath();
        cx.arc(this.x, this.y, this.radius, 0, tau);
        cx.fillStyle = 'rgba(' + this.colours.r + ',' + this.colours.g + ',' + this.colours.b + ', 1)';
        cx.fill();
    }

    step() {
        this.x += this.vector.x * this.speed;
        this.y += this.vector.y * this.speed;
        this.checkBounds();
    }

    checkBounds() {
        if (this.x - this.radius <= 0) {
            this.vector.x *= -1;
        }
        if (this.x + this.radius >= width) {
            this.vector.x *= -1;
        }
        if (this.y - this.radius <= 0) {
            this.vector.y *= -1;
        }
        if (this.y + this.radius >= height) {
            this.vector.y *= -1;
        }
    }
}

function run() {
    window.requestAnimationFrame(run);
    cx.clearRect(0, 0, width, height);
    for (let b = 0; b < balls.length; b++) {
        let ball = balls[b];
        ball.draw();
        ball.step();
        doLinks(ball);
    }
}

function doLinks(srcBall) {
    for (let b = 0; b < balls.length; b++) {

        if (b + 1 != srcBall.id) {

            let ball = balls[b];
            let separation = distance(srcBall, ball);

            if (separation < separationThreshold) {
                let colours = newColours();
                let opacity = 1;
                let width = 1;
                if (separation > separationThreshold / 2) {
                    opacity = Math.abs((separation / separationThreshold) - 1);
                }
                cx.beginPath();
                cx.moveTo(srcBall.x, srcBall.y);
                cx.lineTo(ball.x, ball.y);
                cx.lineWidth = width;
                cx.strokeStyle = 'rgba(' + colours.r + ',' + colours.g + ',' + colours.b + ', ' + opacity + ')';
                cx.stroke();
            }

        }
    }
}

function distance(ball1, ball2) {
    let xDiff = ball1.x - ball2.x;
    let yDiff = ball1.y - ball2.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function createBall(id) {
    let x = (Math.random() * (width / 2) + (width / 4));
    let y = (Math.random() * (height / 2) + (height / 4));
    let radius = Math.random() * 5 + 5;
    let speed = Math.random() * 1 + 1;
    return new Ball(id, x, y, radius, speed);
}

function init() {
    c = document.querySelector('canvas');
    width = c.width = window.innerWidth;
    height = c.height = window.innerHeight;
    cx = c.getContext('2d');
    window.addEventListener('resize', function() {
      width = c.width = window.innerWidth ;
      height = c.height = window.innerHeight ;
    }, false);
    cx.globalCompositeOperation = 'lighter';
    balls = [];
    for (let m = 0; m < numBalls; m++) {
        balls.push(createBall(m + 1));
    }
}

init();

run();
