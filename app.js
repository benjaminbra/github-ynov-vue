// Init conf variables
var TOKEN = '6881346ff446427f2b903c856de5add948896420';
var githubUri = 'https://api.github.com';

var app = new Vue({
    el: '#app',
    data: {
        gitList: [],
        authorList: [
            'benjaminbra',
            /*'Nair0fl',
            'raphaelCharre',
            'mathiasLoiret',
            'thomaspich',
            'TeofiloJ',
            'Grigusky',
            'Dakistos',
            'mael61',
            'KevinPautonnier',
            'BenoitCochet',
            'sfongue',
            'ClementCaillaud',
            'gfourny',
            'Mokui',
            'LordInateur',
            'AntoineGOSSET',
            'etienneYnov',
            'Coblestone',
            'AlexDesvallees',
            'rudy8530',
            'Killy85',
            'alixnzt'*/
        ],
        projectList: [
            'github-ynov-vue',
        ],
        projectSelected: [],
        authorSelected: [],
    },
    methods: {
        refreshProjects: function () {
            for (let pS in this.projectSelected) {
                for (let aS in this.authorSelected) {
                    axios({
                        headers: {
                            Accept: 'application/vnd.github.v3+json',
                            Authorization: `token ${TOKEN}`
                        },
                        method: 'GET',
                        url: `${githubUri}/repos/${this.authorSelected[aS]}/${this.projectSelected[pS]}`
                    })
                        .then(function (response) {
                            app.gitList = [];
                            repo = response.data;

                            var newGit = {};
                            newGit.nom = repo.full_name;
                            newGit.url = repo.html_url;
                            newGit.commits = [];

                            axios({
                                headers: {
                                    Accept: 'application/vnd.github.v3+json',
                                    Authorization: `token ${TOKEN}`
                                },
                                method: 'GET',
                                url: `${githubUri}/repos/${repo.full_name}/commits`
                            })
                                .then(function (response) {
                                    for (c in response.data) {
                                        var commit = {};
                                        commit.message = response.data[c].commit.message;
                                        newGit.commits.push(commit);
                                    }
                                    app.gitList.push(newGit);
                                })

                        })
                }
            }
        },

    }
})