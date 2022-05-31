var ui = {
	/*
	* comment  : reset
	*/
	window: {
		$this: $(window),
		height: null,
		scrollTop: null
	},
	document: {
		$this: $(document),
		height: null,
	},
	$header: null,
	init: function() {
		this.fxEventWindow();
		//this.fxHeader();
		this.fxCheckAll();
		this.fxSlide();
		this.fxpageTop();
		this.fxoutOff();
		this.fxCopyUrl();
	},
	/**
     * comment  : �덈룄�� �대깽��
     * param    :
     * @author  :
     * @date    :
     */
	 fxEventWindow: function() {
		$(function() {
			ui.$body = $('body');
			ui.$topBanner = $('.top-banner');
			ui.$header = $('header');
			ui.$headerTop = $('.header-top');
			ui.$wrap = $('.wrap');
			ui.$footer = $('footer');
			ui.$quickMenu = $('.quick-menu');
		});
		ui.window.$this.on({
			'load': function() {
					ui.window.scrollTop = ui.window.$this.scrollTop();
					ui.window.height = ui.window.$this.height();
					ui.document.height = ui.document.$this.height();
					ui.$topBanner.height = ui.$topBanner.outerHeight();
					ui.$header.height = ui.$header.outerHeight();
					ui.$wrap.height = ui.$wrap.outerHeight();
					ui.$footer.height = ui.$footer.outerHeight();
			},
			'scroll': function() {
					ui.window.scrollTop = ui.window.$this.scrollTop();
					ui.window.height = ui.window.$this.height();
					ui.document.height = ui.document.$this.height();
					ui.$topBanner.height = ui.$topBanner.outerHeight();
					ui.$header.height = ui.$header.outerHeight();
					ui.$wrap.height = ui.$wrap.outerHeight();
					ui.$footer.height = ui.$footer.outerHeight();
			},
			'resize': function() {
					ui.window.height = ui.window.$this.height();
			}
		})
},
	/*
	* comment  : check all checkbox
	*/
	/*
	* comment  : slide
	*/
	fxSlide: function() {
		$('.slide-trg').each(function(){
			var $trg = $(this);
			if ( $trg.hasClass('active') ) {
        $(this).closest('.slide-title').next('.slide-cont').find('.inner').css('display', 'block');
			}
		});
		$(document).on('click', '.slide-wrap .slide-trg', function(e) {
      var slideTime = 300;
			e.preventDefault();
			console.log('fxSlide');
			if ($(this).closest('.slide-title').next('.slide-cont').find(' .inner').css('display') === 'block') {
				$(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
			} else {
        $(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).addClass('active');
        $(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
				$(this).closest('.slide-title').next('.slide-cont').find('.inner').slideDown(slideTime);
			}
		});
	},
  fxpageTop: function() {
    $(document).on('click', '.page-top', function(e) {
      $('html, body').animate({
        scrollTop: 0
      }, 300);
    });
  },
  fxoutOff: function() {
		$('[data-tipopen]').on('click', function(){
			$(this).closest('.tooltip').find('.tooltip-cont').addClass('active');;
			return false;
		});
    $(window).on('click', function(event) {
      if (!$(event.target).closest('[data-widthout]').length) {
        $('[data-widthout]').removeClass('active');
      }
    });
  },
	fxCopyUrl: function() {
		var ct;
		$(document).on('click', '.clipboard', function(e) {
			e.preventDefault();
			end();
			var dummy = document.createElement("input");
			var text = location.href;
			document.body.appendChild(dummy);
			dummy.value = text;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
			$('.toast-msg').addClass('active');
			start();
   		});

		function start() {
			ct = setTimeout(function() {
				$('.toast-msg').removeClass('active');
			}, 1000);
		}

		function end() {
			clearTimeout(ct);
		}
	},
}

function offsetEvent() {
	var doc_h = $(document).scrollTop();
	var offsetVal = $('[data-offset]');

	$('.offset-event').each(function(i) {
		var offsetArea = $(this).offset().top;
		var offPosition = $(this).data('offset');
		console.log(offsetArea, offPosition, offsetArea - offPosition)
		
		if (doc_h > offsetArea - offPosition) {
			$(this).addClass('active');
		}else {
			$(this).removeClass('active');
		}
	});
}

$(function() {
  //ui.init();

//   AOS.init({
// 	  duration: 1000
//   });

  // $('.gnb').on('click', function(){
  //   console.log('a');
  //   $('header').addClass('fix');
  // });

  $('#gnb-menu').on('mouseenter', function(){
	if(!$('header').hasClass('over')){
		$('header').addClass('over');
		$('header').addClass('fix');
	}
	// if(!$('header').hasClass('fix')){
	// 	$(this).addClass('fix')
	// }
  });

  $('#gnb-menu').on('mouseleave', function(){
		$('header').removeClass('over');
		$('main').removeClass('active');
		$('#gnb-menu > li').removeClass('hover');

		if($(window).scrollTop() == 0){
			$('header').removeClass('fix');
		}
  });

	
  $('#gnb-menu > li').hover(function(){
    $('#gnb-menu').find('.gnb-sub-wrap').removeClass('show');
    $(this).closest('li').find('.gnb-sub-wrap').addClass('show');
		$('#gnb-menu > li').removeClass('hover');
		$(this).addClass('hover');
	
		if( $(this).closest('li').find('.gnb-sub-wrap').length > 0){
		//if($('.gnb-sub-wrap').is(':visible')){
			$('main').addClass('active');
		}else {
			$('main').removeClass('active');
		}
  });

  // GNB
  var burger = $('.menu-trigger');
  
  burger.on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
  });


  //Slide
  $('.swiper-area').each(function(i){
	var $this = $(this);
	$this.addClass('area' + i);

	if($this.hasClass('mySwiper')){
		var swiper1 = new Swiper('.area' + i, {
			speed: 400,
			slidesPerView: 1,
			//loop : true,
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
		});
	} else if($this.hasClass('section-play')){
		var swiper2 = new Swiper('.area' + i, {
			//slidesPerView: 6,
			slidesPerView: "auto",
			spaceBetween: 16,
			loop: false,
			speed: 500,
		});
	}else {
		var swiper3 = new Swiper('.area' + i, {
			slidesPerView: "auto",
			spaceBetween: 16,
			loop: false,
			speed: 500,
		});
	}
  });
  

  // Video 
  var btnPlay = $('.video-area button');

  btnPlay.on('click', function(){
    var video = $(this).closest('div');

    if(!video.hasClass('active')){
      $(this).children('img').attr('src', '../../assets/images/btn_pause.png');
      video.addClass('active').find('video').get(0).play();
    
    } else {
      $(this).children('img').attr('src', '../../assets/images/btn_play.png');
      video.removeClass('active').find('video').get(0).pause();
    }
  });

  $('.video-item').mouseenter(function(){
	  $(this).addClass('active');
	  $(this).find('video').get(0).play();
  })
  .mouseleave(function(){
	  $(this).removeClass('active');
	  $(this).find('video').get(0).currentTime = 0;
	  $(this).find('video').get(0).pause();
  });
  
});

$(window).on({
	'load': function(){
		offsetEvent();

		this.isDown = false;
		this.preTop = $(window).scrollTop();
	},
	'scroll': function() {
		offsetEvent();

		var winH = $(window).height(),
			winTop = $(window).scrollTop(),
			docH = $(document).height();

		$('header').removeClass('over');
		$('main').removeClass('active');
		$('#gnb-menu > li').removeClass('hover'); 

		if (winTop > this.preTop && !this.isDown) {
			this.isDown = true;
			$('header').removeClass('fix over').addClass('slideUp');
			$('.gnb-sub-wrap').hide();
			setTimeout(function(){
				$('.gnb-sub-wrap').removeAttr('style');
			},500);
		} else if (winTop < this.preTop && this.isDown) {
			this.isDown = false;
			$('header').addClass('fix').removeClass('slideUp');
		}

		if (winTop > docH - winH) {
			this.isDown = true;
		} else if (winTop <= 0) {
			this.isDown = false;
			$('header').removeClass('fix');
		}

		this.preTop = winTop;
	}
	
});