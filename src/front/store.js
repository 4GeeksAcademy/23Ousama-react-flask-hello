export const initialState = {
  token: sessionStorage.getItem("token") || null,
  message: null,
};

export function appReducer(state, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "LOGOUT":
      return { ...state, token: null, message: null };
    default:
      return state;
  }
}

export function createActions(dispatch) {
  return {
    syncTokenFromSessionStore: () => {
      const token = sessionStorage.getItem("token");
      if (token && token !== "" && token !== undefined) {
        dispatch({ type: "SET_TOKEN", payload: token });
      }
    },
    logout: () => {
      sessionStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    },
    login: async (email, password) => {
      try {
        const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();

        if (resp.status === 200) {
          sessionStorage.setItem("token", data.token);
          dispatch({ type: "SET_TOKEN", payload: data.token });
          return true;
        } else {
          dispatch({ type: "SET_MESSAGE", payload: data.message });
          return false;
        }
      } catch (error) {
        dispatch({
          type: "SET_MESSAGE",
          payload: "Error de conexión o del servidor.",
        });
        return false;
      }
    },
    signup: async (email, password) => {
      try {
        const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();

        if (resp.status === 201) {
          dispatch({ type: "SET_MESSAGE", payload: data.message });
          return true;
        } else {
          dispatch({ type: "SET_MESSAGE", payload: data.message });
          return false;
        }
      } catch (error) {
        dispatch({
          type: "SET_MESSAGE",
          payload: "Error de conexión o del servidor.",
        });
        return false;
      }
    },
    getMessage: async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await resp.json();
        dispatch({ type: "SET_MESSAGE", payload: data.message });
        return data;
      } catch (error) {
        dispatch({
          type: "SET_MESSAGE",
          payload: "Error al cargar el mensaje privado.",
        });
      }
    },
  };
}
