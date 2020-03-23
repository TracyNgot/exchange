export function checkProperties(expectedProperties = [], properties: any = {}) {
  expectedProperties.forEach(key => {
    if (!properties[key]) throw new Error(`error.missing.property.${key}`);
  });
}
