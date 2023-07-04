function toNumber(value: string): number {
  return Number.parseInt(value);
}

function toBoolean(value: string): boolean {
  return Boolean(value);
}
export { toNumber, toBoolean };
