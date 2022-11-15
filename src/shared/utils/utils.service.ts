import { BuildPagination } from './interfaces/IUtilService.interface';

export class UtilsService {
  static buildPagination(currentPage = 1, size = 10): BuildPagination {
    const take = size;
    const page = currentPage;
    const skip = (page - 1) * take;

    return {
      page,
      skip,
      take,
    };
  }

  static buildKeyForCacheWithParams(key: string, params: object): string {
    return `${key}:${Object.keys(params)
      .map((k) => (params[k] ? `${k}=${params[k]}` : null))
      .filter((f) => f !== null)
      .join(',')}`;
  }
}
