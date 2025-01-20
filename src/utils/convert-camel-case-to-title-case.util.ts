function getTitleCase(camelCaseValue?: string): string {
  if (camelCaseValue) {
    const result = camelCaseValue.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return "";
}

export default getTitleCase;
