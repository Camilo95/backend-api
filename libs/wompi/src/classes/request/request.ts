import { Injectable } from '@nestjs/common';
import { IUtilService } from '@wompi/wompi/interfaces';
import to from 'await-to-js';

@Injectable()
export class Request implements IUtilService {
  private data = null;
  private errorData = null;
  private contentType = null;

  private getContentType(headers: HeadersInit | Headers): void {
    let content = null;
    if (headers instanceof Headers) {
      content = headers.get('Content-Type') || headers.get('content-type');
    } else {
      content = headers['Content-Type'] || headers['content-type'];
    }

    this.contentType = content;
  }

  private parseBody(options: RequestInit) {
    this.getContentType(options.headers);
    if (this.contentType?.includes('application/json')) {
      options.body = JSON.stringify(options.body);
    }

    return options;
  }

  async request<T>(url: string, options: RequestInit): Promise<T> {
    this.parseBody(options);
    const [errorResponse, response] = await to(fetch(url, options));
    if (errorResponse) {
      throw new Error(errorResponse.message);
    }

    this.getContentType(response.headers);

    if (this.contentType?.includes('application/json')) {
      [this.errorData, this.data] = await to<T>(response.json());
    }

    if (this.errorData) {
      throw new Error(this.errorData.message);
    }

    return this.data;
  }
}
