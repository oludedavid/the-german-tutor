import axios from "axios";

const fetchWithParams = async (
  url: string,
  params: object = {},
  token?: string
) => {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(url, {
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
};

export default fetchWithParams;
