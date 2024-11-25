export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
