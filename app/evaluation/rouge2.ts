function getBigrams(text: string): Set<string> {
  const words = text.split("");
  const bigrams = new Set<string>();
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.add(words[i] + " " + words[i + 1]);
  }
  return bigrams;
}

export const rouge2 = (reference: string, candidate: string): number => {
  const referenceBigrams = getBigrams(reference);
  const candidateBigrams = getBigrams(candidate);

  let overlapCount = 0;
  for (const bigram of candidateBigrams) {
    if (referenceBigrams.has(bigram)) overlapCount++;
  }

  if (referenceBigrams.size === 0 || candidateBigrams.size === 0) return 0;

  return (2 * overlapCount) / (referenceBigrams.size + candidateBigrams.size);
};
