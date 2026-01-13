import { ApiHeader, BodyField, HttpMethod } from '../types/content';

/**
 * Generate cURL command from endpoint data
 */
export function generateCurlExample(
  method: HttpMethod,
  endpoint: string,
  headers: ApiHeader[],
  body?: BodyField[]
): string {
  const url = `https://api.lobstr.io${endpoint}`;
  let curl = `curl -X ${method} "${url}"`;

  // Add headers
  if (headers.length > 0) {
    curl += ' \\\n';
    headers.forEach((header, index) => {
      const value = header.value.includes('YOUR_API_KEY')
        ? header.value
        : header.value;
      curl += `  -H "${header.key}: ${value}"`;
      if (index < headers.length - 1 || body) {
        curl += ' \\\n';
      }
    });
  }

  // Add body for POST/PUT/PATCH requests
  if (body && body.length > 0 && ['POST', 'PUT', 'PATCH'].includes(method)) {
    const bodyObj: Record<string, any> = {};
    body.forEach((field) => {
      bodyObj[field.name] = field.example || `<${field.type}>`;
    });
    curl += `  -d '${JSON.stringify(bodyObj, null, 2)}'`;
  }

  return curl;
}

/**
 * Generate Python code from endpoint data
 */
export function generatePythonExample(
  method: HttpMethod,
  endpoint: string,
  headers: ApiHeader[],
  body?: BodyField[]
): string {
  const url = `https://api.lobstr.io${endpoint}`;
  let python = 'import requests\n\n';

  // Add headers
  python += 'headers = {\n';
  headers.forEach((header) => {
    const value = header.value.includes('YOUR_API_KEY')
      ? header.value
      : header.value;
    python += `    "${header.key}": "${value}",\n`;
  });
  python += '}\n\n';

  // Add body for POST/PUT/PATCH requests
  if (body && body.length > 0 && ['POST', 'PUT', 'PATCH'].includes(method)) {
    python += 'data = {\n';
    body.forEach((field) => {
      const example = field.example
        ? typeof field.example === 'string'
          ? `"${field.example}"`
          : JSON.stringify(field.example)
        : `"<${field.type}>"`;
      python += `    "${field.name}": ${example},\n`;
    });
    python += '}\n\n';
  }

  // Make the request
  const methodLower = method.toLowerCase();
  python += `response = requests.${methodLower}(\n`;
  python += `    "${url}",\n`;
  python += `    headers=headers`;

  if (body && body.length > 0 && ['POST', 'PUT', 'PATCH'].includes(method)) {
    python += ',\n    json=data';
  }

  python += '\n)\n\n';
  python += 'print(response.json())';

  return python;
}

/**
 * Format JSON response for display
 */
export function formatJsonResponse(data: any): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Get HTTP method badge color class
 */
export function getMethodBadgeClass(method: HttpMethod): string {
  const classes: Record<HttpMethod, string> = {
    GET: 'badge-get',
    POST: 'badge-post',
    PUT: 'badge-put',
    DELETE: 'badge-delete',
    PATCH: 'badge-put',
  };
  return classes[method] || 'badge-get';
}
