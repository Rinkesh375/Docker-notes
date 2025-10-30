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

// ------------------------------------------------------------
// 1️⃣ Show Help for `docker ps` Command
// ------------------------------------------------------------

// Displays help information for the `docker ps` command
// Explains usage, syntax, and available options
// Example: docker ps --help

// Common Options You’ll See:
//   -a, --all      → Show all containers (running + stopped)
//   -q, --quiet    → Show only container IDs
//   -s, --size     → Display total file sizes of containers
//   --filter       → Filter containers based on conditions
//   --format       → Format output using a custom template

// 🔹 Tip:
// Use `docker ps` alone to list running containers,
// and `docker ps -a` to see all (including stopped ones).

// ------------------------------------------------------------
// 2️⃣ Run a New Container from an Image
// ------------------------------------------------------------

// Syntax:
// docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

// 🧠 Meaning:
// Creates and starts a new container from the specified image.
// You can also run a custom command inside that container.

// ------------------------------------------------------------
// 🔹 Common Options:
// ------------------------------------------------------------
// -d                  → Run container in detached (background) mode
// -it                 → Run interactively with a terminal
// -p HOST:CONTAINER   → Map host port to container port
// --name NAME         → Assign a custom name to the container
// -e KEY=VALUE        → Set environment variables
// -v HOST:CONTAINER   → Mount a volume (host directory inside container)

// ------------------------------------------------------------
// 🔹 Examples:
// ------------------------------------------------------------
// Run Ubuntu image and open shell
// docker run -it ubuntu /bin/bash

// Run Nginx in background with port mapping
// docker run -d -p 8080:80 --name webserver nginx

// Run a single command in a temporary container
// docker run ubuntu echo "Hello Docker"

// ------------------------------------------------------------
// 🧾 Summary:
// docker run = create + start a container from an image
// Optionally, run commands inside and customize with flags.
// ------------------------------------------------------------

// ------------------------------------------------------------
// 3️⃣ Inspect Detailed Information of a Docker Image
// ------------------------------------------------------------

// Syntax:
// docker image inspect <IMAGE_ID_or_DIGEST>

// Example:
// docker image inspect sha256:66460d557b25769b102175144d538d88219c077c678a49af4afca6fbfc1b5252

// 🧠 Meaning:
// Displays complete metadata of a specific Docker image in JSON format.
// Includes details like ID, OS type, size, creation time, layers, and configs.

// ------------------------------------------------------------
// 🔹 Common Fields in Output:
// ------------------------------------------------------------
// "Id"              → Unique identifier (SHA256 digest) of the image
// "RepoTags"        → Name and tag of the image (e.g., "ubuntu:latest")
// "Created"         → Date and time when image was built
// "DockerVersion"   → Version of Docker used to build the image
// "Os"              → Operating system the image is built for (usually "linux")
// "Architecture"    → CPU type (e.g., amd64, arm64)
// "Size"            → Total size of the image
// "Config.Env"      → Environment variables set inside the image
// "Config.Cmd"      → Default command executed when container starts
// "RootFS.Layers"   → List of file system layers making up the image

// ------------------------------------------------------------
// 🔹 Example Usage:
// ------------------------------------------------------------
// View all details of an image:
// docker image inspect nginx

// Filter and show only specific field using --format:
// docker image inspect nginx --format '{{.Size}}'
// docker image inspect nginx --format '{{.Os}}'

// ------------------------------------------------------------
// 🧾 Summary:
// docker image inspect = Show full, detailed info about an image.
// Useful for debugging, verifying build data, or checking layers.
// ------------------------------------------------------------

// ------------------------------------------------------------
// 4️⃣ Remove Containers and Images in Docker
// ------------------------------------------------------------

// 🧱 1. Remove a Container
// ------------------------------------------------------------
// Syntax:
// docker container rm <CONTAINER_ID_or_NAME>

// 🧠 Meaning:
// Deletes (removes) a container from the system.
// Works only for stopped containers (use -f to force remove a running one).

// Examples:
// docker container rm 4a1b2c3d4e5f       → Remove a specific container
// docker container rm -f 4a1b2c3d4e5f    → Force remove (even if running)
// docker container rm $(docker ps -aq)   → Remove ALL containers

// ------------------------------------------------------------
// 2. Remove an Image
// ------------------------------------------------------------
// Syntax:
// docker image rm <IMAGE_ID_or_NAME>

// 🧠 Meaning:
// Deletes a Docker image from local storage.
// You cannot remove an image if it’s still used by a container.

// Examples:
// docker image rm ubuntu:latest           → Remove image by name
// docker image rm sha256:abcd1234efgh     → Remove image by ID
// docker rmi -f $(docker images -q)       → Force remove ALL images

// ------------------------------------------------------------
// 🔹 Notes:
// ------------------------------------------------------------
// - "rm" = remove
// - Use "-f" (force) carefully — it deletes without confirmation
// - Remove containers first, then images (images can’t be deleted if containers use them)

// ------------------------------------------------------------
// 🧾 Summary:
// docker container rm → Remove one or more containers
// docker image rm     → Remove one or more images
// Used for cleaning up unused or old Docker resources.
// ------------------------------------------------------------

// ------------------------------------------------------------
// 🧹 Docker Image Cleanup Commands
// ------------------------------------------------------------

// 1️⃣ Remove ONLY Dangling Images
// ------------------------------------------------------------
// 🔹 Command:
// docker image prune
//
// 🔸 Meaning:
// Removes only "dangling" images — old, leftover images with no name (<none>)
// and not linked to any running or stopped container.
//
// 🔸 Example of a dangling image:
// <none>   <none>   66460d557b25
//
// 🔸 Safe to use:
// ✅ Yes — only deletes useless images that take up space.
//
// 🔸 Use when:
// You want to clean junk images but keep others for reuse.

// 2️⃣ Remove ALL Unused Images (Full Cleanup)
// ------------------------------------------------------------
// 🔹 Command:
// docker image prune -a
//
// 🔸 Meaning:
// Removes ALL images that are NOT used by any container —
// even if they have a proper name or tag (like ubuntu:latest).
//
// 🔸 Safe to use:
// ⚠️ Be careful — this will delete even tagged images if not used.
// Docker will need to re-download them later.
//
// 🔸 Use when:
// You want to free maximum disk space and don’t mind re-pulling images.

// ------------------------------------------------------------
// 🧾 Quick Summary
// ------------------------------------------------------------
// docker image prune     → Removes only dangling (unnamed) images ✅ Safe
// docker image prune -a  → Removes ALL unused images ⚠️ Aggressive cleanup

// ------------------------------------------------------------
// 🐳 Run an Interactive Ubuntu Container
// ------------------------------------------------------------

// 🔹 Create and start a new container using the "ubuntu" image
// 🔹 Open it in interactive terminal mode (-it)
// 🔹 Assign a custom name "my-container"

// Command:
// docker run -it --name my-container ubuntu

// 💡 Breakdown:
// - docker run            → Create & start a new container
// - -i                    → Keep STDIN open (interactive)
// - -t                    → Allocate terminal (TTY)
// - --name my-container   → Set container name manually
// - ubuntu                → Image to use (from Docker Hub or local)

// 🧾 Result:
// Launches a live Ubuntu shell inside Docker.
// Type "exit" to leave — the container stops but is not deleted.

// ------------------------------------------------------------
// 💣 Force Stop (Kill) a Running Container
// ------------------------------------------------------------

//Kill mean shut down your computer but still you have that

// 🔹 Immediately kills a running container using its ID or name
// 🔹 Sends SIGKILL signal — no graceful shutdown
// 🔹 Use only when "docker stop" doesn’t work or hangs

// Command:
// docker kill 075061942b25

// 💡 Breakdown:
// - docker kill          → Forcefully stop container
// - 075061942b25         → Container ID (or use name)

// ⚠️ Note:
// Container will stop instantly but remain on the system.
// To remove it completely:
// docker rm 075061942b25

// ✅ Use only when you need to forcefully stop a stuck container

// ------------------------------------------------------------
// 💣 docker kill → Forcefully Stop a Running Container
// ------------------------------------------------------------

// 🔹 Instantly shuts down (kills) a running container
// 🔹 Sends SIGKILL signal — no graceful shutdown
// 🔹 The container stops immediately but is NOT deleted
// 🔹 Similar to holding the power button on a computer:
//    → Computer turns off instantly, but it still exists

// Command:
// docker kill <container-id>

// 🧾 Example:
// docker kill 075061942b25

// ✅ Container state after kill:
// - It stops running
// - You can restart it again:
//   docker start <container-id>
// - Or remove it completely:
//   docker rm <container-id>

// ⚠️ Use when:
// "docker stop" doesn’t respond or container is stuck




// ------------------------------------------------------------
// 🏗️ docker build → Build a Docker Image from a Dockerfile
// ------------------------------------------------------------

// 🔹 Creates a Docker image using instructions in a Dockerfile
// 🔹 Packages your app code, dependencies, and environment into one image
// 🔹 The image can later be used to run containers anywhere

// Command:
// docker build -t <image-name> <path>

// 🧾 Example:
// docker build -t my-app .

// ✅ What this does:
// - Looks for a Dockerfile in the current directory (".")
// - Executes each Dockerfile instruction step-by-step (FROM, RUN, COPY, etc.)
// - Builds a new image from those steps
// - Tags the image name as "my-app" for easy identification

// 📦 After Build:
// - Run the image as a container: docker run my-app
// - List all built images: docker images

// ⚠️ Use when:
// You’ve created or modified a Dockerfile and want to generate a new image



// ============================================================
// End of Docker Notes
// ============================================================
