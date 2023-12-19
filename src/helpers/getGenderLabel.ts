export const getGenderLabel = (gender: string): 'Woman' | 'Male' | 'Unknown' => {
  return gender === 'F' ? 'Woman' : gender === 'M' ? 'Male' : 'Unknown';
};
