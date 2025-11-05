import { useState, useCallback, type FC, useEffect } from 'react';
import { Box, Button, Slider, Typography, CircularProgress } from '@mui/material';
import Cropper from 'react-easy-crop';
import { getCroppedFile } from './helpers';
import type { PixelCrop } from './types';
import type { Nullable } from 'types/utils';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {
  uploadImage: (file: File) => Promise<void>;
}

export const ImageCropper: FC<Props> = ({ uploadImage }) => {
  const { t } = useTranslation();

  const [imageSrc, setImageSrc] = useState<Nullable<string>>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Nullable<PixelCrop>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onCropComplete = useCallback((_croppedArea: PixelCrop, croppedAreaPixels: PixelCrop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setLoading(true);
    try {
      const file = await getCroppedFile(imageSrc, croppedAreaPixels);
      await uploadImage(file);
    } catch (_err) {
      toast.error(t('imageCropper.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button variant="outlined" component="label">
        {t('imageCropper.select')}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageSrc(URL.createObjectURL(file));
          }}
        />
      </Button>

      {imageSrc && (
        <>
          <Box position="relative" sx={{ width: '100%', height: 400, aspectRatio: '1 / 1' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Box>
            <Typography gutterBottom>{t('imageCropper.zoom')}</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.01}
              onChange={(_, value) => setZoom(value)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => void handleUpload()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : t('imageCropper.crop')}
          </Button>
        </>
      )}
    </Box>
  );
};
