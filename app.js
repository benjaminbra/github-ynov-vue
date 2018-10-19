// Init conf variables
var TOKEN = config.TOKEN;
var githubUri = config.GITHUB_URL;

var app = new Vue({
    el: '#app',
    components: {
        vuejsDatepicker
    },
    data: {
        openProjectList: false,
        openAuthorList: false,
        openPeriod: false,
        isLoaded: false,
        dateDebut: Date.now(),
        dateFin: Date.now(),
        gitList: [],
        authorList: [
            'benjaminbra',
            'Nair0fl',
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
            'alixnzt'
        ],
        projectList: [
            'github-ynov-vue',
        ],
        projectSelected: [],
        authorSelected: [],
    },
    created: function () {
        this.isLoaded = true;
    },
    methods: {
        refreshProjects: function () {
            app.gitList = [];
            progDateDebut = new Date(app.dateDebut);
            progDateDebut.setHours(0, 0, 0, 0);
            progDateFin = new Date(app.dateFin);
            progDateFin.setHours(23, 59, 59, 999);
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
                            let repo = response.data;

                            let newGit = {};
                            newGit.nom = repo.full_name;
                            newGit.url = repo.html_url;
                            newGit.commits = [];
                            newGit.errors = [];

                            axios({
                                headers: {
                                    Accept: 'application/vnd.github.v3+json',
                                    Authorization: `token ${TOKEN}`
                                },
                                method: 'GET',
                                url: `${githubUri}/repos/${repo.full_name}/commits`
                            })
                                .then(function (response) {
                                    for (let c in response.data) {
                                        let commitResponse = response.data[c].commit;
                                        let dateCommit = new Date(Date.parse(commitResponse.committer.date));
                                        if (dateCommit.getTime() >= progDateDebut.getTime() && dateCommit.getTime() <= progDateFin.getTime()) {
                                            let commit = {};
                                            commit.message = commitResponse.message;
                                            newGit.commits.push(commit);
                                        }
                                    }
                                    app.gitList.push(newGit);
                                })
                                .catch(function (errorResponse) {
                                    var error = {};
                                    error.message = errorResponse.response.data.message;
                                    newGit.errors.push(error);
                                    app.gitList.push(newGit);
                                })
                        })
                }
            }
        },

    }
})