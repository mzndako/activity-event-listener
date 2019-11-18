# Activity Event Listener
Using this package allows you to listen for browser events like unhandle exceptions/errors, http success and failure, unhandle promises, etc.

You can use this package to monitor for user activities and sending the events to a server for logging purposes.
# Installation

```
npm install activity-event-listener --save
```

# Usage
**Event Listener**

```
import {subscribe} from 'activity-event-listener';

const options = {
  promiseCatch: true,
  httpFailure: true
}

subscribe(function(events){
  // This function is called whenever an event is triggered
}, options)
```

**Event Listener Options**

You can also specify which event you want to listen by altering the `options` property
```
const options = {
  promiseCatch: true, // Trigger when promise catch is invoked. default true
  httpSuccess: true, // Triggered when an http request is completed successfully. default true
  httpFailure: true, // Triggered an event when an http request failed. default true
  unhandleRejection: true, // Triggered when an unhandle Rejection error is thrown. default true
  linkClick: true, // Triggered when any html anchor tag (a link) is clicked. default false
  buttonClick: true // Triggered when any html button is clicked. default false,
  ignoreUrl: 'https://example.com/logging-endpont' // Provide the url link that should be ignored (not tracked) if you plan to be sending the events to a server.
}
```

**Trigger Events**

You can also listen for frontend framework specific events and trigger an event.
```
import {subscribe, options, trigger} from 'activity-event-listener';

// file1.js
subscribe(function(event){
  // log the event or send it to server for storage
})

// file2.js
Vue.config.errorHandler = function(error) {
  let customEvent = {
    ...error,
    message: error && error.message,
    stack: error && error.stack,
    isError: true
  }

  trigger(customEvent, options.unhandleRejection);
}
```

## Sample work

```
import {subscribe} from 'activity-event-listener';

subscribe(function(events){
  // Push the events to a logging server
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    console.log('Activity Sent')
  };
  
  xhttp.open("POST", "/activity-event-log/", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(events));

}, {ignoreUrl: 'https://myserver.com/logging-endpont'})
