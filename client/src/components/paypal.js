import paypal from '../apis/paypallPay';

export const fetchPaypal = () => async dispatch => {
    const response = await paypal.get('/');

    dispatch({ type: "FETCH_PAYPAL", payload: response.data });
}