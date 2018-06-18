# Vue_Call_Service

This is a wrapper for Axios and VueJS for making ajax requests. It is meant to be a snippet for your app.js file, not a fully functioning Vue application.

## Getting Started

This assumes you have installed vue, axios, and vue-axios.  Otherwise, you can copy and paste this code into your app.js and begin using the CallService.


```
//Making a get request.
//The second parameter is whether or not to pass the error to this catch.i
//If set to true, error handling will be handled in this response, not in the Call Service.
//If set to false, there is no need for the catch.  Just make sure you have a way to capture errors
//at the global level.
this.$CallService.get('/ajax/user/auth_user',true)
	.then((data) => {
		var auth_user = data.auth_user;
		if (typeof(Storage) !== "undefined" && auth_user) {
			sessionStorage.setItem('auth_user',JSON.stringify(auth_user));
		}
		this.$store.dispatch('auth_user',auth_user);
		EventBus.$emit('auth_user',auth_user);
	})
	.catch((error) => {
		console.log(error);
	});
```

```
//Making a post request.
//params are a json object of stuff to pass to the server
//null, in this case is headers.  If you do want to pass custom
//headers, pass as an object array.
var params = {
	start: this.start,
	end: this.end
};
this.$CallService.post('/ajax/statement',params,null)
	.then((data) => {
		this.current_portal.accounts = data.accounts;
		this.current_portal.accounts_loading = false;
	});
```
