// import { createSlice } from "@reduxjs/toolkit";
// import { IMessage } from "../../models/IMessage";
// import { act } from "@react-three/fiber";

// export type TMessages = {
//   dialogs: {
//     _id: string;
//     messages: IMessage[];
//   }[];
// };

// const initialState: TMessages = {
//   dialogs: [],
// };

// const messagesSlice = createSlice({
//   name: "messages",
//   initialState,
//   reducers: {
//     setMessages: (state, action) => {
//       const { friendId } = action.payload.length > 0 ? action.payload[0] : "";

//       const dialog = state.dialogs.find((dialog) => dialog._id === friendId);

//       if (dialog) {
//         dialog.messages.push(action.payload);
//       } else {
//         state.dialogs.push({
//           _id: friendId,
//           messages: action.payload,
//         });
//       }
//     },
    // addMessage: (state, action) => {
    //   const { friendId } = action.payload;

    //   const dialog = state.dialogs.find((dialog) => dialog._id === friendId);

    //   if (dialog) {
    //     dialog.messages.push(action.payload);
    //   } else {
    //     state.dialogs.push({
    //       _id: friendId,
    //       messages: [action.payload],
    //     });
    //   }
    // },
//   },
// });

// export const { setMessages, addMessage } = messagesSlice.actions;
// export default messagesSlice;

export {}