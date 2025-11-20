import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    file: File | null;
    name: string;
    image: File | null;
    keywords: string[];
}

const initialState: FormState = {
    file: null,
    name: "",
    image: null,
    keywords: ["voski", "dizzle", "shalewa"],
};

interface FileInputPayload {
    name: keyof FormState;
    value: File | null;
}

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        fileinput(state, action: PayloadAction<FileInputPayload>) {
            state[action.payload.name] = action.payload.value as any;
        },
        changeinput(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        addtag(state, action: PayloadAction<string>) {
            state.keywords.push(action.payload);
        },
        removetag(state, action: PayloadAction<number>) {
            state.keywords = state.keywords.filter((el, i) => i !== action.payload);
        },
    },
});

export const { changeinput, addtag, removetag, fileinput } = formSlice.actions;

export default formSlice.reducer;
