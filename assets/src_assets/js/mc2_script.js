jQuery(function($) {

	// Bootstrap 4 li class name
	$(".breadcrumb li").addClass("breadcrumb-item");
	$(".breadcrumb li.last").attr('aria-current','page');

	// clean styles in WYGWAM editor
  	$("#bloq #fancybox-container img").addClass("mb-2");
  	$("#bloq img").addClass("img-fluid").removeAttr('style');
  	$("#bloq table").addClass("table");
	$("#bloq").each(function() {
	    var $this = $(this);
	    $this.html($this.html().replace(/&nbsp;/g, ''));
	});  	
  	
	// optional add fancybox to images (add class, "lightbox" in image class in WYGWAM editor)
	$("#bloq img").each(function(index) {
		var bloq_image_src = $(this).attr('src');
		var bloq_image_alt = $(this).attr('alt');
	    if ( $(this).hasClass( "lightbox" ) ) {
	        $(this).wrap("<a href='" + bloq_image_src + "'" + "data-fancybox='image-" + index + "' data-caption='" + bloq_image_alt + "'></a>")
	    } 
	});

	// responsive video embeds in WYGWAM editor
	// supported videos:
	// -----------------
	// - youtube
	// - facebook
	// - vimeo
	// - google map
	$('#bloq iframe[src*="youtube.com"], #bloq iframe[src*="facebook.com"], #bloq iframe[src*="vimeo.com"], #bloq iframe[src*="google.com"]').wrap('<div class="embed-responsive embed-responsive-16by9">').addClass("embed-responsive-item");
  	
  	
	// initiate lightbox
	/*
	$("[data-fancybox]").fancybox({
		// Options will go here
	});
	*/

	// contact form submission success message using query string

	if (window.location.href.indexOf("?success") > -1) {

	    $('html, body').animate({
	        scrollTop: $( '#myAnchor' ).offset().top
	    }, 500);

		setTimeout(function(){
			window.location.href = window.location.href.split('?')[0];
		},4000);
	}
	
// Example starter JavaScript for disabling form submissions if there are invalid fields

    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

});