// Init classes
var git = {
    nom: '',
    prenom: '',
    url: '',
    commit_list: []
}

var commit = {}

// Init conf variables
var TOKEN = null;

// Load app config
$.getJSON("app.json", function(json) {
    TOKEN = json.TOKEN;
});

var app = new Vue({
    el: '#app',
    data: {
        git_list: []
    },
    mounted() {

    },
    methods: {
        refreshProject: function () {
            axios({
                headers : {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${TOKEN}`
                }
            })
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => (this.info = response))
        }
    }
})