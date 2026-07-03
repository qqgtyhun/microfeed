export async function onRequest(context) {
  const url = new URL(context.request.url);
  // 拦截所有 *.pages.dev 域名访问
  if (url.hostname.endsWith('pages.dev')) {
    return new Response(null, { status: 404 });
  }
  // 自定义域名请求正常放行
  return await context.next();
}
