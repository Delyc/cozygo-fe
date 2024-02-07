
'use client'
import React, { useState } from 'react';
import TranslatorComponent from '@/components/Translate';

function TestTranslatorComponent() {
    const [inputText, setInputText] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [textToTranslate, setTextToTranslate] = useState('');

    const handleTranslateClick = () => {
        setTextToTranslate(inputText);
    };

    return (
        <div>
            <input 
                type="text" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate"
            />
            <div>
                <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    {/* Add more languages as needed */}
                </select>
                <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    {/* Add more languages as needed */}
                </select>
                <button onClick={handleTranslateClick}>Translate</button>
            </div>
            {/* Only display the TranslatorComponent if textToTranslate is not empty */}
            {textToTranslate && (
                <TranslatorComponent 
                    source={sourceLanguage} 
                    target={targetLanguage} 
                    text={textToTranslate} 
                />
            )}
        </div>
    );
}

export default TestTranslatorComponent;
