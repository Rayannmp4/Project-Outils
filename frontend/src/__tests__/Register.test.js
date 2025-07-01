import '@testing-library/jest-dom'; 
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Register';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
 
jest.mock('axios'); // important pour éviter les erreurs ESM axios



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

    fireEvent.change(screen.getByLabelText(/^Nom :$/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/^Email :$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Mot de passe :$/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/^Confirmer le mot de passe :$/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    expect(await screen.findByText(/le mot de passe doit contenir au moins 6 caractères, une lettre et un chiffre/i)).toBeInTheDocument();
  });
});
