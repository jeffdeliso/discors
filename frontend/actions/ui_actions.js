export const BEGIN_LOADING = 'BEGIN_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';


export const beginLoading = () => ({
  type: BEGIN_LOADING,
});

export const finishLoading = () => ({
  type: FINISH_LOADING,
});