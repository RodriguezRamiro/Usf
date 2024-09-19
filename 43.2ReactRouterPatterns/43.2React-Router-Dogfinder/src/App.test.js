import App from './App'
import axios from "axios"
import Router from "react-router";
Router.useParams = jest.fn();
import DogDetails from './DogDetails';

import { render, screen, waitFor } from '@testing-library/react';
import dogs from './_testCommon';

test('renders learn react link', async () => {
  Router.useParams.mockReturnValue({data: dogs});
  const { container }= render(<DogDetail />);
  const heading = await waitFor(() => screen.findByText('Welcom!'));
  const nav = container.querySelector("nav")
  expect(nav).toBeInTheDocument()

  expect(heading).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalled()
});
