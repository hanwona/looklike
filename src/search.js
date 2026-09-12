export const COLOR_NAMES = [
  { name: '블랙', rgb: [28, 28, 30] }, { name: '화이트', rgb: [235, 235, 232] },
  { name: '그레이', rgb: [130, 133, 136] }, { name: '네이비', rgb: [35, 49, 72] },
  { name: '블루', rgb: [64, 111, 166] }, { name: '브라운', rgb: [112, 75, 54] },
  { name: '베이지', rgb: [196, 174, 139] }, { name: '레드', rgb: [173, 53, 55] },
  { name: '핑크', rgb: [210, 133, 153] }, { name: '그린', rgb: [65, 111, 77] },
  { name: '옐로우', rgb: [217, 181, 70] }, { name: '퍼플', rgb: [115, 78, 140] },
];
export function nearestColor([r,g,b]) { return COLOR_NAMES.reduce((best,color)=>{ const distance=(r-color.rgb[0])**2+(g-color.rgb[1])**2+(b-color.rgb[2])**2; return distance<best.distance?{...color,distance}:best; },{name:'블랙',distance:Infinity}).name; }
export function cleanTitle(title=''){return title.replace(/<[^>]+>/g,'').replace(/&quot;/g,'\"').replace(/&amp;/g,'&');}
export function formatPrice(value){return `${Number(value||0).toLocaleString('ko-KR')}원`;}
export function buildQuery({color,category,detail}){return [color,detail,category].filter(Boolean).join(' ');}
