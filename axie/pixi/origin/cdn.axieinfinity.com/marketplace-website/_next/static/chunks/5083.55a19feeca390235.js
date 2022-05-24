(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5083],{69877:function(a){var b=Math.floor,c=Math.random;a.exports=function(a,d){return a+b(c()*(d-a+1))}},83608:function(b,c,a){var d=a(69877),e=a(16612),f=a(18601),g=parseFloat,h=Math.min,i=Math.random;b.exports=function(b,a,c){if(c&&"boolean"!=typeof c&&e(b,a,c)&&(a=c=void 0),void 0===c&&("boolean"==typeof a?(c=a,a=void 0):"boolean"==typeof b&&(c=b,b=void 0)),void 0===b&&void 0===a?(b=0,a=1):(b=f(b),void 0===a?(a=b,b=0):a=f(a)),b>a){var k=b;b=a,a=k}if(c||b%1||a%1){var j=i();return h(b+j*(a-b+g("1e-"+((j+"").length-1))),a)}return d(b,a)}},83838:function(d,b,a){"use strict";a.r(b),a.d(b,{AxieFigure:function(){return l}});var e=a(85893);a(58687),a(80356);var f=a(78297),c=a(83608),g=a.n(c),h=a(67294),i=a(98063),j="action/idle/normal",k=["action/idle/random-01","action/idle/random-02","action/idle/random-03","action/idle/random-04","action/idle/random-05",];PIXI.settings.PRECISION_FRAGMENT=PIXI.PRECISION.HIGH;var l=function(a){var c=a.resource,b=(0,h.useState)(),d=b[0],m=b[1],l=(0,h.useRef)(null),n=(0,h.useRef)(null),o=(0,h.useRef)(),p=function(b){var a,e=.5>g()(0,1,!0);if(!o.current||o.current.isComplete())if(e||(null===(a=o.current)||void 0===a?void 0:a.animation.name)!==j){var c=b.state.setAnimation(0,j,!1);o.current=c,c.onComplete=function(){p(b)}}else{var d=b.state.setAnimation(0,k[g()(0,k.length-1,!1)],!1);o.current=d,d.onComplete=function(){p(b)}}};return(0,h.useEffect)(function(){if(l&&l.current){var h,d=l.current;d.childElementCount>0&&(null===(h=d.lastChild)||void 0===h||h.remove()),m(!0);var k=d.offsetWidth,o=d.offsetHeight,b=new PIXI.Application({transparent:!0,resolution:window.devicePixelRatio,autoStart:!0,width:k,height:o});b.stage.interactive=!1,b.view.style.width="".concat(k,"px"),b.renderer.view.style.touchAction="auto",b.renderer.plugins.interaction.autoPreventDefault=!1,b.view.style.height="".concat(o,"px");var g=new PIXI.loaders.Loader,s={},q=c.json.skins[0].attachments;for(var t in q){var r=q[t];for(var u in r){var e=r[u].path,i=void 0;i=f.VARIANT_LIST.includes(e)?"https://axiecdn.axieinfinity.com/mixer-stuffs/v1/".concat(e.replace(".","/"),"/").concat(a.variant,".png"):"https://axiecdn.axieinfinity.com/mixer-stuffs/v1/".concat(e.replace(".","/"),".png"),s[e]=PIXI.Texture.from(i);try{g.add(e,i)}catch(v){console.log("AxieFigure_SkinAttachments",v)}}}

return g.add("floor","/static/image/floor.png").on("complete",function(){if(b){var c,d=g.resources.floor.texture,a=new PIXI.Sprite(d);a.width=320,a.height=200,a.pivot.set(.5),a.position.set(k/2-160,o-230),a.name="floor",null==b||null===(c=b.stage)||void 0===c||c.addChild(a)}}),g.load(),g.once("complete",function(){var d,e=new PIXI.spine.core.TextureAtlas;e.addTextureHash(s,!1);var f=new PIXI.spine.core.AtlasAttachmentLoader(e),g=new PIXI.spine.core.SkeletonJson(f),h=g.readSkeletonData(c.json),a=new PIXI.spine.Spine(h);a.name="axie",a.position.set(k/2,o-130),a.scale.set(.3),a.pivot.set(-21,0),a.state.setAnimation(0,j,!1).onComplete=function(){
/*
    let cs = document.getElementsByTagName("canvas");
    let canvas = cs[0];
    let div = document.createElement("div");
    let sp = document.createElement("span");
    let animationList = document.createElement("select");
    let spineData = a.stateData.skeletonData;
    for (let i = 0; i < spineData.animations.length; i++) {
        let name = spineData.animations[i].name;
        let option = document.createElement("option");
        option.setAttribute("value", name);
        option.append(document.createTextNode(name));
        if (i == 0) option.setAttribute("selected", "selected");
        animationList.append(option);
    }

    animationList.onchange = function(e) {
        var animationName = e.target.value;
        a.state.setAnimation(0, animationName, true);
    }
    animationList.style.backgroundColor = "var(--color-gray-6)";
    sp.appendChild(animationList);
    div.appendChild(sp);
    canvas.parentNode.parentNode.prepend(div);
    */
    p(a);
},null==b||null===(d=b.stage)||void 0===d||d.addChild(a)}),b.start(),d.appendChild(b.view),m(!1),function(){n.current&&clearInterval(n.current),b&&b.destroy()}}},[a.variant,c]),(0,e.jsx)("div",{ref:l,className:"flex items-center justify-center",style:a.style,children:d&&(0,e.jsx)(i.L,{})})}},58:function(){},82639:function(){},43953:function(){},34383:function(){},60611:function(){},57237:function(){},69046:function(){},22458:function(){},57823:function(){},25109:function(){}}])