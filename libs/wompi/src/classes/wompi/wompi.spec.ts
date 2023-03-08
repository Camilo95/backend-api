import { Request } from '../request';
import { Wompi } from './wompi';

describe('Wompi', () => {
  it('should be defined', () => {
    const request = new Request();
    expect(new Wompi(request)).toBeDefined();
  });
});
