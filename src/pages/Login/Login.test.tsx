import {render, screen, waitFor} from "@testing-library/react";
import Login from "./Login";
import userEvent from "@testing-library/user-event";
import services from "@/services/Login";

jest.mock("@/services/Login");

describe("Login Page", () => {
    it("render login panel", () => {
        render(<Login/>);

        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByText(/登 录/i)).toBeInTheDocument();
    });

    const mockReplace = (window: any) => {
        delete window.location;
        window.location = {replace: jest.fn()};
    };

    const resetReplace = (window: any) => {
        window.location = location;
    };

    const {location} = window;
    beforeEach(() => {
        mockReplace(window);
    });

    afterEach(() => {
        resetReplace(window);
    });

    it("登陆成功，跳转到主页", async () => {
        (services.login as jest.Mock).mockResolvedValueOnce({
            data: {
                token: "",
                menus: "",
                buttons: "",
            },
        });
        render(<Login/>);

        userEvent.type(screen.getByTestId("username"), "admin");
        userEvent.type(screen.getByTestId("password"), "123456");
        userEvent.click(screen.getByTestId("loginBtn"));

        await waitFor(() => {
            expect(services.login).toBeCalledWith({
                password: "123456",
                username: "admin",
            });
        });

        await waitFor(() => {
            expect(window.location.replace).toBeCalledWith("/");
        });
    });
});

// class LoginPage {
//     private screen: Screen;
//     private username: HTMLElement;
//     private password: HTMLElement;
//
//     constructor(screen: Screen) {
//         this.screen = screen;
//         this.username = this.screen.getByTestId("username");
//         this.password = this.screen.getByTestId("password");
//     }
//
//     login(name: string, pass: string) {
//         this.username.title = name;
//         this.password.title = pass;
//     }
// }
