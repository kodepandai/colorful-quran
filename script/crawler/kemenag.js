import {fetch} from '@sveltejs/kit/install-fetch'
import fs from 'fs'

/**
 * Crawl list Surah
 */
const crawl = ()=>{
    return fetch('https://quran.kemenag.go.id/api/v1/surat/0/114')
    .then(res=>res.json())
    .then(json=>{
        fs.writeFileSync('./src/db/kemenag/list.json', JSON.stringify(json.data, null, 2))
        Promise.all(json.data.map(({id})=>{
            if(fs.existsSync(`./src/db/kemenag/surah/${id}.json`)) return;
            try {
                getSurah(id)
            } catch (error) {
                console.log(id, error)
            }
        })).then(_=>{
            const crawled = fs.readdirSync('./src/db/kemenag/surah').length
            console.log(crawled+' surah crawled')
        })
    })
}

/**
 * Crawl Surah
 */
const getSurah = (surahId) =>{
    return fetch(`https://quran.kemenag.go.id/api/v1/ayatweb/${surahId}/0/0/10000`)
    .then(res=>res.json())
    .then(json=>{
        fs.writeFileSync(`./src/db/kemenag/surah/${surahId}.json`, JSON.stringify(json.data, null, 2))
    }).catch(err=>{
        console.log(err)
    })
}

crawl();
