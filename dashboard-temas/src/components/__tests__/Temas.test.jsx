import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Temas from "../Temas";
import useFetch from "../../hooks/useFetch";

// 🔹 Mock del hook useFetch
jest.mock("../../hooks/useFetch");

const mockData = [
  {
    id: "1",
    display_name: "TestSub",
    title: "Test Title",
    subscribers: 100,
    active_user_count: 10,
    over18: false,
    allow_videos: true,
    allow_images: true,
    allow_polls: false,
    public_description: "Descripción pública de prueba",
    description_html: "<p>HTML de prueba</p>",
    url: "/r/testsub/"
  },
  {
    id: "2",
    display_name: "OtroSub",
    title: "Otro Title",
    subscribers: 50,
    active_user_count: 5,
    over18: true,
    allow_videos: false,
    allow_images: true,
    allow_polls: true,
    public_description: "Otra descripción",
    description_html: "<p>Otra HTML</p>",
    url: "/r/otrosub/"
  }
];

describe("Temas Component", () => {

  beforeEach(() => {
    // Cada test recibe mock de datos
    useFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: null
    });
  });

  test("Renderiza tabla con datos mockeados", () => {
    render(<Temas apiUrl="dummy_url" />);
    expect(screen.getByText("TestSub")).toBeInTheDocument();
    expect(screen.getByText("OtroSub")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  test("Muestra modal al hacer click en una fila", () => {
    render(<Temas apiUrl="dummy_url" />);
    const row = screen.getByText("TestSub").closest("tr");
    userEvent.click(row);
    expect(screen.getByText("Descripción pública de prueba")).toBeInTheDocument();
    expect(screen.getByText("/r/testsub/")).toBeInTheDocument();
  });

  test("Filtra los registros correctamente", () => {
    render(<Temas apiUrl="dummy_url" />);
    const input = screen.getByPlaceholderText(/Filtrar/i);
    userEvent.type(input, "OtroSub");
    expect(screen.getByText("OtroSub")).toBeInTheDocument();
    expect(screen.queryByText("TestSub")).not.toBeInTheDocument();
  });

  test("Muestra mensaje de loading cuando loading es true", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: true,
      error: null
    });
    render(<Temas apiUrl="dummy_url" />);
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  test("Muestra mensaje de error cuando hay error", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: "Network Error"
    });
    render(<Temas apiUrl="dummy_url" />);
    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });

});
