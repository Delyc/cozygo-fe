'use client'

import React, { useState } from 'react';

function TranslatorComponent() {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    async function translateText(text: any) {
        const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '5d8653681dmshd89639507d3fd0ap13628fjsn37e488cc2c3e',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: new URLSearchParams({
                q: text,
                target: 'es',
                source: 'en'
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

    const handleTranslate = async () => {
        const translation = await translateText(inputText);
        setTranslatedText(translation);
    }

    return (
        <div>
            <input 
                type="text" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate"
            />
            <button onClick={handleTranslate}>Translate</button>
            <div>
                <p>Translated Text: {translatedText}</p>
            </div>
        </div>
    );
}

export default TranslatorComponent;
