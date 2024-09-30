pipeline {
    agent any

    environment {
        REPO_URL = 'nexus.pgls-schools.net:8071/sherkety-docker-images'
        IMAGE_NAME = 'webapp1'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Check out code from the specified branch, defaulting to 'main'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the project's Dockerfile
                script {
                    docker.build("${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Image to Nexus') {
            steps {
                // Push the built image to the configured Nexus repository
                script {
                    docker.withRegistry('http://nexus.pgls-schools.net:8071/', 'nexus-creds') {
                        docker.image("${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                }
            }
        }
    }
}