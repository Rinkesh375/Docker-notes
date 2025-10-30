// 🐳 Docker Notes (Cheat Sheet)
// ============================================================

// ------------------------------------------------------------
// 🔹 Build Images
// ------------------------------------------------------------

// Build an image from Dockerfile in current directory
// docker build -t server-app .

// Build an image with a specific version tag
// docker build -t server-app:v50 .

// ------------------------------------------------------------
// 🔹 Run Containers
// ------------------------------------------------------------

// Run a container with a name, mapping same port
// docker run --name server-app-container-v50 -p 8000:8000 server-app:v50

// Run in detached (background) mode
// docker run -d --name server-app-container-v50 -p 8000:8000 server-app:v50

// Run with different host:container port mapping
// docker run -d --name server-app-container-v50 -p 8000:3215 server-app:v50
// Access in browser → http://localhost:8000 (host port)

// ------------------------------------------------------------
// 🔹 Manage Containers
// ------------------------------------------------------------

// List running containers
// docker ps

// List all containers (including stopped ones)
// docker ps -a

// Start an existing container
// docker start server-app-container-v50

// Stop a running container
// docker stop server-app-container-v50

// Remove a container
// docker rm server-app-container-v50

// View logs from a container
// docker logs server-app-container-v50

// ------------------------------------------------------------
// 🔹 Manage Images
// ------------------------------------------------------------

// List all Docker images
// docker images

// Remove an image
// docker rmi server-app:v50

// Pull an image manually
// docker pull node:20-alpine

// ------------------------------------------------------------
// 🔹 System Cleanup
// ------------------------------------------------------------

// Remove stopped containers, unused networks, dangling images, build cache
// docker system prune -f

// Remove unused images as well
// docker system prune -a -f

// Full cleanup including volumes (⚠️ deletes data)
// docker system prune -a --volumes -f
// Note:
//  - Does not delete running containers
//  - Deletes unused volumes and persistent data if not in use

// ============================================================
// 🔥 Docker Full Cleanup Commands (Containers + Images)
// ============================================================

// ------------------------------------------------------------
// 1️⃣ Delete All Containers (Running or Stopped)
// ------------------------------------------------------------

// Lists all container IDs: $(docker ps -aq)
// Force remove all containers (stops running ones first)
// docker rm -f $(docker ps -aq);

// ------------------------------------------------------------
// 2️⃣ Delete All Images (Used by Containers or Standalone)
// ------------------------------------------------------------

// Lists all image IDs: $(docker images -q)
// Force remove all images
// docker rmi -f $(docker images -q);

// ------------------------------------------------------------
// ✅ Recommended Safe Workflow
// ------------------------------------------------------------

// Stop & remove all containers, then delete all images
// Ensures no running containers block image removal
// docker rm -f $(docker ps -aq) && docker rmi -f $(docker images -q);

// ------------------------------------------------------------
// Optional Cleanup
// ------------------------------------------------------------

// Delete all Docker volumes (⚠️ deletes persistent data)
// docker volume rm $(docker volume ls -q);

// Delete all networks (except default ones)
// docker network rm $(docker network ls -q);

// ============================================================
// End of Docker Notes
// ============================================================
