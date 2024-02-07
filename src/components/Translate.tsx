import React, { useEffect, useState } from 'react';

function TranslatorComponent({ source, target, text }: any) {
    const [translatedText, setTranslatedText] = useState('');

    async function translateText(textToTranslate: any) {
        const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '5d8653681dmshd89639507d3fd0ap13628fjsn37e488cc2c3e', // Replace with your API key
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: new URLSearchParams({
                q: textToTranslate,
                target: target,
                source: source
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json(); 
            return result.data.translations[0].translatedText;
        } catch (error) {
            console.error('Error translating text:', error);
            return null;
        }
    }

    useEffect(() => {
        if (text) {
            translateText(text).then(setTranslatedText);
        }
    }, [text, source, target]); // Re-run translation when text, source, or target changes

    return (
        <div>
            <div>Translated Text: {translatedText}</div>
        </div>
    );
}

export default TranslatorComponent;
