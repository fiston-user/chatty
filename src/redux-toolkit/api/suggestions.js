import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@services/api/user/user.service';

const getSuggestions = createAsyncThunk('/user/getSuggestions', async (name, { dispatch }) => {
  try {
    const response = await userService.getUserSuggestions();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export { getSuggestions };
