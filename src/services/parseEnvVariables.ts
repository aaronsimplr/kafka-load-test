function stringOrNull(
  envName: string,
  errors: string[],
  defaultValue?: string,
): string | null {
  const value = process.env[envName];
  if (value === 'null') {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }

    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(errors)) {
    errors.push(`${envName} - Value ${value} is not a null or a string`);
  }

  return null;
}

function numberOrNull(
  envName: string,
  errors: string[],
  defaultValue?: number,
): number | null {
  const value = process.env[envName];

  if (value === 'null') {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }

    return null;
  }

  if (value?.match(/^[+-]?\d+(\.\d+)?$/)) {
    return Number(value);
  }

  if (Array.isArray(errors)) {
    errors.push(`${envName} - Value ${value} is not a null or a number`);
  }

  return null;
}

function bool(
  envName: string,
  errors: string[],
  defaultValue?: boolean,
): boolean | null {
  const value = process.env[envName];
  if (value && typeof value === 'string') {
    if (value === 'null' && typeof defaultValue !== 'undefined') {
      return defaultValue;
    }

    const stringValue = value.toString().toLowerCase();
    if (['true', 'false', '0', '1'].includes(stringValue)) {
      return ['true', '1'].includes(stringValue);
    }
  }

  if (Array.isArray(errors)) {
    errors.push(`${envName} - Value ${value} is not bool`);
  }

  return null;
}

function arrayOrNull(
  envName: string,
  errors: string[],
  defaultValue?: Array<any>,
): Array<any> | null {
  const value = process.env[envName];
  if (value === 'null') {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }

    return null;
  }

  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim());
  }

  if (Array.isArray(errors)) {
    errors.push(`${envName} - Value ${value} is not a null or a array`);
  }

  return null;
}

export { stringOrNull, numberOrNull, bool, arrayOrNull };
