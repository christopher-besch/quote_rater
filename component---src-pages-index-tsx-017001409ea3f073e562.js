"use strict";(self.webpackChunkquote_rater=self.webpackChunkquote_rater||[]).push([[691],{2501:function(t,e,n){n.r(e),n.d(e,{default:function(){return c}});var o=n(7294),r=n(2896),i="home-module--card--f-c4b",u=n(5804);function s(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var a=/### +(.*)\n```\n((?:.|\n)*?)\n—(.*)\n```\n((?:- +.+\n)*)/gm,h=function(){function t(t,e){var n=this;void 0===t&&(t=""),void 0===e&&(e=function(){}),this.url="",this.should_render=!0,this.quotes=[],this.quotes_order=[],this.adj=[],this.link=[],this.size=[],this.left_idx=-1,this.right_idx=-1,this.components_amount=0,""!=t?(this.url=t,this.dwn(t,(function(t){for(var o;o=a.exec(t);)n.quotes.push({origin:o[1],text:o[2],author:o[3],comments:o[4]});n.setup(),n.top_sort(),n.next_question(),e()}))):this.should_render=!1}var e=t.prototype;return e.get_should_render=function(){return this.should_render},e.next_question=function(){do{this.left_idx=Math.floor(Math.random()*this.quotes.length),this.right_idx=Math.floor(Math.random()*this.quotes.length)}while(this.same(this.left_idx,this.right_idx));console.log("using quotes "+this.left_idx+" and "+this.right_idx)},e.get_quotes_string=function(){for(var t,e="",n=s(this.quotes_order);!(t=n()).done;){var o=t.value,r=this.quotes[o];e+="### "+r.origin+"\n```\n"+r.text+"\n—"+r.author+"\n```\n"+r.comments+"\n"}return e},e.get_left_quote=function(){return console.log(this.left_idx),this.quotes[this.left_idx]},e.get_right_quote=function(){return this.quotes[this.right_idx]},e.get_quotes_amount=function(){return this.quotes.length},e.get_components_amount=function(){return this.components_amount},e.dwn=function(t,e){var n=new XMLHttpRequest;n.onload=function(){200==n.status?e(n.responseText):console.error("Failed to load '"+t+"' with status "+n.status)},n.onerror=function(){console.error("Failed to load '"+t+"'")},n.open("GET",t,!0),n.send()},e.setup=function(){for(var t=0;t<this.quotes.length;++t)this.adj.push([]),this.link[t]=t,this.size[t]=1;this.components_amount=this.quotes.length},e.find=function(t){for(;t!=this.link[t];)t=this.link[t];return t},e.same=function(t,e){return this.find(t)==this.find(e)},e.unite=function(t,e){if(t=this.find(t),e=this.find(e),this.size[t]<this.size[e]){var n=[e,t];t=n[0],e=n[1]}this.size[t]+=this.size[e],this.link[e]=t,--this.components_amount},e.top_sort=function(){this.quotes_order=[];for(var t=[],e=0;e<this.quotes.length;++e)t.push(0);for(var n=0;n<this.quotes.length;++n)this.top(n,t)},e.top=function(t,e){if(2!=e[t]){e[t]=1;for(var n,o=s(this.adj[t]);!(n=o()).done;){var r=n.value;this.top(r,e)}this.quotes_order.push(t),e[t]=2}},t}(),c=function(t){var e=(0,o.useState)(new h),n=e[0],s=e[1];return(0,o.useEffect)((function(){var t=new URLSearchParams(location.search).get("quotes_url"),e=document.getElementById("quotes_url_input");""==e.value&&(e.value=t||"")})),o.createElement(r.Z,null,o.createElement(u.Z,{heading:"Quote Rater"}),o.createElement("label",{htmlFor:"quotes_url_input"},"Input Quotes URL: "),o.createElement("input",{id:"quotes_url_input",type:"text"}),o.createElement("br",null),o.createElement("button",{onClick:function(){var t=new URLSearchParams(location.search),e=document.getElementById("quotes_url_input").value;t.set("quotes_url",e),window.history.replaceState({},"",location.pathname+"?"+t.toString());var n=new h(e,(function(){s(n)}))}},"Load"),o.createElement("p",null,n.get_quotes_amount()),n.get_should_render()&&o.createElement("div",null,o.createElement("p",null,"quotes: ",n.get_quotes_amount()),o.createElement("p",null,"components: ",n.get_components_amount()),o.createElement("div",{className:"home-module--cards--s7NCE"},o.createElement("div",{className:i},o.createElement("pre",null,o.createElement("code",null,n.get_left_quote().text))),o.createElement("div",{className:i},o.createElement("pre",null,o.createElement("code",null,n.get_right_quote().text)))),o.createElement("button",{onClick:function(){s((function(t){return t.next_question(),t}))}},"Left Better"),o.createElement("button",{onClick:function(){s((function(t){return t.next_question(),t}))}},"Roughly Equal"),o.createElement("button",{onClick:function(){s((function(t){return t.next_question(),t}))}},"Right Better"),o.createElement("h1",null,"Ordered Quotes:"),o.createElement("pre",null,o.createElement("code",null,n.get_quotes_string()))))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-017001409ea3f073e562.js.map