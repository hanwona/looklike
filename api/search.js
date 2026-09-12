const strip = (value = '') => value.replace(/<[^>]+>/g, '');

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
  if (req.method !== 'GET') return res.status(405).json({ code: 'METHOD_NOT_ALLOWED', error: 'GET 요청만 지원합니다.' });
  const query = String(req.query.q || '').trim().slice(0, 100);
  if (!query) return res.status(400).json({ code: 'QUERY_REQUIRED', error: '검색어가 필요합니다.' });
  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) return res.status(503).json({ code: 'NAVER_API_NOT_CONFIGURED', error: '네이버 쇼핑 API 환경변수가 설정되지 않았습니다.' });
  try {
    const sort = ['sim', 'date', 'asc', 'dsc'].includes(req.query.sort) ? req.query.sort : 'sim';
    const params = new URLSearchParams({ query, display: '40', start: '1', sort });
    const response = await fetch(`https://openapi.naver.com/v1/search/shop.json?${params}`, { headers: { 'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET } });
    if (!response.ok) { const detail = await response.text(); return res.status(response.status).json({ code: 'NAVER_API_ERROR', error: '네이버 쇼핑 API 요청에 실패했습니다.', detail }); }
    const data = await response.json();
    const items = (data.items || []).map((item, index) => ({ id: item.productId || `${index}-${item.link}`, title: strip(item.title), image: item.image, link: item.link, price: Number(item.lprice), mall: item.mallName || '네이버쇼핑', brand: item.brand || item.maker || '', category: item.category2 || item.category1 || '패션의류', similarity: Math.max(72, 97 - index) }));
    return res.status(200).json({ items, total: data.total, source: 'naver' });
  } catch (error) { return res.status(502).json({ code: 'UPSTREAM_UNAVAILABLE', error: '상품 정보를 불러오지 못했습니다.', detail: error.message }); }
}
