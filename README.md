# react-custom-hook-state-management]

This project is a demo on how to use a custom hook to manage application state, instead of react-redux or the contextAPI
|Home|Favorites|
|:-----:|:------:|
![image](https://user-images.githubusercontent.com/17517057/182928719-3ef79807-7352-4870-80bc-2a833840635a.png)|![image](https://user-images.githubusercontent.com/17517057/182929093-a3d82da7-bf05-4709-9537-05014da22214.png)

it sets a generic useStore custom hook that can be used by other practical hooks (such as products-store.js on this application) to keep the state of the entire application

You will see that fetch calls are maded without an endpoint. This is possible because we settle up a proxy on package.json
  "proxy": "http://localhost:8080"

The project also uses React.memo() to improve performance.

Curious on how to manage state with plain React? check the file `src/hooks-store/store.js`
