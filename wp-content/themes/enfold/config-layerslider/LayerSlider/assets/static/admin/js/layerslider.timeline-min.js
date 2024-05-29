!function($){window._layerSlider.plugins.timeline=function(e,i,t,n){var l=this,s={sliderFadeInDuration:0};l.pluginData={name:"Timeline Add-On for LayerSlider Editor",version:"1.1",requiredLSVersion:"7.9.7",authorName:"Kreatura",releaseDate:"2024. 01. 12."},l.pluginDefaults={showCurrentTime:!0,showLayersInfo:!1,showLayersProperties:!1,pixelsPerSeconds:150,overscrollX:200,overscrollY:40,layersListWidth:e.o.livePreview?0:200},l.init=function(){e.o.livePreview&&$.extend(e.o,s),l.applySettings(),l.createSliderEvents()},l.applySettings=function(){l.settings=$.extend(!0,{},l.pluginDefaults,n)},l.getSliderData=function(e){l.slideDurationSetByUser=e.slideTimelineDuration,l.slideTimelineTotalDuration=Math.min(Math.max(l.slideDurationSetByUser,e.slideTimeline.duration()),100)},l.round=function(e,i){return i=i?i*=10:1e3,Math.round(e*i)/i},l.createSliderEvents=function(){i.on("sliderDidLoad.layerSlider",(function(){})).on("slideTimelineDidCreate.layerSlider",(function(e,i){l.getSliderData(i),l.createMarkup(i),l.createEvents(),l.createTransition(),l.fixHorizontalScroll(),lsEditor.loading.hide(),$(window).on("resize."+t,(function(e){l.fixHorizontalScroll()}))})).on("slideTimelineDidStart.layerSlider",(function(){e.o.livePreview?(e.transitions._slideTimeline.paused(!0),e.transitions._slideTimeline.progress(parseFloat(e.o.livePreview)/l.slideTimelineTotalDuration)):(e.transitions._slideTimeline.paused(!0),e.transitions._slideTimeline.progress(lsEditor.preview.defaults.livePosition))})).on("slideTimelineDidUpdate.layerSlider",(function(e,i){let t;t=parseInt(l.slideTimelineTotalDuration*i.progress()*1e3)/1e3,l.$curTime.attr("data-current-time",t.toFixed(3)+"s"),lsEditor.preview.livePosition=t.toFixed(3),t>l.slideDurationSetByUser?l.$curTime.addClass("lse-over-slide-duration"):l.$curTime.removeClass("lse-over-slide-duration")})).on("sliderDidDestroy.layerSlider",(function(){l.api.destroy()}))},l.createEvents=function(){l.$dragStopElements=$(document),l.$curTime.on("mousedown."+t+" touchstart."+t,(function(e){$("body").prop("unselectable",!0).addClass("lse-unselectable"),l.setDragOffset(),$(document).on("mousemove."+t,(function(e){l.drag(e)})),l.drag(e)})),l.$curTime.on("touchmove."+t,(function(e){l.drag(e)})),l.$curTime.on("touchend."+t,(function(){l.dragStop()})),$(document).on("mouseup."+t,(function(){l.dragStop()})),$lsEtimeline.on("mouseleave."+t,(function(){l.dragStop()})),l.$ruler.on("mousedown."+t,(function(e){l.$curTime.trigger("mousedown"),l.drag(e)})),l.$totalTimeline.on("mousedown."+t,(function(e){l.$curTime.trigger("mousedown"),l.drag(e)})),l.$scrollWrapper.on("mouseenter."+t,(function(){$(this).on("scroll."+t,(function(i){e(i)}))})),l.$scrollWrapper.on("mouseleave."+t,(function(){$(this).off("scroll."+t)})),l.$layersList.on("mouseenter."+t,(function(){$(this).on("scroll."+t,(function(e){i(e)}))})),l.$layersList.on("mouseleave."+t,(function(){$(this).off("scroll."+t)})),l.setDragOffset=function(){l.dragOffset=l.$totalTimeline.offset().left},$(window).on("resize."+t,(function(){l.setDragOffset()}));let e=function(e){l.$layersList.scrollTop(e.target.scrollTop)},i=function(e){l.$scrollWrapper.scrollTop(e.target.scrollTop)}},l.drag=function(i){l.currentTimeX=(i.pageX?i.pageX:e.device.touchX||0)-l.dragOffset,l.currentTimeX<0&&(l.currentTimeX=0),l.currentTimeX>l.totalTimelineWidth&&(l.totalTimelineWidth-l.currentTimeX>100&&l.dragStop(),l.currentTimeX=l.totalTimelineWidth),l.$curTime.css({transform:"translateX("+l.currentTimeX+"px)"}),e.transitions._slideTimeline&&e.transitions._slideTimeline.progress(l.currentTimeX/l.totalTimelineWidth||lsEditor.preview.defaults.livePosition)},l.dragStop=function(){$(document).off("mousemove."+t),$("body").prop("unselectable",!1).removeClass("lse-unselectable")},l.fixHorizontalScroll=function(){l.$scrollWrapper.width()>l.totalTimelineWidth+l.settings.overscrollX?l.$scrollWrapper.addClass("lse-hidden-x"):l.$scrollWrapper.removeClass("lse-hidden-x")},l.createMarkup=function(t){l.$wrapper=$('[data-timeline-for="'+i.attr("id")+'"]'),l.$fullTimeline=$("#lse-full-timeline"),l.totalTimelineWidth=l.slideTimelineTotalDuration*l.settings.pixelsPerSeconds,l.$totalTimeline=$("#lse-total-timeline").width(l.totalTimelineWidth+l.settings.overscrollX),l.slideTimelineWidth=l.slideDurationSetByUser*l.settings.pixelsPerSeconds,l.$slideTimeline=$("#lse-slide-timeline").width(l.slideTimelineWidth),l.$ruler=$("#lse-timeline-ruler-wrapper"),l.$scrollWrapper=$("#lse-timeline-scroll-wrapper"),l.$curTime=$("#lse-current-time"),l.$layersList=$("#lse-timeline-layers-list").css("width",l.settings.layersListWidth),l.$layersListItems=$("#lse-timeline-layers-list-items"),l.$ruler[0].style.setProperty("--totaltimelinewidth",l.totalTimelineWidth+l.settings.overscrollX+"px"),l.$scrollWrapper[0].style.setProperty("--layerslistwidth",l.settings.layersListWidth+"px"),l.$originalLayersList=$("#lse-layers-list lse-li:not(.lse-dim)"),l.$originalLayersList=l.$originalLayersList.filter((function(e,i){return!$(i).find(".lse-hide-layer.lse-hidden").length}));let n=t.layersOnSlideTimeline.filter(":not( .ls-bg )"),s=n.length;for(let i=0;i<s;i++){let t=n.eq(i),s=t.data(e.defaults.init.dataKey),o=l.settings.pixelsPerSeconds,a=$(l.$originalLayersList[i]).find(".lse-layer-thumb-wrapper").clone().add($("<lse-text>").text($(l.$originalLayersList[i]).find("input").val()));if($layerTweens=$("<div>").addClass("lse-layer-tweens").data("lsTweensOfLayer",t).prependTo(l.$totalTimeline),t=$("<div>").addClass("lse-timeline-layer").html(a).appendTo(l.$layersListItems),$layerTweensInner=$("<div>").addClass("lse-layer-tweens-inner").appendTo($layerTweens),s.is.static&&e.slides.next.index!==s.settings.slideIn||($("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-transition-in").css({left:l.round(s.timeline.transitioninstart)*o+"px",width:l.round(s.timeline.transitioninend-s.timeline.transitioninstart)*o+"px"}),s.timeline.transitioninstart>0&&$("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-delay-in").css({left:0,width:l.round(s.timeline.transitioninstart)*o+"px"})),$("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-text-in").css({left:l.round(s.timeline.textinstart)*o+"px",width:l.round(s.timeline.textinend-s.timeline.textinstart)*o+"px"}),loopEnd=-1===s.loop.count?l.slideTimelineTotalDuration:s.timeline.loopend,$("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-loop").css({left:l.round(s.timeline.loopstart)*o+"px",width:l.round(loopEnd-s.timeline.loopstart)*o+"px"}),$("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-text-out").css({left:l.round(1e3*s.timeline.textoutstart)/1e3*o+"px",width:l.round(1e3*(s.timeline.textoutend-s.timeline.textoutstart))/1e3*o+"px"}),e.slides.next.index===s.settings.slideOut&&$("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-transition-out").css({left:l.round(s.timeline.transitionoutstart)*o+"px",width:l.round(s.timeline.transitionoutend-s.timeline.transitionoutstart)*o+"px"}),s.is.static)if(e.slides.next.index===s.settings.slideOut){var r="slidechangeonly"===s.out.startAt?"static":"showuntil";$("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-"+r).css({left:0,width:"100%"===s.timeline.staticto?s.timeline.staticto:l.round(s.timeline.transitionoutstart)*o+"px"})}else $("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-static").css({left:l.round(s.timeline.staticfrom)*o+"px",width:l.totalTimelineWidth-l.round(s.timeline.staticfrom)*o+"px"});else $("<div>").appendTo($layerTweensInner).addClass("lse-layer-tween lse-layer-showuntil").css({left:l.round(s.timeline.transitioninend)*o+"px",width:l.round(s.timeline.transitionoutstart-s.timeline.transitioninend)*o+"px"})}},l.createTransition=function(){l.transition=new e.gsap.TimelineMax({paused:!0}),l.transition.add(e.gsap.TweenMax.fromTo(l.$curTime[0],l.slideTimelineTotalDuration,{autoCSS:!1,css:{x:0}},{autoCSS:!1,css:{},ease:e.gsap.Linear.easeNone,onComplete:function(e){e.target.x=l.totalTimelineWidth},onCompleteParams:["{self}"],onUpdate:function(e){e.target.x=l.totalTimelineWidth*e.progress()},onUpdateParams:["{self}"]}),0)},l.api={destroy:function(){$(window).add("body").add(document).add(i).add(i.find("*")).add(l.$wrapper).add(l.$wrapper.find("*")).off("."+t),l.$totalTimeline.empty(),l.$layersListItems.empty()}}}}(jQuery);