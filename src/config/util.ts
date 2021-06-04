const parseArrayFromString = (value: string | undefined): Array<string> => {
  if (value) {
    return value.split(',').map((item: string): string => item.trim());
  }
  return [];
};

const parseString = (value: string | undefined): string => {
  if (typeof value === 'string') {
    return value;
  }
  return '';
};

export { parseArrayFromString, parseString };
