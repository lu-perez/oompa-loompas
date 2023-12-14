export const getGenderLabel = (gender: string) => {
  return gender === 'F' ? 'Woman' : gender === 'M' ? 'Male' : 'Unknown';
};
