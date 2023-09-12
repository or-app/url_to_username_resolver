const axios = require('axios');
const parse = require('node-html-parser').parse;

const Error_func = {
    not_channel_page:()=>{throw new Error('This URL is not a YouTube channel page or is temporarily unavailable.')},
    not_youtube_url:()=>{throw new Error('This URL is not a YouTube URL.')},
}

module.exports = async (url) => {
    if (url.includes('youtu')) {
        try {
            const fetch = await axios.get(url);
            let xml_url
            parse(fetch.data).querySelectorAll('link').map((a) => a.attrs.href != undefined && a.attrs.href.startsWith('https://www.youtube.com/feeds/videos.xml?') ? xml_url = new URL(a.attrs.href) : false);
            return xml_url.search.replace('?channel_id=', '');;
        }
        catch (error){
            Error_func.not_channel_page();
        }
    }
    else {
        Error_func.not_youtube_url();
    }
}
