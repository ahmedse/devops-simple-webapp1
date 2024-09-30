pipeline {
    agent any

    environment {
        REPO_URL = 'nexus.pgls-schools.net:8071/sherkety-docker-images'
        IMAGE_NAME = 'webapp1'
        IMAGE_TAG = 'latest'
        // Set DOCKER_HOST to use the TCP endpoint
        DOCKER_HOST = 'tcp://sherkety-socat:2375'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Specify the Docker host environment variable before building the image
                    withEnv(["DOCKER_HOST=${env.DOCKER_HOST}"]) {
                        docker.build("${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Push Image to Nexus') {
            steps {
                script {
                    withEnv(["DOCKER_HOST=${env.DOCKER_HOST}"]) {
                        docker.withRegistry('http://nexus.pgls-schools.net:8071/', 'docker-nexus-creds') {
                            docker.image("${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}").push()
                        }
                    }
                }
            }
        }
    }
}