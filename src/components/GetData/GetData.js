import { API_URL } from "../../Consts/const";
import axios from "axios";
import { GET_CONTIBUTION } from "../../store/ContributionState";

export async function GetData(dispatch) {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch({ type: GET_CONTIBUTION, payload: response.data });
  } catch (error) {
    console.log("error", error);
  }
}
