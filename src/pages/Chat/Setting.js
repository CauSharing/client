import React, {useState} from 'react';
import {Box, FormControl, Select ,MenuItem , InputLabel} from '@mui/material';

function Setting({srcLang, setSrcLang, destLang, setDestLang}){

    const languageDict = {
        'English' : ['Japanese', 'French', 'Simplified Chinese', 'Traditional Chinese', 'Korean'],
        'French' :['Korean'],
        'German':['Korean'],
        'Indonesian': ['Korean'],
        'Italian':['Korean'],
        'Japanese':['Simplified Chinese', 'Traditional Chinese', 'Korean'],
        'Korean':['English', 'Japanese', 'Simplified Chinese', 'Traditional Chinese', 'Vietnamese', 'Indonesian','Thai','German','Russian','Spanish','Italian','French' ],
        'Russian':['Korean'],
        'Simplified Chinese':['Traditional Chinese', 'Korean', 'English', 'Japanese'],
        'Traditional Chinese':['Korean', 'English','Japanese', 'Simplified Chinese'],
        'Vietnamese': ['Korean']
    };

    const languageCodeMap = {
        'English' : 'en',
        'French:': 'fr',
        'German': 'de',
        'Indonesian':'id',
        'Italian': 'it',
        'Japanese': 'ja',
        'Korean': 'ko',
        'Russian': 'ru',
        'Simplified Chinese': 'zh-CN',
        'Spanish' : 'es',
        'Thai': 'th',
        'Traditional Chinese' : 'zh-TW',
        'Vietnamese' : 'vi'
    };
    const codeLanguageMap = {
        'en': 'English',
        'fr':'French:',
        'de': 'German',
        'id': 'Indonesian',
        'it':'Italian',
        'ja':'Japanese',
        'ko':'Korean',
        'ru': 'Russian',
        'zh-CN': 'Simplified Chinese' ,
        'es': 'Spanish' ,
        'th':'Thai' ,
        'zh-TW':'Traditional Chinese' ,
        'vi': 'Vietnamese' 
    };

    return(
        <Box sx={{width: "100%", display: "flex", justifyContent: "end", paddingRight: "20px"}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: '180px' }}>
                <InputLabel id="source-language-select-label">Source language</InputLabel>
                <Select
                labelId="source-language-select-label"
                id="source-language-select"
                value={srcLang}
                onChange={(e) => setSrcLang(e.target.value)}
                label="Source language"
                >
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'fr'}>French</MenuItem>
                <MenuItem value={'de'}>German</MenuItem>
                <MenuItem value={'id'}>Indonesian</MenuItem>
                <MenuItem value={'it'}>Italian</MenuItem>
                <MenuItem value={'ja'}>Japanese</MenuItem>
                <MenuItem value={'ko'}>Korean</MenuItem>
                <MenuItem value={'ru'}>Russian</MenuItem>
                <MenuItem value={'zh-CN'}>Simplified Chinese</MenuItem>
                <MenuItem value={'es'}>Spanish</MenuItem>
                <MenuItem value={'th'}>Thai</MenuItem>
                <MenuItem value={'zh-TW'}>Traditional Chinese</MenuItem>
                <MenuItem value={'vi'}>Vietnamese</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: '180px' }}>
                <InputLabel id="dest-language-select-label">Destination language</InputLabel>
                <Select
                labelId="dest-language-select-label"
                id="dest-language-select"
                value={destLang}
                onChange={(e) => setDestLang(e.target.value)}
                label="Destination language"
                >
                {
                    srcLang === ""?
                    null
                    :
                    languageDict[codeLanguageMap[srcLang]].map(elem => 
                        <MenuItem value={languageCodeMap[elem]}>{elem}</MenuItem>)
                }
                </Select>
            </FormControl>
        </Box>
    );
}

export default Setting;