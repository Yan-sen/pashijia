// 预渲染：用无头 Chromium 把 SPA 页面渲染成带正文的静态 HTML 快照
// 快照保存到 dist/public/__prerender/，由静态服务优先返回给爬虫和所有访客
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.PRERENDER_BASE || "http://127.0.0.1:3000";
const OUT = path.resolve(process.cwd(), "dist/public/__prerender");

const fileName = (route) =>
  (route === "/" ? "index" : route.replace(/^\//, "").replace(/\//g, "_")) + ".html";

async function getSpeciesIds() {
  try {
    const input = encodeURIComponent(JSON.stringify({ json: {} }));
    const res = await fetch(`${BASE}/api/trpc/species.list?input=${input}`);
    const data = await res.json();
    return (data?.result?.data?.json ?? []).map((s) => s.id);
  } catch (e) {
    console.error("[prerender] 获取物种列表失败:", e.message);
    return [];
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const staticRoutes = [
    "/", "/species", "/availability", "/shipping", "/compliance", "/about", "/inquiry",
    "/reptile-export-china", "/cites-reptile-export", "/chinese-native-reptiles", "/wholesale-reptiles",
  ];
  const ids = await getSpeciesIds();
  const routes = [...staticRoutes, ...ids.map((id) => `/species/${id}`)];
  console.log(`[prerender] 开始渲染 ${routes.length} 个页面…`);

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  let ok = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 2000)); // 等 react-query 数据填充
      const html = await page.content();
      fs.writeFileSync(path.join(OUT, fileName(route)), html);
      ok++;
    } catch (e) {
      console.error(`[prerender] ${route} 失败:`, e.message);
    } finally {
      await page.close();
    }
  }
  await browser.close();
  console.log(`[prerender] 完成 ${ok}/${routes.length}`);
}

main().catch((e) => {
  console.error("[prerender] 致命错误:", e);
  process.exit(1);
});
