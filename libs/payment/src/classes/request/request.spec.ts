import { Request } from './request';
import nock from 'nock';

const api = nock('https://example.com', {
  reqheaders: {
    'Content-Type': 'application/json',
    authorization: 'Basic Auth',
  },
});

describe('Request', () => {
  beforeEach(() => {
    // api.activeMocks();
    nock.activate();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should be defined', () => {
    expect(new Request()).toBeDefined();
  });

  it('success request', async () => {
    const request = new Request();
    api.get('/repos/atom/atom/license').reply(200, {
      license: {
        key: 'mit',
        name: 'MIT License',
        spdx_id: 'MIT',
        url: 'https://api.github.com/licenses/mit',
        node_id: 'MDc6TGljZW5zZTEz',
      },
    });

    const url = 'https://example.com/repos/atom/atom/license';
    const options: RequestInit = {
      headers: {
        authorization: 'Basic Auth',
      },
      method: 'GET',
    };

    const response = await request.request<any>(url, options);
    console.log(response);
    expect(response.license.node_id).toEqual('MDc6TGljZW5zZTEz');
  });

  it('should be defined', () => {
    expect(new Request()).toBeDefined();
  });

  it('should be defined', () => {
    expect(new Request()).toBeDefined();
  });
});
