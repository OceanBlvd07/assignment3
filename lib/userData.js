import { getToken } from "./authenticate";

async function addToFavourites(id) {
  const token = getToken();
  if (!token) {
    return [];
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return res.status === 200 ? await res.json() : [];
  } catch (error) {
    return [];
  }
}

async function removeFromFavourites(id) {
  const token = getToken();
  if (!token) {
    return [];
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return res.status === 200 ? await res.json() : [];
  } catch (error) {
    return [];
  }
}

async function getFavourites() {
  const token = getToken();
  if (!token) {
    return [];
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return res.status === 200 ? await res.json() : [];
  } catch (error) {
    return [];
  }
}

export { addToFavourites, removeFromFavourites, getFavourites };
