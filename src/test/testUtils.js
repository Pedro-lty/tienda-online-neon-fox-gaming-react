import { fireEvent, render } from '@testing-library/react';

export function renderUI(element) {
  return render(element).container;
}

export function click(element) {
  fireEvent.click(element);
}
