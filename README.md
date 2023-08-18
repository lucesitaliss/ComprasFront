### Start local
npm start

# Shopping-list is a project with learning porpose and was created with [Create React App](https://github.com/lucesitaliss/shopping-list).

## It is hosted using GitHub Pages at:

### [Follow this link](https://lucesitaliss.github.io/shopping-list/)

### First Steps

- Open a console and clone this repository
- if you want to use the web on localhost, run npm install, npm start and change the api.js file by assigning "development" to the projectStatus variable.

```Javascript
export const getApiUrl = (urlSegment) => {
  //const projectStatus = "production";
  const projectStatus = "development";
  const url =
    projectStatus === "development"
      ? `http://www.localhost:4000/${urlSegment}`
      : `https://cart.cyclic.app/${urlSegment}`;

  return url;
};
```

- This project runs on localhost on port 3000.

## Technological stack

- React JS
- Redux toolkit
