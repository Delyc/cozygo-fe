interface TranslateTextParams {
    textToTranslate: string;
    sourceLang: string;
    targetLang: string;
  }
const translateText = async ({
  textToTranslate,
  sourceLang,
  targetLang,
}: TranslateTextParams): Promise<string> => {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`, 
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: new URLSearchParams({
                q: textToTranslate,
                target: targetLang,
                source: sourceLang
            })
        };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        return textToTranslate; 
    }
};

export default translateText;
