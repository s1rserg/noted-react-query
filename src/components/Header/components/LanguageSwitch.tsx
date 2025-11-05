import { IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { SupportedLanguages } from 'config';
import type { FC } from 'react';

export const LanguageSwitch: FC = () => {
  const { i18n, t } = useTranslation('header');

  const currentLanguage = i18n.language;

  const nextLanguage =
    currentLanguage === SupportedLanguages.UKRAINIAN
      ? SupportedLanguages.ENGLISH
      : SupportedLanguages.UKRAINIAN;

  const nextLanguageLabel =
    nextLanguage === SupportedLanguages.UKRAINIAN ? 'Українська' : 'English';

  const handleToggleLanguage = () => {
    void i18n.changeLanguage(nextLanguage);
  };

  const tooltipTitle = t('buttons.changeLanguage', {
    lang: nextLanguageLabel,
  });

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton onClick={handleToggleLanguage} color="inherit">
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  );
};
