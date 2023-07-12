// const base_url = "https://empfs.netlify.app";
// const base_url = "http://localhost:3000";

export const getUserData = async () => {
  const response = await fetch(`/api/users`, {
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};
export const getSingleData = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (json) return json;
    return {};
  } catch (error) {
    return error;
  }
};

export const postUserData = async (data) => {
  try {
    const response = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
};

export const putUserData = async (id, data) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

export const deleteUserData = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};
