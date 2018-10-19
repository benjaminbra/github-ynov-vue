node{
  def app

  stage('Clone repository') {
    checkout scm
    sh 'echo "Clone Done"'
  }

  stage('Build images') {
    app = docker.build("benjaminbra/github-ynov-vue")
    sh 'echo "Latest image builded"'
  }

  stage('Push image') {
    docker.withRegistry('https://registry.gitlab.com/', 'gitlab-credentials') {
      app.push("build-${env.BUILD_NUMBER}")
      app.push("latest")
    }
    sh 'echo "Image Well Pushed"'
  }
}
