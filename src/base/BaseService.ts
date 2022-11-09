export class BaseService {
  protected error(statusCode, message, code) {
    return {
      code,
      message,
      statusCode,
    };
  }
}
