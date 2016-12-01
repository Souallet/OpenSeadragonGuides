!function(e){function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}var t={};return i.m=e,i.c=t,i.i=function(e){return e},i.d=function(e,i,t){Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:t})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},i.p="/dist/",i(i.s=3)}([function(e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});i.$=OpenSeadragon,i.DIRECTION_HORIZONTAL=Symbol("horizontal"),i.DIRECTION_VERTICAL=Symbol("vertical")},function(e,i,t){"use strict";function r(e,i,t,r){var n=r===a.DIRECTION_HORIZONTAL?"horizontal":"vertical",d=s(),u=d.find(function(i){return i.id===e});u?(u.x=i,u.y=t):d.push({id:e,x:i,y:t,direction:n}),o(d)}function n(e){var i=s();o(i.filter(function(i){return i.id!==e}))}function s(){var e=window.sessionStorage.getItem(u);return e?JSON.parse(e):[]}function o(e){window.sessionStorage.setItem(u,JSON.stringify(e))}Object.defineProperty(i,"__esModule",{value:!0});var a=t(0),d=!1,u="openseadragon-guides";i.default={addGuide:r,deleteGuide:n,getGuides:s,useStorage:d}},function(e,i,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function s(e,i){var t=document.createElement("div");switch(t.id="osd-guide-"+i,t.classList.add("osd-guide"),e){case a.DIRECTION_HORIZONTAL:t.classList.add("osd-guide-horizontal");break;case a.DIRECTION_VERTICAL:t.classList.add("osd-guide-vertical");break;default:throw new Error("Invalid guide direction")}return t}Object.defineProperty(i,"__esModule",{value:!0}),i.Guide=void 0;var o=function(){function e(e,i){for(var t=0;t<i.length;t++){var r=i[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(i,t,r){return t&&e(i.prototype,t),r&&e(i,r),i}}(),a=t(0),d=t(1),u=r(d);i.Guide=function(){function e(i){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.DIRECTION_HORIZONTAL,r=arguments[2],o=arguments[3],d=arguments[4];n(this,e),this.viewer=i,this.direction=t,this.id=r?r:Date.now(),this.point=this.viewer.viewport.getCenter(),this.point.x=o?o:this.point.x,this.point.y=d?d:this.point.y,this.elem=s(this.direction,this.id),this.overlay=new a.$.Overlay(this.elem,this.point),this.draw(),this.saveInStorage(),this.addHandlers()}return o(e,[{key:"addHandlers",value:function(){this.tracker=new a.$.MouseTracker({element:this.elem,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,dragHandler:this.dragHandler.bind(this),dragEndHandler:this.dragEndHandler.bind(this),dblClickHandler:this.remove.bind(this)}),this.viewer.addHandler("open",this.draw.bind(this)),this.viewer.addHandler("animation",this.draw.bind(this)),this.viewer.addHandler("resize",this.draw.bind(this)),this.viewer.addHandler("rotate",this.draw.bind(this))}},{key:"dragHandler",value:function(e){var i=this.viewer.viewport.deltaPointsFromPixels(e.delta,!0);switch(this.direction){case a.DIRECTION_HORIZONTAL:this.point.y+=i.y;break;case a.DIRECTION_VERTICAL:this.point.x+=i.x}this.elem.classList.add("osd-guide-drag"),this.draw()}},{key:"dragEndHandler",value:function(){this.elem.classList.remove("osd-guide-drag"),this.saveInStorage()}},{key:"draw",value:function(){return this.point&&(this.overlay.update(this.point),this.overlay.drawHTML(this.viewer.drawer.container,this.viewer.viewport)),this}},{key:"remove",value:function(){return this.viewer.removeHandler("open",this.draw.bind(this)),this.viewer.removeHandler("animation",this.draw.bind(this)),this.viewer.removeHandler("resize",this.draw.bind(this)),this.viewer.removeHandler("rotate",this.draw.bind(this)),this.overlay.destroy(),this.point=null,u.default.deleteGuide(this.id),this}},{key:"saveInStorage",value:function(){u.default.useStorage&&u.default.addGuide(this.id,this.point.x,this.point.y,this.direction)}}]),e}()},function(e,i,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var n=t(2),s=t(0),o=t(1),a=r(o);if(!s.$.version||s.$.version.major<2)throw new Error("This version of OpenSeadragon Guides requires OpenSeadragon version 2.0.0+");s.$.Viewer.prototype.guides=function(e){return this.guidesInstance&&!e||(e=e||{},e.viewer=this,this.guidesInstance=new s.$.Guides(e)),this.guidesInstance},s.$.Guides=function(e){var i=this;s.$.extend(!0,this,{viewer:null,guides:[],horizontalGuideButton:null,verticalGuideButton:null,prefixUrl:null,removeOnClose:!1,useSessionStorage:!1,navImages:{guideHorizontal:{REST:"guidehorizontal_rest.png",GROUP:"guidehorizontal_grouphover.png",HOVER:"guidehorizontal_hover.png",DOWN:"guidehorizontal_pressed.png"},guideVertical:{REST:"guidevertical_rest.png",GROUP:"guidevertical_grouphover.png",HOVER:"guidevertical_hover.png",DOWN:"guidevertical_pressed.png"}}},e),s.$.extend(!0,this.navImages,this.viewer.navImages);var t=this.prefixUrl||this.viewer.prefixUrl||"",r=this.viewer.buttons&&this.viewer.buttons.buttons,o=r?this.viewer.buttons.buttons[0]:null,d=o?o.onFocus:null,u=o?o.onBlur:null;if(this.horizontalGuideButton=new s.$.Button({element:this.horizontalGuideButton?s.$.getElement(this.horizontalGuideButton):null,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,tooltip:s.$.getString("Tooltips.HorizontalGuide")||"Horizontal guide",srcRest:t+this.navImages.guideHorizontal.REST,srcGroup:t+this.navImages.guideHorizontal.GROUP,srcHover:t+this.navImages.guideHorizontal.HOVER,srcDown:t+this.navImages.guideHorizontal.DOWN,onRelease:this.createHorizontalGuide.bind(this),onFocus:d,onBlur:u}),this.verticalGuideButton=new s.$.Button({element:this.verticalGuideButton?s.$.getElement(this.verticalGuideButton):null,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,tooltip:s.$.getString("Tooltips.VerticalGuide")||"vertical guide",srcRest:t+this.navImages.guideVertical.REST,srcGroup:t+this.navImages.guideVertical.GROUP,srcHover:t+this.navImages.guideVertical.HOVER,srcDown:t+this.navImages.guideVertical.DOWN,onRelease:this.createVerticalGuide.bind(this),onFocus:d,onBlur:u}),r&&(this.viewer.buttons.buttons.push(this.horizontalGuideButton),this.viewer.buttons.element.appendChild(this.horizontalGuideButton.element),this.viewer.buttons.buttons.push(this.verticalGuideButton),this.viewer.buttons.element.appendChild(this.verticalGuideButton.element)),a.default.useStorage=this.useSessionStorage,a.default.useStorage){var l=a.default.getGuides();l.forEach(function(e){i.guides.push(new n.Guide(i.viewer,"horizontal"===e.direction?s.DIRECTION_HORIZONTAL:s.DIRECTION_VERTICAL,e.id,e.x,e.y))})}this.removeOnClose&&this.viewer.addHandler("close",function(){i.guides.forEach(function(e){return e.remove()}),i.guides=[]})},s.$.extend(s.$.Guides.prototype,{createHorizontalGuide:function(){this.guides.push(new n.Guide(this.viewer,s.DIRECTION_HORIZONTAL))},createVerticalGuide:function(){this.guides.push(new n.Guide(this.viewer,s.DIRECTION_VERTICAL))}})}]);
//# sourceMappingURL=openseadragon-guides.js.map