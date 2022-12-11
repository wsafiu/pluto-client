import { createContext, useState } from 'react'

const LoaderContext = createContext({
    loading: true,
    showLoader: function (isLoading) {},
    hideLoader: function () {}
})

export function LoaderContextProvider(props) {
    const [isLoading, setIsLoading ] = useState(false);

    function showLoaderHandler (isLoading){
        // console.log("loading")
        setIsLoading(isLoading)
    }

    function hideLoaderHandler () {
        setIsLoading(false)
    }

    const context = {
        loading: isLoading,
        showLoader: showLoaderHandler,
        hideLoader: hideLoaderHandler
    }
    return(
        <LoaderContext.Provider value={context}>
            {props.children}
        </LoaderContext.Provider>
    )
}

export default LoaderContext;