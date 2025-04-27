// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());
