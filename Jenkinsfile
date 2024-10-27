pipeline {
    agent any 

    environment {
        REACT_IMAGE = 'my-react-app:latest'
        REACT_CONTAINER_NAME = 'react_app'
        SPRING_IMAGE = 'my-spring-app:latest'
        SPRING_CONTAINER_NAME = 'spring_app'
        REACT_PORT = '3000' 
        SPRING_PORT = '8080' 
    }

    stages {   

        stage('Build Frontend (React App)') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                    bat "docker build -t ${REACT_IMAGE} ."
                }
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir('backend') { 
                    bat 'mvn clean package'
                    bat "docker build -t ${SPRING_IMAGE} ."
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') { 
                    script {
                        def testResults = bat(script: 'mvn test', returnStatus: true)
                        if (testResults != 0) {
                            error("JUnit tests failed.")
                        }
                    }
                }
            }
        }

        stage('Package') {
            dir('backend') {
                steps {
                    bat 'mvn package'
                }
            }
        }

        stage('Deploy Locally with Docker') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                script {
                    bat "docker rm -f ${SPRING_CONTAINER_NAME} || exit 0"
                    bat "docker run -d --name ${SPRING_CONTAINER_NAME} -p ${SPRING_PORT}:8080 ${SPRING_IMAGE}"

                    bat "docker rm -f ${REACT_CONTAINER_NAME} || exit 0"
                    bat "docker run -d --name ${REACT_CONTAINER_NAME} -p ${REACT_PORT}:80 ${REACT_IMAGE}"
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
