# DeepSeek on Your Local Machine (Web Version)

## Project Overview

This project consists of a backend and a frontend that enable interaction with the DeepSeek AI model locally. 

By using Docker and the Ollama service, AI processing can be done without relying on cloud services, 
providing a faster and more secure experience.

### Key Features:

- **Backend:** Developed with .NET 9, handling chat requests and fetching responses from DeepSeek.

- **Frontend:** Built with React, providing a modern and user-friendly interface for interaction.

- **Docker Compose:** Simplifies service management and enables easy project execution.

- **Optimized Models:** Supports DeepSeek and other available versions.

## How to Use

### 1. Install and Run Ollama

First, install Ollama on your system. Then, to download and run the lightweight version of DeepSeek, execute the following commands:

```sh
ollama run deepseek-r1:1.5b
```
You can use other version :

```sh
ollama run deepseek-r1:671b
```
These commands will download and run the smallest DeepSeek model, 
making it suitable for efficient processing with minimal resource consumption.

### 2. Run the Project with Docker Compose

To start the backend and frontend services, run the following command:

```sh
docker-compose up -d
```
![Alt Text](/images/deepseek-local.jpg)

This command will launch both services, allowing you to run the project without additional setup.

### 3. Access the Project

Once running, you can access the web interface by navigating to:

```
http://localhost:3002
```

## Project Benefits

✅ Run DeepSeek locally without relying on cloud services, ensuring better security and speed.

✅ UI similar to popular chatbots for a seamless user experience.

✅ Docker-based architecture for easy deployment and scalability.

✅ Supports optimized AI models to reduce hardware resource consumption.

✅ Easily extendable to support additional AI models in the future.

✅ Fast message processing and real-time response to user queries.
