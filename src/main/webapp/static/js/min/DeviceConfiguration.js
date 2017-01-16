var DeviceConfiguration=function(){var D=Date.now(),m="browser",E=function(){var b=!1;try{b="jid"in Conversations.getCurrentConversation()}catch(a){b=!1}return"projector"!=m&&b},k={tools:!1,slides:!1,header:!1,keyboard:!1,footer:!1},h=function(b,a){E&&("header"==b||1!=a&&0!=a||(k[b]=a))},v=function(){m=null!=navigator.userAgent.match(/iPhone/i)||null!=navigator.userAgent.match(/iPod/i)?"iPhone":null!=navigator.userAgent.match(/iPad/i)?"iPad":null!=navigator.userAgent.match("Trident/7.0")?"IE11+":
"browser"},n=function(){v();$("#absoluteCloseButton").removeClass("closeButton").text("").click(bounceAnd(function(){}));$("#applicationMenuButton").show();d=q;try{"Conversations"in window&&"jid"in Conversations.getCurrentConversation()&&("UserSettings"in window&&UserSettings.getIsInteractive()?(DeviceConfiguration.setHeader(!0),DeviceConfiguration.setTools(!0),DeviceConfiguration.setSlides(!0),DeviceConfiguration.setFooter(!0)):(DeviceConfiguration.setHeader(!1),DeviceConfiguration.setTools(!1),
DeviceConfiguration.setSlides(!1),DeviceConfiguration.setFooter(!1)))}catch(b){console.log("error while trying to fix the layout:",b)}zoomToPage(!0);d()},G=function(){Conversations.enableSyncMove();UserSettings.setIsInteractive(!1);m="projector";h("tools",!1);h("slides",!1);h("header",!1);h("footer",!1);d=F;zoomToFit(!0);$("#absoluteCloseButton").addClass("closeButton").text("X").click(bounceAnd(function(){UserSettings.setIsInteractive(!0);n()}));$("#applicationMenuButton").hide();Modes.none.activate();
d()},B=function(){var b=screen.width,a=screen.height,e;"orientation"in window?(e=window.orientation,e=90==e||-90==e):e=window.innerWidth>window.innerHeight;"landscape"==(e?"landscape":"portrait")&&b<a&&(b=screen.height,a=screen.width);e=window.innerWidth;var c=window.innerHeight;if(!e||!c||e>b||c>a||980==e)e=window.outerWidth,c=window.outerHeight;if(!e||!c||e>b||c>a)e=screen.availWidth,c=screen.availHeight;return{width:e,height:c}},q=function(){C(k.header,k.tools,k.slides,k.keyboard)},d=q,F=function(){C(!1,
!1,!1,!1)},f=function(b){b=parseInt(b.split("px")[0]);return isNaN(b)?0:b},x=function(b){return{x:_.sum(_.map(b,function(a){var b=f(a.css("margin-left"))+f(a.css("padding-left"))+f(a.css("border"));a=f(a.css("margin-right"))+f(a.css("padding-right"))+f(a.css("border"));return b+a})),y:_.sum(_.map(b,function(a){var b=f(a.css("margin-top"))+f(a.css("padding-top"))+f(a.css("border"));a=f(a.css("margin-bottom"))+f(a.css("padding-bottom"))+f(a.css("border"));return b+a}))}},r={},c=function(b){if(!(b in
r)){var a=$(b);a&&a.length&&(r[b]=a);return a}return r[b]},C=function(b,a,e,d){if("undefined"!=typeof boardContext){var h=k.header,l=k.tools,g=k.slides;b=k.keyboard;var f=k.footer;a=c("#toolsColumn");var m=c("#ribbon").find(".toolbar"),n=c(".modeSpecificTool"),p=c("#masterLayout"),t=c("#applicationMenu");c("#boardContainer");e=c("#boardColumn");d=c("#thumbsColumn");c("#slideContainer");c("#thumbScrollContainer");var u=$(".thumbnail"),v=c("#slideControls"),q=c("#masterFooter"),w=B(),r=w.width,w=w.height;
1==h?t.show():t.hide();1==l?(m.show(),n.show(),a.show()):(n.hide(),m.hide(),a.hide());1==g?(d.show(),v.show()):(d.hide(),v.hide());1==f?q.show():q.hide();n=c("#boardContainer");h=c("#board");m=c("#masterHeader");f=m.height();u.attr("width",sprintf("%spx",c("#thumbColumnWidth").val()));u.attr("height",sprintf("%spx",g?DeviceConfiguration.preferredSizes.thumbColumn.height:0));n.width();n.height();p=p.css("flex-direction");"row"==p?(l=r-(l?a.width():0)-(g?d.width():0)-x([a,d,e]).x-2,g=w-x([m,e]).y-10):
(l=c("#masterLayout").width()-x([e]).x,g=l-10,b&&(g=g-l+3*(DeviceConfiguration.preferredSizes.handles+2)));if(0>g||0>l)throw{message:"retrying because of negativeValues",bheight:g,bwidth:l,width:r,height:w,marginsForBoard:x([e]),flexDirection:p};l=Math.round(l);g=Math.round(g);c("#selectionAdorner");c("#radar");c("#marquee");c("#textAdorner");c("#imageAdorner");q.width(r-d.width()-a.width()-20).css({"margin-left":sprintf("%spx",a.width()+9)});h.width(l);h.height(g);a.height(g-f).css({"margin-top":sprintf("%spx",
f+2)});d.height(g-f).css({"margin-top":sprintf("%spx",f)});e.height(g);boardContext.canvas.width=l;boardContext.canvas.height=g;boardContext.width=l;boardContext.height=g;boardWidth=l;boardHeight=g;IncludeView["default"]();blit();window.scrollTo(1,1);window.scrollTo(0,0)}},y=function(){d&&d()},z=!1;Progress.onLayoutUpdated.DeviceConfiguration=y;Progress.historyReceived.DeviceConfiguration_showChrome=function(){try{"UserSettings"in window&&UserSettings.getIsInteractive()?(DeviceConfiguration.setSlides(!0),
DeviceConfiguration.setTools(!0),!z&&"Modes"in window&&(Modes.select.activate(),"iPad"==DeviceConfiguration.getCurrentDevice()&&$("#panMode").remove())):(DeviceConfiguration.setSlides(!1),DeviceConfiguration.setTools(!1),z||Modes.none.activate()),z=!0}catch(b){console.log("Progress.historyReceived.DeviceConfiguration_showChrome",b)}v();A();d&&d()};$(function(){var b=$(window);if(window.orientation)b.on("orientationchange",y);b.resize(y);$("#toolsToggleButton").on("click",bounceAnd(function(){h("tools",
!k.tools);var a=$("#slidesToggleButton");k.slides?a.removeClass("disabledButton"):a.addClass("disabledButton");d&&d()}));$("#slidesToggleButton").on("click",bounceAnd(function(){h("slides",!k.slides);var a=$("#toolsToggleButton");k.tools?a.removeClass("disabledButton"):a.addClass("disabledButton");d&&d()}));$("#thumbColumnWidth").val(DeviceConfiguration.preferredSizes.thumbColumn.width).on("input change",function(){var a=c("#thumbColumnWidth").val();$(".thumbnail:not(.groupSlide)").width(a).height(.75*
a);d();Conversations.refreshSlideDisplay()})});var A=function(){switch(m){case "browser":n();break;case "projector":void 0!=ContentFilter&&"setFilter"in ContentFilter&&ContentFilter.setFilter("myPrivate",!1);G();break;case "iPhone":n();break;case "iPad":n();break;default:n()}},t=function(){d||(d=q)},u=function(b){return function(){h(b,!k[b]);t()}},p=function(b){return function(a){h(b,a);t()}};return{getCurrentDevice:function(){return m},setCurrentDevice:function(b){m=b;A()},applyFit:function(){t();
d()},tempFit:function(b,a,c,f){h("header",b);h("tools",a);h("slides",c);h("footer",f);t();d()},setHeader:p("header"),setTools:p("tools"),setFooter:p("footer"),setSlides:p("slides"),setKeyboard:function(b){var a=!b;p("keyboard")(b);DeviceConfiguration.applyFit();$("#masterHeader").toggle(a);$(".permission-states").toggle(a);$("#majorModesColumn").toggle(a)},toggleHeader:u("header"),toggleTools:u("tools"),toggleFooter:u("footer"),toggleSlides:u("slides"),getIdentity:function(){return D},resetCurrentDevice:function(){v();
A()},hasOnScreenKeyboard:function(){return 640>=B().width||"iPad"==m},preferredSizes:{handles:50,thumbColumn:{width:100,height:75},toolsColumn:100,keyboard:{iphone:236,ipad:352}}}}();
