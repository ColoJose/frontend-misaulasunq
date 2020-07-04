function getViewport () {
    
    const width = Math.max(
        document.documentElement.clientWidth || 0, 
        window.innerWidth || 0,
        screen.width || 0
    )

    if (width <= 576){
        return 'xs'
    }
    if (width <= 768){
        return 'sm'
    }
    if (width <= 992){
        return 'md'
    }
    if (width <= 1200){
        return 'lg'
    }
    return 'xl'
}