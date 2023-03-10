export interface IUtilService {
  request<T>(url: string, options: RequestInit): Promise<T>;
}
