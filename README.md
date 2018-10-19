# News Site Part V

## High Level Objectives

 1. Add the ability to add an article to the site.
 2. Stub out a login page

## Initial Setup

You will want to copy over the work you did in the News Site IV challenge into this repo - this time, you can copy and paste the entire `src` directory from the `news-site-IV` repo and paste it directly into this repo.

**After copying over your source directory, run `npm run update-tests`.**  This command will update a few unit tests in your `src/` directory.

Once you've performed the steps above, run `npm run start` - verify that no errors appear in your browser console or terminal, and that your app functions the same as it did in the last challenge.  Also try running `npm run test` - you should see a single failure coming from the `ArticlesAPI.js` module.  This is to be expected - the test that's failing is because the functionality the test is attempting to run hasn't been built yet - we'll be doing that next.

## Release 0: ArticlesAPI.addArticle()

To start, let's build a function within `ArticlesAPI.js` that we can use to send article data to the API.  

Up until now, we've only used Fetch to make `GET` requests to our API (this is the default request method `fetch` uses).  When reading data from an API (such as reading a list of articles), it's customary to use the GET request method.  When writing/submitting data, it's customary to use the POST request method - POST allows data to be sent securely.  

To send a POST request, you will still use `fetch` - you will be passing `fetch` some additional data that will instruct it to use the POST request method.  Posting data to our API would look something like this:

```
fetch('http://localhost:3001/api/articles', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify(articleObject)
})
```

Note the second argument passed to `fetch` - an options object.  This object allows you to control specific aspects of the request that's made, such as headers and the request method.  

Headers allow you to pass additional information with a request.  Here, we're including a header that says the type of content we're going to be sending - JSON.  Headers can also include things like authentication tokens, instructions on how to handle cached files, to name a few.

The `method` key in the options object defines the type of request that should be made.  By default, this is set to `GET` - here, we're setting it to `POST`.

Lastly, the `body` key contains the `POST` payload - the data that will be sent to the API, and then processed and stored in a database.  The value of this property should be a JSON-encoded string.

In `ArticlesAPI.js`, you should define a new function called `addArticle`.  This function should accept a single parameter - `articleObject`.  This function should perform a Fetch call similar to the one above - you'll want to convert the object that's passed into the function into a JSON string, and set the `body` property of the options object (the second parameter in the Fetch call) to this JSON string.  

A new test has been added to verify this behavior - once all of your unit tests succeed, you may continue to the next section.


## The Add Article Page
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

Consider using react-bootstrap components to create these form elements (a demo form using this library can be found [here](https://react-bootstrap.github.io/components/forms/)).

Once you have the form appearing on screen, you will need to build the behavior that should occur when the form is submitted.  The `<form>` element can fire a unique event - onSubmit.  Example:

    <form onSubmit={this.handleFormSubmit.bind(this)}>
    <form>

The event object that's passed into your event handler will contain references to all of the input fields through a property called "elements".  Example:

    handleFormSubmit(event) {
      console.log(event.target.elements[0].value); // This will print out the value contained within the first input field on the form.
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

## The Log In Page
Again, we'll want to create a new page.  By now, you probably know the routine.  The page component should be named LoginPage.js, and the route that should load this component should be `/login`.

This page should also display a form.  Within this form, there should be two text inputs - one for an email, and one for a password - and a submit button.

Password fields are slightly different than text inputs (`<input type="text">`.  Password input fields hide the text that's typed into the text field, as you're probably familiar.  

If you're using react-bootstrap, revisit [this](https://react-bootstrap.github.io/components.html#forms-controls) section for examples of how to create a password field using the components from that library.  If you're using vanilla HTML, a password input field would look like this:  `<input type="password" />`

After you have form UI completed, attach an event listener to the form's onSubmit event.  In your event handler, simply console.log the values in the email and password fields.

## Secondary Objectives
If you haven't noticed, there is a bit of a flaw in our AddArticle.js component - there is no error handling.  If you go to the AddArticle.js page, leave all of the form fields empty, and push submit, the API request to submit the article will fail - our UI will display the success message, however.  

This can be alleviated by adding a bit more logic into the ArticlesAPI.addArticle().then() callback function.  When the required data isn't submitted, the API will respond with a JSON object that contains an "error" key.  "error" is an object that contains details about the error - an error message, the fields that were invalid.  If you store this data into the AddArticle.js component's state, it will be possible to render() information about errors when they exist.  As far as the specifics, I leave that up to you.
