export const HTTP_STATUS_MESSAGE = {
  // 2xx Success
  OK: 'OK',
  CREATED: 'Created',
  ACCEPTED: 'Accepted',
  NO_CONTENT: 'No Content',
  NON_AUTHORITATIVE_INFORMATION: 'Non-Authoritative Information',
  RESET_CONTENT: 'Reset Content',
  PARTIAL_CONTENT: 'Partial Content',

  // 3xx Redirection
  MULTIPLE_CHOICES: 'Multiple Choices',
  MOVED_PERMANENTLY: 'Moved Permanently',
  FOUND: 'Found',
  SEE_OTHER: 'See Other',
  NOT_MODIFIED: 'Not Modified',
  TEMPORARY_REDIRECT: 'Temporary Redirect',
  PERMANENT_REDIRECT: 'Permanent Redirect',

  // 4xx Client Errors
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  METHOD_NOT_ALLOWED: 'Method Not Allowed',
  NOT_ACCEPTABLE: 'Not Acceptable',
  CONFLICT: 'Conflict',
  GONE: 'Gone',
  PAYLOAD_TOO_LARGE: 'Payload Too Large',
  UNSUPPORTED_MEDIA_TYPE: 'Unsupported Media Type',
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
  TOO_MANY_REQUESTS: 'Too Many Requests',

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_IMPLEMENTED: 'Not Implemented',
  BAD_GATEWAY: 'Bad Gateway',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  GATEWAY_TIMEOUT: 'Gateway Timeout',
};
