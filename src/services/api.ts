const API_URL = process.env.REACT_APP_PROD_SERVER_URL;

export const uploadFile = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    console.log('helin', response.body);

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
