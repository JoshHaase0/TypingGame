import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import SnippetSelector from './SnippetSelector';
describe('Testing App', () => {
  beforeEach(() => {
    render(<App />)
  });
  test('renders page title', () => {
    const title = screen.getByText("TypeRace");
    expect(title).toBeInTheDocument();
  });
  test('Renders Film Title button', () =>{
    const title = screen.getByText("Film Title");
    expect(title).toBeInTheDocument();
  });
  test('Renders Description button', () =>{
    const description = screen.getByText("Description");
    expect(description).toBeInTheDocument();
  });
  test('Renders Director button', () =>{
    const director = screen.getByText("Director");
    expect(director).toBeInTheDocument();
  });
});
describe("Test Snippet Selector", () => {
  const films = [{id: 1, title: 'test film', description: 'test description', director: 'test director'}];
  const chooseSnippet = jest.fn();
  test('Snippet Selector selects title', () => {
    render(<SnippetSelector films={films} chooseSnippet={chooseSnippet} />);
    fireEvent.click(screen.getByText('Film Title'));
    const newButton = screen.getByText('test film');
    expect(newButton).toBeInTheDocument();
  });
  test('Snippet Selector selects description', () => {
    render(<SnippetSelector films={films} chooseSnippet={chooseSnippet} />);
    fireEvent.click(screen.getByText('Description'));
    const newButton = screen.getByText('test description');
    expect(newButton).toBeInTheDocument();
  });
  test('Snippet Selector selects director', () => {
    render(<SnippetSelector films={films} chooseSnippet={chooseSnippet} />);
    fireEvent.click(screen.getByText('Director'));
    const newButton = screen.getByText('test director');
    expect(newButton).toBeInTheDocument();
  });
});
describe("Test input", () => {
  beforeEach(() => {
    render(<App />)
  });
  test("'Demo text' input works", () => {
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "Demo text" }});
    expect(input.value).toEqual("Demo text");
  });
  test("'User input' input works", () => {
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "User input"}});
    expect(input.value).toEqual("User input");
  });
  test("'Just some demo text over the user input' input works", () => {
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "Just some demo text over the user input"}});
    expect(input.value).toEqual("Just some demo text over the user input");
  });
});