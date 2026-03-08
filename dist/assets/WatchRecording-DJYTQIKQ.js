var Qo=Object.defineProperty;var Br=t=>{throw TypeError(t)};var zo=(t,e,i)=>e in t?Qo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var ft=(t,e,i)=>zo(t,typeof e!="symbol"?e+"":e,i),es=(t,e,i)=>e.has(t)||Br("Cannot "+i);var j=(t,e,i)=>(es(t,e,"read from private field"),i?i.call(t):e.get(t)),Ee=(t,e,i)=>e.has(t)?Br("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),G=(t,e,i,a)=>(es(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Fr=(t,e,i)=>(es(t,e,"access private method"),i);import{R as L,r as ui,j as S,z as Zo,u as Xo,P as jo}from"./index-BkAoIRzu.js";import{C as Jo,B as el}from"./createLucideIcon-I5qRBIH6.js";import{C as tl}from"./chevron-left-DXuMkgsr.js";import{C as il}from"./calendar-DGUp6R16.js";import{U as al}from"./user-Bw_Engl6.js";const sl="https://www.youtube.com/embed",rl="https://www.youtube-nocookie.com/embed",nl="https://www.youtube.com/iframe_api",ol="YT",ll="onYouTubeIframeAPIReady",Wr=/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})/,dl=/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/.*?[?&]list=)([\w_-]+)/;function Vr(t,e={}){var i;const a={src:Sn(t,e),frameborder:0,width:"100%",height:"100%",allow:"accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"};return(i=e.config)!=null&&i.referrerpolicy&&(a.referrerpolicy=e.config.referrerpolicy),e.config&&(a["data-config"]=JSON.stringify(e.config)),`
    <style>
      :host {
        display: inline-block;
        line-height: 0;
        position: relative;
        min-width: 300px;
        min-height: 150px;
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
      }
    </style>
    <iframe${cl(a)}></iframe>
  `}function Sn(t,e){if(!t.src)return;const i=t.src.includes("-nocookie")?rl:sl,a={controls:t.controls===""?null:0,autoplay:t.autoplay,loop:t.loop,mute:t.muted,playsinline:t.playsinline,preload:t.preload??"metadata",enablejsapi:1,cc_load_policy:1,showinfo:0,rel:0,iv_load_policy:3,modestbranding:1,...e.config};if(Wr.test(t.src)){const d=t.src.match(Wr),c=d&&d[1];return`${i}/${c}?${Kr(a)}`}const s=t.src.match(dl),o={listType:"playlist",list:s&&s[1],...a};return`${i}?${Kr(o)}`}var Bt,Ft,Xe,je,$e,yi,Wt,dt,Je,Ma,kn;class Hi extends(globalThis.HTMLElement??class{}){constructor(){super();Ee(this,Ma);ft(this,"loadComplete",new as);Ee(this,Bt);Ee(this,Ft);Ee(this,Xe,0);Ee(this,je,!1);Ee(this,$e);ft(this,"isLoaded",!1);Ee(this,yi,null);Ee(this,Wt,null);Ee(this,dt,null);Ee(this,Je,1);Fr(this,Ma,kn).call(this,"config")}get config(){return j(this,Wt)}set config(i){G(this,Wt,i)}async load(){if(j(this,Bt))return;this.shadowRoot||this.attachShadow({mode:"open"});const i=!j(this,Ft);j(this,Ft)&&(this.loadComplete=new as,this.isLoaded=!1),G(this,Ft,!0),await G(this,Bt,Promise.resolve()),G(this,Bt,null),G(this,Xe,0),this.dispatchEvent(new Event("emptied"));let a=this.api;if(this.api=null,!this.src){a==null||a.destroy();return}G(this,dt,document.createElement("video")),this.textTracks=j(this,dt).textTracks,this.textTracks.addEventListener("change",()=>{var p;const m=Array.from(this.textTracks).find(h=>h.mode==="showing");(p=this.api)==null||p.setOption("captions","track",m?{languageCode:m.language}:{})}),this.dispatchEvent(new Event("loadstart"));let s=this.shadowRoot.querySelector("iframe"),r=hl(this.attributes);i&&s&&G(this,Wt,JSON.parse(s.getAttribute("data-config")||"{}")),(!(s!=null&&s.src)||s.src!==Sn(r,this))&&(this.shadowRoot.innerHTML=Vr(r,this),s=this.shadowRoot.querySelector("iframe"));const o=await ml(nl,ol,ll);this.api=new o.Player(s,{events:{onReady:()=>{var p;G(this,Xe,1),this.dispatchEvent(new Event("loadedmetadata")),this.dispatchEvent(new Event("durationchange")),j(this,Je)!==1&&((p=this.api)==null||p.setVolume(j(this,Je)*100)),this.dispatchEvent(new Event("volumechange")),this.dispatchEvent(new Event("loadcomplete")),this.isLoaded=!0,this.loadComplete.resolve()},onError:p=>{console.error(p),G(this,yi,{code:p.data,message:`YouTube iframe player error #${p.data}; visit https://developers.google.com/youtube/iframe_api_reference#onError for the full error message.`}),this.dispatchEvent(new Event("error"))}}});let d=!1;this.api.addEventListener("onStateChange",p=>{var m;const h=p.data;if((h===o.PlayerState.PLAYING||h===o.PlayerState.BUFFERING)&&(d||(d=!0,this.dispatchEvent(new Event("play"))),(this.api.getOption("captions","tracklist")||[]).forEach(v=>{[...this.textTracks].some(T=>T.language===v.languageCode)||j(this,dt).addTextTrack("subtitles",v.displayName,v.languageCode),this.textTracks=j(this,dt).textTracks}),this.dispatchEvent(new Event("loadstart"))),h===o.PlayerState.PLAYING)this.seeking&&(G(this,je,!1),(m=j(this,$e))==null||m.resolve(),this.dispatchEvent(new Event("seeked"))),G(this,Xe,3),this.dispatchEvent(new Event("playing"));else if(h===o.PlayerState.PAUSED){const b=Math.abs(this.currentTime-c);!this.seeking&&b>.1&&(G(this,je,!0),this.dispatchEvent(new Event("seeking"))),d=!1,this.dispatchEvent(new Event("pause"))}h===o.PlayerState.ENDED&&(d=!1,this.dispatchEvent(new Event("pause")),this.dispatchEvent(new Event("ended")),this.loop&&this.play())}),this.api.addEventListener("onPlaybackRateChange",()=>{this.dispatchEvent(new Event("ratechange"))}),this.api.addEventListener("onVolumeChange",()=>{var p;const m=((p=this.api)==null?void 0:p.getVolume())/100;G(this,Je,m),this.dispatchEvent(new Event("volumechange"))}),this.api.addEventListener("onVideoProgress",()=>{this.dispatchEvent(new Event("timeupdate"))}),await this.loadComplete;let c=0;setInterval(()=>{var p;const m=Math.abs(this.currentTime-c),h=this.buffered.end(this.buffered.length-1);this.seeking&&h>.1?(G(this,je,!1),(p=j(this,$e))==null||p.resolve(),this.dispatchEvent(new Event("seeked"))):!this.seeking&&m>.1&&(G(this,je,!0),this.dispatchEvent(new Event("seeking"))),c=this.currentTime},50);let y;const g=setInterval(()=>{const p=this.buffered.end(this.buffered.length-1);p>=this.duration&&(clearInterval(g),G(this,Xe,4)),y!=p&&(y=p,this.dispatchEvent(new Event("progress")))},100)}async attributeChangedCallback(i,a,s){if(a!==s)switch(i){case"src":case"autoplay":case"controls":case"loop":case"playsinline":this.load()}}async play(){var i;return G(this,$e,null),await this.loadComplete,(i=this.api)==null||i.playVideo(),vl(this)}async pause(){var i;return await this.loadComplete,(i=this.api)==null?void 0:i.pauseVideo()}get seeking(){return j(this,je)}get readyState(){return j(this,Xe)}get src(){return this.getAttribute("src")}set src(i){this.src!=i&&this.setAttribute("src",i)}get error(){return j(this,yi)}get paused(){var i,a;return this.isLoaded?[-1,0,2,5].includes((a=(i=this.api)==null?void 0:i.getPlayerState)==null?void 0:a.call(i)):!this.autoplay}get duration(){var i,a;return((a=(i=this.api)==null?void 0:i.getDuration)==null?void 0:a.call(i))??NaN}get autoplay(){return this.hasAttribute("autoplay")}set autoplay(i){this.autoplay!=i&&this.toggleAttribute("autoplay",!!i)}get buffered(){var i,a;if(!this.isLoaded)return ss();const s=((i=this.api)==null?void 0:i.getVideoLoadedFraction())*((a=this.api)==null?void 0:a.getDuration());return s>0?ss(0,s):ss()}get controls(){return this.hasAttribute("controls")}set controls(i){this.controls!=i&&this.toggleAttribute("controls",!!i)}get currentTime(){var i,a;return((a=(i=this.api)==null?void 0:i.getCurrentTime)==null?void 0:a.call(i))??0}set currentTime(i){this.currentTime!=i&&(G(this,$e,new as),this.loadComplete.then(()=>{var a,s;(a=this.api)==null||a.seekTo(i,!0),this.paused&&((s=j(this,$e))==null||s.then(()=>{var r;j(this,$e)&&((r=this.api)==null||r.pauseVideo())}))}))}set defaultMuted(i){this.defaultMuted!=i&&this.toggleAttribute("muted",!!i)}get defaultMuted(){return this.hasAttribute("muted")}get loop(){return this.hasAttribute("loop")}set loop(i){this.loop!=i&&this.toggleAttribute("loop",!!i)}set muted(i){this.muted!=i&&this.loadComplete.then(()=>{var a,s;i?(a=this.api)==null||a.mute():(s=this.api)==null||s.unMute()})}get muted(){var i,a;return this.isLoaded?(a=(i=this.api)==null?void 0:i.isMuted)==null?void 0:a.call(i):this.defaultMuted}get playbackRate(){var i,a;return((a=(i=this.api)==null?void 0:i.getPlaybackRate)==null?void 0:a.call(i))??1}set playbackRate(i){this.playbackRate!=i&&this.loadComplete.then(()=>{var a;(a=this.api)==null||a.setPlaybackRate(i)})}get playsInline(){return this.hasAttribute("playsinline")}set playsInline(i){this.playsInline!=i&&this.toggleAttribute("playsinline",!!i)}get poster(){return this.getAttribute("poster")}set poster(i){this.poster!=i&&this.setAttribute("poster",`${i}`)}set volume(i){this.volume!=i&&(G(this,Je,i),this.loadComplete.then(()=>{var a;(a=this.api)==null||a.setVolume(i*100)}))}get volume(){var i;return this.isLoaded?((i=this.api)==null?void 0:i.getVolume())/100:j(this,Je)}}Bt=new WeakMap,Ft=new WeakMap,Xe=new WeakMap,je=new WeakMap,$e=new WeakMap,yi=new WeakMap,Wt=new WeakMap,dt=new WeakMap,Je=new WeakMap,Ma=new WeakSet,kn=function(i){if(Object.prototype.hasOwnProperty.call(this,i)){const a=this[i];delete this[i],this[i]=a}},ft(Hi,"getTemplateHTML",Vr),ft(Hi,"shadowRootOptions",{mode:"open"}),ft(Hi,"observedAttributes",["autoplay","controls","crossorigin","loop","muted","playsinline","poster","preload","src"]);function cl(t){let e="";for(const i in t){const a=t[i];a===""?e+=` ${ts(i)}`:e+=` ${ts(i)}="${ts(`${a}`)}"`}return e}function ts(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/`/g,"&#x60;")}function Kr(t){return String(new URLSearchParams(ul(t)))}function ul(t){let e={};for(let i in t){let a=t[i];a===!0||a===""?e[i]=1:a===!1?e[i]=0:a!=null&&(e[i]=a)}return e}function hl(t){let e={};for(let i of t)e[i.name]=i.value;return e}const is={};async function ml(t,e,i){return is[t]?is[t]:self[e]?(await pl(0),self[e]):is[t]=new Promise(function(a,s){const r=document.createElement("script");r.src=t;const o=()=>a(self[e]);self[i]=o,r.onload=()=>!i,r.onerror=s,document.head.append(r)})}const pl=t=>new Promise(e=>setTimeout(e,t));function El(t){return(...e)=>new Promise(i=>{t(...e,(...a)=>{a.length>1?i(a):i(a[0])})})}function vl(t){return El((e,i)=>{let a;t.addEventListener(e,a=()=>{t.removeEventListener(e,a),i()})})("playing")}class as extends Promise{constructor(e=()=>{}){let i,a;super((s,r)=>{e(s,r),i=s,a=r}),this.resolve=i,this.reject=a}}function ss(t,e){return Array.isArray(t)?rs(t):t==null||e==null||t===0&&e===0?rs([[0,0]]):rs([[t,e]])}function rs(t){return Object.defineProperties(t,{start:{value:e=>t[e][0]},end:{value:e=>t[e][1]}}),t}globalThis.customElements&&!globalThis.customElements.get("youtube-video")&&globalThis.customElements.define("youtube-video",Hi);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Modified version of `@lit/react` for vanilla custom elements with support for SSR.
 */const fl=new Set(["style","children","ref","key","suppressContentEditableWarning","suppressHydrationWarning","dangerouslySetInnerHTML"]),gl={className:"class",htmlFor:"for"};function _l(t){return t.toLowerCase()}function Gr(t){if(typeof t=="boolean")return t?"":void 0;if(typeof t!="function"&&!(typeof t=="object"&&t!==null))return t}function R({react:t,tagName:e,elementClass:i,events:a,displayName:s,defaultProps:r,toAttributeName:o=_l,toAttributeValue:d=Gr}){const c=Number.parseInt(t.version)>=19,y=t.forwardRef((g,p)=>{var z,Be;const m=t.useRef(null),h=t.useRef(new Map),b={},v={},T={},I={};for(const[P,x]of Object.entries(g)){if(fl.has(P)){T[P]=x;continue}const N=o(gl[P]??P);if(i.prototype&&P in i.prototype&&!(P in(((z=globalThis.HTMLElement)==null?void 0:z.prototype)??{}))&&!((Be=i.observedAttributes)!=null&&Be.some(oe=>oe===N))){I[P]=x;continue}if(P.startsWith("on")){b[P]=x;continue}const Z=d(x);if(N&&Z!=null&&(v[N]=String(Z),c||(T[N]=Z)),N&&c){const oe=Gr(x);Z!==oe?T[N]=Z:T[N]=x}}if(typeof window<"u"){for(const P in b){const x=b[P],N=P.endsWith("Capture"),Z=((a==null?void 0:a[P])??P.slice(2).toLowerCase()).slice(0,N?-7:void 0);t.useLayoutEffect(()=>{const oe=m==null?void 0:m.current;if(!(!oe||typeof x!="function"))return oe.addEventListener(Z,x,N),()=>{oe.removeEventListener(Z,x,N)}},[m==null?void 0:m.current,x])}t.useLayoutEffect(()=>{if(m.current===null)return;const P=new Map;for(const x in I)qr(m.current,x,I[x]),h.current.delete(x),P.set(x,I[x]);for(const[x,N]of h.current)qr(m.current,x,void 0);h.current=P})}if(typeof window>"u"&&(i!=null&&i.getTemplateHTML)&&(i!=null&&i.shadowRootOptions)){const{mode:P,delegatesFocus:x}=i.shadowRootOptions,N=t.createElement("template",{shadowrootmode:P,shadowrootdelegatesfocus:x,dangerouslySetInnerHTML:{__html:i.getTemplateHTML(v,g)},key:"ce-la-react-ssr-template-shadow-root"});T.children=[N,T.children]}return t.createElement(e,{...r,...T,ref:t.useCallback(P=>{m.current=P,typeof p=="function"?p(P):p!==null&&(p.current=P)},[p])},T.children)});return y.displayName=s??i.name,y}function qr(t,e,i){var a;t[e]=i,i==null&&e in(((a=globalThis.HTMLElement)==null?void 0:a.prototype)??{})&&t.removeAttribute(e)}const E={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},D={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},wn={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},Mn=Object.entries(wn),n=Mn.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),bl={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Vt=Mn.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...bl});Object.entries(Vt).reduce((t,[e,i])=>{const a=n[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const Al=Object.entries(n).reduce((t,[e,i])=>{const a=Vt[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),Pe={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},Ht={DISABLED:"disabled",SHOWING:"showing"},ns={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},de={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},Ne={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},Tl={FULLSCREEN:"fullscreen"};function yl(t){return t==null?void 0:t.map(Il).join(" ")}function Il(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(s=>s!=null).join(":")}}function Sl(t){return t==null?void 0:t.map(kl).join(" ")}function kl(t){if(t){const{id:e,kind:i,language:a,label:s}=t;return[e,i,a,s].filter(r=>r!=null).join(":")}}function Ws(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}const Ln=t=>new Promise(e=>setTimeout(e,t)),wl={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var Yr;const os={en:wl};let us=((Yr=globalThis.navigator)==null?void 0:Yr.language)||"en";const Ml=t=>{us=t},Ll=t=>{var e,i,a;const[s]=us.split("-");return((e=os[us])==null?void 0:e[t])||((i=os[s])==null?void 0:i[t])||((a=os.en)==null?void 0:a[t])||t},f=(t,e={})=>Ll(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),Qr=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Rl=(t,e)=>{const i=f(t===1?Qr[e].singular:Qr[e].plural);return`${t} ${i}`},hi=t=>{if(!Ws(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),r=[a.getHours(),a.getMinutes(),a.getSeconds()].map((o,d)=>o&&Rl(o,d)).filter(o=>o).join(", ");return i?f("{time} remaining",{time:r}):r};function et(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),s=Math.floor(t/60%60),r=Math.floor(t/3600);const o=Math.floor(e/60%60),d=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(r=s=a="0"),r=r>0||d>0?r+":":"",s=((r||o>=10)&&s<10?"0"+s:s)+":",a=a<10?"0"+a:a,(i?"-":"")+r+s+a}class Rn{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}}class Cn extends Rn{}class zr extends Cn{constructor(){super(...arguments),this.role=null}}class Cl{observe(){}unobserve(){}disconnect(){}}const Dn={createElement:function(){return new vi.HTMLElement},createElementNS:function(){return new vi.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},vi={ResizeObserver:Cl,document:Dn,Node:Cn,Element:zr,HTMLElement:class extends zr{constructor(){super(...arguments),this.innerHTML=""}get content(){return new vi.DocumentFragment}},DocumentFragment:class extends Rn{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{parseFromString(e,i){return{body:{textContent:e}}}}},Pn="global"in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window>"u"||typeof window.customElements>"u",xn=Object.keys(vi).every(t=>t in globalThis),l=Pn&&!xn?vi:globalThis,ne=Pn&&!xn?Dn:globalThis.document,Zr=new WeakMap,Vs=t=>{let e=Zr.get(t);return e||Zr.set(t,e=new Set),e},On=new l.ResizeObserver(t=>{for(const e of t)for(const i of Vs(e.target))i(e)});function Un(t,e){Vs(t).add(e),On.observe(t)}function Nn(t,e){const i=Vs(t);i.delete(e),i.size||On.unobserve(t)}function Ae(t){const e={};for(const i of t)e[i.name]=i.value;return e}function Dl(t){var e;return(e=Pl(t))!=null?e:Ii(t,"media-controller")}function Pl(t){var e;const{MEDIA_CONTROLLER:i}=D,a=t.getAttribute(i);if(a)return(e=Ol(t))==null?void 0:e.getElementById(a)}const $n=(t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},xl=(t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},Hn=(t,e)=>xl(t,e)[0],qt=(t,e)=>!t||!e?!1:t!=null&&t.contains(e)?!0:qt(t,e.getRootNode().host),Ii=(t,e)=>{if(!t)return null;const i=t.closest(e);return i||Ii(t.getRootNode().host,e)};function Bn(t=document){var e;const i=t==null?void 0:t.activeElement;return i?(e=Bn(i.shadowRoot))!=null?e:i:null}function Ol(t){var e;const i=(e=t==null?void 0:t.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function Fn(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let s=t;for(;s&&e>0;){const r=getComputedStyle(s);if(i&&r.opacity==="0"||a&&r.visibility==="hidden"||r.display==="none")return!1;s=s.parentElement,e--}return!0}function Ul(t,e,i,a){const s=a.x-i.x,r=a.y-i.y,o=s*s+r*r;if(o===0)return 0;const d=((t-i.x)*s+(e-i.y)*r)/o;return Math.max(0,Math.min(1,d))}function Q(t,e){const i=Nl(t,a=>a===e);return i||Wn(t,e)}function Nl(t,e){var i,a;let s;for(s of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let r;try{r=(a=s.sheet)==null?void 0:a.cssRules}catch{continue}for(const o of r??[])if(e(o.selectorText))return o}}function Wn(t,e){var i,a;const s=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],r=s==null?void 0:s[s.length-1];if(!(r!=null&&r.sheet))return console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};const o=r==null?void 0:r.sheet.insertRule(`${e}{}`,r.sheet.cssRules.length);return(a=r.sheet.cssRules)==null?void 0:a[o]}function B(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}function te(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}B(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function k(t,e){return t.hasAttribute(e)}function w(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}k(t,e)!=i&&t.toggleAttribute(e,i)}function F(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function W(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;F(t,e,void 0)!==a&&t.setAttribute(e,a)}var Vn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ve=(t,e,i)=>(Vn(t,e,"read from private field"),i?i.call(t):e.get(t)),$l=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wi=(t,e,i,a)=>(Vn(t,e,"write to private field"),e.set(t,i),i),se;function Hl(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}class La extends l.HTMLElement{constructor(){if(super(),$l(this,se,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[D.MEDIA_CONTROLLER,n.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===D.MEDIA_CONTROLLER&&(i&&((r=(s=ve(this,se))==null?void 0:s.unassociateElement)==null||r.call(s,this),wi(this,se,null)),a&&this.isConnected&&(wi(this,se,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=ve(this,se))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),wi(this,se,Bl(this)),this.getAttribute(D.MEDIA_CONTROLLER)&&((i=(e=ve(this,se))==null?void 0:e.associateElement)==null||i.call(e,this)),ve(this,se)&&(ve(this,se).addEventListener("pointerdown",this),ve(this,se).addEventListener("click",this),ve(this,se).hasAttribute("tabindex")||(ve(this,se).tabIndex=0))}disconnectedCallback(){var e,i,a,s;this.getAttribute(D.MEDIA_CONTROLLER)&&((i=(e=ve(this,se))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=ve(this,se))==null||a.removeEventListener("pointerdown",this),(s=ve(this,se))==null||s.removeEventListener("click",this),wi(this,se,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a==null?void 0:a.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:r,clientY:o}=e,{left:d,top:c,width:y,height:g}=this.getBoundingClientRect(),p=r-d,m=o-c;if(p<0||m<0||p>y||m>g||y===0&&g===0)return;const h=this._pointerType||"mouse";if(this._pointerType=void 0,h===ns.TOUCH){this.handleTap(e);return}else if(h===ns.MOUSE||h===ns.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return k(this,n.MEDIA_PAUSED)}set mediaPaused(e){w(this,n.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?E.MEDIA_PLAY_REQUEST:E.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new l.CustomEvent(i,{composed:!0,bubbles:!0}))}}se=new WeakMap;La.shadowRootOptions={mode:"open"};La.getTemplateHTML=Hl;function Bl(t){var e;const i=t.getAttribute(D.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):Ii(t,"media-controller")}l.customElements.get("media-gesture-receiver")||l.customElements.define("media-gesture-receiver",La);var hs=La,Ks=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},V=(t,e,i)=>(Ks(t,e,"read from private field"),i?i.call(t):e.get(t)),re=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ie=(t,e,i,a)=>(Ks(t,e,"write to private field"),e.set(t,i),i),be=(t,e,i)=>(Ks(t,e,"access private method"),i),Jt,pa,yt,Kt,Nt,ms,ei,Bi,ps,Kn,Es,Gn,fi,Ra,Ca,Gs,Gt,gi,Ve,Fi;const A={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function Fl(t){return`
    <style>
      
      :host([${n.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${A.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${A.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${A.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${A.AUDIO}])[${A.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${A.AUDIO}])[${A.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${A.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${A.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${A.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${A.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${A.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${A.USER_INACTIVE}]:not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_AIRPLAYING}]):not([${n.MEDIA_IS_CASTING}]):not([${A.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${A.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${A.USER_INACTIVE}]:not([${A.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${A.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${A.USER_INACTIVE}][${A.AUTOHIDE_OVER_CONTROLS}]:not([${A.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${A.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${A.AUDIO}])[${n.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${hs.shadowRootOptions.mode}">
          ${hs.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}const Wl=Object.values(n),Vl="sm:384 md:576 lg:768 xl:960";function Kl(t){qn(t.target,t.contentRect.width)}function qn(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(A.BREAKPOINTS))!=null?i:Vl,s=Gl(a),r=ql(s,e);let o=!1;if(Object.keys(s).forEach(d=>{if(r.includes(d)){t.hasAttribute(`breakpoint${d}`)||(t.setAttribute(`breakpoint${d}`,""),o=!0);return}t.hasAttribute(`breakpoint${d}`)&&(t.removeAttribute(`breakpoint${d}`),o=!0)}),o){const d=new CustomEvent(Vt.BREAKPOINTS_CHANGE,{detail:r});t.dispatchEvent(d)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(Vt.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function Gl(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function ql(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}class Si extends l.HTMLElement{constructor(){if(super(),re(this,ps),re(this,Es),re(this,fi),re(this,Ca),re(this,Gt),re(this,Jt,void 0),re(this,pa,0),re(this,yt,null),re(this,Kt,null),re(this,Nt,void 0),this.breakpointsComputed=!1,re(this,ms,e=>{const i=this.media;for(const a of e){if(a.type!=="childList")continue;const s=a.removedNodes;for(const r of s){if(r.slot!="media"||a.target!=this)continue;let o=a.previousSibling&&a.previousSibling.previousElementSibling;if(!o||!i)this.mediaUnsetCallback(r);else{let d=o.slot!=="media";for(;(o=o.previousSibling)!==null;)o.slot=="media"&&(d=!1);d&&this.mediaUnsetCallback(r)}}if(i)for(const r of a.addedNodes)r===i&&this.handleMediaUpdated(i)}}),re(this,ei,!1),re(this,Bi,e=>{V(this,ei)||(setTimeout(()=>{Kl(e),Ie(this,ei,!1)},0),Ie(this,ei,!0))}),re(this,Ve,void 0),re(this,Fi,()=>{if(!V(this,Ve).assignedElements({flatten:!0}).length){V(this,yt)&&this.mediaUnsetCallback(V(this,yt));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}Ie(this,Jt,new MutationObserver(V(this,ms)))}static get observedAttributes(){return[A.AUTOHIDE,A.GESTURES_DISABLED].concat(Wl).filter(e=>![n.MEDIA_RENDITION_LIST,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_CHAPTERS_CUES,n.MEDIA_WIDTH,n.MEDIA_HEIGHT,n.MEDIA_ERROR,n.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==A.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return(e==null?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Ie(this,yt,e),e.localName.includes("-")&&await l.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;V(this,Jt).observe(this,{childList:!0,subtree:!0}),Un(this,V(this,Bi));const i=this.getAttribute(A.AUDIO)!=null,a=f(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(A.USER_INACTIVE,""),qn(this,this.getBoundingClientRect().width);const s=this.querySelector(":scope > slot[slot=media]");s&&(Ie(this,Ve,s),V(this,Ve).addEventListener("slotchange",V(this,Fi))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=l.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;Nn(this,V(this,Bi)),clearTimeout(V(this,Kt)),V(this,Jt).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=l.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),V(this,Ve)&&(V(this,Ve).removeEventListener("slotchange",V(this,Fi)),Ie(this,Ve,null))}mediaSetCallback(e){}mediaUnsetCallback(e){Ie(this,yt,null)}handleEvent(e){switch(e.type){case"pointerdown":Ie(this,pa,e.timeStamp);break;case"pointermove":be(this,ps,Kn).call(this,e);break;case"pointerup":be(this,Es,Gn).call(this,e);break;case"mouseleave":be(this,fi,Ra).call(this);break;case"mouseup":this.removeAttribute(A.KEYBOARD_CONTROL);break;case"keyup":be(this,Gt,gi).call(this),this.setAttribute(A.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);Ie(this,Nt,isNaN(i)?0:i)}get autohide(){return(V(this,Nt)===void 0?2:V(this,Nt)).toString()}get breakpoints(){return F(this,A.BREAKPOINTS)}set breakpoints(e){W(this,A.BREAKPOINTS,e)}get audio(){return k(this,A.AUDIO)}set audio(e){w(this,A.AUDIO,e)}get gesturesDisabled(){return k(this,A.GESTURES_DISABLED)}set gesturesDisabled(e){w(this,A.GESTURES_DISABLED,e)}get keyboardControl(){return k(this,A.KEYBOARD_CONTROL)}set keyboardControl(e){w(this,A.KEYBOARD_CONTROL,e)}get noAutohide(){return k(this,A.NO_AUTOHIDE)}set noAutohide(e){w(this,A.NO_AUTOHIDE,e)}get autohideOverControls(){return k(this,A.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){w(this,A.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return k(this,A.USER_INACTIVE)}set userInteractive(e){w(this,A.USER_INACTIVE,e)}}Jt=new WeakMap;pa=new WeakMap;yt=new WeakMap;Kt=new WeakMap;Nt=new WeakMap;ms=new WeakMap;ei=new WeakMap;Bi=new WeakMap;ps=new WeakSet;Kn=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-V(this,pa)<250)return;be(this,Ca,Gs).call(this),clearTimeout(V(this,Kt));const e=this.hasAttribute(A.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&be(this,Gt,gi).call(this)};Es=new WeakSet;Gn=function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(A.USER_INACTIVE);[this,this.media].includes(t.target)&&e?be(this,fi,Ra).call(this):be(this,Gt,gi).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e==null?void 0:e.localName))&&be(this,Gt,gi).call(this)};fi=new WeakSet;Ra=function(){if(V(this,Nt)<0||this.hasAttribute(A.USER_INACTIVE))return;this.setAttribute(A.USER_INACTIVE,"");const t=new l.CustomEvent(Vt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};Ca=new WeakSet;Gs=function(){if(!this.hasAttribute(A.USER_INACTIVE))return;this.removeAttribute(A.USER_INACTIVE);const t=new l.CustomEvent(Vt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};Gt=new WeakSet;gi=function(){be(this,Ca,Gs).call(this),clearTimeout(V(this,Kt));const t=parseInt(this.autohide);t<0||Ie(this,Kt,setTimeout(()=>{be(this,fi,Ra).call(this)},t*1e3))};Ve=new WeakMap;Fi=new WeakMap;Si.shadowRootOptions={mode:"open"};Si.getTemplateHTML=Fl;l.customElements.get("media-container")||l.customElements.define("media-container",Si);var Yl=Si,Yn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ee=(t,e,i)=>(Yn(t,e,"read from private field"),i?i.call(t):e.get(t)),Qt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Mi=(t,e,i,a)=>(Yn(t,e,"write to private field"),e.set(t,i),i),It,St,Ea,ot,Ue,Ke;class Qn{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){Qt(this,Ue),Qt(this,It,void 0),Qt(this,St,void 0),Qt(this,Ea,void 0),Qt(this,ot,new Set),Mi(this,It,e),Mi(this,St,i),Mi(this,Ea,new Set(a))}[Symbol.iterator](){return ee(this,Ue,Ke).values()}get length(){return ee(this,Ue,Ke).size}get value(){var e;return(e=[...ee(this,Ue,Ke)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Mi(this,ot,new Set),this.add(...(i=e==null?void 0:e.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...ee(this,Ue,Ke)][e]}values(){return ee(this,Ue,Ke).values()}forEach(e,i){ee(this,Ue,Ke).forEach(e,i)}add(...e){var i,a;e.forEach(s=>ee(this,ot).add(s)),!(this.value===""&&!((i=ee(this,It))!=null&&i.hasAttribute(`${ee(this,St)}`)))&&((a=ee(this,It))==null||a.setAttribute(`${ee(this,St)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>ee(this,ot).delete(a)),(i=ee(this,It))==null||i.setAttribute(`${ee(this,St)}`,`${this.value}`)}contains(e){return ee(this,Ue,Ke).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}}It=new WeakMap;St=new WeakMap;Ea=new WeakMap;ot=new WeakMap;Ue=new WeakSet;Ke=function(){return ee(this,ot).size?ee(this,ot):ee(this,Ea)};const Ql=(t="")=>t.split(/\s+/),zn=(t="")=>{const[e,i,a]=t.split(":"),s=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?Pe.CAPTIONS:Pe.SUBTITLES,language:i,label:s}},Zn=(t="",e={})=>Ql(t).map(i=>{const a=zn(i);return{...e,...a}}),Xn=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?zn(e):e):typeof t=="string"?Zn(t):[t]:[],zl=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,vs=(t=[])=>Array.prototype.map.call(t,zl).join(" "),Zl=(t,e)=>i=>i[t]===e,jn=t=>{const e=Object.entries(t).map(([i,a])=>Zl(i,a));return i=>e.every(a=>a(i))},mi=(t,e=[],i=[])=>{const a=Xn(i).map(jn),s=r=>a.some(o=>o(r));Array.from(e).filter(s).forEach(r=>{r.mode=t})},Da=(t,e=()=>!0)=>{if(!(t!=null&&t.textTracks))return[];const i=typeof e=="function"?e:jn(e);return Array.from(t.textTracks).filter(i)},Xl=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(n.MEDIA_SUBTITLES_SHOWING)},jl=t=>{var e;const{media:i,fullscreenElement:a}=t;try{const s=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(s){const r=(e=a[s])==null?void 0:e.call(a);if(r instanceof Promise)return r.catch(()=>{})}else i!=null&&i.webkitEnterFullscreen?i.webkitEnterFullscreen():i!=null&&i.requestFullscreen&&i.requestFullscreen()}catch(s){console.error(s)}},Xr="exitFullscreen"in ne?"exitFullscreen":"webkitExitFullscreen"in ne?"webkitExitFullscreen":"webkitCancelFullScreen"in ne?"webkitCancelFullScreen":void 0,Jl=t=>{var e;const{documentElement:i}=t;if(Xr){const a=(e=i==null?void 0:i[Xr])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},ti="fullscreenElement"in ne?"fullscreenElement":"webkitFullscreenElement"in ne?"webkitFullscreenElement":void 0,ed=t=>{const{documentElement:e,media:i}=t,a=e==null?void 0:e[ti];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===Tl.FULLSCREEN?i:a},td=t=>{var e;const{media:i,documentElement:a,fullscreenElement:s=i}=t;if(!i||!a)return!1;const r=ed(t);if(!r)return!1;if(r===s||r===i)return!0;if(r.localName.includes("-")){let o=r.shadowRoot;if(!(ti in o))return qt(r,s);for(;o!=null&&o[ti];){if(o[ti]===s)return!0;o=(e=o[ti])==null?void 0:e.shadowRoot}}return!1},id="fullscreenEnabled"in ne?"fullscreenEnabled":"webkitFullscreenEnabled"in ne?"webkitFullscreenEnabled":void 0,ad=t=>{const{documentElement:e,media:i}=t;return!!(e!=null&&e[id])||i&&"webkitSupportsFullscreen"in i};let Li;const qs=()=>{var t,e;return Li||(Li=(e=(t=ne)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Li)},sd=async(t=qs())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([rd(t,i.signal),nd(t,e)]);return i.abort(),a},rd=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),nd=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Ln(10)}return t.volume!==e},od=/.*Version\/.*Safari\/.*/.test(l.navigator.userAgent),Jn=(t=qs())=>l.matchMedia("(display-mode: standalone)").matches&&od?!1:typeof(t==null?void 0:t.requestPictureInPicture)=="function",eo=(t=qs())=>ad({documentElement:ne,media:t}),ld=eo(),dd=Jn(),cd=!!l.WebKitPlaybackTargetAvailabilityEvent,ud=!!l.chrome,va=t=>Da(t.media,e=>[Pe.SUBTITLES,Pe.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),to=t=>Da(t.media,e=>e.mode===Ht.SHOWING&&[Pe.SUBTITLES,Pe.CAPTIONS].includes(e.kind)),io=(t,e)=>{const i=va(t),a=to(t),s=!!a.length;if(i.length){if(e===!1||s&&e!==!0)mi(Ht.DISABLED,i,a);else if(e===!0||!s&&e!==!1){let r=i[0];const{options:o}=t;if(!(o!=null&&o.noSubtitlesLangPref)){const g=l.localStorage.getItem("media-chrome-pref-subtitles-lang"),p=g?[g,...l.navigator.languages]:l.navigator.languages,m=i.filter(h=>p.some(b=>h.language.toLowerCase().startsWith(b.split("-")[0]))).sort((h,b)=>{const v=p.findIndex(I=>h.language.toLowerCase().startsWith(I.split("-")[0])),T=p.findIndex(I=>b.language.toLowerCase().startsWith(I.split("-")[0]));return v-T});m[0]&&(r=m[0])}const{language:d,label:c,kind:y}=r;mi(Ht.DISABLED,i,a),mi(Ht.SHOWING,i,[{language:d,label:c,kind:y}])}}},Ys=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?hd(t,e):Object.entries(t).every(([i,a])=>i in e&&Ys(a,e[i])),hd=(t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((s,r)=>Ys(s,e[r])):!0},md=Object.values(Ne);let fa;const pd=sd().then(t=>(fa=t,fa)),Ed=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof l.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=l.customElements.get(i);a&&e instanceof a||(await l.customElements.whenDefined(i),l.customElements.upgrade(e))}))},vd=new l.DOMParser,fd=t=>t&&(vd.parseFromString(t,"text/html").body.textContent||t),ii={mediaError:{get(t,e){const{media:i}=t;if((e==null?void 0:e.type)!=="playing")return i==null?void 0:i.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if((e==null?void 0:e.type)!=="playing")return(i=a==null?void 0:a.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:s}=t;if((e==null?void 0:e.type)!=="playing")return(a=(i=s==null?void 0:s.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const s=l.localStorage.getItem("media-chrome-pref-muted")!==null,r=i.hasAttribute("muted");if(a){s&&l.localStorage.removeItem("media-chrome-pref-muted");return}if(r&&!s)return;l.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(s){console.debug("Error setting muted pref",s)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const s=l.localStorage.getItem("media-chrome-pref-muted")==="true";ii.mediaMuted.set(s,e),t(s)}catch(s){console.debug("Error getting muted pref",s)}}]},mediaLoop:{get(t){const{media:e}=t;return e==null?void 0:e.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?l.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&l.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(s){console.debug("Error setting volume pref",s)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const s=l.localStorage.getItem("media-chrome-pref-volume");if(s==null)return;ii.mediaVolume.set(+s,e),t(+s)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof(e==null?void 0:e.volume)>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i==null?void 0:i.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!Ws(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e==null?void 0:e.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return(e==null?void 0:e.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i==null?void 0:i.seekable)!=null&&e.length))return;const a=i.seekable.start(0),s=i.seekable.end(i.seekable.length-1);if(!(!a&&!s))return[Number(a.toFixed(3)),Number(s.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i==null?void 0:i.buffered)!=null?e:[];return Array.from(a).map((s,r)=>[Number(a.start(r).toFixed(3)),Number(a.end(r).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[Ne.LIVE,Ne.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:s}=e;if(md.includes(s))return s===Ne.UNKNOWN?a:s;const r=e.duration;return r===1/0?Ne.LIVE:Number.isFinite(r)?Ne.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=ii.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===Ne.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(ii.mediaStreamType.get(t)===Ne.LIVE))return!1;const s=e.seekable;if(!s)return!0;if(!s.length)return!1;const r=s.end(s.length-1)-i;return e.currentTime>=r},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return va(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return to(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:s,options:r}=e;if(!s)return;const o=d=>{var c;!r.defaultSubtitles||d&&![Pe.CAPTIONS,Pe.SUBTITLES].includes((c=d==null?void 0:d.track)==null?void 0:c.kind)||io(e,!0)};return s.addEventListener("loadstart",o),(i=s.textTracks)==null||i.addEventListener("addtrack",o),(a=s.textTracks)==null||a.addEventListener("removetrack",o),()=>{var d,c;s.removeEventListener("loadstart",o),(d=s.textTracks)==null||d.removeEventListener("addtrack",o),(c=s.textTracks)==null||c.removeEventListener("removetrack",o)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=Da(i,{kind:Pe.CHAPTERS});return Array.from((e=a==null?void 0:a.cues)!=null?e:[]).map(({text:s,startTime:r,endTime:o})=>({text:fd(s),startTime:r,endTime:o}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const s=a.querySelector('track[kind="chapters"][default][src]'),r=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return s==null||s.addEventListener("load",t),r==null||r.addEventListener("load",t),()=>{s==null||s.removeEventListener("load",t),r==null||r.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:s}=t;if(!a||!s||!s.pictureInPictureElement)return!1;if(s.pictureInPictureElement===a)return!0;if(s.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?qt(a,s.pictureInPictureElement):!1;if(s.pictureInPictureElement.localName.includes("-")){let r=s.pictureInPictureElement.shadowRoot;for(;r!=null&&r.pictureInPictureElement;){if(r.pictureInPictureElement===a)return!0;r=(i=r.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!ne.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(s=>{if(s.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const r=()=>{i.removeEventListener("loadedmetadata",o),i.preload="none"},o=()=>{i.requestPictureInPicture().catch(a),r()};i.addEventListener("loadedmetadata",o),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),r()},1e3)}else throw s}else throw s})}else ne.pictureInPictureElement&&ne.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i==null?void 0:i.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:s}=t;return(a=(i=s==null?void 0:s.videoRenditions)==null?void 0:i[(e=s.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!(i!=null&&i.videoRenditions)){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,s=Array.prototype.findIndex.call(i.videoRenditions,r=>r.id==a);i.videoRenditions.selectedIndex!=s&&(i.videoRenditions.selectedIndex=s)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i==null?void 0:i.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a==null?void 0:a.audioTracks)!=null?e:[]].find(s=>s.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!(i!=null&&i.audioTracks)){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const s of i.audioTracks)s.enabled=a==s.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return td(t)},set(t,e,i){var a,s;t?(jl(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((s=e.media)==null||s.focus())):Jl(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!(i!=null&&i.remote)||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:s}=e;if(s&&!(t&&((i=s.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=s.remote)==null?void 0:a.state)!=="connected")){if(typeof s.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}s.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&l.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!ld||!eo(e))return de.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!dd||!Jn(e))return de.UNSUPPORTED;if(e!=null&&e.disablePictureInPicture)return de.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(fa===!1||(e==null?void 0:e.volume)==null)return de.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{fa==null&&pd.then(e=>t(e?void 0:de.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!ud||!((i=a==null?void 0:a.remote)!=null&&i.state))return de.UNSUPPORTED;if(!(e==null||e==="available"))return de.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a==null?void 0:a.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!cd)return de.UNSUPPORTED;if((e==null?void 0:e.availability)==="not-available")return de.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a==null?void 0:a.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!(i!=null&&i.videoRenditions))return de.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return de.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!(a!=null&&a.audioTracks))return de.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return de.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},gd={[E.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,s,r;const{media:o}=e,d=i??void 0;let c,y;if(o&&d!=null){const[h]=Da(o,{kind:Pe.METADATA,label:"thumbnails"}),b=Array.prototype.find.call((a=h==null?void 0:h.cues)!=null?a:[],(v,T,I)=>T===0?v.endTime>d:T===I.length-1?v.startTime<=d:v.startTime<=d&&v.endTime>d);if(b){const v=/'^(?:[a-z]+:)?\/\//i.test(b.text)||(s=o==null?void 0:o.querySelector('track[label="thumbnails"]'))==null?void 0:s.src,T=new URL(b.text,v);y=new URLSearchParams(T.hash).get("#xywh").split(",").map(z=>+z),c=T.href}}const g=t.mediaDuration.get(e);let m=(r=t.mediaChaptersCues.get(e).find((h,b,v)=>b===v.length-1&&g===h.endTime?h.startTime<=d&&h.endTime>=d:h.startTime<=d&&h.endTime>d))==null?void 0:r.text;return i!=null&&m==null&&(m=""),{mediaPreviewTime:d,mediaPreviewImage:c,mediaPreviewCoords:y,mediaPreviewChapter:m}},[E.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[E.MEDIA_PLAY_REQUEST](t,e){var i,a,s,r;const o="mediaPaused",c=t.mediaStreamType.get(e)===Ne.LIVE,y=!((i=e.options)!=null&&i.noAutoSeekToLive),g=t.mediaTargetLiveWindow.get(e)>0;if(c&&y&&!g){const p=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(p){const m=(r=(s=e.options)==null?void 0:s.seekToLiveOffset)!=null?r:0,h=p-m;t.mediaCurrentTime.set(h,e)}}t[o].set(!1,e)},[E.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",s=i;t[a].set(s,e)},[E.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[E.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[E.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",s=!!i;return t[a].set(s,e),{mediaLoop:s}},[E.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",s=i;s&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(s,e)},[E.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",s=i;t[a].set(s,e)},[E.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,s;const r="mediaCurrentTime",o=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(o)))return;const d=(s=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?s:0,c=o-d;t[r].set(c,e)},[E.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:s}=e,r=va(e),o=Xn(i),d=(a=o[0])==null?void 0:a.language;d&&!s.noSubtitlesLangPref&&l.localStorage.setItem("media-chrome-pref-subtitles-lang",d),mi(Ht.SHOWING,r,o)},[E.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=va(e),s=i??[];mi(Ht.DISABLED,a,s)},[E.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){io(e,i)},[E.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",s=i;t[a].set(s,e)},[E.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",s=i;t[a].set(s,e)},[E.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[E.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[E.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[E.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[E.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[E.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[E.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},_d=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=ii,requestMap:s=gd,options:r={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{const d=[],c={options:{...r}};let y=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const g=v=>{v!=null&&(Ys(v,y)||(y=Object.freeze({...y,...v}),d.forEach(T=>T(y))))},p=()=>{const v=Object.entries(a).reduce((T,[I,{get:z}])=>(T[I]=z(c),T),{});g(v)},m={};let h;const b=async(v,T)=>{var I,z,Be,P,x,N,Z,oe,tt,pr,Er,vr,fr,gr,_r,br;const Bo=!!h;if(h={...c,...h??{},...v},Bo)return;await Ed(...Object.values(v));const Et=d.length>0&&T===0&&o,Ar=c.media!==h.media,Tr=((I=c.media)==null?void 0:I.textTracks)!==((z=h.media)==null?void 0:z.textTracks),yr=((Be=c.media)==null?void 0:Be.videoRenditions)!==((P=h.media)==null?void 0:P.videoRenditions),Ir=((x=c.media)==null?void 0:x.audioTracks)!==((N=h.media)==null?void 0:N.audioTracks),Sr=((Z=c.media)==null?void 0:Z.remote)!==((oe=h.media)==null?void 0:oe.remote),kr=c.documentElement!==h.documentElement,wr=!!c.media&&(Ar||Et),Mr=!!((tt=c.media)!=null&&tt.textTracks)&&(Tr||Et),Lr=!!((pr=c.media)!=null&&pr.videoRenditions)&&(yr||Et),Rr=!!((Er=c.media)!=null&&Er.audioTracks)&&(Ir||Et),Cr=!!((vr=c.media)!=null&&vr.remote)&&(Sr||Et),Dr=!!c.documentElement&&(kr||Et),Ja=wr||Mr||Lr||Rr||Cr||Dr,vt=d.length===0&&T===1&&o,Pr=!!h.media&&(Ar||vt),xr=!!((fr=h.media)!=null&&fr.textTracks)&&(Tr||vt),Or=!!((gr=h.media)!=null&&gr.videoRenditions)&&(yr||vt),Ur=!!((_r=h.media)!=null&&_r.audioTracks)&&(Ir||vt),Nr=!!((br=h.media)!=null&&br.remote)&&(Sr||vt),$r=!!h.documentElement&&(kr||vt),Hr=Pr||xr||Or||Ur||Nr||$r;if(!(Ja||Hr)){Object.entries(h).forEach(([O,Yt])=>{c[O]=Yt}),p(),h=void 0;return}Object.entries(a).forEach(([O,{get:Yt,mediaEvents:Fo=[],textTracksEvents:Wo=[],videoRenditionsEvents:Vo=[],audioTracksEvents:Ko=[],remoteEvents:Go=[],rootEvents:qo=[],stateOwnersUpdateHandlers:Yo=[]}])=>{m[O]||(m[O]={});const le=$=>{const K=Yt(c,$);g({[O]:K})};let X;X=m[O].mediaEvents,Fo.forEach($=>{X&&wr&&(c.media.removeEventListener($,X),m[O].mediaEvents=void 0),Pr&&(h.media.addEventListener($,le),m[O].mediaEvents=le)}),X=m[O].textTracksEvents,Wo.forEach($=>{var K,pe;X&&Mr&&((K=c.media.textTracks)==null||K.removeEventListener($,X),m[O].textTracksEvents=void 0),xr&&((pe=h.media.textTracks)==null||pe.addEventListener($,le),m[O].textTracksEvents=le)}),X=m[O].videoRenditionsEvents,Vo.forEach($=>{var K,pe;X&&Lr&&((K=c.media.videoRenditions)==null||K.removeEventListener($,X),m[O].videoRenditionsEvents=void 0),Or&&((pe=h.media.videoRenditions)==null||pe.addEventListener($,le),m[O].videoRenditionsEvents=le)}),X=m[O].audioTracksEvents,Ko.forEach($=>{var K,pe;X&&Rr&&((K=c.media.audioTracks)==null||K.removeEventListener($,X),m[O].audioTracksEvents=void 0),Ur&&((pe=h.media.audioTracks)==null||pe.addEventListener($,le),m[O].audioTracksEvents=le)}),X=m[O].remoteEvents,Go.forEach($=>{var K,pe;X&&Cr&&((K=c.media.remote)==null||K.removeEventListener($,X),m[O].remoteEvents=void 0),Nr&&((pe=h.media.remote)==null||pe.addEventListener($,le),m[O].remoteEvents=le)}),X=m[O].rootEvents,qo.forEach($=>{X&&Dr&&(c.documentElement.removeEventListener($,X),m[O].rootEvents=void 0),$r&&(h.documentElement.addEventListener($,le),m[O].rootEvents=le)});const ki=m[O].stateOwnersUpdateHandlers;if(ki&&Ja&&(Array.isArray(ki)?ki:[ki]).forEach(K=>{typeof K=="function"&&K()}),Hr){const $=Yo.map(K=>K(le,h)).filter(K=>typeof K=="function");m[O].stateOwnersUpdateHandlers=$.length===1?$[0]:$}else Ja&&(m[O].stateOwnersUpdateHandlers=void 0)}),Object.entries(h).forEach(([O,Yt])=>{c[O]=Yt}),p(),h=void 0};return b({media:t,fullscreenElement:e,documentElement:i,options:r}),{dispatch(v){const{type:T,detail:I}=v;if(s[T]&&y.mediaErrorCode==null){g(s[T](a,c,v));return}T==="mediaelementchangerequest"?b({media:I}):T==="fullscreenelementchangerequest"?b({fullscreenElement:I}):T==="documentelementchangerequest"?b({documentElement:I}):T==="optionschangerequest"&&(Object.entries(I??{}).forEach(([z,Be])=>{c.options[z]=Be}),p())},getState(){return y},subscribe(v){return b({},d.length+1),d.push(v),v(y),()=>{const T=d.indexOf(v);T>=0&&(b({},d.length-1),d.splice(T,1))}}}};var Qs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},_=(t,e,i)=>(Qs(t,e,"read from private field"),i?i.call(t):e.get(t)),ue=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Se=(t,e,i,a)=>(Qs(t,e,"write to private field"),e.set(t,i),i),zt=(t,e,i)=>(Qs(t,e,"access private method"),i),ze,ai,M,lt,si,ke,Wi,ri,Vi,fs,ct,Ki,gs,_s,ao;const so=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],jr=10,Jr=.025,en=.25,bd=.25,Ad=2,u={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};let ro=class extends Si{constructor(){super(),ue(this,Vi),ue(this,Ki),ue(this,_s),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,ue(this,ze,new Qn(this,u.HOTKEYS)),ue(this,ai,void 0),ue(this,M,void 0),ue(this,lt,null),ue(this,si,void 0),ue(this,ke,void 0),ue(this,Wi,i=>{var a;(a=_(this,M))==null||a.dispatch(i)}),ue(this,ri,void 0),ue(this,ct,i=>{const{key:a,shiftKey:s}=i;if(!(s&&(a==="/"||a==="?")||so.includes(a))){this.removeEventListener("keyup",_(this,ct));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};Se(this,si,i=>{Object.entries(i).forEach(([a,s])=>{if(a in e&&e[a]===s)return;this.propagateMediaState(a,s);const r=a.toLowerCase(),o=new l.CustomEvent(Al[r],{composed:!0,detail:s});this.dispatchEvent(o)}),e=i}),this.hasAttribute(u.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(u.NO_HOTKEYS,u.HOTKEYS,u.DEFAULT_STREAM_TYPE,u.DEFAULT_SUBTITLES,u.DEFAULT_DURATION,u.NO_MUTED_PREF,u.NO_VOLUME_PREF,u.LANG,u.LOOP)}get mediaStore(){return _(this,M)}set mediaStore(e){var i,a;if(_(this,M)&&((i=_(this,ke))==null||i.call(this),Se(this,ke,void 0)),Se(this,M,e),!_(this,M)&&!this.hasAttribute(u.NO_DEFAULT_STORE)){zt(this,Vi,fs).call(this);return}Se(this,ke,(a=_(this,M))==null?void 0:a.subscribe(_(this,si)))}get fullscreenElement(){var e;return(e=_(this,ai))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(u.FULLSCREEN_ELEMENT)&&this.removeAttribute(u.FULLSCREEN_ELEMENT),Se(this,ai,e),(i=_(this,M))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return k(this,u.DEFAULT_SUBTITLES)}set defaultSubtitles(e){w(this,u.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return F(this,u.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){W(this,u.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return B(this,u.DEFAULT_DURATION)}set defaultDuration(e){te(this,u.DEFAULT_DURATION,e)}get noHotkeys(){return k(this,u.NO_HOTKEYS)}set noHotkeys(e){w(this,u.NO_HOTKEYS,e)}get keysUsed(){return F(this,u.KEYS_USED)}set keysUsed(e){W(this,u.KEYS_USED,e)}get liveEdgeOffset(){return B(this,u.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){te(this,u.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return k(this,u.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){w(this,u.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return k(this,u.NO_VOLUME_PREF)}set noVolumePref(e){w(this,u.NO_VOLUME_PREF,e)}get noMutedPref(){return k(this,u.NO_MUTED_PREF)}set noMutedPref(e){w(this,u.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return k(this,u.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){w(this,u.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return k(this,u.NO_DEFAULT_STORE)}set noDefaultStore(e){w(this,u.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var s,r,o,d,c,y,g,p,m,h,b,v;if(super.attributeChangedCallback(e,i,a),e===u.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(u.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===u.HOTKEYS)_(this,ze).value=a;else if(e===u.DEFAULT_SUBTITLES&&a!==i)(s=_(this,M))==null||s.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(u.DEFAULT_SUBTITLES)}});else if(e===u.DEFAULT_STREAM_TYPE)(o=_(this,M))==null||o.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(r=this.getAttribute(u.DEFAULT_STREAM_TYPE))!=null?r:void 0}});else if(e===u.LIVE_EDGE_OFFSET)(d=_(this,M))==null||d.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(u.LIVE_EDGE_OFFSET)}});else if(e===u.SEEK_TO_LIVE_OFFSET)(c=_(this,M))==null||c.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===u.NO_AUTO_SEEK_TO_LIVE)(y=_(this,M))==null||y.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(u.NO_AUTO_SEEK_TO_LIVE)}});else if(e===u.FULLSCREEN_ELEMENT){const T=a?(g=this.getRootNode())==null?void 0:g.getElementById(a):void 0;Se(this,ai,T),(p=_(this,M))==null||p.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===u.LANG&&a!==i?(Ml(a),(m=_(this,M))==null||m.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===u.LOOP&&a!==i?(h=_(this,M))==null||h.dispatch({type:E.MEDIA_LOOP_REQUEST,detail:a!=null}):e===u.NO_VOLUME_PREF&&a!==i?(b=_(this,M))==null||b.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(u.NO_VOLUME_PREF)}}):e===u.NO_MUTED_PREF&&a!==i&&((v=_(this,M))==null||v.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(u.NO_MUTED_PREF)}}))}connectedCallback(){var e,i;!_(this,M)&&!this.hasAttribute(u.NO_DEFAULT_STORE)&&zt(this,Vi,fs).call(this),(e=_(this,M))==null||e.dispatch({type:"documentelementchangerequest",detail:ne}),super.connectedCallback(),_(this,M)&&!_(this,ke)&&Se(this,ke,(i=_(this,M))==null?void 0:i.subscribe(_(this,si))),_(this,ri)!==void 0&&_(this,M)&&this.media&&setTimeout(()=>{var a,s,r;(s=(a=this.media)==null?void 0:a.textTracks)!=null&&s.length&&((r=_(this,M))==null||r.dispatch({type:E.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:_(this,ri)}))},0),this.hasAttribute(u.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,s,r;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),_(this,M)){const o=_(this,M).getState();Se(this,ri,!!((i=o.mediaSubtitlesShowing)!=null&&i.length)),(a=_(this,M))==null||a.dispatch({type:"documentelementchangerequest",detail:void 0}),(s=_(this,M))==null||s.dispatch({type:E.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}_(this,ke)&&((r=_(this,ke))==null||r.call(this),Se(this,ke,void 0)),this.unassociateElement(this)}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=_(this,M))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=_(this,M))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){sn(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),s=this.unregisterMediaStateReceiver.bind(this),r=wd(e,a,s);Object.values(E).forEach(o=>{e.addEventListener(o,_(this,Wi))}),i.set(e,r)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(E).forEach(s=>{e.removeEventListener(s,_(this,Wi))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),_(this,M)&&Object.entries(_(this,M).getState()).forEach(([s,r])=>{sn([e],s,r)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",zt(this,Ki,gs))}disableHotkeys(){this.removeEventListener("keydown",zt(this,Ki,gs)),this.removeEventListener("keyup",_(this,ct))}get hotkeys(){return F(this,u.HOTKEYS)}set hotkeys(e){W(this,u.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,s,r,o,d,c,y,g;const p=e.target;if(((s=(a=(i=p.getAttribute(u.KEYS_USED))==null?void 0:i.split(" "))!=null?a:p==null?void 0:p.keysUsed)!=null?s:[]).map(I=>I==="Space"?" ":I).filter(Boolean).includes(e.key))return;let h,b,v;if(!(_(this,ze).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&_(this,ze).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&_(this,ze).contains("noshift+/")))switch(e.key){case" ":case"k":h=_(this,M).getState().mediaPaused?E.MEDIA_PLAY_REQUEST:E.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new l.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"m":h=this.mediaStore.getState().mediaVolumeLevel==="off"?E.MEDIA_UNMUTE_REQUEST:E.MEDIA_MUTE_REQUEST,this.dispatchEvent(new l.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"f":h=this.mediaStore.getState().mediaIsFullscreen?E.MEDIA_EXIT_FULLSCREEN_REQUEST:E.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new l.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new l.CustomEvent(E.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const I=this.hasAttribute(u.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(u.KEYBOARD_BACKWARD_SEEK_OFFSET):jr;b=Math.max(((r=this.mediaStore.getState().mediaCurrentTime)!=null?r:0)-I,0),v=new l.CustomEvent(E.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(v);break}case"ArrowRight":case"l":{const I=this.hasAttribute(u.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(u.KEYBOARD_FORWARD_SEEK_OFFSET):jr;b=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)+I,0),v=new l.CustomEvent(E.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(v);break}case"ArrowUp":{const I=this.hasAttribute(u.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(u.KEYBOARD_UP_VOLUME_STEP):Jr;b=Math.min(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)+I,1),v=new l.CustomEvent(E.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(v);break}case"ArrowDown":{const I=this.hasAttribute(u.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(u.KEYBOARD_DOWN_VOLUME_STEP):Jr;b=Math.max(((c=this.mediaStore.getState().mediaVolume)!=null?c:1)-I,0),v=new l.CustomEvent(E.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(v);break}case"<":{const I=(y=this.mediaStore.getState().mediaPlaybackRate)!=null?y:1;b=Math.max(I-en,bd).toFixed(2),v=new l.CustomEvent(E.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(v);break}case">":{const I=(g=this.mediaStore.getState().mediaPlaybackRate)!=null?g:1;b=Math.min(I+en,Ad).toFixed(2),v=new l.CustomEvent(E.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(v);break}case"/":case"?":{e.shiftKey&&zt(this,_s,ao).call(this);break}case"p":{h=this.mediaStore.getState().mediaIsPip?E.MEDIA_EXIT_PIP_REQUEST:E.MEDIA_ENTER_PIP_REQUEST,v=new l.CustomEvent(h,{composed:!0,bubbles:!0}),this.dispatchEvent(v);break}}}};ze=new WeakMap;ai=new WeakMap;M=new WeakMap;lt=new WeakMap;si=new WeakMap;ke=new WeakMap;Wi=new WeakMap;ri=new WeakMap;Vi=new WeakSet;fs=function(){var t;this.mediaStore=_d({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(u.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(u.DEFAULT_DURATION)?+this.getAttribute(u.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(u.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(u.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(u.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(u.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(u.NO_SUBTITLES_LANG_PREF)}})};ct=new WeakMap;Ki=new WeakSet;gs=function(t){var e;const{metaKey:i,altKey:a,key:s,shiftKey:r}=t,o=r&&(s==="/"||s==="?");if(o&&((e=_(this,lt))!=null&&e.open)){this.removeEventListener("keyup",_(this,ct));return}if(i||a||!o&&!so.includes(s)){this.removeEventListener("keyup",_(this,ct));return}const d=t.target,c=d instanceof HTMLElement&&(d.tagName.toLowerCase()==="media-volume-range"||d.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s)&&!(_(this,ze).contains(`no${s.toLowerCase()}`)||s===" "&&_(this,ze).contains("nospace"))&&!c&&t.preventDefault(),this.addEventListener("keyup",_(this,ct),{once:!0})};_s=new WeakSet;ao=function(){_(this,lt)||(Se(this,lt,ne.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(_(this,lt))),_(this,lt).open=!0};const Td=Object.values(n),yd=Object.values(wn),no=t=>{var e,i,a,s;let{observedAttributes:r}=t.constructor;!r&&((e=t.nodeName)!=null&&e.includes("-"))&&(l.customElements.upgrade(t),{observedAttributes:r}=t.constructor);const o=(s=(a=(i=t==null?void 0:t.getAttribute)==null?void 0:i.call(t,D.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:s.call(a,/\s+/);return Array.isArray(r||o)?(r||o).filter(d=>Td.includes(d)):[]},Id=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&l.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof l.customElements.get(t.nodeName.toLowerCase()))&&l.customElements.upgrade(t),yd.some(a=>a in t)},bs=t=>Id(t)||!!no(t).length,tn=t=>{var e;return(e=t==null?void 0:t.join)==null?void 0:e.call(t,":")},an={[n.MEDIA_SUBTITLES_LIST]:vs,[n.MEDIA_SUBTITLES_SHOWING]:vs,[n.MEDIA_SEEKABLE]:tn,[n.MEDIA_BUFFERED]:t=>t==null?void 0:t.map(tn).join(" "),[n.MEDIA_PREVIEW_COORDS]:t=>t==null?void 0:t.join(" "),[n.MEDIA_RENDITION_LIST]:yl,[n.MEDIA_AUDIO_TRACK_LIST]:Sl},Sd=async(t,e,i)=>{var a,s;if(t.isConnected||await Ln(0),typeof i=="boolean"||i==null)return w(t,e,i);if(typeof i=="number")return te(t,e,i);if(typeof i=="string")return W(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const r=(s=(a=an[e])==null?void 0:a.call(an,i))!=null?s:i;return t.setAttribute(e,r)},kd=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},st=(t,e)=>{if(kd(t))return;const i=(s,r)=>{var o,d;bs(s)&&r(s);const{children:c=[]}=s??{},y=(d=(o=s==null?void 0:s.shadowRoot)==null?void 0:o.children)!=null?d:[];[...c,...y].forEach(p=>st(p,r))},a=t==null?void 0:t.nodeName.toLowerCase();if(a.includes("-")&&!bs(t)){l.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},sn=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const s=no(a),r=e.toLowerCase();s.includes(r)&&Sd(a,r,i)})},wd=(t,e,i)=>{st(t,e);const a=g=>{var p;const m=(p=g==null?void 0:g.composedPath()[0])!=null?p:g.target;e(m)},s=g=>{var p;const m=(p=g==null?void 0:g.composedPath()[0])!=null?p:g.target;i(m)};t.addEventListener(E.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(E.UNREGISTER_MEDIA_STATE_RECEIVER,s);const r=g=>{g.forEach(p=>{const{addedNodes:m=[],removedNodes:h=[],type:b,target:v,attributeName:T}=p;b==="childList"?(Array.prototype.forEach.call(m,I=>st(I,e)),Array.prototype.forEach.call(h,I=>st(I,i))):b==="attributes"&&T===D.MEDIA_CHROME_ATTRIBUTES&&(bs(v)?e(v):i(v))})};let o=[];const d=g=>{const p=g.target;p.name!=="media"&&(o.forEach(m=>st(m,i)),o=[...p.assignedElements({flatten:!0})],o.forEach(m=>st(m,e)))};t.addEventListener("slotchange",d);const c=new MutationObserver(r);return c.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{st(t,i),t.removeEventListener("slotchange",d),c.disconnect(),t.removeEventListener(E.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(E.UNREGISTER_MEDIA_STATE_RECEIVER,s)}};l.customElements.get("media-controller")||l.customElements.define("media-controller",ro);var Md=ro;const gt={PLACEMENT:"placement",BOUNDS:"bounds"};function Ld(t){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}class Pa extends l.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Fn(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),s=(e=Ii(this,"#"+this.bounds))!=null?e:Dl(this);if(!s)return;const{x:r,width:o}=s.getBoundingClientRect(),{x:d,width:c}=this.getBoundingClientRect(),y=d+c,g=r+o,p=a.getPropertyValue("--media-tooltip-offset-x"),m=p?parseFloat(p.replace("px","")):0,h=a.getPropertyValue("--media-tooltip-container-margin"),b=h?parseFloat(h.replace("px","")):0,v=d-r+m-b,T=y-g+m+b;if(v<0){this.style.setProperty("--media-tooltip-offset-x",`${v}px`);return}if(T>0){this.style.setProperty("--media-tooltip-offset-x",`${T}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[gt.PLACEMENT,gt.BOUNDS]}get placement(){return F(this,gt.PLACEMENT)}set placement(e){W(this,gt.PLACEMENT,e)}get bounds(){return F(this,gt.BOUNDS)}set bounds(e){W(this,gt.BOUNDS,e)}}Pa.shadowRootOptions={mode:"open"};Pa.getTemplateHTML=Ld;l.customElements.get("media-tooltip")||l.customElements.define("media-tooltip",Pa);var As=Pa,zs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},q=(t,e,i)=>(zs(t,e,"read from private field"),i?i.call(t):e.get(t)),_t=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ri=(t,e,i,a)=>(zs(t,e,"write to private field"),e.set(t,i),i),Rd=(t,e,i)=>(zs(t,e,"access private method"),i),we,$t,Ze,kt,Gi,Ts,oo;const Fe={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function Cd(t,e={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${As.shadowRootOptions.mode}">
          ${As.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}function Dd(t,e){return`
    <slot></slot>
  `}function Pd(){return""}class ie extends l.HTMLElement{constructor(){if(super(),_t(this,Ts),_t(this,we,void 0),this.preventClick=!1,this.tooltipEl=null,_t(this,$t,e=>{this.preventClick||this.handleClick(e),setTimeout(q(this,Ze),0)}),_t(this,Ze,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),_t(this,kt,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",q(this,kt));return}this.preventClick||this.handleClick(e)}),_t(this,Gi,e=>{const{metaKey:i,altKey:a,key:s}=e;if(i||a||!this.keysUsed.includes(s)){this.removeEventListener("keyup",q(this,kt));return}this.addEventListener("keyup",q(this,kt),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",Fe.TOOLTIP_PLACEMENT,D.MEDIA_CONTROLLER,n.MEDIA_LANG]}enable(){this.addEventListener("click",q(this,$t)),this.addEventListener("keydown",q(this,Gi)),this.tabIndex=0}disable(){this.removeEventListener("click",q(this,$t)),this.removeEventListener("keydown",q(this,Gi)),this.removeEventListener("keyup",q(this,kt)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===D.MEDIA_CONTROLLER?(i&&((r=(s=q(this,we))==null?void 0:s.unassociateElement)==null||r.call(s,this),Ri(this,we,null)),a&&this.isConnected&&(Ri(this,we,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=q(this,we))==null?void 0:d.associateElement)==null||c.call(d,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===Fe.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===n.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),q(this,Ze).call(this)}connectedCallback(){var e,i,a;const{style:s}=Q(this.shadowRoot,":host");s.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const r=this.getAttribute(D.MEDIA_CONTROLLER);r&&(Ri(this,we,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=q(this,we))==null?void 0:i.associateElement)==null||a.call(i,this)),l.customElements.whenDefined("media-tooltip").then(()=>Rd(this,Ts,oo).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=q(this,we))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ri(this,we,null),this.removeEventListener("mouseenter",q(this,Ze)),this.removeEventListener("focus",q(this,Ze)),this.removeEventListener("click",q(this,$t))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return F(this,Fe.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){W(this,Fe.TOOLTIP_PLACEMENT,e)}get mediaController(){return F(this,D.MEDIA_CONTROLLER)}set mediaController(e){W(this,D.MEDIA_CONTROLLER,e)}get disabled(){return k(this,Fe.DISABLED)}set disabled(e){w(this,Fe.DISABLED,e)}get noTooltip(){return k(this,Fe.NO_TOOLTIP)}set noTooltip(e){w(this,Fe.NO_TOOLTIP,e)}handleClick(e){}}we=new WeakMap;$t=new WeakMap;Ze=new WeakMap;kt=new WeakMap;Gi=new WeakMap;Ts=new WeakSet;oo=function(){this.addEventListener("mouseenter",q(this,Ze)),this.addEventListener("focus",q(this,Ze)),this.addEventListener("click",q(this,$t));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};ie.shadowRootOptions={mode:"open"};ie.getTemplateHTML=Cd;ie.getSlotTemplateHTML=Dd;ie.getTooltipContentHTML=Pd;l.customElements.get("media-chrome-button")||l.customElements.define("media-chrome-button",ie);var xd=ie;const rn=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function Od(t){return`
    <style>
      :host([${n.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${n.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${rn}</slot>
      <slot name="exit">${rn}</slot>
    </slot>
  `}function Ud(){return`
    <slot name="tooltip-enter">${f("start airplay")}</slot>
    <slot name="tooltip-exit">${f("stop airplay")}</slot>
  `}const nn=t=>{const e=t.mediaIsAirplaying?f("stop airplay"):f("start airplay");t.setAttribute("aria-label",e)};class xa extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_AIRPLAYING,n.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),nn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_AIRPLAYING&&nn(this)}get mediaIsAirplaying(){return k(this,n.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){w(this,n.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return F(this,n.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){W(this,n.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new l.CustomEvent(E.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}xa.getSlotTemplateHTML=Od;xa.getTooltipContentHTML=Ud;l.customElements.get("media-airplay-button")||l.customElements.define("media-airplay-button",xa);var Nd=xa;const $d=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Hd=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function Bd(t){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${$d}</slot>
      <slot name="off">${Hd}</slot>
    </slot>
  `}function Fd(){return`
    <slot name="tooltip-enable">${f("Enable captions")}</slot>
    <slot name="tooltip-disable">${f("Disable captions")}</slot>
  `}const on=t=>{t.setAttribute("aria-checked",Xl(t).toString())};class Oa extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",f("closed captions")),on(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&on(this)}get mediaSubtitlesList(){return ln(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){dn(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return ln(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){dn(this,n.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new l.CustomEvent(E.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}Oa.getSlotTemplateHTML=Bd;Oa.getTooltipContentHTML=Fd;const ln=(t,e)=>{const i=t.getAttribute(e);return i?Zn(i):[]},dn=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}const a=vs(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};l.customElements.get("media-captions-button")||l.customElements.define("media-captions-button",Oa);var Wd=Oa;const Vd='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',Kd='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function Gd(t){return`
    <style>
      :host([${n.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${n.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Vd}</slot>
      <slot name="exit">${Kd}</slot>
    </slot>
  `}function qd(){return`
    <slot name="tooltip-enter">${f("Start casting")}</slot>
    <slot name="tooltip-exit">${f("Stop casting")}</slot>
  `}const cn=t=>{const e=t.mediaIsCasting?f("stop casting"):f("start casting");t.setAttribute("aria-label",e)};class Ua extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_CASTING,n.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),cn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_CASTING&&cn(this)}get mediaIsCasting(){return k(this,n.MEDIA_IS_CASTING)}set mediaIsCasting(e){w(this,n.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return F(this,n.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){W(this,n.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?E.MEDIA_EXIT_CAST_REQUEST:E.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}}Ua.getSlotTemplateHTML=Gd;Ua.getTooltipContentHTML=qd;l.customElements.get("media-cast-button")||l.customElements.define("media-cast-button",Ua);var Yd=Ua,Zs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ut=(t,e,i)=>(Zs(t,e,"read from private field"),e.get(t)),Oe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xs=(t,e,i,a)=>(Zs(t,e,"write to private field"),e.set(t,i),i),it=(t,e,i)=>(Zs(t,e,"access private method"),i),ga,_i,ht,qi,ys,Is,lo,Ss,co,ks,uo,ws,ho,Ms,mo;function Qd(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(t)}
  `}function zd(t){return`
    <slot id="content"></slot>
  `}const Zt={OPEN:"open",ANCHOR:"anchor"};class mt extends l.HTMLElement{constructor(){super(),Oe(this,qi),Oe(this,Is),Oe(this,Ss),Oe(this,ks),Oe(this,ws),Oe(this,Ms),Oe(this,ga,!1),Oe(this,_i,null),Oe(this,ht,null)}static get observedAttributes(){return[Zt.OPEN,Zt.ANCHOR]}get open(){return k(this,Zt.OPEN)}set open(e){w(this,Zt.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":it(this,ks,uo).call(this,e);break;case"focusout":it(this,ws,ho).call(this,e);break;case"keydown":it(this,Ms,mo).call(this,e);break}}connectedCallback(){it(this,qi,ys).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){it(this,qi,ys).call(this),e===Zt.OPEN&&a!==i&&(this.open?it(this,Is,lo).call(this):it(this,Ss,co).call(this))}focus(){Xs(this,_i,Bn());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a==null||a.focus()}get keysUsed(){return["Escape","Tab"]}}ga=new WeakMap;_i=new WeakMap;ht=new WeakMap;qi=new WeakSet;ys=function(){if(!ut(this,ga)&&(Xs(this,ga,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=Q(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};Is=new WeakSet;lo=function(){var t;(t=ut(this,ht))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Ss=new WeakSet;co=function(){var t;(t=ut(this,ht))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};ks=new WeakSet;uo=function(t){Xs(this,ht,t.relatedTarget),qt(this,t.relatedTarget)||(this.open=!this.open)};ws=new WeakSet;ho=function(t){var e;qt(this,t.relatedTarget)||((e=ut(this,_i))==null||e.focus(),ut(this,ht)&&ut(this,ht)!==t.relatedTarget&&this.open&&(this.open=!1))};Ms=new WeakSet;mo=function(t){var e,i,a,s,r;const{key:o,ctrlKey:d,altKey:c,metaKey:y}=t;d||c||y||this.keysUsed.includes(o)&&(t.preventDefault(),t.stopPropagation(),o==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(s=(a=this.nextElementSibling)==null?void 0:a.focus)==null||s.call(a),this.blur()):o==="Escape"&&((r=ut(this,_i))==null||r.focus(),this.open=!1))};mt.shadowRootOptions={mode:"open"};mt.getTemplateHTML=Qd;mt.getSlotTemplateHTML=zd;l.customElements.get("media-chrome-dialog")||l.customElements.define("media-chrome-dialog",mt);var Zd=mt,js=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},H=(t,e,i)=>(js(t,e,"read from private field"),i?i.call(t):e.get(t)),ae=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ge=(t,e,i,a)=>(js(t,e,"write to private field"),e.set(t,i),i),fe=(t,e,i)=>(js(t,e,"access private method"),i),Me,Na,Yi,Qi,ge,_a,zi,Zi,Xi,Js,po,ji,Ls,Ji,Rs,ba,er,Cs,Eo,Ds,vo,Ps,fo,xs,go;function Xd(t){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(t)}
    </div>
    <div id="rightgap"></div>
  `}function jd(t){return""}class pt extends l.HTMLElement{constructor(){if(super(),ae(this,Js),ae(this,ji),ae(this,Ji),ae(this,ba),ae(this,Cs),ae(this,Ds),ae(this,Ps),ae(this,xs),ae(this,Me,void 0),ae(this,Na,void 0),ae(this,Yi,void 0),ae(this,Qi,void 0),ae(this,ge,{}),ae(this,_a,[]),ae(this,zi,()=>{if(this.range.matches(":focus-visible")){const{style:e}=Q(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),ae(this,Zi,()=>{const{style:e}=Q(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),ae(this,Xi,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),Ge(this,Yi,this.shadowRoot.querySelector("#startpoint")),Ge(this,Qi,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",D.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===D.MEDIA_CONTROLLER?(i&&((r=(s=H(this,Me))==null?void 0:s.unassociateElement)==null||r.call(s,this),Ge(this,Me,null)),a&&this.isConnected&&(Ge(this,Me,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=H(this,Me))==null?void 0:d.associateElement)==null||c.call(d,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),fe(this,ji,Ls).call(this)):(this.range.setAttribute(e,a),fe(this,Ji,Rs).call(this)))}connectedCallback(){var e,i,a;const{style:s}=Q(this.shadowRoot,":host");s.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),H(this,ge).pointer=Q(this.shadowRoot,"#pointer"),H(this,ge).progress=Q(this.shadowRoot,"#progress"),H(this,ge).thumb=Q(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),H(this,ge).activeSegment=Q(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const r=this.getAttribute(D.MEDIA_CONTROLLER);r&&(Ge(this,Me,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=H(this,Me))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",H(this,zi)),this.shadowRoot.addEventListener("focusout",H(this,Zi)),fe(this,ji,Ls).call(this),Un(this.container,H(this,Xi))}disconnectedCallback(){var e,i;fe(this,Ji,Rs).call(this),(i=(e=H(this,Me))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ge(this,Me,null),this.shadowRoot.removeEventListener("focusin",H(this,zi)),this.shadowRoot.removeEventListener("focusout",H(this,Zi)),Nn(this.container,H(this,Xi))}updatePointerBar(e){var i;(i=H(this,ge).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=H(this,ge).progress)==null||e.style.setProperty("width",`${a}%`),(i=H(this,ge).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!(e!=null&&e.length)),!(e!=null&&e.length))return;const a=[...new Set([+this.range.min,...e.flatMap(r=>[r.start,r.end]),+this.range.max])];Ge(this,_a,[...a]);const s=a.pop();for(const[r,o]of a.entries()){const[d,c]=[r===0,r===a.length-1],y=d?"calc(var(--segments-gap) / -1)":`${o*100}%`,p=`calc(${((c?s:a[r+1])-o)*100}%${d||c?"":" - var(--segments-gap)"})`,m=ne.createElementNS("http://www.w3.org/2000/svg","rect"),h=Wn(this.shadowRoot,`#segments-clipping rect:nth-child(${r+1})`);h.style.setProperty("x",y),h.style.setProperty("width",p),i.append(m)}}getPointerRatio(e){return Ul(e.clientX,e.clientY,H(this,Yi).getBoundingClientRect(),H(this,Qi).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":fe(this,xs,go).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":fe(this,Cs,Eo).call(this,e);break;case"pointerdown":fe(this,ba,er).call(this,e);break;case"pointerup":fe(this,Ds,vo).call(this);break;case"pointerleave":fe(this,Ps,fo).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}Me=new WeakMap;Na=new WeakMap;Yi=new WeakMap;Qi=new WeakMap;ge=new WeakMap;_a=new WeakMap;zi=new WeakMap;Zi=new WeakMap;Xi=new WeakMap;Js=new WeakSet;po=function(t){const e=H(this,ge).activeSegment;if(!e)return;const i=this.getPointerRatio(t),s=`#segments-clipping rect:nth-child(${H(this,_a).findIndex((r,o,d)=>{const c=d[o+1];return c!=null&&i>=r&&i<=c})+1})`;(e.selectorText!=s||!e.style.transform)&&(e.selectorText=s,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};ji=new WeakSet;Ls=function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};Ji=new WeakSet;Rs=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=l.window)==null||t.removeEventListener("pointerup",this),(e=l.window)==null||e.removeEventListener("pointermove",this)};ba=new WeakSet;er=function(t){var e;Ge(this,Na,t.composedPath().includes(this.range)),(e=l.window)==null||e.addEventListener("pointerup",this,{once:!0})};Cs=new WeakSet;Eo=function(t){var e;t.pointerType!=="mouse"&&fe(this,ba,er).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=l.window)==null||e.addEventListener("pointermove",this)};Ds=new WeakSet;vo=function(){var t;(t=l.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};Ps=new WeakSet;fo=function(){var t,e;this.removeEventListener("pointerleave",this),(t=l.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=H(this,ge).activeSegment)==null||e.style.removeProperty("transform")};xs=new WeakSet;go=function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),fe(this,Js,po).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!H(this,Na))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))};pt.shadowRootOptions={mode:"open"};pt.getTemplateHTML=Xd;pt.getContainerTemplateHTML=jd;l.customElements.get("media-chrome-range")||l.customElements.define("media-chrome-range",pt);var Jd=pt,_o=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ci=(t,e,i)=>(_o(t,e,"read from private field"),i?i.call(t):e.get(t)),ec=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Di=(t,e,i,a)=>(_o(t,e,"write to private field"),e.set(t,i),i),Le;function tc(t){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}let $a=class extends l.HTMLElement{constructor(){if(super(),ec(this,Le,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[D.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===D.MEDIA_CONTROLLER&&(i&&((r=(s=Ci(this,Le))==null?void 0:s.unassociateElement)==null||r.call(s,this),Di(this,Le,null)),a&&this.isConnected&&(Di(this,Le,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=Ci(this,Le))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;const s=this.getAttribute(D.MEDIA_CONTROLLER);s&&(Di(this,Le,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=Ci(this,Le))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Ci(this,Le))==null?void 0:e.unassociateElement)==null||i.call(e,this),Di(this,Le,null)}};Le=new WeakMap;$a.shadowRootOptions={mode:"open"};$a.getTemplateHTML=tc;l.customElements.get("media-control-bar")||l.customElements.define("media-control-bar",$a);var ic=$a,bo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Pi=(t,e,i)=>(bo(t,e,"read from private field"),i?i.call(t):e.get(t)),ac=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},xi=(t,e,i,a)=>(bo(t,e,"write to private field"),e.set(t,i),i),Re;function sc(t,e={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}function rc(t,e){return`
    <slot></slot>
  `}class He extends l.HTMLElement{constructor(){if(super(),ac(this,Re,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[D.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===D.MEDIA_CONTROLLER&&(i&&((r=(s=Pi(this,Re))==null?void 0:s.unassociateElement)==null||r.call(s,this),xi(this,Re,null)),a&&this.isConnected&&(xi(this,Re,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=Pi(this,Re))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;const{style:s}=Q(this.shadowRoot,":host");s.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const r=this.getAttribute(D.MEDIA_CONTROLLER);r&&(xi(this,Re,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Pi(this,Re))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Pi(this,Re))==null?void 0:e.unassociateElement)==null||i.call(e,this),xi(this,Re,null)}}Re=new WeakMap;He.shadowRootOptions={mode:"open"};He.getTemplateHTML=sc;He.getSlotTemplateHTML=rc;l.customElements.get("media-text-display")||l.customElements.define("media-text-display",He);var nc=He,Ao=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},un=(t,e,i)=>(Ao(t,e,"read from private field"),i?i.call(t):e.get(t)),oc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},lc=(t,e,i,a)=>(Ao(t,e,"write to private field"),e.set(t,i),i),ni;function dc(t,e){return`
    <slot>${et(e.mediaDuration)}</slot>
  `}class tr extends He{constructor(){var e;super(),oc(this,ni,void 0),lc(this,ni,this.shadowRoot.querySelector("slot")),un(this,ni).textContent=et((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===n.MEDIA_DURATION&&(un(this,ni).textContent=et(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return B(this,n.MEDIA_DURATION)}set mediaDuration(e){te(this,n.MEDIA_DURATION,e)}}ni=new WeakMap;tr.getSlotTemplateHTML=dc;l.customElements.get("media-duration-display")||l.customElements.define("media-duration-display",tr);var cc=tr;const uc={2:f("Network Error"),3:f("Decode Error"),4:f("Source Not Supported"),5:f("Encryption Error")},hc={2:f("A network error caused the media download to fail."),3:f("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:f("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:f("The media is encrypted and there are no keys to decrypt it.")},ir=t=>{var e,i;return t.code===1?null:{title:(e=uc[t.code])!=null?e:`Error ${t.code}`,message:(i=hc[t.code])!=null?i:t.message}};var To=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},mc=(t,e,i)=>(To(t,e,"read from private field"),i?i.call(t):e.get(t)),pc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ec=(t,e,i,a)=>(To(t,e,"write to private field"),e.set(t,i),i),ea;function vc(t){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${yo({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function fc(t){return t.code&&ir(t)!==null}function yo(t){var e;const{title:i,message:a}=(e=ir(t))!=null?e:{};let s="";return i&&(s+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(s+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),s}const hn=[n.MEDIA_ERROR_CODE,n.MEDIA_ERROR_MESSAGE];class Ha extends mt{constructor(){super(...arguments),pc(this,ea,null)}static get observedAttributes(){return[...super.observedAttributes,...hn]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var s;if(super.attributeChangedCallback(e,i,a),!hn.includes(e))return;const r=(s=this.mediaError)!=null?s:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=fc(r),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(r),!this.hasAttribute("aria-label"))){const{title:o}=ir(r);o&&this.setAttribute("aria-label",o)}}get mediaError(){return mc(this,ea)}set mediaError(e){Ec(this,ea,e)}get mediaErrorCode(){return B(this,"mediaerrorcode")}set mediaErrorCode(e){te(this,"mediaerrorcode",e)}get mediaErrorMessage(){return F(this,"mediaerrormessage")}set mediaErrorMessage(e){W(this,"mediaerrormessage",e)}}ea=new WeakMap;Ha.getSlotTemplateHTML=vc;Ha.formatErrorMessage=yo;l.customElements.get("media-error-dialog")||l.customElements.define("media-error-dialog",Ha);var gc=Ha,_c=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},We=(t,e,i)=>(_c(t,e,"read from private field"),i?i.call(t):e.get(t)),mn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wt,Mt;function bc(t){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${Ac()}
    </slot>
  `}function Ac(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((r,o)=>o>0?`<span class="key-separator">or</span><span class="key">${r}</span>`:`<span class="key">${r}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}class ar extends mt{constructor(){super(...arguments),mn(this,wt,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const s=e.composedPath(),r=s[0]===this||s.includes(this),o=s.includes(a);r&&!o&&(this.open=!1)}),mn(this,Mt,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",We(this,wt)),document.addEventListener("keydown",We(this,Mt)))}disconnectedCallback(){this.removeEventListener("click",We(this,wt)),document.removeEventListener("keydown",We(this,Mt))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",We(this,wt)),document.addEventListener("keydown",We(this,Mt))):(this.removeEventListener("click",We(this,wt)),document.removeEventListener("keydown",We(this,Mt))))}}wt=new WeakMap;Mt=new WeakMap;ar.getSlotTemplateHTML=bc;l.customElements.get("media-keyboard-shortcuts-dialog")||l.customElements.define("media-keyboard-shortcuts-dialog",ar);var Tc=ar,Io=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},yc=(t,e,i)=>(Io(t,e,"read from private field"),e.get(t)),Ic=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Sc=(t,e,i,a)=>(Io(t,e,"write to private field"),e.set(t,i),i),ta;const kc=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,wc=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function Mc(t){return`
    <style>
      :host([${n.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${n.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${kc}</slot>
      <slot name="exit">${wc}</slot>
    </slot>
  `}function Lc(){return`
    <slot name="tooltip-enter">${f("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${f("Exit fullscreen mode")}</slot>
  `}const pn=t=>{const e=t.mediaIsFullscreen?f("exit fullscreen mode"):f("enter fullscreen mode");t.setAttribute("aria-label",e)};let Ba=class extends ie{constructor(){super(...arguments),Ic(this,ta,null)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_FULLSCREEN,n.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),pn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_FULLSCREEN&&pn(this)}get mediaFullscreenUnavailable(){return F(this,n.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){W(this,n.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return k(this,n.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){w(this,n.MEDIA_IS_FULLSCREEN,e)}handleClick(e){Sc(this,ta,e);const i=yc(this,ta)instanceof PointerEvent,a=this.mediaIsFullscreen?new l.CustomEvent(E.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new l.CustomEvent(E.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}};ta=new WeakMap;Ba.getSlotTemplateHTML=Mc;Ba.getTooltipContentHTML=Lc;l.customElements.get("media-fullscreen-button")||l.customElements.define("media-fullscreen-button",Ba);var Rc=Ba;const{MEDIA_TIME_IS_LIVE:ia,MEDIA_PAUSED:pi}=n,{MEDIA_SEEK_TO_LIVE_REQUEST:Cc,MEDIA_PLAY_REQUEST:Dc}=E,Pc='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function xc(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${ia}]:not([${pi}])) slot[name=indicator] > *,
      :host([${ia}]:not([${pi}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${ia}]:not([${pi}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${Pc}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${f("live")}</slot>
  `}const En=t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=f(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const s=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');s&&(s.textContent=f("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")};class sr extends ie{static get observedAttributes(){return[...super.observedAttributes,ia,pi]}connectedCallback(){super.connectedCallback(),En(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),En(this)}get mediaPaused(){return k(this,n.MEDIA_PAUSED)}set mediaPaused(e){w(this,n.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return k(this,n.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){w(this,n.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new l.CustomEvent(Cc,{composed:!0,bubbles:!0})),this.hasAttribute(pi)&&this.dispatchEvent(new l.CustomEvent(Dc,{composed:!0,bubbles:!0})))}}sr.getSlotTemplateHTML=xc;l.customElements.get("media-live-button")||l.customElements.define("media-live-button",sr);var Oc=sr,So=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Xt=(t,e,i)=>(So(t,e,"read from private field"),i?i.call(t):e.get(t)),vn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},jt=(t,e,i,a)=>(So(t,e,"write to private field"),e.set(t,i),i),Ce,aa;const Oi={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},ko=500,Uc=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function Nc(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${ko}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${Uc}</slot>
    <div id="status" role="status" aria-live="polite">${f("media loading")}</div>
  `}class Fa extends l.HTMLElement{constructor(){if(super(),vn(this,Ce,void 0),vn(this,aa,ko),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[D.MEDIA_CONTROLLER,n.MEDIA_PAUSED,n.MEDIA_LOADING,Oi.LOADING_DELAY]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===Oi.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===D.MEDIA_CONTROLLER&&(i&&((r=(s=Xt(this,Ce))==null?void 0:s.unassociateElement)==null||r.call(s,this),jt(this,Ce,null)),a&&this.isConnected&&(jt(this,Ce,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=Xt(this,Ce))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;const s=this.getAttribute(D.MEDIA_CONTROLLER);s&&(jt(this,Ce,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=Xt(this,Ce))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Xt(this,Ce))==null?void 0:e.unassociateElement)==null||i.call(e,this),jt(this,Ce,null)}get loadingDelay(){return Xt(this,aa)}set loadingDelay(e){jt(this,aa,e);const{style:i}=Q(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return k(this,n.MEDIA_PAUSED)}set mediaPaused(e){w(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return k(this,n.MEDIA_LOADING)}set mediaLoading(e){w(this,n.MEDIA_LOADING,e)}get mediaController(){return F(this,D.MEDIA_CONTROLLER)}set mediaController(e){W(this,D.MEDIA_CONTROLLER,e)}get noAutohide(){return k(this,Oi.NO_AUTOHIDE)}set noAutohide(e){w(this,Oi.NO_AUTOHIDE,e)}}Ce=new WeakMap;aa=new WeakMap;Fa.shadowRootOptions={mode:"open"};Fa.getTemplateHTML=Nc;l.customElements.get("media-loading-indicator")||l.customElements.define("media-loading-indicator",Fa);var $c=Fa;const Hc=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,fn=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,Bc=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function Fc(t){return`
    <style>
      :host(:not([${n.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${n.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${n.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${n.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${n.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${n.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${n.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${Hc}</slot>
      <slot name="low">${fn}</slot>
      <slot name="medium">${fn}</slot>
      <slot name="high">${Bc}</slot>
    </slot>
  `}function Wc(){return`
    <slot name="tooltip-mute">${f("Mute")}</slot>
    <slot name="tooltip-unmute">${f("Unmute")}</slot>
  `}const gn=t=>{const e=t.mediaVolumeLevel==="off",i=f(e?"unmute":"mute");t.setAttribute("aria-label",i)};let Wa=class extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),gn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_VOLUME_LEVEL&&gn(this)}get mediaVolumeLevel(){return F(this,n.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){W(this,n.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?E.MEDIA_UNMUTE_REQUEST:E.MEDIA_MUTE_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}};Wa.getSlotTemplateHTML=Fc;Wa.getTooltipContentHTML=Wc;l.customElements.get("media-mute-button")||l.customElements.define("media-mute-button",Wa);var Vc=Wa;const _n=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function Kc(t){return`
    <style>
      :host([${n.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${n.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${_n}</slot>
      <slot name="exit">${_n}</slot>
    </slot>
  `}function Gc(){return`
    <slot name="tooltip-enter">${f("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${f("Exit picture in picture mode")}</slot>
  `}const bn=t=>{const e=t.mediaIsPip?f("exit picture in picture mode"):f("enter picture in picture mode");t.setAttribute("aria-label",e)};class Va extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_PIP,n.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),bn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_PIP&&bn(this)}get mediaPipUnavailable(){return F(this,n.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){W(this,n.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return k(this,n.MEDIA_IS_PIP)}set mediaIsPip(e){w(this,n.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?E.MEDIA_EXIT_PIP_REQUEST:E.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}}Va.getSlotTemplateHTML=Kc;Va.getTooltipContentHTML=Gc;l.customElements.get("media-pip-button")||l.customElements.define("media-pip-button",Va);var qc=Va,Yc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},bt=(t,e,i)=>(Yc(t,e,"read from private field"),i?i.call(t):e.get(t)),Qc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},qe;const ls={RATES:"rates"},zc=[1,1.2,1.5,1.7,2],oi=1;function Zc(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||oi}x</slot>
  `}function Xc(){return f("Playback rate")}let Ka=class extends ie{constructor(){var e;super(),Qc(this,qe,new Qn(this,ls.RATES,{defaultValue:zc})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:oi}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,ls.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===ls.RATES&&(bt(this,qe).value=a),e===n.MEDIA_PLAYBACK_RATE){const s=a?+a:Number.NaN,r=Number.isNaN(s)?oi:s;this.container.innerHTML=`${r}x`,this.setAttribute("aria-label",f("Playback rate {playbackRate}",{playbackRate:r}))}}get rates(){return bt(this,qe)}set rates(e){e?Array.isArray(e)?bt(this,qe).value=e.join(" "):typeof e=="string"&&(bt(this,qe).value=e):bt(this,qe).value=""}get mediaPlaybackRate(){return B(this,n.MEDIA_PLAYBACK_RATE,oi)}set mediaPlaybackRate(e){te(this,n.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(bt(this,qe).values(),o=>+o).sort((o,d)=>o-d),s=(i=(e=a.find(o=>o>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:oi,r=new l.CustomEvent(E.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:s});this.dispatchEvent(r)}};qe=new WeakMap;Ka.getSlotTemplateHTML=Zc;Ka.getTooltipContentHTML=Xc;l.customElements.get("media-playback-rate-button")||l.customElements.define("media-playback-rate-button",Ka);var jc=Ka;const Jc=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,eu=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function tu(t){return`
    <style>
      :host([${n.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${n.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${n.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${n.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${Jc}</slot>
      <slot name="pause">${eu}</slot>
    </slot>
  `}function iu(){return`
    <slot name="tooltip-play">${f("Play")}</slot>
    <slot name="tooltip-pause">${f("Pause")}</slot>
  `}const An=t=>{const e=t.mediaPaused?f("play"):f("pause");t.setAttribute("aria-label",e)};let Ga=class extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),An(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===n.MEDIA_PAUSED||e===n.MEDIA_LANG)&&An(this)}get mediaPaused(){return k(this,n.MEDIA_PAUSED)}set mediaPaused(e){w(this,n.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?E.MEDIA_PLAY_REQUEST:E.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}};Ga.getSlotTemplateHTML=tu;Ga.getTooltipContentHTML=iu;l.customElements.get("media-play-button")||l.customElements.define("media-play-button",Ga);var au=Ga;const Te={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function su(t){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}const ru=t=>{t.style.removeProperty("background-image")},nu=(t,e)=>{t.style["background-image"]=`url('${e}')`};class qa extends l.HTMLElement{static get observedAttributes(){return[Te.PLACEHOLDER_SRC,Te.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Te.SRC&&(a==null?this.image.removeAttribute(Te.SRC):this.image.setAttribute(Te.SRC,a)),e===Te.PLACEHOLDER_SRC&&(a==null?ru(this.image):nu(this.image,a))}get placeholderSrc(){return F(this,Te.PLACEHOLDER_SRC)}set placeholderSrc(e){W(this,Te.SRC,e)}get src(){return F(this,Te.SRC)}set src(e){W(this,Te.SRC,e)}}qa.shadowRootOptions={mode:"open"};qa.getTemplateHTML=su;l.customElements.get("media-poster-image")||l.customElements.define("media-poster-image",qa);var ou=qa,wo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},lu=(t,e,i)=>(wo(t,e,"read from private field"),i?i.call(t):e.get(t)),du=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},cu=(t,e,i,a)=>(wo(t,e,"write to private field"),e.set(t,i),i),sa;class Mo extends He{constructor(){super(),du(this,sa,void 0),cu(this,sa,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_CHAPTER,n.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===n.MEDIA_PREVIEW_CHAPTER||e===n.MEDIA_LANG)&&a!==i&&a!=null)if(lu(this,sa).textContent=a,a!==""){const s=f("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",s)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return F(this,n.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){W(this,n.MEDIA_PREVIEW_CHAPTER,e)}}sa=new WeakMap;l.customElements.get("media-preview-chapter-display")||l.customElements.define("media-preview-chapter-display",Mo);var uu=Mo,Lo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ui=(t,e,i)=>(Lo(t,e,"read from private field"),i?i.call(t):e.get(t)),hu=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ni=(t,e,i,a)=>(Lo(t,e,"write to private field"),e.set(t,i),i),De;function mu(t){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}class Ya extends l.HTMLElement{constructor(){if(super(),hu(this,De,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Ae(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[D.MEDIA_CONTROLLER,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const s=this.getAttribute(D.MEDIA_CONTROLLER);s&&(Ni(this,De,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=Ui(this,De))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Ui(this,De))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ni(this,De,null)}attributeChangedCallback(e,i,a){var s,r,o,d,c;[n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===D.MEDIA_CONTROLLER&&(i&&((r=(s=Ui(this,De))==null?void 0:s.unassociateElement)==null||r.call(s,this),Ni(this,De,null)),a&&this.isConnected&&(Ni(this,De,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=Ui(this,De))==null?void 0:d.associateElement)==null||c.call(d,this)))}get mediaPreviewImage(){return F(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){W(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(n.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(n.MEDIA_PREVIEW_COORDS);return}this.setAttribute(n.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,s,r,o]=e,d=i.split("#")[0],c=getComputedStyle(this),{maxWidth:y,maxHeight:g,minWidth:p,minHeight:m}=c,h=c.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain";let b,v;if(h==="fill"){const N=parseInt(y)/r,Z=parseInt(g)/o,oe=parseInt(p)/r,tt=parseInt(m)/o;b=N<1?N:Math.max(N,oe),v=Z<1?Z:Math.max(Z,tt)}else{const N=Math.min(parseInt(y)/r,parseInt(g)/o),Z=Math.max(parseInt(p)/r,parseInt(m)/o),tt=N<1?N:Z>1?Z:1;b=tt,v=tt}const{style:T}=Q(this.shadowRoot,":host"),I=Q(this.shadowRoot,"img").style,z=this.shadowRoot.querySelector("img"),P=Math.min(b,v)<1?"min":"max";T.setProperty(`${P}-width`,"initial","important"),T.setProperty(`${P}-height`,"initial","important"),T.width=`${r*b}px`,T.height=`${o*v}px`;const x=()=>{I.width=`${this.imgWidth*b}px`,I.height=`${this.imgHeight*v}px`,I.display="block"};z.src!==d&&(z.onload=()=>{this.imgWidth=z.naturalWidth,this.imgHeight=z.naturalHeight,x(),z.onload=null},z.src=d,x()),x(),I.transform=`translate(-${a*b}px, -${s*v}px)`}}De=new WeakMap;Ya.shadowRootOptions={mode:"open"};Ya.getTemplateHTML=mu;l.customElements.get("media-preview-thumbnail")||l.customElements.define("media-preview-thumbnail",Ya);var Os=Ya,Ro=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Tn=(t,e,i)=>(Ro(t,e,"read from private field"),i?i.call(t):e.get(t)),pu=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Eu=(t,e,i,a)=>(Ro(t,e,"write to private field"),e.set(t,i),i),li;class Co extends He{constructor(){super(),pu(this,li,void 0),Eu(this,li,this.shadowRoot.querySelector("slot")),Tn(this,li).textContent=et(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_TIME&&a!=null&&(Tn(this,li).textContent=et(parseFloat(a)))}get mediaPreviewTime(){return B(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){te(this,n.MEDIA_PREVIEW_TIME,e)}}li=new WeakMap;l.customElements.get("media-preview-time-display")||l.customElements.define("media-preview-time-display",Co);var vu=Co;const At={SEEK_OFFSET:"seekoffset"},ds=30,fu=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function gu(t,e){return`
    <slot name="icon">${fu(e.seekOffset)}</slot>
  `}const _u=(t,e)=>{t.setAttribute("aria-label",f("seek back {seekOffset} seconds",{seekOffset:e}))};function bu(){return f("Seek backward")}const Au=0;let Qa=class extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,At.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=B(this,At.SEEK_OFFSET,ds)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),_u(this,this.seekOffset),e===At.SEEK_OFFSET&&(this.seekOffset=B(this,At.SEEK_OFFSET,ds))}get seekOffset(){return B(this,At.SEEK_OFFSET,ds)}set seekOffset(e){te(this,At.SEEK_OFFSET,e),this.setAttribute("aria-label",f("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),$n(Hn(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return B(this,n.MEDIA_CURRENT_TIME,Au)}set mediaCurrentTime(e){te(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new l.CustomEvent(E.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};Qa.getSlotTemplateHTML=gu;Qa.getTooltipContentHTML=bu;l.customElements.get("media-seek-backward-button")||l.customElements.define("media-seek-backward-button",Qa);var Tu=Qa;const Tt={SEEK_OFFSET:"seekoffset"},cs=30,yu=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function Iu(t,e){return`
    <slot name="icon">${yu(e.seekOffset)}</slot>
  `}const Su=(t,e)=>{t.setAttribute("aria-label",f("seek forward {seekOffset} seconds",{seekOffset:e}))};function ku(){return f("Seek forward")}const wu=0;let za=class extends ie{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,Tt.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=B(this,Tt.SEEK_OFFSET,cs)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Su(this,this.seekOffset),e===Tt.SEEK_OFFSET&&(this.seekOffset=B(this,Tt.SEEK_OFFSET,cs))}get seekOffset(){return B(this,Tt.SEEK_OFFSET,cs)}set seekOffset(e){te(this,Tt.SEEK_OFFSET,e),this.setAttribute("aria-label",f("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),$n(Hn(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return B(this,n.MEDIA_CURRENT_TIME,wu)}set mediaCurrentTime(e){te(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new l.CustomEvent(E.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};za.getSlotTemplateHTML=Iu;za.getTooltipContentHTML=ku;l.customElements.get("media-seek-forward-button")||l.customElements.define("media-seek-forward-button",za);var Mu=za,rr=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},_e=(t,e,i)=>(rr(t,e,"read from private field"),i?i.call(t):e.get(t)),at=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},nr=(t,e,i,a)=>(rr(t,e,"write to private field"),e.set(t,i),i),Qe=(t,e,i)=>(rr(t,e,"access private method"),i),Lt,xe,Za,or,Do,Aa,lr,di,ra,na,Us;const Ye={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},yn=[...Object.values(Ye),n.MEDIA_CURRENT_TIME,n.MEDIA_DURATION,n.MEDIA_SEEKABLE],Po=["Enter"," "],Lu="&nbsp;/&nbsp;",Ns=(t,{timesSep:e=Lu}={})=>{var i,a;const s=(i=t.mediaCurrentTime)!=null?i:0,[,r]=(a=t.mediaSeekable)!=null?a:[];let o=0;Number.isFinite(t.mediaDuration)?o=t.mediaDuration:Number.isFinite(r)&&(o=r);const d=t.remaining?et(0-(o-s)):et(s);return t.showDuration?`${d}${e}${et(o)}`:d},Ru=t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let s=null;if(Number.isFinite(t.mediaDuration)?s=t.mediaDuration:Number.isFinite(a)&&(s=a),i==null||s===null){t.setAttribute("aria-valuetext",f("video not loaded, unknown time."));return}const r=t.remaining?hi(0-(s-i)):hi(i);if(!t.showDuration){t.setAttribute("aria-valuetext",r);return}const o=hi(s),d=f("{currentTime} of {totalTime}",{currentTime:r,totalTime:o});t.setAttribute("aria-valuetext",d)};function Cu(t,e){return`
    <slot>${Ns(e)}</slot>
  `}const Du=t=>{t.setAttribute("aria-label",f("playback time"))};let dr=class extends He{constructor(){super(),at(this,or),at(this,Aa),at(this,di),at(this,na),at(this,Lt,void 0),at(this,xe,null),at(this,Za,e=>{const{metaKey:i,altKey:a,key:s}=e;if(i||a||!Po.includes(s)){this.removeEventListener("keyup",_e(this,xe));return}this.addEventListener("keyup",_e(this,xe))}),nr(this,Lt,this.shadowRoot.querySelector("slot")),_e(this,Lt).innerHTML=`${Ns(this)}`}static get observedAttributes(){return[...super.observedAttributes,...yn,"disabled"]}connectedCallback(){const{style:e}=Q(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",f("playback time")),Qe(this,di,ra).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),Qe(this,Aa,lr).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){Du(this),yn.includes(e)?this.update():e==="disabled"&&a!==i?a==null?Qe(this,di,ra).call(this):Qe(this,na,Us).call(this):e===Ye.NO_TOGGLE&&a!==i&&(this.noToggle?Qe(this,na,Us).call(this):Qe(this,di,ra).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return k(this,Ye.REMAINING)}set remaining(e){w(this,Ye.REMAINING,e)}get showDuration(){return k(this,Ye.SHOW_DURATION)}set showDuration(e){w(this,Ye.SHOW_DURATION,e)}get noToggle(){return k(this,Ye.NO_TOGGLE)}set noToggle(e){w(this,Ye.NO_TOGGLE,e)}get mediaDuration(){return B(this,n.MEDIA_DURATION)}set mediaDuration(e){te(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return B(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){te(this,n.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}update(){const e=Ns(this);Ru(this),e!==_e(this,Lt).innerHTML&&(_e(this,Lt).innerHTML=e)}};Lt=new WeakMap;xe=new WeakMap;Za=new WeakMap;or=new WeakSet;Do=function(){_e(this,xe)||(nr(this,xe,t=>{const{key:e}=t;if(!Po.includes(e)){this.removeEventListener("keyup",_e(this,xe));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",_e(this,Za)),this.addEventListener("click",this.toggleTimeDisplay))};Aa=new WeakSet;lr=function(){_e(this,xe)&&(this.removeEventListener("keyup",_e(this,xe)),this.removeEventListener("keydown",_e(this,Za)),this.removeEventListener("click",this.toggleTimeDisplay),nr(this,xe,null))};di=new WeakSet;ra=function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),Qe(this,or,Do).call(this))};na=new WeakSet;Us=function(){this.removeAttribute("role"),this.disable(),Qe(this,Aa,lr).call(this)};dr.getSlotTemplateHTML=Cu;l.customElements.get("media-time-display")||l.customElements.define("media-time-display",dr);var Pu=dr,xo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},J=(t,e,i)=>(xo(t,e,"read from private field"),e.get(t)),ye=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ce=(t,e,i,a)=>(xo(t,e,"write to private field"),e.set(t,i),i),xu=(t,e,i,a)=>({set _(s){ce(t,e,s)},get _(){return J(t,e)}}),Rt,oa,Ct,ci,la,da,ca,Dt,rt,ua;class Ou{constructor(e,i,a){ye(this,Rt,void 0),ye(this,oa,void 0),ye(this,Ct,void 0),ye(this,ci,void 0),ye(this,la,void 0),ye(this,da,void 0),ye(this,ca,void 0),ye(this,Dt,void 0),ye(this,rt,0),ye(this,ua,(s=performance.now())=>{ce(this,rt,requestAnimationFrame(J(this,ua))),ce(this,ci,performance.now()-J(this,Ct));const r=1e3/this.fps;if(J(this,ci)>r){ce(this,Ct,s-J(this,ci)%r);const o=1e3/((s-J(this,oa))/++xu(this,la)._),d=(s-J(this,da))/1e3/this.duration;let c=J(this,ca)+d*this.playbackRate;c-J(this,Rt).valueAsNumber>0?ce(this,Dt,this.playbackRate/this.duration/o):(ce(this,Dt,.995*J(this,Dt)),c=J(this,Rt).valueAsNumber+J(this,Dt)),this.callback(c)}}),ce(this,Rt,e),this.callback=i,this.fps=a}start(){J(this,rt)===0&&(ce(this,Ct,performance.now()),ce(this,oa,J(this,Ct)),ce(this,la,0),J(this,ua).call(this))}stop(){J(this,rt)!==0&&(cancelAnimationFrame(J(this,rt)),ce(this,rt,0))}update({start:e,duration:i,playbackRate:a}){const s=e-J(this,Rt).valueAsNumber,r=Math.abs(i-this.duration);(s>0||s<-.03||r>=.5)&&this.callback(e),ce(this,ca,e),ce(this,da,performance.now()),this.duration=i,this.playbackRate=a}}Rt=new WeakMap;oa=new WeakMap;Ct=new WeakMap;ci=new WeakMap;la=new WeakMap;da=new WeakMap;ca=new WeakMap;Dt=new WeakMap;rt=new WeakMap;ua=new WeakMap;var cr=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},U=(t,e,i)=>(cr(t,e,"read from private field"),i?i.call(t):e.get(t)),Y=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},he=(t,e,i,a)=>(cr(t,e,"write to private field"),e.set(t,i),i),me=(t,e,i)=>(cr(t,e,"access private method"),i),Pt,nt,Ta,Ei,ya,ha,bi,Ai,xt,Ot,Ut,$s,Oo,Hs,Ia,ur,Sa,hr,ka,mr,Bs,Uo,Ti,wa,Fs,No;const Uu=t=>{const e=t.range,i=hi(+$o(t)),a=hi(+t.mediaSeekableEnd),s=i&&a?f("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):f("video not loaded, unknown time.");e.setAttribute("aria-valuetext",s)};function Nu(t){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${n.MEDIA_PREVIEW_IMAGE}], [${n.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${n.MEDIA_PREVIEW_IMAGE}], [${n.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${n.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${n.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${n.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${n.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${n.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${n.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${n.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${n.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${n.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${n.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${n.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${n.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${Os.shadowRootOptions.mode}">
            ${Os.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}const $i=(t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const s=(e-i)/(a-i);return Math.max(0,Math.min(s,1))},$o=(t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i};let Xa=class extends pt{constructor(){super(),Y(this,$s),Y(this,Ia),Y(this,Sa),Y(this,ka),Y(this,Bs),Y(this,Ti),Y(this,Fs),Y(this,Pt,null),Y(this,nt,void 0),Y(this,Ta,void 0),Y(this,Ei,void 0),Y(this,ya,void 0),Y(this,ha,void 0),Y(this,bi,void 0),Y(this,Ai,void 0),Y(this,xt,void 0),Y(this,Ot,void 0),Y(this,Ut,()=>{me(this,$s,Oo).call(this)?U(this,nt).start():U(this,nt).stop()}),Y(this,Hs,a=>{this.dragging||(Ws(a)&&(this.range.valueAsNumber=a),U(this,Ot)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),he(this,Ta,this.shadowRoot.querySelectorAll('[part~="box"]')),he(this,ya,this.shadowRoot.querySelector('[part~="preview-box"]')),he(this,ha,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);he(this,bi,parseInt(i.getPropertyValue("--media-box-padding-left"))),he(this,Ai,parseInt(i.getPropertyValue("--media-box-padding-right"))),he(this,nt,new Ou(this.range,U(this,Hs),60))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_DURATION,n.MEDIA_SEEKABLE,n.MEDIA_CURRENT_TIME,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_TIME,n.MEDIA_PREVIEW_CHAPTER,n.MEDIA_BUFFERED,n.MEDIA_PLAYBACK_RATE,n.MEDIA_LOADING,n.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",f("seek")),U(this,Ut).call(this),he(this,Pt,this.getRootNode()),(e=U(this,Pt))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),U(this,Ut).call(this),(e=U(this,Pt))==null||e.removeEventListener("transitionstart",this),he(this,Pt,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===n.MEDIA_CURRENT_TIME||e===n.MEDIA_PAUSED||e===n.MEDIA_ENDED||e===n.MEDIA_LOADING||e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE?(U(this,nt).update({start:$i(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),U(this,Ut).call(this),Uu(this)):e===n.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=U(this,xt),this.updateBar()))}get mediaChaptersCues(){return U(this,xt)}set mediaChaptersCues(e){var i;he(this,xt,e),this.updateSegments((i=U(this,xt))==null?void 0:i.map(a=>({start:$i(this,a.startTime),end:$i(this,a.endTime)})))}get mediaPaused(){return k(this,n.MEDIA_PAUSED)}set mediaPaused(e){w(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return k(this,n.MEDIA_LOADING)}set mediaLoading(e){w(this,n.MEDIA_LOADING,e)}get mediaDuration(){return B(this,n.MEDIA_DURATION)}set mediaDuration(e){te(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return B(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){te(this,n.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return B(this,n.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){te(this,n.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(n.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(n.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(n.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return F(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){W(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return B(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){te(this,n.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return k(this,n.MEDIA_ENDED)}set mediaEnded(e){w(this,n.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const r=this.mediaCurrentTime,[,o=this.mediaSeekableStart]=(e=i.find(([d,c])=>d<=r&&r<=c))!=null?e:[];a=$i(this,o)}const{style:s}=Q(this.shadowRoot,"#buffered");s.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=Q(this.shadowRoot,"#current-rail"),a=Q(this.shadowRoot,'[part~="current-box"]'),s=me(this,Ia,ur).call(this,U(this,ha)),r=me(this,Sa,hr).call(this,s,this.range.valueAsNumber),o=me(this,ka,mr).call(this,s,this.range.valueAsNumber);i.style.transform=`translateX(${r})`,i.style.setProperty("--_range-width",`${s.range.width}`),a.style.setProperty("--_box-shift",`${o}`),a.style.setProperty("--_box-width",`${s.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":me(this,Fs,No).call(this);break;case"pointermove":me(this,Bs,Uo).call(this,e);break;case"pointerup":U(this,Ot)&&he(this,Ot,!1);break;case"pointerdown":he(this,Ot,!0);break;case"pointerleave":me(this,Ti,wa).call(this,null);break;case"transitionstart":qt(e.target,this)&&setTimeout(()=>U(this,Ut).call(this),0);break}}};Pt=new WeakMap;nt=new WeakMap;Ta=new WeakMap;Ei=new WeakMap;ya=new WeakMap;ha=new WeakMap;bi=new WeakMap;Ai=new WeakMap;xt=new WeakMap;Ot=new WeakMap;Ut=new WeakMap;$s=new WeakSet;Oo=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Fn(this)};Hs=new WeakMap;Ia=new WeakSet;ur=function(t){var e;const a=((e=this.getAttribute("bounds")?Ii(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),s=this.range.getBoundingClientRect(),r=t.offsetWidth,o=-(s.left-a.left-r/2),d=a.right-s.left-r/2;return{box:{width:r,min:o,max:d},bounds:a,range:s}};Sa=new WeakSet;hr=function(t,e){let i=`${e*100}%`;const{width:a,min:s,max:r}=t.box;if(!a)return i;if(Number.isNaN(s)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${s}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(r)){const d=`calc(1 / var(--_range-width) * 100 * ${r}% - var(--media-box-padding-right))`;i=`min(${i}, ${d})`}return i};ka=new WeakSet;mr=function(t,e){const{width:i,min:a,max:s}=t.box,r=e*t.range.width;if(r<a+U(this,bi)){const o=t.range.left-t.bounds.left-U(this,bi);return`${r-i/2+o}px`}if(r>s-U(this,Ai)){const o=t.bounds.right-t.range.right-U(this,Ai);return`${r+i/2-o-t.range.width}px`}return 0};Bs=new WeakSet;Uo=function(t){const e=[...U(this,Ta)].some(g=>t.composedPath().includes(g));if(!this.dragging&&(e||!t.composedPath().includes(this))){me(this,Ti,wa).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=Q(this.shadowRoot,"#preview-rail"),s=Q(this.shadowRoot,'[part~="preview-box"]'),r=me(this,Ia,ur).call(this,U(this,ya));let o=(t.clientX-r.range.left)/r.range.width;o=Math.max(0,Math.min(1,o));const d=me(this,Sa,hr).call(this,r,o),c=me(this,ka,mr).call(this,r,o);a.style.transform=`translateX(${d})`,a.style.setProperty("--_range-width",`${r.range.width}`),s.style.setProperty("--_box-shift",`${c}`),s.style.setProperty("--_box-width",`${r.box.width}px`);const y=Math.round(U(this,Ei))-Math.round(o*i);Math.abs(y)<1&&o>.01&&o<.99||(he(this,Ei,o*i),me(this,Ti,wa).call(this,U(this,Ei)))};Ti=new WeakSet;wa=function(t){this.dispatchEvent(new l.CustomEvent(E.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};Fs=new WeakSet;No=function(){U(this,nt).stop();const t=$o(this);this.dispatchEvent(new l.CustomEvent(E.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};Xa.shadowRootOptions={mode:"open"};Xa.getContainerTemplateHTML=Nu;l.customElements.get("media-time-range")||l.customElements.define("media-time-range",Xa);var $u=Xa,Hu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},In=(t,e,i)=>(Hu(t,e,"read from private field"),i?i.call(t):e.get(t)),Bu=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ma;const Fu=1,Wu=t=>t.mediaMuted?0:t.mediaVolume,Vu=t=>`${Math.round(t*100)}%`;let Ho=class extends pt{constructor(){super(...arguments),Bu(this,ma,()=>{const e=this.range.value,i=new l.CustomEvent(E.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME,n.MEDIA_MUTED,n.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",f("volume")),this.range.addEventListener("input",In(this,ma))}disconnectedCallback(){this.range.removeEventListener("input",In(this,ma)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===n.MEDIA_VOLUME||e===n.MEDIA_MUTED)&&(this.range.valueAsNumber=Wu(this),this.range.setAttribute("aria-valuetext",Vu(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return B(this,n.MEDIA_VOLUME,Fu)}set mediaVolume(e){te(this,n.MEDIA_VOLUME,e)}get mediaMuted(){return k(this,n.MEDIA_MUTED)}set mediaMuted(e){w(this,n.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return F(this,n.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){W(this,n.MEDIA_VOLUME_UNAVAILABLE,e)}};ma=new WeakMap;l.customElements.get("media-volume-range")||l.customElements.define("media-volume-range",Ho);var Ku=Ho;function Gu(t){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${n.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `}function qu(){return f("Loop")}class ja extends ie{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=f("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return k(this,n.MEDIA_LOOP)}set mediaLoop(e){w(this,n.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new l.CustomEvent(E.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}ja.getSlotTemplateHTML=Gu;ja.getTooltipContentHTML=qu;l.customElements.get("media-loop-button")||l.customElements.define("media-loop-button",ja);var Yu=ja;function C(t){if(typeof t=="boolean")return t?"":void 0;if(typeof t=="function")return;const e=i=>typeof i=="string"||typeof i=="number"||typeof i=="boolean";if(Array.isArray(t)&&t.every(e))return t.join(" ");if(!(typeof t=="object"&&t!==null))return t}R({tagName:"media-gesture-receiver",elementClass:hs,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-container",elementClass:Yl,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});const Qu=R({tagName:"media-controller",elementClass:Md,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-tooltip",elementClass:As,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-chrome-button",elementClass:xd,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-airplay-button",elementClass:Nd,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-captions-button",elementClass:Wd,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-cast-button",elementClass:Yd,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-chrome-dialog",elementClass:Zd,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-chrome-range",elementClass:Jd,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});const zu=R({tagName:"media-control-bar",elementClass:ic,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-text-display",elementClass:nc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-duration-display",elementClass:cc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-error-dialog",elementClass:gc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-keyboard-shortcuts-dialog",elementClass:Tc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});const Zu=R({tagName:"media-fullscreen-button",elementClass:Rc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-live-button",elementClass:Oc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-loading-indicator",elementClass:$c,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});const Xu=R({tagName:"media-mute-button",elementClass:Vc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-pip-button",elementClass:qc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});const ju=R({tagName:"media-playback-rate-button",elementClass:jc,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}}),Ju=R({tagName:"media-play-button",elementClass:au,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-poster-image",elementClass:ou,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-preview-chapter-display",elementClass:uu,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-preview-thumbnail",elementClass:Os,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-preview-time-display",elementClass:vu,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});const eh=R({tagName:"media-seek-backward-button",elementClass:Tu,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}}),th=R({tagName:"media-seek-forward-button",elementClass:Mu,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}}),ih=R({tagName:"media-time-display",elementClass:Pu,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}}),ah=R({tagName:"media-time-range",elementClass:$u,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}}),sh=R({tagName:"media-volume-range",elementClass:Ku,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});R({tagName:"media-loop-button",elementClass:Yu,react:L,toAttributeValue:C,defaultProps:{suppressHydrationWarning:!0}});const rh=({url:t,title:e})=>{const i=ui.useRef(null),a=ui.useRef(null),s=(t||"").trim();ui.useEffect(()=>{a.current&&s&&(a.current.src=s)},[s]);const r=o=>{console.log("Left click detected!",o.button)};return S.jsxs("div",{id:"videoPlayerContainer",onClick:r,onContextMenu:o=>o.preventDefault(),ref:i,className:"video-player-container position-relative overflow-hidden bg-black rounded-3 shadow-lg",style:{width:"100%",aspectRatio:"16/9"},children:[S.jsxs(Qu,{style:{width:"100%",height:"100%","--media-primary-color":"#0d6efd","--media-range-track-height":"4px"},children:[S.jsx("youtube-video",{id:"youtube-video",ref:a,slot:"media",playsInline:!0,crossOrigin:"anonymous"}),S.jsxs(zu,{children:[S.jsx(Ju,{}),S.jsx(eh,{seekOffset:10}),S.jsx(th,{seekOffset:10}),S.jsx(ah,{}),S.jsx(ih,{showDuration:!0}),S.jsx(Xu,{}),S.jsx(sh,{}),S.jsx(ju,{}),S.jsx(Zu,{})]})]}),S.jsx("style",{children:`
                .video-player-container {
                    background-color: #000;
                }
                #youtube-video {
                    pointer-events: none;
                }
                /* Optional: Customize Media Chrome aesthetics */
                media-controller {
                    font-family: inherit;
                }
            `})]})},wh=()=>{const t=Zo(),e=Xo(),{video:i}=t.state||{},[a,s]=L.useState(!1);return ui.useEffect(()=>{let r;const o=()=>{s(!0),clearTimeout(r),r=setTimeout(()=>s(!1),3e3)},d=g=>{g.preventDefault(),o()},c=g=>{if(g.keyCode===123||g.ctrlKey&&g.shiftKey&&(g.keyCode===73||g.keyCode===74||g.keyCode===67)||g.metaKey&&g.altKey&&g.keyCode===73||g.ctrlKey&&g.keyCode===85)return g.preventDefault(),o(),!1},y=setInterval(()=>{const g=performance.now();debugger;performance.now()-g>100&&o()},1e3);return window.addEventListener("contextmenu",d),window.addEventListener("keydown",c),()=>{window.removeEventListener("contextmenu",d),window.removeEventListener("keydown",c),clearInterval(y),clearTimeout(r)}},[]),ui.useEffect(()=>{i||e("/recordings")},[i,e]),i?S.jsxs(Jo,{fluid:!0,className:"p-0",style:{backgroundColor:"var(--bg-primary)",minHeight:"100vh",position:"relative"},children:[S.jsxs("div",{className:"position-fixed top-0 start-50 translate-middle-x mt-4 p-3 rounded-3 shadow-lg bg-danger text-white transition-all",style:{zIndex:9999,opacity:a?1:0,pointerEvents:"none",transform:`translate(-50%, ${a?"0":"-20px"})`,transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",fontWeight:"600",display:"flex",alignItems:"center",gap:"10px"},children:[S.jsx("div",{style:{backgroundColor:"white",color:"#dc3545",width:"24px",height:"24px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"bold"},children:"!"}),"Security Alert: This action is restricted for security purposes."]}),S.jsxs("header",{className:"dashboard-header mb-4",children:[S.jsxs(el,{variant:"link",className:"p-0 text-secondary d-flex align-items-center gap-2 text-decoration-none hover-white",onClick:()=>e("/recordings"),style:{fontWeight:"500",transition:"color 0.2s"},children:[S.jsx(tl,{size:20})," Back to Recordings"]}),S.jsx("div",{className:"d-flex align-items-center gap-3",children:S.jsx("span",{className:"text-secondary small fw-medium",children:"Learning Management System"})})]}),S.jsx("div",{className:"container pb-5",children:S.jsx("div",{className:"row justify-content-center",children:S.jsxs("div",{className:"col-lg-11 col-xl-10",children:[S.jsxs("div",{className:"class-card overflow-hidden p-0 border-0",style:{borderRadius:"24px"},children:[S.jsxs("div",{className:"p-4",style:{backgroundColor:"rgba(255, 255, 255, 0.02)",borderBottom:"1px solid var(--glass-border)"},children:[S.jsx("h1",{className:"h3 fw-bold mb-3",style:{color:"var(--text-primary)",letterSpacing:"-0.02em"},children:i.name}),S.jsxs("div",{className:"d-flex flex-wrap align-items-center gap-3 text-secondary small",children:[S.jsxs("span",{className:"teacher-subject-tag d-flex align-items-center gap-2",children:[S.jsx(il,{size:14}),i.classDate?new Date(i.classDate).toLocaleDateString(void 0,{dateStyle:"long"}):"No Date"]}),S.jsxs("span",{className:"teacher-subject-tag d-flex align-items-center gap-2",style:{backgroundColor:"rgba(16, 185, 129, 0.1)",color:"#10b981",borderColor:"rgba(16, 185, 129, 0.2)"},children:[S.jsx(al,{size:14}),"Taught by ",i.teacherName]})]})]}),S.jsx("div",{className:"p-0 position-relative",style:{backgroundColor:"#000",borderBottom:"1px solid var(--glass-border)"},children:S.jsx("div",{className:"w-100 h-100",children:S.jsx(rh,{url:i.videoLink,title:i.name})})}),S.jsxs("div",{className:"p-4",children:[S.jsxs("h5",{className:"fw-bold mb-3 d-flex align-items-center gap-2",style:{color:"var(--text-primary)"},children:[S.jsx("div",{style:{width:"4px",height:"18px",backgroundColor:"var(--accent-blue)",borderRadius:"2px"}}),"About this session"]}),S.jsxs("p",{className:"text-secondary mb-0",style:{lineHeight:"1.6"},children:["This recording covers the essential topics discussed during the live session on ",i.classDate?new Date(i.classDate).toLocaleDateString():"the scheduled date",". Please ensure you take notes and complete any associated assignments."]})]})]}),S.jsx("div",{className:"text-center mt-5 mb-3 text-secondary small opacity-75",children:"If you encounter any issues with playback, please contact technical support."})]})})}),S.jsx("style",{children:`
                .hover-white:hover {
                    color: white !important;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
            `})]}):S.jsx(jo,{})};export{wh as default};
