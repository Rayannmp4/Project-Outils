import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../src/components/Register';
import { AuthProvider } from '../../src/contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <Router>{ui}</Router>
    </AuthProvider>
  );
}

describe('Register - validation du mot de passe', () => {
  test('affiche une erreur si le mot de passe est trop faible', async () => {
    renderWithProviders(<Register />);

    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    expect(await screen.findByText(/le mot de passe doit contenir au moins 6 caractères, une lettre et un chiffre/i)).toBeInTheDocument();
  });
});
