// EdgeCommons v1.1.0 +++ Visit edgecommons.org for documentation, updates and examples +++ Copyright (c) 2013 by Simon Widjaja +++ Distributed under the terms of the MIT license (http://www.opensource.org/licenses/mit-license.html) +++ This notice shall be included in all copies or substantial portions of the Software.
// Input 0
(function(a,b){var f=function(){};f.VERSION="0.0.2";f.$=b;a.Modulog=f})(window,jQuery);
(function(){var a=function(){};a.VERSION="0.0.2";a.LEVEL_NONE=0;a.LEVEL_ERROR=1;a.LEVEL_WARN=2;a.LEVEL_INFO=3;a.LEVEL_DEBUG=4;a.level=a.LEVEL_DEBUG;var b=null;a.addLogTarget=function(a){"function"===typeof a&&(b=a)};a.debug=function(a,c,d){ModulogLog.level>=ModulogLog.LEVEL_DEBUG&&(a="[ DEBUG "+(c?"| "+c+" ":"")+"] "+a,"undefined"!=typeof console&&"undefined"!=typeof console.debug?d?console.debug(a,d):console.debug(a):"undefined"!=typeof console&&"undefined"!=typeof console.info&&(d?console.info(a,
d):console.info(a)),ModulogLog.__delegate(a,d))};a.info=function(a,c,d){ModulogLog.level>=ModulogLog.LEVEL_INFO&&(a="[ INFO "+(c?"| "+c+" ":"")+"] "+a,"undefined"!=typeof console&&"undefined"!=typeof console.info&&(d?console.info(a,d):console.info(a)),ModulogLog.__delegate(a,d))};a.warn=function(a,c,d){ModulogLog.level>=ModulogLog.LEVEL_WARN&&(a="[ WARN "+(c?"| "+c+" ":"")+"] "+a,"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(d?console.warn(a,d):console.warn(a)),ModulogLog.__delegate(a,
d))};a.error=function(a,c,d){ModulogLog.level>=ModulogLog.LEVEL_ERROR&&(a="[ ERROR "+(c?"| "+c+" ":"")+"] "+a,"undefined"!=typeof console&&"undefined"!=typeof console.error&&(d?console.error(a,d):console.error(a)),ModulogLog.__delegate(a,d))};a.__delegate=function(a,c){b&&(c?b(a+" : "+c.toString()):b(a))};window.Log=window.MLog=window.ModulogLog=a})(window.Modulog);
(function(a){var b=function(){};b.VERSION="0.0.1";var f=a.$,c=null,d=ModulogLog;b.get=function(a){for(var d=a.split("."),b=c,g=0;g<d.length;g++){var h=d[g];b.hasOwnProperty(h)||ModulogLog.warn("Config value not found: "+a,"CONFIG");b=b[h]}return b};b.set=function(a,d){for(var b=a.split("."),g=c,h=0;h<b.length-1;h++)g=g[b[h]];g[b.pop()]=d};b.init=function(a,b){"string"===typeof a&&jQuery?f.getJSON(a,function(a){c=a;"function"===typeof b&&b()}):"object"===typeof a?c=a:d.error("Could not init config. init() function expects config object or url to config.js. Latter needs jQuery to be initialized before.",
"Modulog | ModulogConfig")};window.Config=window.MConfig=window.ModulogConfig=b})(window.Modulog);
// Input 1
(function(a,b){var f=function(){};f.VERSION="1.1.0";f.$=b;a.EC=a.EdgeCommons=f})(window,jQuery);
// Input 2
(function(a){var b=function(){};b.VERSION="1.1.0";var f=a.$,c=ModulogLog,d=null,m=null,k=null,l=null;a.getSymbolName=function(a,h){var c=a.getVariable("symbolSelector");if(!h){var b=a.getParentSymbol();b&&(c=c.replace(b.getVariable("symbolSelector")+"_",""))}return c=c.replace("#","")};a.getInjectedData=function(a,b){try{b=b||"data";for((!a||!a.getParentSymbol)&&c.error("getInjectedData(): First argument 'sys' is not optional","EdgeCommons | Core");a.getParentSymbol();)a=a.getParentSymbol();var d=
a.getSymbolElement().find("."+b).html();return f.parseJSON(d)}catch(j){c.error("Reading injected data failed (scriptClassSelector="+b+")","EdgeCommons | Core",j)}};a.setAdaptiveLayouts=function(g,b,i,j){!g||!g.length?c.error("Error in setAdaptiveLayouts(). Argument 'layouts' is not optional and has to be an array.","EdgeCommons | Core"):(d=g,b&&("function"==typeof j&&(l=j),f(window).resize(function(){a.applyAdaptiveLayout(b,i)}),a.applyAdaptiveLayout(b,i)))};a.applyAdaptiveLayout=function(a,b){try{a.setVariable("doResizing",
function(){var c=a.getComposition().getStage().getSymbolElement().width(),e=a.$(b),i=null;f.each(d,function(a,g){c>=g-0&&(i=g)});m!=i&&(k&&k.deleteSymbol(),e.html(""),e=a.createChildSymbol("layout"+i,b),m=i,k=e,"function"==typeof l&&l(i,e));a.$("currentLayout").html(a.getVariable("layout"))}),a.getVariable("doResizing")()}catch(c){console.error(c)}};a.centerStage=function(a){a?a.getComposition().getStage().getSymbolElement().css("margin","0px auto"):c.error("Error in centerStage(). Argument 'sym' is not optional.",
"EdgeCommons | Core")};a.loadComposition=function(g,b){if(!g||!b)c.error("Error in loadComposition(). Arguments 'src' and 'sym' are not optional.","EdgeCommons | Core");else{try{var d;d=b instanceof AdobeEdge.Symbol?b.getSymbolElement():b;var j="ec_"+Math.random().toString(36).substring(7);d.html('<iframe id="'+j+'" src="'+g+'" style="overflow: hidden; width: 100%; height: 100%; margin: auto; border: 0 none; background-color: rgba(255,255,255,0)"></iframe>');var e=new jQuery.Deferred,f=jQuery("#"+
j),k=f[0].contentWindow;f.load(function(){k.AdobeEdge.bootstrapCallback(function(a){a=k.AdobeEdge.getComposition(a);e.resolve(a,j,k.AdobeEdge)})})}catch(l){a.error("Error in loadComposition: ","EdgeCommons | Core",l.toString())}return e}};a.makeStaticButton=function(b,c,d,f){var e=b.$("hotspot"),e=e[0]?e:b.getSymbolElement();c&&b.$("label").html(c);d&&b.$("icon").css("background-image","url("+d+")");e.css("cursor","pointer");a.isMobile()||(e.on("mouseenter",function(){b.stop("over")}),e.on("mouseleave",
function(){b.stop("normal")}),e.on("mousedown",function(){b.stop("down")}),e.on("mouseup",function(){b.stop("over")}));e.on(a.CLICK_OR_TOUCH,function(){typeof f==="function"&&f()})};a.makeAnimatedButton=function(b,c,d,f){var e=b.$("hotspot"),e=e[0]?e:b.getSymbolElement();c&&b.$("label").html(c);d&&b.$("icon").css("background-image","url("+d+")");e.css("cursor","pointer");a.isMobile()?(b.setVariable("animatedButtonState","inactive"),e.on("touchstart",function(){"inactive"!==b.getVariable("animatedButtonState")?
("function"===typeof f&&f(),b.setVariable("animatedButtonState","inactive"),b.playReverse()):(b.play(),b.setVariable("animatedButtonState","active"),setTimeout(function(){0<b.getPosition()&&b.playReverse();b.setVariable("animatedButtonState","inactive")},2E3))})):(e.on("mouseenter",function(){b.play()}),e.on("mouseleave",function(){b.playReverse()}),e.on("click",function(){"function"===typeof f&&f()}))};a.isMobile=function(){return navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/iPhone|iPad|iPod/i)||
navigator.userAgent.match(/Opera Mini/i)||navigator.userAgent.match(/IEMobile/i)};a.CLICK_OR_TOUCH=a.isMobile()?"touchstart":"click";a.readGetParam=function(a){return(a=RegExp("[\\?&]"+a+"=([^&#]*)").exec(window.location.href))?decodeURIComponent(a[1]||0):null};a.Core=b;a.Log=c;a.debug=c.debug;a.info=c.info;a.warn=c.warn;a.error=c.error;a.Config=MConfig})(EdgeCommons);
