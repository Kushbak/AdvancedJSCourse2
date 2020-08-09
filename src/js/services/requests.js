export const getResources = async (url) => { 
    let res = await fetch(url);

    if(!res.ok){
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
} 

export const postData = async (url, data) => { 
    let res = await fetch(url, {
        method: 'POST',
        body: data
    });

    return await res.text();
}