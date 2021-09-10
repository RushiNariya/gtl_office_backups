import React, {useEffect} from 'react';
import { useI18n } from '../i18n';

export default function AboutReact () {
    const { t, setLanguage } = useI18n();
    useEffect(() => {
        setLanguage('fr')
    }, []);
    const handleSetLanguage = (e) => {
        const lang = e.target.value;
        setLanguage(lang)
    }
    return (
        <>
        <select onChange={handleSetLanguage}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="nl">Dutch</option>
        </select>
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        </>
    )
}

