function throttle(cb: any, delay: number) {
    let timer: number | null = null
    return function () {
        if (timer === null) {
            cb(...arguments)
            timer = setTimeout(() => {
                timer = null
            }, delay)
        }
    }
}

export default throttle