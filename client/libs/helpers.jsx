export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function bearerToken(contentType) {
  const token = localStorage.getItem("token");
  const headers = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  else headers["devtoken"] = process.env.DEV_TOKEN;

  return headers;
}
