# BEERFLIX
A responsive web to find the best beers of the galaxy.

## Webpack configuration

### Development
Command line to work in development mode:
```shell
npm start
```
### Production
Command line to get the dist folder:
```shell
npm run prod
```
After this you can server the dist folder with http-server:
```shell
http-server dist
```
### Plugins
**Development**
* clean-webpack-plugin
* html-webpack-plugin
* webpack.HotModuleReplacementPlugin

**Production**
* clean-webpack-plugin
* html-webpack-plugin
* mini-css-extract-plugin
* webpack.ProgressPlugin

### Npm modules
**moments js**: to format dates.

**striptags**: to delete html tags.

## Eslint 
Eslint review done. All important errors fixed.

## UX
Mobile first design.
Media queries (4 sizes):
* Mobile: less than 768px.
* Tablet: More than 768px.
* Desktop: More than 1024px.
* Large desktop: More than 1200px. (Only changes the background image of the search form).

To change this values search at file <code>_variables.scss.</code>

### Home
The home page shows 8 beers.

### Navbar
The search form has a background adaptable image. There are several image sizes depending on the device size.

**Under 1024px**

The search form is hidden. You have to open it click in the search icon.

**Over 1024px**

The search form is visible.

### Detail
The detail page shows all detail information and has three different layouts depending on the device size.

## Functionalities

### Search filters 
If you search something the web will return a list of beers that match with this search.

**By text** EXAMPLE

Put <code>malt</code> in the text input. 

The web will show you all beers that match this search.  

**By text and limit** EXAMPLE

Put <code>malt</code> in the text input and <code>12</code> in next input field. 

The web will show you all beers that match this search. 

**By year** EXAMPLE

Put <code>2011</code> in the date input and <code>2011</code> in next input field. 

The web will show you all beers that match this search.

### Detail
If you click on the name of some beer you can see all the beer detail information.

#### Create Comments 

You can create a comment at the beer detail page.
Every comments will be rendered.
Last comment is the first that you can see.

#### Likes

You can give a like to any beer either at every list and at the detail page.



