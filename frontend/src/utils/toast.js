/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
/*
 * Sistema de Toasts personalizado
 * Copyright (c) 2025
 * Todos los derechos reservados.
 */

export function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  // Crear toast
  const toast = document.createElement("div");
  toast.className = `toast show text-white bg-${type} border-0 shadow`;
  toast.style.minWidth = "260px";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body fw-semibold">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"></button>
    </div>
  `;

  // Cerrar manualmente
  toast.querySelector(".btn-close")?.addEventListener("click", () => {
    toast.remove();
  });

  // Cerrar automáticamente a los 2.5 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, 2500);

  container.appendChild(toast);
}
