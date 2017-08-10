
// Note - article data would probably be loaded asynchronously in the real world
const articleData = require(__dirname + '/data/article.json');
const buildConfig = require(__dirname + '/buildConfig.js'); 

let fs = require('fs');
let Handlebars = require('handlebars');
let HandlebarsHelpers = require('just-handlebars-helpers');

let templates = {
    "layouts": {},
    "partials": {}
};

let pageBuildList = [];

/**
 * Initialise template builder
 */
function init() {
    let promises = [];

    // Load each template to be used - uses a promise as this may take a while
    buildConfig.templates.forEach((template) => {
        promises.push(
            loadHandlebarsTemplate(template.templateLocation).
                then(
                    (data) => {
                        templates.layouts[template.template] = data;
                    },
                    (reason) => {
                        // handle file read error
                        console.log(reason);
                    }
                )
        );
    });

    // Load each partial to be used - uses a promise as this may take a while
    buildConfig.pages.forEach((page) => {
        promises.push(
            loadHandlebarsTemplate(page.partialLocation).
                then(
                    (data) => {
                        templates.partials[page.partial] = data;
                    },
                    (reason) => {
                        // handle file read error
                        console.log(reason);
                    }
                )
        );
    });

    // Runs after promises have all completed
    Promise.all(promises).then(() => {
        assemblePageBuildList();
        buildPages();
    });
}

/**
 * Load all handlebars templates/partials
 * @param {string} fileLocation - location of templates and partials
 * @return {Object} A promise - resolves with data from template/partial
 */
function loadHandlebarsTemplate(fileLocation) {
    let promise = new Promise((resolve, reject) => {
        // read the file and use the callback to render
        fs.readFile(__dirname + fileLocation, 'utf-8', (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject('File read error');
            }
        });
    });

    return promise;
}

/**
 * Builds out an array of objects (combination of page config and page
 * data) containing all info necessary to build each page.
 */
function assemblePageBuildList() {
    buildConfig.pages.forEach((page) => {
        let pageData = {};

        // Combine data from buildConfig.js for each page type
        if (page.contentType === 'homepage') {
            pageData = JSON.parse(JSON.stringify(page));
            pageData.data.body.articleList = articleData;
            pageBuildList.push(pageData);
        } else if (page.contentType === 'article') {
            // For article pages, create a page for each article
            articleData.forEach((article) => {
                pageData = JSON.parse(JSON.stringify(page));
                pageData.data.body.article = article;
                pageData.fileName += '-' + article.id;
                pageBuildList.push(pageData);
            });
        } else if (page.contentType === 'error') {
            pageData = JSON.parse(JSON.stringify(page));
            pageBuildList.push(pageData);
        }
    });
}

/**
 * Uses the data from pageBuildList, and the templates/partials
 * to build each page to output location
 */
function buildPages() {
    pageBuildList.forEach((page) => {
        let result;
        // Call the render function
        let template = Handlebars.compile(templates.layouts[page.template]);

        // Note: if no partial then no page can be built
        if (templates.partials[page.partial] !== undefined) {
            // Register helpers and partials for Handlebars 
            HandlebarsHelpers.registerHelpers(Handlebars);
            Handlebars.registerPartial('body', templates.partials[page.partial]);
            // Build template out to html using page data
            result = template(page.data);
            fs.writeFile(__dirname + page.outputLocation + page.fileName + '.html', result);
        }
    });
}

init();
