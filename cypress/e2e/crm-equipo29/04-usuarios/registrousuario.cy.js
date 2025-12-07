describe('Registro de usuario en el CRM', () => {
  it('Completar formulario y HACER CLICK en Crear Cuenta', () => {
    // 1. Ir al formulario de registro
    cy.visit('http://localhost:5173/register');
    
    // 2. Rellenar EMAIL
    cy.get('input[placeholder="tu@email.com"]')
      .type('test@ejemplo.com');
    
    // 3. Rellenar TELÉFONO
    cy.get('input[placeholder="+34 600 123 456"]')
      .type('12345678');
    
    // 4. Rellenar CONTRASEÑA
    cy.get('input[type="password"]')
      .first()
      .type('12345678');
    
    // 5. Rellenar CONFIRMAR CONTRASEÑA
    cy.get('input[type="password"]')
      .last()
      .type('12345678');
    
    // 6. TOMAR SCREENSHOT ANTES del click
    cy.screenshot('antes-del-click');
    
    // 7. HACER CLICK en "Crear Cuenta" - CON MÁS VISIBILIDAD
    cy.contains('button', 'Crear Cuenta')
      .should('be.visible')
      .and('not.be.disabled')
      .click()
      .then(() => {
        cy.log('✓ CLICK REALIZADO en "Crear Cuenta"');
      });
    
    // 8. ESPERAR y ver qué pasa
    cy.wait(3000); // Esperar 3 segundos para ver la respuesta
    
    // 9. TOMAR SCREENSHOT DESPUÉS del click
    cy.screenshot('despues-del-click');
    
    // 10. VER QUÉ PASÓ
    cy.url().then((currentUrl) => {
      cy.log(`URL después del click: ${currentUrl}`);
    });
    
    cy.get('body').then(($body) => {
      cy.log('Texto visible en la página (primeros 300 caracteres):');
      cy.log($body.text().substring(0, 300));
    });
  });
});
