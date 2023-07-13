export function shortenFileTitle(title: string){
      let str = title.trim();

      // Split the string into an array of words
      var words = str.split(" ");

      // Ensure that the array has at most three words
      if (words.length > 3) {
        words = words.slice(0, 3); // Take the first three words
      }

      // Join the words back into a string
      return  words.join(" ");
  
}