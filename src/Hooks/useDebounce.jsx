function useDebounce(callback, delay=500){
    let timedId;

    return ( ...args )=>{
        clearInterval(timedId)
        timedId = setTimeout(()=>{
            callback(...args)
        },delay)
    }
}

export default useDebounce