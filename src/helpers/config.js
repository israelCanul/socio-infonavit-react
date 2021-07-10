export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://staging.api.socioinfonavit.io/api/v1"
    : "";
