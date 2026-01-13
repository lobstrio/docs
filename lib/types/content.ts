/**
 * HTTP method types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Pro-tip types
 */
export type ProTipType = 'tip' | 'warning' | 'note';

/**
 * Pro-tip content structure
 */
export interface ProTip {
  type: ProTipType;
  content: string;
}

/**
 * API header structure
 */
export interface ApiHeader {
  key: string;
  value: string;
  required: boolean;
  description?: string;
}

/**
 * API parameter structure
 */
export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
  example?: string;
}

/**
 * API request body field
 */
export interface BodyField {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: any;
}

/**
 * Code examples for each endpoint
 */
export interface CodeExamples {
  curl: string;
  python: string;
  response: {
    status: number;
    body: string;
  };
}

/**
 * Endpoint metadata
 */
export interface EndpointMetadata {
  method: HttpMethod;
  endpoint: string;
  requiresAuth: boolean;
  rateLimit?: string;
}

/**
 * Section with structured parameters (for custom rendering)
 */
export interface ParameterSection {
  title: string;
  parameters: ApiParameter[];
}

/**
 * Response field explanation
 */
export interface ResponseField {
  path: string;
  type?: string;
  description: string;
  example?: string;
}

/**
 * Section with response field explanations
 */
export interface ResponseFieldsSection {
  title: string;
  fields: ResponseField[];
}

/**
 * Main content structure for each endpoint
 */
export interface EndpointContent {
  introduction: string;
  parameters: ApiParameter[];
  headers: ApiHeader[];
  body?: BodyField[];
  proTips: ProTip[];
  additionalNotes?: string;
  sections?: Record<string, ParameterSection | ResponseFieldsSection>;
}

/**
 * SEO metadata for each page
 */
export interface SeoMetadata {
  title: string;
  description: string;
}

/**
 * Complete document content structure
 */
export interface DocContent {
  slug: string;
  title: string;
  description: string;
  category: string;
  metadata: EndpointMetadata;
  content: EndpointContent;
  examples: CodeExamples;
  seo: SeoMetadata;
}

/**
 * Navigation item structure
 */
export interface NavItem {
  title: string;
  slug: string;
  badge?: string;
}

/**
 * Navigation section structure
 */
export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Complete navigation structure
 */
export interface Navigation {
  sections: NavSection[];
}
