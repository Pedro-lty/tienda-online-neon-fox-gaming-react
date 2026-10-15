// src/test/setupTests.js
import matchers from '@testing-library/jasmine-dom';
import { cleanup } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';

beforeEach(() => {
  jasmine.getEnv().addMatchers(matchers.default);
});

afterEach(() => {
  cleanup();
});
