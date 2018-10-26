// Init conf variables
var TOKEN = config.TOKEN;
var githubUri = config.GITHUB_URL;
var authorList = config.authorList;
var projectList = config.projectList;

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
        authorList: authorList,
        projectList: projectList,
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
                            newGit.id = repo.id;
                            newGit.nom = repo.full_name;
                            newGit.url = repo.html_url;
                            newGit.readme = null;
                            newGit.commits = [];
                            newGit.errors = [];

                            axios({
                                headers: {
                                    Accept: 'application/vnd.github.v3.html',
                                    Authorization: `token ${TOKEN}`,
                                },
                                method: 'GET',
                                url: `${githubUri}/repos/${repo.full_name}/readme`,
                            }).then(function (response) {
                                console.log(response);
                                newGit.readme = response.data;
                            });

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
                                        let commitResponse = response.data[c];
                                        let dateCommit = new Date(Date.parse(commitResponse.commit.committer.date));
                                        if (dateCommit.getTime() >= progDateDebut.getTime() && dateCommit.getTime() <= progDateFin.getTime()) {
                                            let commit = {};
                                            commit.message = commitResponse.commit.message;
                                            commit.date = dateCommit.toUTCString();
                                            commit.url = commitResponse.html_url;
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
