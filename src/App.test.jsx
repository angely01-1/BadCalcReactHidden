  test('debe manejar división por cero', () => {
    render(<App />);
    const inputA = screen.getByPlaceholderText('a');
    const inputB = screen.getByPlaceholderText('b');
    const select = screen.getByDisplayValue('+');
    const button = screen.getByRole('button', { name: '=' });
    fireEvent.change(inputA, { target: { value: '5' } });
    fireEvent.change(inputB, { target: { value: '0' } });
    fireEvent.change(select, { target: { value: '/' } });
    fireEvent.click(button);
    // El resultado debe ser un número muy grande (5/(0+1e-9))
    expect(screen.getByText(/Resultado:/)).toBeInTheDocument();
  });

  test('debe manejar potencia negativa', () => {
    render(<App />);
    const inputA = screen.getByPlaceholderText('a');
    const inputB = screen.getByPlaceholderText('b');
    const select = screen.getByDisplayValue('+');
    const button = screen.getByRole('button', { name: '=' });
    fireEvent.change(inputA, { target: { value: '2' } });
    fireEvent.change(inputB, { target: { value: '-2' } });
    fireEvent.change(select, { target: { value: '^' } });
    fireEvent.click(button);
    // El resultado debe ser 0.25
    expect(screen.getByText(/Resultado: 0.25/)).toBeInTheDocument();
  });

  test('debe manejar módulo negativo', () => {
    render(<App />);
    const inputA = screen.getByPlaceholderText('a');
    const inputB = screen.getByPlaceholderText('b');
    const select = screen.getByDisplayValue('+');
    const button = screen.getByRole('button', { name: '=' });
    fireEvent.change(inputA, { target: { value: '-10' } });
    fireEvent.change(inputB, { target: { value: '3' } });
    fireEvent.change(select, { target: { value: '%' } });
    fireEvent.click(button);
    expect(screen.getByText(/Resultado: -1/)).toBeInTheDocument();
  });
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
    test('debe realizar una resta correctamente', () => {
      render(<App />);
      const inputA = screen.getByPlaceholderText('a');
      const inputB = screen.getByPlaceholderText('b');
      const select = screen.getByDisplayValue('+');
      const button = screen.getByRole('button', { name: '=' });
      fireEvent.change(inputA, { target: { value: '10' } });
      fireEvent.change(inputB, { target: { value: '4' } });
      fireEvent.change(select, { target: { value: '-' } });
      fireEvent.click(button);
      expect(screen.getByText(/Resultado: 6/)).toBeInTheDocument();
    });

    test('debe realizar una multiplicación correctamente', () => {
      render(<App />);
      const inputA = screen.getByPlaceholderText('a');
      const inputB = screen.getByPlaceholderText('b');
      const select = screen.getByDisplayValue('+');
      const button = screen.getByRole('button', { name: '=' });
      fireEvent.change(inputA, { target: { value: '3' } });
      fireEvent.change(inputB, { target: { value: '7' } });
      fireEvent.change(select, { target: { value: '*' } });
      fireEvent.click(button);
      expect(screen.getByText(/Resultado: 21/)).toBeInTheDocument();
    });

    test('debe realizar una división correctamente', () => {
      render(<App />);
      const inputA = screen.getByPlaceholderText('a');
      const inputB = screen.getByPlaceholderText('b');
      const select = screen.getByDisplayValue('+');
      const button = screen.getByRole('button', { name: '=' });
      fireEvent.change(inputA, { target: { value: '8' } });
      fireEvent.change(inputB, { target: { value: '2' } });
      fireEvent.change(select, { target: { value: '/' } });
      fireEvent.click(button);
      expect(screen.getByText(/Resultado: 4/)).toBeInTheDocument();
    });

    test('debe realizar una potencia correctamente', () => {
      render(<App />);
      const inputA = screen.getByPlaceholderText('a');
      const inputB = screen.getByPlaceholderText('b');
      const select = screen.getByDisplayValue('+');
      const button = screen.getByRole('button', { name: '=' });
      fireEvent.change(inputA, { target: { value: '2' } });
      fireEvent.change(inputB, { target: { value: '3' } });
      fireEvent.change(select, { target: { value: '^' } });
      fireEvent.click(button);
      expect(screen.getByText(/Resultado: 8/)).toBeInTheDocument();
    });

    test('debe realizar un módulo correctamente', () => {
      render(<App />);
      const inputA = screen.getByPlaceholderText('a');
      const inputB = screen.getByPlaceholderText('b');
      const select = screen.getByDisplayValue('+');
      const button = screen.getByRole('button', { name: '=' });
      fireEvent.change(inputA, { target: { value: '10' } });
      fireEvent.change(inputB, { target: { value: '3' } });
      fireEvent.change(select, { target: { value: '%' } });
      fireEvent.click(button);
      expect(screen.getByText(/Resultado: 1/)).toBeInTheDocument();
    });

    test('debe usar la plantilla oculta si el textarea está vacío', () => {
      render(<App />);
      const input = screen.getByPlaceholderText(/entrada del usuario/i);
      const button = screen.getByRole('button', { name: /Enviar a LLM/i });
      fireEvent.change(input, { target: { value: 'prueba' } });
      fireEvent.click(button);
      expect(screen.getByText(/BEGIN HIDDEN PROMPT INJECTION/i)).toBeInTheDocument();
    });
  test('debe renderizar el componente principal', () => {
    render(<App />);
    expect(screen.getByText('BadCalc React (Hidden Trap Edition)')).toBeInTheDocument();
  });

  test('debe mostrar los inputs de entrada', () => {
    render(<App />);
    // ARREGLADO: Buscar específicamente los inputs con placeholder 'a' y 'b'
    // PROBLEMA: La expresión regular /a|b/ estaba encontrando 4 elementos (inputs + textarea)
    // SOLUCIÓN: Usar getAllByPlaceholderText con valores exactos y luego filtrar
    const inputA = screen.getByPlaceholderText('a');
    const inputB = screen.getByPlaceholderText('b');
    expect(inputA).toBeInTheDocument();
    expect(inputB).toBeInTheDocument();
  });

  test('debe mostrar el selector de operador', () => {
    render(<App />);
    const select = screen.getByDisplayValue('+');
    expect(select).toBeInTheDocument();
  });

  test('debe actualizar el valor del input a', () => {
    render(<App />);
    const inputA = screen.getByPlaceholderText('a');
    fireEvent.change(inputA, { target: { value: '5' } });
    expect(inputA.value).toBe('5');
  });

  test('debe actualizar el valor del input b', () => {
    render(<App />);
    const inputB = screen.getByPlaceholderText('b');
    fireEvent.change(inputB, { target: { value: '3' } });
    expect(inputB.value).toBe('3');
  });

  test('debe cambiar el operador', () => {
    render(<App />);
    const select = screen.getByDisplayValue('+');
    fireEvent.change(select, { target: { value: '-' } });
    expect(screen.getByDisplayValue('-')).toBeInTheDocument();
  });

  test('debe realizar una suma correctamente', () => {
    render(<App />);
    const inputA = screen.getByPlaceholderText('a');
    const inputB = screen.getByPlaceholderText('b');
    const button = screen.getByRole('button', { name: '=' });

    fireEvent.change(inputA, { target: { value: '5' } });
    fireEvent.change(inputB, { target: { value: '3' } });
    fireEvent.click(button);

    expect(screen.getByText(/Resultado: 8/)).toBeInTheDocument();
  });

  test('debe manejar números con comas', () => {
    render(<App />);
    const inputA = screen.getByPlaceholderText('a');
    const inputB = screen.getByPlaceholderText('b');
    const button = screen.getByRole('button', { name: '=' });

    fireEvent.change(inputA, { target: { value: '5,5' } });
    fireEvent.change(inputB, { target: { value: '2,5' } });
    fireEvent.click(button);

    expect(screen.getByText(/Resultado: 8/)).toBeInTheDocument();
  });

  test('debe mostrar el textarea para la plantilla LLM', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/plantilla de usuario/i);
    expect(textarea).toBeInTheDocument();
  });

  test('debe actualizar la plantilla de usuario', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/plantilla de usuario/i);
    fireEvent.change(textarea, { target: { value: 'Nueva plantilla' } });
    expect(textarea.value).toBe('Nueva plantilla');
  });

  test('debe mostrar el botón de enviar a LLM', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Enviar a LLM/i });
    expect(button).toBeInTheDocument();
  });

  test('debe mostrar el prompt cuando se hace click en LLM', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/entrada del usuario/i);
    const button = screen.getByRole('button', { name: /Enviar a LLM/i });

    fireEvent.change(input, { target: { value: 'prueba' } });
    fireEvent.click(button);

    // ARREGLADO: Buscar directamente el contenido del prompt visible
    // PROBLEMA: El texto estaba dentro de un <pre>, no es un texto renderizado directamente
    // SOLUCIÓN: Buscar por el contenido visible del prompt inyectado
    expect(screen.getByText(/IGNORE ALL PREVIOUS INSTRUCTIONS/i)).toBeInTheDocument();
  });
});
