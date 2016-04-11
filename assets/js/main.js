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

$(function(){
	
	// Wire up Videos and Slideshow
	
	$(".cycle-slideshow").on("cycle-update-view", function(event, optionHash, slideOptionsHash, currentSlideEl) {
				
		// Stop videos
			    
	    $(".cycle-slideshow video").each(function(index, el){
		    el.pause();
	    });
	    
	    // If the slideshow is in the viewport, play current video
	    if($currentSlideEl.is(":in-viewport")) {
			$currentSlideEl.find("video").get(0).play();    
	    }
	});
	
	// Pause videos when out of the viewport
	
	$(window).scroll(function(){
		
		var $start = $("section.start");
		var $slideshow = $(".cycle-slideshow");
		var $video = $("section.start video");
		
		if ( !$start.is(":in-viewport") ) {
			$video.get(0).pause();
		}
		else {
			$video.get(0).play();
		}
		
		if ( $slideshow.is(":in-viewport") ) {
			$slideshow.cycle('resume');
		}
		else {			
			$slideshow.cycle('pause');
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