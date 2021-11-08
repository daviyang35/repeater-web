import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import Replay from "./Replay";
import service from "./service";

jest.mock("./service");

describe("回放记录", function () {
    it("render replay records", async () => {
        (service.replay as jest.Mock).mockResolvedValue({
            success: true,
            data: [{id: 1, repeatId: "127000000001163153031189810001ed"}],
        });
        render(<Replay/>);

        await waitFor(() => {
            expect(screen.getByText("127000000001163153031189810001ed")).toBeInTheDocument();
        });
    });
});
