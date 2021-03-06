
export function addClass(el,className){
    if(hasClass(el,className)){
        return ;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

export function hasClass(el, className){
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function getData(el,name,val){
    const prifix = 'data-';
    name = prifix+name
    if(val){
        return el.setAttribute(el,name)
    }else{
        return el.getAttribute(name)
    }
}