$(document).ready(function(){

$(window).scroll(function() {
    if ($(window).scrollTop() >= 50) {
        $('#header').addClass('fixed');
    } else {
        $('#header').removeClass('fixed');
    }
});

  $('body').append('<div id="toTop" class="btn btn-info">Top</div>');
    	$(window).scroll(function () {
			if ($(this).scrollTop() != 0) {
				$('#toTop').fadeIn();
			} else {
				$('#toTop').fadeOut();
			}
		}); 
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });


 });
 
 
 
