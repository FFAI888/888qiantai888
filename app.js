const API_BASE = "https://rongchain.453870150.workers.dev";

// 生成或读取一个简易 sessionId（存 7 天）
function getSessionId(){
  const k = "_sid";
  let v = localStorage.getItem(k);
  if(!v){ v = crypto.randomUUID(); localStorage.setItem(k, v); }
  return v;
}
const sessionId = getSessionId();

// 上报函数
async function track(type, meta={}){
  try{
    const res = await fetch(`${API_BASE}/api/v1/public/track`, {
      method: "POST",
      headers: { "content-type":"application/json" },
      body: JSON.stringify({
        type,
        meta: {
          ...meta,
          url: location.href,
          referrer: document.referrer,
          screen: `${screen.width}x${screen.height}`,
          lang: navigator.language || "",
          sid: sessionId
        }
      })
    });
    // 可选：调试看回显
    // console.log('track resp', await res.json());
  }catch(e){
    console.warn("track failed:", e);
  }
}

// 页面加载即上报一次 page_view
track("page_view");

// 你页面上的“点击获取 /ping”按钮，也上报一次点击事件
document.getElementById("pingBtn").addEventListener("click", async () => {
  // 行为上报（点击）
  track("click_ping");
  // 原有逻辑：去请求 /ping
  const out = document.getElementById("pingOut");
  out.textContent = "请求中…";
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/ping`);
    const data = await res.json();
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    out.textContent = "请求失败：" + e.message;
  }
});
