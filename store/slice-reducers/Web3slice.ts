import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Web3State {
    googleUser: Record<string, any>;
    email: string;
    password: string;
    address: string;
    clef: number;
    phone: string;
    name?: string;
}

const initialState: Web3State = {
    googleUser: {},
    email: "",
    password: "",
    address: "",
    clef: 10,
    phone: "",
};

const Web3slice = createSlice({
    name: "Web3",
    initialState,
    reducers: {
        modifyClef(state, action: PayloadAction<number>) {
            state.clef = state.clef + action.payload;
        },
        updateAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        Password(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        User(state, action: PayloadAction<Record<string, any>>) {
            state.googleUser = action.payload;
        },
    },
});

export const { updateAddress, setEmail, Password, User, modifyClef } =
    Web3slice.actions;
export default Web3slice.reducer;
