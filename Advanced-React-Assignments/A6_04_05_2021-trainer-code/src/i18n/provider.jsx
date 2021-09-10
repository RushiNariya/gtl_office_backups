import React, { useReducer, useEffect } from 'react';
import { I18nContext, initialState } from './context';

const getTranslate = (translations) => (key) => {
  const translation = translations[key] || key;
  return translation;
};

export const I18nContextProvider = ({ languages, children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'initialise': {
        const translations = action.payload.languages.reduce(
          (acc, language) => ({
            ...acc,
            [language.langCode]: language.translations,
          }),
          {},
        );

        const langs = action.payload.languages.map((lang) => ({
          langCode: lang.langCode,
          subTag: lang.subTag,
        }));

        return {
          ...state,
          langCode: action.payload.activeLanguage,
          t: getTranslate(translations[state.langCode]),
          translations,
          languages: langs,
        };
      }

      case 'setLanguage':
        return {
          ...state,
          langCode: action.payload,
          t: getTranslate(state.translations[action.payload]),
        };

      default:
        return { ...initialState };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setLanguage = (code) => dispatch({ type: 'setLanguage', payload: code });

  /* Store the initLang in the context */
  useEffect(() => {
    async function initialise() {
      await dispatch({
        type: 'initialise',
        payload: languages,
      });
    }
    initialise();
  }, [languages]);

  return (
    <I18nContext.Provider value={{ ...state, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

// I18nContextProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
//   languages: PropTypes.shape({
//     activeLanguage: PropTypes.string.isRequired,
//     languages: PropTypes.arrayOf(PropTypes.shape({
//       langCode: PropTypes.string.isRequired,
//       translations: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//       }),
//       subTag: PropTypes.string.isRequired,
//     })).isRequired,
//   }),
// };
