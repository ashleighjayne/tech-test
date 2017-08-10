
// Basic data used to populate each page
let dataHomePage = {
    "head": {
        "title": "Home"
    },
    "body": {
        "articleList": []
    }  
};

let dataArticlePage = {
    "head": {
        "title": "Article"
    },
    "body": {
        "article": {}
    }
};

let data404Page = {
    "head": {
        "title": "Error 404"
    },
    "body": {
        "title": "Error 404",
        "text": "Not Found"
    }
};

// Config for each page - reads from page data
module.exports = {
    "templates": [
        {
            "template": "main",
            "templateLocation": "/src/js/templates/layout.hbs"
        }
    ],
    "pages": [
        {
            "template": "main",
            "partial": "article-list",
            "fileName": "homepage",
            "partialLocation": "/src/js/partials/article-list.hbs",
            "outputLocation": "/dist/templates/",
            "contentType": "homepage",
            "instances": "single",
            "data": dataHomePage
        },
        {
            "template": "main",
            "partial": "article",
            "fileName": "article",
            "partialLocation": "/src/js/partials/article.hbs",
            "outputLocation": "/dist/templates/",
            "contentType": "article",
            "instances": "multiple",
            "data": dataArticlePage
        },
        {
            "template": "main",
            "partial": "error404",
            "fileName": "error404",
            "partialLocation": "/src/js/partials/error404.hbs",
            "outputLocation": "/dist/templates/",
            "contentType": "error",
            "instances": "single",
            "data": data404Page
        }
    ]
};




