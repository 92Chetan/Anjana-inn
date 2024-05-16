export const truncateText = (str: string) => {
  if (str.length < 150) {
    return str;
  }

  return str.substring(0, 200) + '...';
};
