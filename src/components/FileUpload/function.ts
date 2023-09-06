export const getHumanizedFileSize = (byte: number) => {
  if (byte < 1000) return `${byte}B`;

  const getFixedNumber = (number: number, factor: number) => {
    const _n = number / factor;
    if (Number.isInteger(_n)) return _n;
    return _n.toFixed(1);
  };

  if (byte < 1000 * 1000) return `${getFixedNumber(byte, 1000)}KB`;
  if (byte < 1000 * 1000 * 1000)
    return `${getFixedNumber(byte, 1000 * 1000)}MB`;
  if (byte < 1000 * 1000 * 1000 * 1000)
    return `${getFixedNumber(byte, 1000 * 1000 * 1000)}GB`;
};
