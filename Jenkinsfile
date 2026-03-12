pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/SIDDHARTH0424/SIT_ADMISSION_FORM.git'
            }
        }

        stage('Show Files') {
            steps {
                sh 'ls'
            }
        }

        stage('Build') {
            steps {
                echo 'Build Successful'
            }
        }

    }
}
