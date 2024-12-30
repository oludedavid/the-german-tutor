/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export class QueryDatabase {
  private apiUrl: string;
  private requestParam?: string;
  private requestQueryString?: string;
  private requestBody?: Record<string, any>;
  private token?: string;

  constructor(
    apiUrl: string,
    requestParam: string = "",
    requestQueryString: string = "",
    requestBody: Record<string, any> = {},
    token?: string
  ) {
    this.apiUrl = apiUrl;
    this.requestBody = requestBody;
    this.requestQueryString = requestQueryString;
    this.requestParam = requestParam;
    this.token = token;
  }

  private getHeaders(): Record<string, string> | undefined {
    return this.token ? { Authorization: `Bearer ${this.token}` } : undefined;
  }

  private async handleRequest<T>(
    requestFn: () => Promise<T>
  ): Promise<{ data?: T; error?: boolean; message: string; details?: any }> {
    try {
      const data = await requestFn();
      return { data, message: "Request successful" };
    } catch (error: any) {
      return {
        error: true,
        message: error?.message || "An error occurred during the request",
        details: error,
      };
    }
  }

  async getAllData(): Promise<any> {
    return this.handleRequest(async () => {
      const response = await axios.get(this.apiUrl);
      return response.data;
    });
  }

  async getDataByParams(): Promise<any> {
    return this.handleRequest(async () => {
      const response = await axios.get(this.apiUrl, {
        params: this.requestParam,
        headers: this.getHeaders(),
      });
      return response.data;
    });
  }

  async getDataByQueryString(): Promise<any> {
    return this.handleRequest(async () => {
      const response = await axios.get(this.apiUrl, {
        params: this.requestQueryString,
        headers: this.getHeaders(),
      });
      return response.data;
    });
  }

  async addDataToDatabase(): Promise<any> {
    return this.handleRequest(async () => {
      const response = await axios.post(this.apiUrl, this.requestBody, {
        headers: this.getHeaders(),
      });
      return response.data;
    });
  }
}
