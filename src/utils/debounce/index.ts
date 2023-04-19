function debounce(cb: any, delay: number) {
    let timer: number | null = null
    return function () {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            cb(...arguments)
        }, delay)
    }
}

export default debounce