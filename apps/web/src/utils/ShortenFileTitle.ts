export function shortenFileTitle(title: string) {
  //   let str = title.trim();

  //   // Split the string into an array of words
  //   var words = str.split(" ");

  //   // Ensure that the array has at most three words
  //   if (words.length > 4) {
  //     words = words.slice(0, 4); // Take the first three words
  //   }else {
  //     return words.join(" ")
  //   }

  //   // Join the words back into a string
  //   return  words.join(" ") + "...";
  const noExtension = title.split(".");
  noExtension.pop();
  return noExtension.join(".");
}
