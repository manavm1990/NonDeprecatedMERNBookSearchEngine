const BASE_GOOGLE_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const BASE_PAYMENT_URL = "http://localhost:4000/payment";

// TODO: Use 'ky' to clean this 'fetch' 💩 up.
export const indexGoogleBooks = async (q) => {
  const response = await fetch(BASE_GOOGLE_URL + q);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;

    // Catch and put in Error component
    throw new Error(message);
  }

  return response.json();
};

export const getClientSecret = async (cart) => {
  const response = await fetch(BASE_PAYMENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart }),
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;

    // Catch and put in Error component
    throw new Error(message);
  }

  return response.json();
};
