import { Request } from '../request';
import { Payment } from './payment';

describe('Wompi', () => {
  it('should be defined', () => {
    const request = new Request();
    expect(new Payment(request)).toBeDefined();
  });
});
