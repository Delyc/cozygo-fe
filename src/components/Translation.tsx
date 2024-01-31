// async function translateText(text: any) {
//   const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
//   const options = {
//       method: 'POST',
//       headers: {
//           'content-type': 'application/x-www-form-urlencoded',
//           'Accept-Encoding': 'application/gzip',
//           'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
//           'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
//       },
//       body: new URLSearchParams({
//           q: text,
//           target: 'es',
//           source: 'en'
//       })
//   };

//   try {
//       const response = await fetch(url, options);
//       const result = await response.json(); // Assuming the response is in JSON format
//       console.log(result);
//       return result;
//   } catch (error) {
//       console.error('Error translating text:', error);
//       return null;
//   }
// }

// // Example usage
// translateText('Hello, world!').then(result => {
//   if (result) {
//       console.log('Translation:', result.data.translations[0].translatedText);
//   }
// });
