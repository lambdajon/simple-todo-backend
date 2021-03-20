export default function verifyEmail(): string {
  let str: string =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result: string = "";
  for (let i: number = 0; i < 10; i++) {
    let index: number = Math.floor(Math.random() * 62) + 1;
    result = result + str[index];
  }
  return result;
}
