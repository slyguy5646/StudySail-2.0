export function parseFileExtension(filename: string) {
  console.log(filename, filename.split("."));
  return filename.split(".").pop();
}
