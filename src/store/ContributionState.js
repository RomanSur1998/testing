const InitialState = {
  data: "hello",
};

export const GET_CONTIBUTION = " GET_CONTIBUTION";

export const ContributionState = (state = InitialState, action) => {
  switch (action.type) {
    case GET_CONTIBUTION:
      return { data: (state = action.payload) };

    default:
      return state;
  }
};
