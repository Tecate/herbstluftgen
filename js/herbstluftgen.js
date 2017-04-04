$( document ).ready(function() {

	// clickable windows
	$( ".desktop-window" ).click(function() {
		if ($(this).hasClass("window-active")) {
		} else {
			$(".desktop-window").removeClass("window-active");
			$(this).toggleClass("window-active");

			$(".desktop-frame").removeClass("desktop-frame-active");
			$(this).closest(".desktop-frame").toggleClass("desktop-frame-active");
		}
		// if ( $( this ).hasClass( ".window-active" ) ) {
		// 	// window is already active
		// 	alert("lol");
		// } else {
		// 	$( this ).toggleClass( "window-active" );
		// 	$( this ).parent().toggleClass( "desktop-frame-active" );

		// 	$( ".desktop-window" ).not( $( this ) ).hasClass("window-active").toggleClass( "window-active" );
		// 	$( ".desktop-frame" ).not( $( this ).hasClass("window-active").parent() ).toggleClass( "desktop-frame-active" );
		// }
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
		var monitorPaddingTop = parseInt($("#monitor-padding-top").val());
		var monitorPaddingRight = parseInt($("#monitor-padding-right").val());
		var monitorPaddingBottom = parseInt($("#monitor-padding-bottom").val());
		var monitorPaddingLeft = parseInt($("#monitor-padding-left").val());

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

		var urgentBorder = "0px 0px 0px " + outerBorderWidth + "px " + outerBorderUrgent + " inset," +
							 "0px 0px 0px " + totalBorderWidth + "px " + innerBorderActive + " inset";

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

		// need to subtract 1 from border width when using box-shadow?
		// need to add case for zero
		// add frameborderwidth to padding
		var frameInactive = "0px 0px 0px " + (frameBorderWidth-1) + "px " + frameBorderInactive + " inset," + 
							 "0px 0px 0px " + (transFrameBorderWidth+frameBorderWidth) + "px " + frameBgInactive + " inset";
		var frameActive   = "0px 0px 0px " + (frameBorderWidth-1) + "px " + frameBorderActive + " inset," +
							 "0px 0px 0px " + (transFrameBorderWidth+frameBorderWidth) + "px " + frameBgActive + " inset";
		var frameTransInactive = "0px 0px 0px " + frameBorderWidth + "px " + frameBorderInactive + " inset," + 
							 "0px 0px 0px " + transFrameBorderWidth + "px " + frameBgInactive + " inset";
		var frameTransActive   = "0px 0px 0px " + frameBorderWidth + "px " + frameBorderActive + " inset," +
							 "0px 0px 0px " + transFrameBorderWidth + "px " + frameBgActive + " inset";

		// needs an empty frame to show functionality
		if ($('#always-show-frame').is(":checked")) {
			var alwaysShowFrame = 1;
		} else {
			var alwaysShowFrame = 0;
			// check if frame has class active
			if ($(".desktop-frame").hasClass(".desktop-frame-active")) {
			} else {

			}
		}

		var frameBgTransparent = 0;
		transFrameBorderWidth = 0;
		if ($('#trans-frame-bg').is(":checked")) {
			transFrameBorderWidth = parseInt($("#trans-frame-border-width").val());
			frameBgActive = "transparent";
			frameBgInactive = "transparent";
			frameBgTransparent = 1;
			// $(".desktop-frame").css("box-shadow", frameTransInactive);
			// $(".desktop-frame-active").css("box-shadow", frameTransActive);
			// box-shadow: "+frameTransInactive+";
			// box-shadow: "+frameTransActive+";
		}

		// adds margin to box-sizing but breaks other things
		// var frameVertMargin = parseInt($(".desktop-frame").css("marginTop"))*2;
		// $(".desktop-frame").height($(".desktop-frame").height() - frameVertMargin);

// 		#desktop-container { padding: " + monitorPadding + "px !important; } \

		$("style").replaceWith( "<style> \
		#desktop-container {\
			padding-top: "+monitorPaddingTop+"px;\
			padding-right: "+monitorPaddingRight+"px;\
			padding-bottom: "+monitorPaddingBottom+"px;\
			padding-left: "+monitorPaddingLeft+"px;\
		}\
		.desktop-window { box-shadow: " + tilingInactive + "; padding: "+innerBorderWidth+"px; } \
		.window-active { box-shadow: " + tilingActive + "; } \
		.window-floating { box-shadow: " + floatingInactive + "; } \
		.window-active.window-floating { box-shadow: " + floatingActive + "; } \
		.urgent { box-shadow: "+urgentBorder+"; }\
		.window-gap { padding: "+windowGap+"px; }\
		.desktop-frame { \
			margin: " + frameGap + "px; \
			margin-bottom: 0px; \
			padding: " + (framePadding+frameBorderWidth-1) + "px; \
			box-shadow: "+frameInactive+"; \
			background-color: " + frameBgInactive + "; \
		} \
		.desktop-frame-active { \
			box-shadow: "+frameActive+"; \
			background-color: " + frameBgActive + "; \
		} \
		.second-frame {\
			height: calc(50% - "+(frameGap*3)+"px);\
		}\
		.bottom-pad-lol {\
			padding: "+frameGap+"px;\
		}\
		</style>" );

		$("#config-output").text("");
		$("#config-output").append("# theme generated by herbstluftgen \n");
		$("#config-output").append("hc set frame_border_active_color '"+frameBorderActive+"'\n");
		$("#config-output").append("hc set frame_border_normal_color '"+frameBorderInactive+"'\n");
		$("#config-output").append("hc set frame_bg_normal_color '"+frameBgInactive+"'\n");
		$("#config-output").append("hc set frame_bg_active_color '"+frameBgActive+"'\n");
		$("#config-output").append("hc set frame_border_width "+frameBorderWidth+"\n");
		$("#config-output").append("hc set always_show_frame "+alwaysShowFrame+"\n"); // not implemented in render
		$("#config-output").append("hc set frame_bg_transparent "+frameBgTransparent+"\n");
		$("#config-output").append("hc set frame_transparent_width "+transFrameBorderWidth+"\n");
		$("#config-output").append("hc set frame_gap "+frameGap+"\n");
		$("#config-output").append("\n");
		$("#config-output").append("hc attr theme.active.color '"+outerBorderActive+"'\n");
		$("#config-output").append("hc attr theme.normal.color '"+outerBorderInactive+"'\n");
		$("#config-output").append("hc attr theme.urgent.color '"+outerBorderUrgent+"'\n");
		$("#config-output").append("hc attr theme.inner_width "+innerBorderWidth+"\n");
		$("#config-output").append("hc attr theme.inner_color '"+innerBorderInactive+"'\n");
		$("#config-output").append("hc attr theme.border_width "+outerBorderWidth+"\n");
		$("#config-output").append("hc attr theme.floating.border_width "+floatingBorderWidth+"\n");
		$("#config-output").append("hc attr theme.floating.outer_width "+floatingOuterBorderWidth+"\n");
		$("#config-output").append("hc attr theme.floating.outer_color '"+floatingOuterBorderInactive+"'\n");
		$("#config-output").append("hc attr theme.active.inner_color '"+innerBorderActive+"'\n");
		$("#config-output").append("hc attr theme.active.outer_color '"+outerBorderActive+"'\n");
		$("#config-output").append("hc attr theme.background_color '"+"'\n"); // not implemented (color behind window contents visible on resize)
		$("#config-output").append("\n");
		$("#config-output").append("hc set window_gap "+windowGap+"\n"); // not implemented in render
		$("#config-output").append("hc set frame_padding "+framePadding+"\n");
		$("#config-output").append("hc pad :0 "+monitorPaddingTop+" "+monitorPaddingRight+" "+monitorPaddingBottom+" "+monitorPaddingLeft+"\n");

		// maybe smart_window/frame_surroundings
		// what is mouse_recenter_gap?

	}

	$("input").on("change",function(){
		updateRender();
	});

	$(".urgent-btn").click(function() {
	  $(this).parent().parent().toggleClass("urgent");
	});
	$(".float-btn").click(function() {
	  $(this).parent().parent().toggleClass("psudeo-float");
	});

	$(".collapsable h1").click(function() {
	  $(this).closest(".settings-section").toggleClass("settings-collapsed");
	});

	updateRender();
});
