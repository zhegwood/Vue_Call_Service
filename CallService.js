import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);

var CallService = {
    errorText(response) {
        var error_text = "";
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 302) {
                //if it's trying to redirect, chances are the session is expired
                location.reload();
                return;
            }

            if (response.data) {
                error_text = response.status +
                    ": " + response.statusText +
                    " - " + response.data.message;
                if (response.data.line) {
                    error_text += " line: " + response.data.line;
                }
                if (response.data.file) {
                    error_text += " file: " + response.data.file;
                }
            } else {
                error_text = response.status + ": " + response.statusText;
            }

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest
            error_text = error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            error_text = error.message;
        }

        return error_text;
    },
    get(url,pass_error) {
        return new Promise(function(resolve,reject){
            Vue.axios(url)
                .then((response) => {
                    var d = response.data;
                    if (d.success) {
                        resolve(d.data);
                    } else {
                        if (pass_error) {
                            reject(d);
                        } else {
                            EventBus.$emit('global_error', d.error);
                        }
                    }
                })
                .catch((error) => {
                    var error_text = CallService.errorText(error);
                    if (pass_error) {
                        reject(error_text)
                    } else {
                        EventBus.$emit('global_error', error_text);
                    }
                });
        });
    },
    post(url,data,headers,pass_error) {

        return new Promise(function(resolve,reject) {

            var config = {
                url: url,
                method: 'post',
                headers: headers ? {headers} : null,
                data: data
            };
            Vue.axios(config)
                .then((response) => {
                    var d = response.data;
                    if (d.success) {
                        resolve(d.data);
                    } else {
                        if (pass_error) {
                            reject(d);
                        } else {
                            EventBus.$emit('global_error', d.error);
                        }
                    }
                })
                .catch((error) => {
                    var error_text = CallService.errorText(error);
                    if (pass_error) {
                        reject(error_text)
                    } else {
                        EventBus.$emit('global_error', error_text);
                    }
                });
        });
    }
};

Object.defineProperty(Vue.prototype, '$CallService', {
    get: function() {
        return this.$root.CallService;
    }
});

new Vue({
	el: "#aap",
	data() {
		return {
			CallService: CallService
		}
	}
});
