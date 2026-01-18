// ===============================
// API Configuration
// ===============================

// Base URL for Laxmi Silver Backend
// Priority:
// 1. Environment variable (VITE_API_URL)
// 2. Fallback production URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://laxmi-silver-backend.onrender.com/api/v1';


// ===============================
// Standard API Response Interface
// ===============================

// Generic API response format used across the app
// T represents the expected data type
interface ApiResponse<T = unknown> {
  success: boolean;     // Indicates request success or failure
  data?: T;             // Response payload (if successful)
  message?: string;     // Optional success message
  error?: string;       // Error message (if failed)
}


// ===============================
// API Client Class
// ===============================

// ApiClient wraps fetch() and provides:
// - Base URL handling
// - Authorization headers
// - Timeout handling
// - Error normalization
class ApiClient {
  private baseUrl: string;

  // Initialize API client with base URL
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }


  // ===============================
  // Get Access Token
  // ===============================

  // Retrieves JWT access token from localStorage
  // Used for Authorization header
  private getAuthToken(): string | null {
    return localStorage.getItem('accessToken');
  }


  // ===============================
  // Core Request Handler
  // ===============================

  // Generic request method used by all HTTP verbs
  // Handles:
  // - Authorization (optional)
  // - JSON parsing
  // - Timeout (for cold starts)
  // - Error handling
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    timeout: number = 300000, // 5 minutes to handle Render cold start
    skipAuth: boolean = false // Skip Authorization header for public endpoints
  ): Promise<ApiResponse<T>> {

    // Build full request URL
    const url = `${this.baseUrl}${endpoint}`;

    // Default headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Attach Authorization header if token exists and not skipped
    if (!skipAuth) {
      const token = this.getAuthToken();
      if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      // Create abort controller for request timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Execute HTTP request
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'omit',   // Allows cookies if backend uses them
        signal: controller.signal,
      });

      // Clear timeout on success
      clearTimeout(timeoutId);

      // Parse JSON response
      const data = await response.json();

      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(
          data.message || data.error || 'Request failed'
        );
      }

      // Return standardized success response
      // Unwrap nested data if backend returns { data: { ... } }
      const responseData = data.data !== undefined ? data.data : data;
      return { success: true, data: responseData };

    } catch (error) {

      // Handle timeout error (common on cold start)
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          error:
            'Request timed out. Server may be starting up, please try again.',
        };
      }

      // Handle generic error
      const message =
        error instanceof Error ? error.message : 'An error occurred';

      return { success: false, error: message };
    }
  }


  // ===============================
  // HTTP GET (Authenticated)
  // ===============================
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }


  // ===============================
  // HTTP GET (Public - No Auth Header)
  // ===============================
  async publicGet<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, 300000, true);
  }


  // ===============================
  // HTTP POST
  // ===============================
  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }


  // ===============================
  // HTTP PUT
  // ===============================
  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }


  // ===============================
  // HTTP DELETE
  // ===============================
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }


  // ===============================
  // Image Upload (Multipart)
  // ===============================

  // Upload multiple images using FormData
  async uploadImages(
    endpoint: string,
    files: File[]
  ): Promise<ApiResponse<unknown>> {

    // Build full upload URL
    const url = `${this.baseUrl}${endpoint}`;

    // Get auth token if available
    const token = this.getAuthToken();

    // Prepare multipart form data
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      // Send multipart request
      const response = await fetch(url, {
        method: 'POST',
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
        body: formData,
        credentials: 'include',
      });

      // Parse response
      const data = await response.json();

      // Handle upload error
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      // Upload success
      return { success: true, data };

    } catch (error) {

      // Handle upload failure
      const message =
        error instanceof Error ? error.message : 'Upload failed';

      return { success: false, error: message };
    }
  }
}


// ===============================
// Export API Client Instance
// ===============================

// Singleton API client used across the app
export const api = new ApiClient(API_BASE_URL);

// Export base URL for debugging / logging
export { API_BASE_URL };
