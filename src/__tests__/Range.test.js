import { render, fireEvent, waitFor } from '@testing-library/react';
import Range from '../components/range';

describe('Range Component', () => {
  it('renders correctly with default props', () => {
    const { getByDisplayValue } = render(<Range min={1} max={100} />);
    expect(getByDisplayValue('1')).toBeInTheDocument();
    expect(getByDisplayValue('100')).toBeInTheDocument();
  });

  it('allows dragging bullets within range', () => {
    const { getByDisplayValue } = render(<Range min={1} max={100} />);
    const minInput = getByDisplayValue('1');
    const maxInput = getByDisplayValue('100');

    fireEvent.change(minInput, { target: { value: '10' } });
    fireEvent.change(maxInput, { target: { value: '90' } });

    expect(minInput.value).toBe('10');
    expect(maxInput.value).toBe('90');
  });

  it('does not allow min and max values to cross', async () => {
    const { getByDisplayValue } = render(<Range min={1} max={100} />);
    const minInput = getByDisplayValue('1');
    const maxInput = getByDisplayValue('100');
  
    fireEvent.change(maxInput, { target: { value: '10' } });
    fireEvent.change(minInput, { target: { value: '95' } });
  
    await waitFor(() => {
      expect(minInput.value).toBe('9');
      expect(maxInput.value).toBe('10');
    });
  });  

    it('renders correctly with fixed values', async () => {
      const fixedValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
      const { getByText } = render(<Range fixedValues={fixedValues} />);
    
      expect(getByText('1.99')).toBeInTheDocument();
      expect(getByText('70.99')).toBeInTheDocument();
    });
});
