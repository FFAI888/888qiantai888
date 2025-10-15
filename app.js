// 后端 API（已经指向你的 Worker）
const API = "https://rongchain.453870150.workers.dev/api/v1/public/ping";

document.getElementById("pingBtn").addEventListener("click", async () => {
  const out = document.getElementById("pingOut");
  out.textContent = "请求中…";
  try {
    const res = await fetch(API, { method:"GET" });
    // 注意：如果 CORS 没允许 pages.dev 域名，这里会报错
    const data = await res.json();
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    out.textContent = "请求失败：" + e.message;
  }
});
