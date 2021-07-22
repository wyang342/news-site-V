const BASE_URL = 'http://localhost:3001/api/articles';

const fetchArticleByID = async (articleID) => {
    const response = await fetch(`${BASE_URL}/${articleID}`);
    const data = await response.json();
    return data;
};

const fetchArticlesBySection = async (section) => {
    const response = await fetch(`${BASE_URL}?filter={"where":{"section":"${section}"}}`);
    const data = await response.json();
    return data;
};

const fetchArticles = async (filters = null) => {
    const url = filters ? `${BASE_URL}?filter={"where":${filters}}` : BASE_URL;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const searchArticles = async (textToSearchFor) => {
    const response = await fetch(`${BASE_URL}?filter={"where":{"title":{"ilike":"${textToSearchFor}"}}}`)
    const data = await response.json();
    return data;
}

const addArticle = async (articleObject) => {
    const response = await fetch('http://localhost:3001/api/articles', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(articleObject)
    })

    const data = await response.json();
    return data;
}

export {
    fetchArticleByID,
    fetchArticles,
    fetchArticlesBySection,
    searchArticles,
    addArticle,
};
