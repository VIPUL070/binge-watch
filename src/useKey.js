import { useEffect } from "react";

function useKey(key , action) {
    useEffect(() => {

        function callBack(e) {
            if (e.key.toLowerCase() === key.toLowerCase()) {
                action();
            }
        }

        document.addEventListener("keydown", callBack);

        return () => { document.removeEventListener('keydown', callBack) }

    }, [key , action])

}

export default useKey;