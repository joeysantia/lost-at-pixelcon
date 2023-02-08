import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  //integration tests


  //all routing tests should be here 
  it("renders on the Home page", () => {
    render(<App />)
    expect(screen.getByText("Start")).toBeInTheDocument()
  })

  it('routes to the Level when the start button is clicked', () => {
    render(<App />)
    userEvent.click(screen.getByRole("button", { name: "Start"}))
    expect(screen.getByRole("img", {name: "background"})).toBeInTheDocument()
  })

  it('routes back to the Home page when the logo is clicked', () => {
    render(<App />)
    userEvent.click(screen.getByRole("link", { name: "Lost at PixelCon"}))
    expect(screen.getByText("Start")).toBeInTheDocument()
  })

  
  //wait until every other test passes
  it.skip('correctly plays through a full game', () => {
    
  })

  it.skip('routes back to the game when "Play again?" is clicked', () => {

  })
})
