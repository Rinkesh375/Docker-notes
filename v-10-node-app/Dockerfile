# ------------------------------------------------------------
# 🐳 Use Node.js with Alpine Linux as Base Image
# ------------------------------------------------------------
# FROM → Defines the base image used to build this container
# node:alpine3.21 → Lightweight Node.js version built on Alpine Linux
# ✅ Benefit: Smaller size, faster build & deployment
FROM node:alpine3.21


# ------------------------------------------------------------
# ⚙️ Set Working Directory & Prepare Dependencies
# ------------------------------------------------------------
# WORKDIR → Sets the default directory inside the container
# All subsequent commands (COPY, RUN, CMD) will execute from here
WORKDIR /home/app

# COPY package*.json . → Copies both package.json and package-lock.json
# This helps cache dependencies efficiently during rebuilds
COPY package*.json .

# RUN npm install → Installs all project dependencies from package.json
RUN npm install


# ------------------------------------------------------------
# 📂 Copy Application Files
# ------------------------------------------------------------
# COPY index.js index.js → Copies your main application file
# from host machine → into container’s working directory (/home/app)
COPY index.js index.js


# ------------------------------------------------------------
# 🌐 Expose Container Ports
# ------------------------------------------------------------
# EXPOSE → Informs Docker which ports the containerized app will listen on.
#
# Here, ports from 8000 to 8010 are exposed inside the container.
# This means the app or multiple services within the container can use
# any port within this range (e.g., 8000, 8001, ... , 8010).
#
# 🧠 Note:
# - EXPOSE does NOT make the ports accessible from your host machine by default.
# - To actually access these ports externally, you must publish them using:
#     → `-p` for manual mapping (e.g., -p 18000:8000)
#     → `-P` for automatic/random host port mapping
#
# Example:
# docker run -P my-app:v11   → Randomly maps exposed ports (8000–8010) to host ports.
## EXPOSE 8000-8010
EXPOSE 8000



# ------------------------------------------------------------
# 🚀 Run the Application
# ------------------------------------------------------------
# CMD → Specifies the default command to execute when the container starts
# ["npm", "start"] → Runs the start script defined in package.json
CMD ["npm", "start"]
