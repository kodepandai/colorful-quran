const Alif = 'ا'
const AlifMaksura = 'ى'
const Meem = 'م'
const Wau = 'و'
const Noon = 'ن'
const Ya = 'ي'
const IsHuruf = (txt: string, match: string[]|string): boolean=>{
 return txt == match ||match.includes(txt)
}

export {Alif,AlifMaksura, Noon, Meem, Wau, Ya}
export default IsHuruf