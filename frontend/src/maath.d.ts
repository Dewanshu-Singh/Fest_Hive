declare module 'maath/random/dist/maath-random.esm' {
  export function inSphere(array: Float32Array, options?: { radius?: number }): Float32Array;
  // add any other functions if needed, or leave it as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const random: any;
  export default random;
}
