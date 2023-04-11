pipeline {
    agent any

    environment {
      NAME_FOLDER_ZIP = "source.zip"
      WORKSPACE = "${env.WORKSPACE}"
      HOST_SFTP = "ftp.concafras.com"
    }

    stages {
      stage("Build & Deploy") {
        steps {
          echo "..:: INÍCIO BUILD ::.."
          script {
            def files = findFiles(glob: 'index.html, favicon.ico, assets/**')

            echo "${files}"

            echo "..:: INÍCIO DEPLOY ::.."

            dir("alegria-scripts") {
              // Realiza o clone
              git branch: 'main',
                  credentialsId: 'GitHub_Username',
                  url: 'https://github.com/viniciusks/alegria-scripts.git'

              withCredentials([usernamePassword(credentialsId: 'user_sftp_concafras', passwordVariable: 'passSftp', usernameVariable: 'userSftp')]) {
                withPythonEnv("/usr/bin/python3") {
                  sh "pip3 install -r requirements.txt"
                  files.each { file ->
                    sh "python3 send_sftp.py ${HOST_SFTP} ${userSftp} ${passSftp} ${WORKSPACE}/${file} audio-player"
                  }
                }
              }
            }
          }
        }
      }
    }
    post {
      always {
        echo "..:: Limpando workspace ::.."
        cleanWs()
      }
    }
}