export const BASE = 37
export const MODULUS = 101

const charToNumber = (char: string): number => {
  let code = char.codePointAt(0)

  const surrogate = char.codePointAt(1)
  if (undefined !== surrogate) {
    code += surrogate * (2 ** 16)
  }

  return code
}

// O(n)
// n - string length
export const polynomialHash = (str: string, base = BASE, modulus = MODULUS): number => {
  const codes = Array.from(str).map((char: string) => charToNumber(char))

  let hash = 0
  for (let i = 0; i < codes.length; i++) {
    hash *= base
    hash += codes[i]
    hash %= modulus
  }

  return hash
}

// O(1)
export const polynomialRoll = (
  prevHash: number,
  prevStr: string,
  newStr: string,
  base = BASE,
  modulus = MODULUS
): number => {
  let hash = prevHash

  const prevValue = charToNumber(prevStr[0])
  const newValue = charToNumber(newStr[newStr.length - 1])

  let multiplier = 1
  for (let i = 1; i < prevStr.length; i++) {
    multiplier *= base
    multiplier %= modulus
  }

  hash += modulus
  hash -= (prevValue * multiplier) % modulus
  hash *= base
  hash += newValue
  hash %= modulus

  return hash
}
