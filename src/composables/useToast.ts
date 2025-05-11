import { useToast as useToastPrime } from "primevue/usetoast";

export const useToast = () => {
  const toast = useToastPrime();

  const showSuccess = (duration: number) => {
    toast.add({
      severity: "info",
      summary: "Bravo !",
      detail: `You have completed ${duration} minutes of deep work`,
      life: 3000,
    });
  };

  return { showSuccess };
};
