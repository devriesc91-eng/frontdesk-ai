/* Frontdesk AI embeddable widget.
   Usage on a client's site:
   <script src="https://YOURDOMAIN/embed.js" data-bot="BOT_ID" data-api="https://YOURDOMAIN"></script>
*/
(function () {
  var s = document.currentScript;
  var bot = s.getAttribute("data-bot");
  var api = s.getAttribute("data-api") || s.src.replace(/\/embed\.js.*$/, "");
  if (!bot) return;

  var open = false;

  var bubble = document.createElement("button");
  bubble.setAttribute("aria-label", "Open chat");
  bubble.style.cssText =
    "position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;border:none;" +
    "background:#116E4E;color:#fff;font-size:26px;cursor:pointer;z-index:2147483000;" +
    "box-shadow:0 10px 30px -8px rgba(0,0,0,.4);";
  bubble.innerHTML = "💬";

  var frame = document.createElement("iframe");
  frame.src = api + "/c/" + bot;
  frame.style.cssText =
    "position:fixed;bottom:90px;right:20px;width:380px;height:600px;max-width:92vw;max-height:80vh;" +
    "border:none;border-radius:16px;z-index:2147483000;display:none;" +
    "box-shadow:0 20px 50px -16px rgba(0,0,0,.5);background:#fff;";

  function toggle() {
    open = !open;
    frame.style.display = open ? "block" : "none";
    bubble.innerHTML = open ? "✕" : "💬";
  }
  bubble.addEventListener("click", toggle);

  document.body.appendChild(frame);
  document.body.appendChild(bubble);
})();
