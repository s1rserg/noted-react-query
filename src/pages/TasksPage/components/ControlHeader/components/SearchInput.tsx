import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, InputBase, Tooltip } from '@mui/material';
import { useState, useRef, type FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchInput: FC<Props> = ({ searchQuery, onSearchChange }) => {
  const { t } = useTranslation('tasksPage');
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const isExpanded = isFocused || !!searchQuery;

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        border: 1,
        borderColor: isExpanded ? 'divider' : 'background.default',
      }}
    >
      <Tooltip title={t('header.search.title')}>
        <IconButton
          onClick={handleIconClick}
          sx={{ color: 'primary.main', pointerEvents: isExpanded ? 'none' : 'auto' }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <InputBase
        inputRef={inputRef}
        placeholder={t('header.search.placeholder')}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          transition: 'width 300ms',
          width: isExpanded ? '20ch' : '0ch',
          '& .MuiInputBase-input': {
            pl: isExpanded ? 1 : 0,
          },
        }}
        endAdornment={
          searchQuery && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small" sx={{ mr: 0.5 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </Box>
  );
};
