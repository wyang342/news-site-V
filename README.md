# News Site Part V

## High Level Objectives
1. Create ability to add an article to the news site
2. Add a `log in` UI (no real functionality yet)

## Quick Review

Let's first review a few HTTP methods:
- **GET:** Grabbing data and resources from a server. Remember that you can add filters into the query string. An example: `GET http://localhost:3001/api/articles/?filter={"where": {"section": "opinion"}}`
- **POST:** Creates new records. You will use this today to create a new article
- **PATCH / PUT:** Updating a record that already exists.
- **DELETE:** Deletes a record

We've become kind of familiar with the `fetch` method for JS. We have been using it for mostly `GET` requests. Here is an example:

```js
fetch('https://jsonip.com') // makes a request to this URL
  .then((response) => response.json()) // after the request is made, you THEN get a Promise as a response. After I receive the Promise, I turn it into a JSON object
  .catch((error) => console.log(error)) // in the case that there's an error, CATCH it and console the error
```

More popularly, however, we can use `fetch` to create `POST` requests. Here is an example:

```javascript
const articleObject = { title: 'test', byline: 'byline test', abstract: 'asdf' }

fetch('http://localhost:3001/api/articles', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(articleObject) // whenever you make an API request, you have to stringify your request
}).then((response) => {
  return response.json()
}).then((json) => {
  console.log(json)
})
```

There are a number of differences between the `GET` and `POST` examples with fetch. The `POST` `fetch` request includes `headers`, `method`, and `body`. `headers` contains data that the server needs to know what type of data it's about to receive. The `method` tells the server what kind of request is being made. Finally, the `body` contains the contents (i.e., `body`) of the request you are making.

## Initial Setup

If you'd like to use your own code from `news-site-IV`, you can copy and paste the entire `src` directory from the `news-site-IV` repo and replace the starter `src` code in this repo.

**After copying over your source directory, run `npm run update-tests`.**  This command will update a few unit tests in your `src/` directory.

Once you've performed the steps above, run `npm install ; npm run start` - verify that no errors appear in your browser console or terminal, and that your app functions the same as it did in the last challenge. Also try running `npm run test` - you should see a single failure coming from the `ArticlesAPI.js` module. This is to be expected - the test that's failing is because the functionality the test is attempting to run hasn't been built yet - we'll be doing that next.

## Testing Fetch
Let's test this `fetch` command in the console:

```js
const articleObject = { title: 'test', byline: 'byline test', abstract: 'asdf' }

fetch('http://localhost:3001/api/articles', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(articleObject) // whenever you make an API request, you have to stringify your request
}).then((response) => {
  return response.json()
}).then((json) => {
  console.log(json)
})
```

If you refresh the page and scroll to the bottom, you'll see our new `test` article! What if you have a bad request? Let's try passing an incomplete data set:

```javascript
const articleObject = { byline: 'byline test', abstract: 'asdf' }

fetch('http://localhost:3001/api/articles', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(articleObject) // whenever you make an API request, you have to stringify your request
}).then((response) => {
  return response.json()
}).then((json) => {
  console.log(json)
})
```

Check the console for some errors. Part of your job today is to handle these types of issues/errors.

## Release 0: ArticlesAPI.addArticle()

To start, let's build a function within `ArticlesAPI.js` that we can use to send article data to the API.

Up until now, we've only used Fetch to make `GET` requests to our API (this is the default request method `fetch` uses).  When reading data from an API (such as reading a list of articles), it's customary to use the GET request method.  When writing/submitting data, it's customary to use the POST request method - POST allows data to be sent securely.

To send a POST request, you will still use `fetch` by passing some additional data that will instruct it to use the POST request method. Posting data to our API would look something like this:

```javascript
return fetch('http://localhost:3001/api/articles', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify(articleObject)
})
```

Note the second argument passed to `fetch` - an object of options.  This object allows you to control specific aspects of the request that's made, such as headers and the request method.

Headers allow you to pass additional information with a request.  Here, we're including a header that says that we are sending JSON. Headers can also include things like authentication tokens, instructions on how to handle cached files, to name a few.

The `method` key in the options object defines the type of request that should be made.  By default, this is set to `GET` - here, we're setting it to `POST`.

Lastly, the `body` key contains the `POST` payload - the data that will be sent to the API, and then processed and stored in a database.  The value of this property should be a JSON-encoded string.

In `ArticlesAPI.js`, you should define a new function called `addArticle`.  This function should accept a single parameter - `articleObject`.  This function should perform a Fetch call similar to the one above - you'll want to convert the object that's passed into the function into a JSON string, and set the `body` property of the options object (the second parameter in the Fetch call) to this JSON string.

A new test has been added to verify this behavior - once all of your unit tests succeed, you may continue to the next section.


## Release 1: The Add Article Page
The Add Article Page will be used to display a form that will allow users to submit an article.  Let's first begin by creating the route and the page.

The route that should display the Add Article Page should be `/add-article` - no parameters are necessary.

Once your page component and route are established, add a link to the Nav component that points to this page.

Once you've added the "Add An Article" link to your AppNav.js component, verify that clicking the link redirects you to the appropriate route.

Lastly, let's create the content that `AddArticlePage.js` should render.

We need to render a `<form>`, and that form should contain 3 fields:

 1. Title - a text input
 2. Byline - a text input
 3. Abstract - a text area

In addition to the form fields, you'll also need a submit button.

Consider using either `react-bootstrap` or `reactstrap` components to create these form elements. A demo form using `react-bootstrap` can be found [here](https://5c507d49471426000887a6a7--react-bootstrap.netlify.com/components/forms/), and documentation for `reactstrap` forms can be found [here](https://reactstrap.github.io/components/form/).

Once you have the form appearing on screen, you will need to build the behavior that should occur when the form is submitted.  The `<form>` element can fire a unique event - onSubmit.  Example:

    <form onSubmit={this.handleFormSubmit}>
    </form>

The event object that's passed into your event handler will contain references to all of the input fields through a property called "elements".  Example:

    handleFormSubmit = (event) => {
      console.log(event.target.elements[0].value) // This will print out the value contained within the first input field on the form.
    }

Within your `<form>`'s onSubmit event handler, you will want to first construct an object that resembles the following:

    {
      title: "Some value of the title input field Lorem Ipsum",
      byline: "Some value of the bylien input field lorem ipsum",
      abstract: "this text should come from the abstract text field"
    }

You will then want to pass it to ArticlesAPI.addArticle(), and then use the then() function and define a callback function that should be executed when the ArticlesAPI.addArticle promise/request is resolved.

    ArticlesAPI.addArticle(articleObject)
      .then((json) => {
        // callback function logic should appear here.
      })

As far as the callback function logic goes, **we ultimately want to show a success message when an article is submitted.**  I'll leave it up to you to determine how to best accomplish this, but your solution will likely involve using setState within this callback function - and setting some sort of indicator within state that says that the form was submitted (this.state.hasArticleBeenSubmitted, perhaps?)  You can then build some conditional logic into your render function based off of this state variable that either shows the Add Article form, or the a message that should appear after an article is submitted.

## Release 2: The Log In Page
Again, we'll want to create a new page.  By now, you probably know the routine.  The page component should be named LoginPage.js, and the route that should load this component should be `/login`.

This page should also display a form.  Within this form, there should be two text inputs - one for an email, and one for a password - and a submit button.

Password fields are slightly different than text inputs (`<input type="text">`.  Password input fields hide the text that's typed into the text field, as you're probably familiar.

If you're using `react-bootstrap`, revisit [this](https://reactstrap.github.io/components/form/) section for examples of how to create a password field using the components from that library. Or if you're using `reactstrap`, documentation can be found [here](https://reactstrap.github.io/components/form/). If you're using vanilla HTML, a password input field would look like this:  `<input type="password" />`

After you have form UI completed, attach an event listener to the form's onSubmit event.  In your event handler, simply console.log the values in the email and password fields.

## Secondary Objectives
If you haven't noticed, there is a bit of a flaw in our AddArticle.js component - there is no error handling.  If you go to the AddArticle.js page, leave all of the form fields empty, and push submit, the API request to submit the article will fail but no messaging is portrayed.

This can be alleviated by adding a bit more logic into the `ArticlesAPI.addArticle().then()` callback function.  When the required data isn't submitted, the API will respond with a JSON object that contains an "error" key.  "error" is an object that contains details about the error - an error message, the fields that were invalid.  If you store this data into the AddArticle.js component's state, it will be possible to `render()` information about errors when they exist.  As far as the specifics, I leave that up to you.

As always, if you finish early, go ahead and create your `functional-version` branch and refactor!

**Look ahead:** If you really want another task, start looking into the documentation for [React's Context API](https://reactjs.org/docs/context.html). Think about how we might incorporate this now that we have a login page...
