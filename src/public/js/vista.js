/* 
        $("button").click(function () {
            console.log('print')
            //{{!-- $("p").removeClass("intro"); --}}
        });
        */
// $(document).ready(function() {
$('button').click(function() {
	console.log('print');
	$('#navbarSupportedContent ul').toggleClass('offset-md-7');
	//$("p:last").removeClass("intro").addClass("main");
	// });
});
