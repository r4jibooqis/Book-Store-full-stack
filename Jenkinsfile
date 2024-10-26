pipeline {
    agent any 

    environment {
        REACT_IMAGE = 'my-react-app:latest'
        REACT_CONTAINER_NAME = 'react_app'
        SPRING_IMAGE = 'my-spring-app:latest'
        SPRING_CONTAINER_NAME = 'spring_app'
        REACT_PORT = '3000' // Port for React app
        SPRING_PORT = '8080' // Port for Spring Boot app
    }

    stages {        
        stage('List Frontend Directory') {
            steps {
                    dir('frontend') {
                    bat 'dir' // For Windows
                }
            }
        }


        stage('Build Frontend (React App)') {
            steps {
                dir('frontend') {
                    // Install dependencies and build the React app
                    bat 'npm install'
                    bat 'npm run build'
                    // Build the Docker image for React
                    bat 'docker build -t ${REACT_IMAGE} .'
                }
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir('backend') { // Make sure you specify the correct directory for the Spring Boot app
                    // Clean and package the Spring Boot application
                    bat 'mvn clean package'
                    // Build the Docker image for Spring Boot
                    bat 'docker build -t ${SPRING_IMAGE} .'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') { // Ensure you are in the backend directory for tests
                    script {
                        def testResults = bat(script: 'mvn test', returnStatus: true)
                        if (testResults != 0) {
                            error("JUnit tests failed.")
                        }
                    }
                }
            }
        }

        stage('Deploy Locally with Docker') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                script {
                    // Stop and remove existing Spring Boot container
                    bat "docker rm -f ${SPRING_CONTAINER_NAME} || exit 0"
                    // Run Spring Boot container
                    bat "docker run -d --name ${SPRING_CONTAINER_NAME} -p ${SPRING_PORT}:8080 ${SPRING_IMAGE}"

                    // Stop and remove existing React app container
                    bat "docker rm -f ${REACT_CONTAINER_NAME} || exit 0"
                    // Run React app container
                    bat "docker run -d --name ${REACT_CONTAINER_NAME} -p ${REACT_PORT}:3000 ${REACT_IMAGE}"
                }
            }
        }
    }

    post {
        success {
            script {
                sendEmailNotification("Local deployment successful!", "SUCCESS")
            }
        }
        failure {
            script {
                sendEmailNotification("Local deployment failed!", "FAILURE")
            }
        }
    }
}

def sendEmailNotification(String subject, String body) {
    emailext(
        subject: subject,
        body: body,
        to: 'raji.makkah@gmail.com'
    )
}
