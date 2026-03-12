const generatePassword = (length: number = 16): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";

  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(length));

  return Array.from(bytes)
    .map((byte) => charset[byte % charset.length])
    .join("");
};

export { generatePassword };
