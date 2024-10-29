import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ListElement from "../Components/ListElement";
import fetchData from '../Utils';

jest.mock('../Utils');

describe("ListElement Component", () => {
    const mockOnAreaSelect = jest.fn();
    const mockOnLocationSelect = jest.fn();

    const props = {
        text: "Test Location",
        url: "https://pokeapi.co/api/v2/location/test-location",
        isAreasShown: false,
        onAreaSelect: mockOnAreaSelect,
        onLocationSelect: mockOnLocationSelect
    };

    beforeEach(() => {
        fetchData.mockResolvedValue({
            areas: ["Area 1", "Area 2"]
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with provided text", () => {
        render(<ListElement {...props} />);
        const element = screen.getByText(/test location/i);
        expect(element).toBeInTheDocument();
    });

    test("calls onAreaSelect when areas are not shown", async () => {
        render(<ListElement {...props} />);
        const listItem = screen.getByText(/test location/i);
        fireEvent.click(listItem);

        await waitFor(() => {
            expect(mockOnAreaSelect).toHaveBeenCalledWith(["Area 1", "Area 2"]);
        });
    });

    test("calls onLocationSelect when areas are shown", async () => {
        const updatedProps = { ...props, isAreasShown: true };
        render(<ListElement {...updatedProps} />);

        const listItem = screen.getByText(/test location/i);
        fireEvent.click(listItem);

        await waitFor(() => {
            expect(mockOnLocationSelect).toHaveBeenCalledWith({
                areas: ["Area 1", "Area 2"]
            });
        });
    });
});