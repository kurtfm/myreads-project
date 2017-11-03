function shelfNameConverter(name){
    let prettyName =name.replace(/([A-Z])/g, ' $1').trim()
    return prettyName.charAt(0).toUpperCase() + prettyName.slice(1)
}

export {shelfNameConverter}