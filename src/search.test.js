import {describe,expect,it} from 'vitest';
import {buildQuery,cleanTitle,formatPrice,nearestColor} from './search';
describe('search helpers',()=>{it('가까운 색상명을 찾는다',()=>expect(nearestColor([30,31,32])).toBe('블랙'));it('검색 힌트를 조합한다',()=>expect(buildQuery({color:'네이비',detail:'오버핏',category:'재킷'})).toBe('네이비 오버핏 재킷'));it('HTML 상품명을 정리한다',()=>expect(cleanTitle('<b>코튼</b> 재킷')).toBe('코튼 재킷'));it('가격을 한국식으로 표시한다',()=>expect(formatPrice(32900)).toBe('32,900원'));});
