$( document ).ready(function() {

	// clickable windows
	$( ".desktop-window" ).click(function() {
		if ( $( this ).hasClass( ".window-active" ) ) {
			// window is already active
		} else {
			$( this ).toggleClass( "window-active" );
			$( this ).parent().toggleClass( "desktop-frame-active" );

			$( ".desktop-window" ).not( $( this ) ).hasClass("window-active").toggleClass( "window-active" );
			$( ".desktop-frame" ).not( $( this ).hasClass("window-active").parent() ).toggleClass( "desktop-frame-active" );
		}
	});

	// destop background color
	$("#input-bg-color").on("change",function(){
		$("#desktop-container").css("background-color",$("#input-bg-color").val());
	});

	// desktop background url
	$( "#bg-img-button" ).click(function(){
		$("#desktop-container").css("background-image", 'url(' + $("#bg-img").val() + ')');
	});

	// desktop background image display
	function bgReset() { // resets background image properties
		$("#desktop-container").css({
			"background-repeat" : "repeat",
			"background-position" : "0% 0%",
			"background-size" : "auto"

		});
	}
	$("#bg-display").on("change",function(){
		if ( $(this).val() == "tile" ) {
			bgReset();
			$("#desktop-container").css("background-repeat", "repeat");
		} else if ( $(this).val() == "center" ) {
			bgReset();
			$("#desktop-container").css({
				"background-position" : "center",
				"background-repeat" : "no-repeat"
			});
		} else if ( $(this).val() == "fill" ) {
			bgReset();
			$("#desktop-container").css({
				"background-position" : "center",
				"background-size" : "cover"
			});
		} else if ( $(this).val() == "max" ) {
			bgReset();
			$("#desktop-container").css("background-size", "100% 100%");
		} else if ( $(this).val() == "scale" ) {
			$("#desktop-container").css({
				"background-repeat" : "no-repeat",
				"background-position" : "center",
				"background-size" : "contain"
			});
		}
	});

	function updateRender() {
		// monitor padding
		var monitorPadding = parseInt($("#monitor-padding").val());

		// window gap
		var windowGap = parseInt($("#window-gap").val());

		// border variables
		var innerBorderWidth = parseInt($("#inner-border-width").val());
		var innerBorderActive = $("#inner-border-active").val();
		var innerBorderInactive = $("#inner-border-inactive").val();

		var outerBorderWidth = parseInt($("#outer-border-width").val());
		var outerBorderActive = $("#outer-border-active").val();
		var outerBorderInactive = $("#outer-border-inactive").val();
		var outerBorderUrgent = $("#outer-border-urgent").val();

		var floatingBorderWidth = parseInt($("#floating-border-width").val());
		var floatingOuterBorderWidth = parseInt($("#floating-outer-border-width").val());
		var floatingOuterBorderInactive = $("#floating-outer-border-inactive").val();

		var totalBorderWidth = innerBorderWidth + outerBorderWidth;
		var totalFloatingBorderWidth = innerBorderWidth + floatingBorderWidth;
		// inner + outer + floating outer
		var totalFloatingBorderWidth2 = totalFloatingBorderWidth + floatingOuterBorderWidth;

		// var tilingInactive = "0px 0px 0px " + innerBorderWidth + "px " + innerBorderInactive + ", 0px 0px 0px " + totalBorderWidth + "px " + outerBorderInactive;
		// var tilingActive = "0px 0px 0px " + innerBorderWidth + "px " + innerBorderActive + ", 0px 0px 0px " + totalBorderWidth + "px " + outerBorderActive;

		var tilingInactive = "0px 0px 0px " + outerBorderWidth + "px " + outerBorderInactive + " inset," + 
							 "0px 0px 0px " + totalBorderWidth + "px " + innerBorderInactive + " inset";
		var tilingActive   = "0px 0px 0px " + outerBorderWidth + "px " + outerBorderActive + " inset," +
							 "0px 0px 0px " + totalBorderWidth + "px " + innerBorderActive + " inset";

		var floatingInactive = "0px 0px 0px " + innerBorderWidth + "px " + innerBorderInactive + ", 0px 0px 0px " + totalFloatingBorderWidth + "px " + outerBorderInactive + ", 0px 0px 0px " + totalFloatingBorderWidth2 + "px " + floatingOuterBorderInactive;
		var floatingActive = "0px 0px 0px " + innerBorderWidth + "px " + innerBorderActive + ", 0px 0px 0px " + totalFloatingBorderWidth + "px " + outerBorderActive + ", 0px 0px 0px " + totalFloatingBorderWidth2 + "px " + innerBorderActive;


		// frame variables
		var frameGap = parseInt($("#frame-gap").val());
		var framePadding = parseInt($("#frame-padding").val());
		// var alwaysShowFrame = $("#always-show-frame").val();
		var frameBorderWidth = parseInt($("#frame-border-width").val());
		var transFrameBorderWidth = parseInt($("#trans-frame-border-width").val());
		var frameBorderActive = $("#frame-border-active").val();
		var frameBorderInactive = $("#frame-border-inactive").val();
		// var transFrameBg = $("#trans-frame-bg").val();
		var frameBgActive = $("#frame-bg-active").val();
		var frameBgInactive = $("#frame-bg-inactive").val();

		if ($('#always-show-frame').is(":checked")) {
			var alwaysShowFrame = 1;
		} else {
			var alwaysShowFrame = 0;
		}

		if ($('#trans-frame-bg').is(":checked")) {
			frameBgActive = "transparent";
			frameBgInactive = "transparent";
		}

// 		#desktop-container { padding: " + monitorPadding + "px !important; } \

		$("style").replaceWith( "<style> \
		.desktop-window { box-shadow: " + tilingInactive + "; } \
		.window-active { box-shadow: " + tilingActive + "; } \
		.window-floating { box-shadow: " + floatingInactive + "; } \
		.window-active.window-floating { box-shadow: " + floatingActive + "; } \
		.desktop-frame { \
			margin: " + frameGap + "px; \
			padding: " + framePadding + "px; \
			border: " + frameBorderWidth + "px solid " + frameBorderInactive + "; \
			background-color: " + frameBgInactive + "; \
		} \
		.desktop-frame-active { \
			border: " + frameBorderWidth + "px solid " + frameBorderActive + "; \
			background-color: " + frameBgActive + "; \
		} \
		</style>" );
	}


	// inner border width
	$("input").on("change",function(){
		updateRender();
	});

});
