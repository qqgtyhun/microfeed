export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. 拦截所有 *.pages.dev 域名访问
  if (url.hostname.endsWith('pages.dev')) {
    return new Response(null, { status: 404 });
  }

  // 2. 判断是否为静态资源请求（带文件后缀）
  const isStaticAsset = /\.[a-zA-Z0-9]+$/.test(url.pathname);

  if (isStaticAsset) {
    // 静态资源直接走原路由
    return await context.next();
  } else {
    // 页面路由（含 /admin）手动回退到根 index.html，保证SPA路由正常
    return context.env.ASSETS.fetch(new Request(`${url.origin}/index.html`, context.request));
  }
}
