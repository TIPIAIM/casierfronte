import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Senregistrer from '../identification/Senregistrer';

const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe('Composant Senregistrer', () => {
  test('affiche le formulaire avec les champs requis', () => {
    render(<Senregistrer />, { wrapper: Wrapper });

    expect(screen.getByPlaceholderText(/Nom et prénom/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'enregistrer/i })).toBeInTheDocument();
  });

  test('peut remplir le formulaire', () => {
    render(<Senregistrer />, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText(/Nom et prénom/i), {
      target: { value: 'Semab Khan' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'semab@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
      target: { value: '123456' },
    });

    expect(screen.getByDisplayValue('Semab Khan')).toBeInTheDocument();
    expect(screen.getByDisplayValue('semab@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
  });
});
