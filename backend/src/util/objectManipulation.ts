export function mapProperties(target: any, source: any){
    Object.keys(source).forEach(key=>{
        if(target.hasOwnProperty(key)){
            target[key] = source[key];
        }
    })
}