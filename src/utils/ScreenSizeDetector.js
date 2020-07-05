export const getViewport = () => {
    
    const width = Math.max(
        document.documentElement.clientWidth || 0, 
        window.innerWidth || 0,
        window.screen.width || 0
    );
    if (width <= 320){
        return 'xxxxs';
    }
    if (width <= 375){
        return 'xxxs';
    }
    if (width <= 425){
        return 'xxs';
    }
    if (width <= 576){
        return 'xs';
    }
    if (width <= 768){
        return 'sm';
    }
    if (width <= 992){
        return 'md';
    }
    if (width <= 1024){
        return 'l';
    }
    if (width <= 1200){
        return 'lg';
    }
    return 'xl';
}
