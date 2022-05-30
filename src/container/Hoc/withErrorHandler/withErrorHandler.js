import React, {useEffect, useState} from "react";
import Aux from "../Auxiliary";
import Modal from "../../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, (err) => {
            setError(err);
            return Promise.reject(err);
        });
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);
        const backdropHandler = () => {
            setError(null);
        }
        return (
            <Aux>
                <Modal showBackdrop={error} BackdropHandler={backdropHandler}>
                    {error ? error.message : null}
                </Modal> 
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}
export default withErrorHandler;