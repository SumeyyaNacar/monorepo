import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

// Basit bilgi, uyarı, başarı mesajları için kullanılır
export const swAlert = (
  title: string,
  icon: SweetAlertIcon = "info", // SweetAlert2'nin desteklediği ikonlar
  text: string = ""
): void => {
  Swal.fire({
    title,
    text,
    icon,
  });
};

// Onay kutusu (evet/hayır) için kullanılır
export const swConfirm = (
  title?: string,
  text?: string,
  icon: SweetAlertIcon = "question",
  confirmButtonText: string = "Yes",
  cancelButtonText: string = "Cancel" // eklendi: eksik parametreydi
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });
};
