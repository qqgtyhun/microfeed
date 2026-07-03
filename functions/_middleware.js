export async function onRequest(context) {
  const hostname = new URL(context.request.url).hostname;
  
  // 仅拦截 *.pages.dev 后缀的访问
  if (hostname.endsWith('pages.dev')) {
    return new Response(null, { status: 404 });
  }
  
  // 自定义域名的所有请求，完全交给 microfeed 官方逻辑处理
  // 包括首页SSR、/admin后台、RSS、接口、静态资源，全部不受影响
  return context.next();
}
