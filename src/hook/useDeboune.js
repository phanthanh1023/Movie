import { useEffect, useState } from "react";

export default function useDeboune(init = "", delay = 1000) {
    const [deboune, setDeboune] = useState(init);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDeboune(init)

        }, delay);
        return () => {
            clearTimeout(timer)
        }
    }, [delay, init])
    return deboune;
}