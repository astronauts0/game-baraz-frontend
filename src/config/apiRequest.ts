const apiRequest = async (request: () => Promise<any>) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export default apiRequest;
