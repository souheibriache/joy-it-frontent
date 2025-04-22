export const serializeQuery = (obj: any, prefix = ""): string => {
  const str = [];
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const prefixedKey = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === "object" && !Array.isArray(value)) {
        str.push(serializeQuery(value, prefixedKey)); // Recursively serialize objects
      } else if (Array.isArray(value)) {
        value.forEach((v, i) => {
          str.push(
            `${encodeURIComponent(prefixedKey)}[${i}]=${encodeURIComponent(v)}`
          );
        });
      } else {
        str.push(
          `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`
        );
      }
    }
  }
  return str.join("&");
};

export const normalize = (d: Date) => new Date(d).setHours(0, 0, 0, 0);
