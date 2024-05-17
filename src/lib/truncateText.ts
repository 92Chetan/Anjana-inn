export const truncateText = (str: string) => {
  if (str.length < 110) {
    return str;
  }

  return str.substring(0, 110) + '...';
};
