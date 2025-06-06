const getToken = (): string => {
  if (typeof window === "undefined") return "";
  return `${localStorage.getItem("token")}`;
};

export default getToken;
