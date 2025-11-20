import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
    src: string;
    IsPlaying: boolean;
}

const initialState: AudioState = {
    src: "",
    IsPlaying: false,
};

const AudioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        updateSong(state, action: PayloadAction<string>) {
            state.src = action.payload;
        },
        setIsPlaying(state, action: PayloadAction<boolean | undefined>) {
            state.IsPlaying = !state.IsPlaying;
            if (action.payload !== undefined) {
                state.IsPlaying = action.payload;
            }
        },
    },
});

export const { updateSong, setIsPlaying } = AudioSlice.actions;
export default AudioSlice.reducer;
