
# Tech Test - Option 1

## Setup
This setup require NPM to install packages so please ensure you have node and npm installed.

For the setup, clone the repo from Git and run:

```js
$ npm install
```

You may need to compile templates and styling before viewing the website. To build templates, run:

```js
$ node build.js
```

And to compile stylesheets, run:

```js
$ npm run build-sass
```

To start the server, run:

```js
$ npm run start-server
```

The website should now be viewable at http://localhost:3000/


## Notes
A number of assumptions have been made due to the limitations of this tech test and the availability of time. I have listed the main ones below, but I am happy to answer any questions you might have.

#### Styling
For the sake of saving time and for convenience, I have put all the sass into one file. The files should be separated in real life situations for better readability and manageability. They can then be compiled and concatenated as necessary before release to production. 
 
e.g.    normalise.scss
        core-styles.scss
        page-layout.scss
        article.scss
        article-list.scss
        error.scss

I've included media queries only for mobile, but this could easily be expanded to include tablet other screen sizes.

#### Templates
As there is no other content appearing on these pages (e.g. ads, hero, gallery), I have created only one layout template which pulls in the correct partials for each page. For a larger project, I would expect that page elements such as article, article list, and page header to built as generic, reusable components. I have set up my partials to conform to this as closely as possible. I would also anticipate that different page types would require different layout templates on a larger project.

#### Javascript
I have documented the build.js file using JSDocs but not included the compiled docs. Running the below command will generate the docs in an 'out' directory:

```js
jsdoc build.js
```

The construction and formatting of data in the javascript handles the limitations of using a single data source (article.json) to populate different types of pages. The data is all managed within a single javascript file, however in a real world situation (where there are many other elements on a page requesting data, possibly from different sources), it's cleaner to load data in separate javascript files for each element, and then pass it along to the template builder.


## Setup Issues
In case of any issues with setup, the packages can be individually installed:

```js
$ npm install express
$ npm install nodemon
$ npm install handlebars
$ npm install just-handlebars-helpers
$ npm install npm-sass
```
