import { Step1Form } from './components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState, type FC } from 'react';
import { type SignUpLocalDto, type UpdateUserDto } from 'api';
import { AppRoutes } from 'routes';
import { localStorageService } from 'utils/LocalStorageService';
import { useTranslation } from 'react-i18next';
import { UpdateUserDataForm } from 'components/UpdateUserDataForm';
import { useSignUpMutation } from './hooks';
import { useGoogleAuthMutation, useUpdateProfileMutation } from 'hooks';

export const RegisterPage: FC = () => {
  const { t } = useTranslation('registerPage');
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const signUpMutation = useSignUpMutation();
  const updateProfileMutation = useUpdateProfileMutation();
  const googleAuthMutation = useGoogleAuthMutation();

  const handleStepOneSubmit = async (data: SignUpLocalDto): Promise<boolean> => {
    try {
      const response = await signUpMutation.mutateAsync(data);
      localStorageService.setAccessToken(response.data.accessToken);
      toast.success(t('step1.successMsg'));
      setStep(2);
      return true;
    } catch (_error) {
      return false;
    }
  };

  const handleStepTwoSubmit = async (data: UpdateUserDto): Promise<boolean> => {
    try {
      await updateProfileMutation.mutateAsync(data);
      toast.success(t('step2.successMsg'));
      void navigate(AppRoutes.TASKS);
      return true;
    } catch (_error) {
      return false;
    }
  };

  const handleGoogleAuth = (credential: string): void => {
    googleAuthMutation.mutate(credential, {
      onSuccess: (response) => {
        localStorageService.setAccessToken(response.data.accessToken);
        void navigate(AppRoutes.TASKS);
      },
    });
  };

  const handleSkip = () => {
    void navigate(AppRoutes.TASKS);
  };

  return (
    <>
      {step === 1 && (
        <Step1Form
          onSubmit={handleStepOneSubmit}
          isLoading={signUpMutation.isPending}
          onGoogleSubmit={handleGoogleAuth}
        />
      )}
      {step === 2 && (
        <UpdateUserDataForm
          onSubmit={handleStepTwoSubmit}
          onCancel={handleSkip}
          isLoading={updateProfileMutation.isPending}
          title={t('step2.title')}
          cancelButtonText={t('step2.buttons.skip')}
          submitButtonText={t('step2.buttons.save')}
        />
      )}
    </>
  );
};
