function isSmall()
{
	return matchMedia("(max-width:640px)").matches;
}


function isMedium()
{
	return matchMedia("(max-width: 1024px)").matches;	
}

var toggleAccordionNavs = function() {
	
	var el = $("footer .menu.accordion nav.white");
	
	if (isSmall())
		el.hide();
	else
		el.show();
}

function checkHeaderVideoStatus($start, $video, headerVideoPlaying) {
	
	if (isSmall()) return;
	
	// Check the status of the header video
		
	// If the start section is not in the viewport..
	
	if ( !$start.is(":in-viewport")) {
		
		// And the video is playing..
			
		if (headerVideoPlaying && $video.get(0)) {
			
			// Pause the video
			
			$video.get(0).pause();
		}	
	}
	
	// If is in the viewport
	
	else {
		
		// And is not playing
		
		if (!headerVideoPlaying) {
			
			// Resume video
			
			$video.get(0).play();
			
			headerVideoPlaying = true;	
		}	
	}	
}

function checkSlideshowStatus($slideshow, cyclePaused, currentSlideEl) {
	
	if( $slideshow.is(":in-viewport") ) {
		
		$slideshow.cycle("resume");
	}
	else {
		
		$slideshow.cycle("pause");
	}	
}



$(function(){
	
	var $start = $("section.start");
	var $video = $("section.start video");
	var $slideshow = $(".cycle-slideshow");
	var headerVideoPlaying = true;
	var cyclePaused;
	
	checkHeaderVideoStatus($start, $video, headerVideoPlaying);
	
	$(window).scroll(function(){
		checkHeaderVideoStatus($start, $video, headerVideoPlaying);
		checkSlideshowStatus($slideshow, cyclePaused, false);
	});

	// Flag to check if the header video is playing
	
	$video.on("pause", function (e) {
		headerVideoPlaying = false;	
	});
	
	$video.on("playing", function (e) {
		headerVideoPlaying = true;	
	});
	
	// Wire up Videos and Slideshow
	
	$slideshow.on("cycle-paused", function(event, optionHash) {
		
		if (isSmall()) return;
		
		$(".cycle-slideshow video").each(function(index, el){
		    el.pause();    
	    }); 
		
		cyclePaused = true;
	});
	
	$slideshow.on("cycle-resumed", function(event, optionHash) {
		
		if (isSmall()) return;
		
		var currentSlide = $(".cycle-slideshow").find(".features__slide").get(optionHash["currSlide"] + 1);
		
		$(currentSlide).find("video").get(0).play();
		
		cyclePaused = false;
	});
	
	$slideshow.on("cycle-update-view", function(event, optionHash, slideOptionsHash, currentSlideEl) {
		
		if (isSmall()) return; 
		
		checkSlideshowStatus($slideshow);
		
		if (!cyclePaused) {
			
			$(".cycle-slideshow video").each(function(index, el){			
			    el.pause();
		    });	
		    
		    $(currentSlideEl).find("video").get(0).play();
		}
	});	
	
	
	// Mobile menu toggle
	
	$("#small-menu-toggle").on("click", function (e) {
		
		e.preventDefault();
		
		var el = $(this);		
		var activeClass = "is-active";
		var menu = $("#small-menu");
		
		if (el.hasClass(activeClass)) 
		{
			el.removeClass(activeClass);
			menu.slideUp();
		}
		else  
		{
			el.addClass(activeClass);
			menu.slideDown();
		}
	});
	
	
	// Accordion menus on footer
	
	$(".accordion-menu-toggle").on("click", function (e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		if (isSmall()) 
		{				
			var el = $(this);
			var menu = el.next();
			var activeClass = "is-active";
			
			if (el.hasClass(activeClass)) 
			{
				menu.slideUp("fast");
				el.removeClass(activeClass);
			}
			else 
			{
				el.addClass(activeClass);
				menu.slideDown("fast");
			}
		}
	});
	
	$(window).resize(function(){
		toggleAccordionNavs();	
	});	
	
	
	// Scroll down to features section 
	
	$("#scroll-to-features").on("click", function (e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		$(window).scrollTo($("section.features"), 500);	
	});	
	
	
	// Make nav fixed on scroll down in docs pages
	
	var el = $(".docs .main-nav");
	var elementPosition = el.offset();
	
	$(window).scroll(function(){
		
		if (!isSmall() && elementPosition) {
		
			if(($(window).scrollTop() + 32) > elementPosition.top){
				el.css("position","fixed").css("top","24px");
			} else {
				el.css("position","static");
			}
		}   	
	});
});