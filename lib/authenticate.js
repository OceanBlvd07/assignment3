const TOKEN_KEY = "bookworm_jwt";

function setToken(token) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
}

function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

function removeToken() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

function readToken() {
  const token = getToken();
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );

    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}

function isAuthenticated() {
  return Boolean(readToken());
}

async function authenticateUser(user, password) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: user, password }),
    });

    if (res.status !== 200) {
      return false;
    }

    const data = await res.json();
    if (data?.token) {
      setToken(data.token);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

async function registerUser(user, password, password2) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: user, password, password2 }),
    });

    return res.status === 200;
  } catch (error) {
    return false;
  }
}

export {
  setToken,
  getToken,
  removeToken,
  readToken,
  isAuthenticated,
  authenticateUser,
  registerUser,
};
