pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                deleteDir()
                git branch: 'main', url: 'https://github.com/KomalMabbu/mini-saas-project.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                docker build -t mini-backend ./backend
                '''
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                docker stop backend-app || true
                docker rm backend-app || true
                '''
            }
        }

        stage('Run Backend Container') {
            steps {
                sh '''
                docker run -d \
                  --name backend-app \
                  -p 5000:5000 \
                  mini-backend
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 15
                docker logs backend-app
                docker exec backend-app curl http://localhost:5000/health
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }

        failure {
            echo 'Deployment Failed!'
        }
    }
}